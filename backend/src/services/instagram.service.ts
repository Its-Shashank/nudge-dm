import { instagramRepository } from "../repositories/instagram.repository";
import { logger } from "../utils/logger";
import { BadRequestError, NotFoundError } from "../utils/errors";

export class InstagramService {
  private isSandbox(): boolean {
    return process.env.SANDBOX_MODE === "true";
  }

  getConnectUrl(): string {
    if (this.isSandbox()) {
      return `${process.env.BETTER_AUTH_URL || "http://localhost:5001"}/instagram/callback?code=mock_oauth_code_123`;
    }

    const clientId = process.env.FB_CLIENT_ID;
    const redirectUri = encodeURIComponent(process.env.FB_REDIRECT_URI || "");
    const scope = "instagram_basic,instagram_manage_comments,instagram_manage_messages,pages_show_list,pages_read_engagement";
    
    return `https://www.facebook.com/v19.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
  }

  async handleOAuthCallback(code: string, userId: string) {
    if (this.isSandbox()) {
      logger.info(`[Sandbox Mode] Executing mock Instagram account link for user ${userId}`);
      
      const mockAccount = {
        userId,
        instagramId: "mock_ig_account_789",
        username: "mock_creator_nudge",
        accessToken: "mock_page_access_token_abc123",
        refreshToken: "mock_refresh_token_xyz789",
        expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      };

      const existing = await instagramRepository.findByInstagramId(mockAccount.instagramId);
      if (existing) {
        return instagramRepository.update(existing.id, mockAccount);
      }
      return instagramRepository.create(mockAccount);
    }

    try {
      const clientId = process.env.FB_CLIENT_ID;
      const clientSecret = process.env.FB_CLIENT_SECRET;
      const redirectUri = process.env.FB_REDIRECT_URI;

      const tokenUrl = `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri || ""
      )}&client_secret=${clientSecret}&code=${code}`;
      
      const tokenRes = await fetch(tokenUrl);
      const tokenData = await tokenRes.json() as any;
      if (tokenData.error) {
        throw new Error(tokenData.error.message);
      }

      const shortLivedToken = tokenData.access_token;

      const longLivedUrl = `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${clientId}&client_secret=${clientSecret}&fb_exchange_token=${shortLivedToken}`;
      const longLivedRes = await fetch(longLivedUrl);
      const longLivedData = await longLivedRes.json() as any;
      if (longLivedData.error) {
        throw new Error(longLivedData.error.message);
      }

      const longLivedToken = longLivedData.access_token;
      const expiresAt = new Date(Date.now() + (longLivedData.expires_in || 5184000) * 1000);

      const pagesUrl = `https://graph.facebook.com/v19.0/me/accounts?access_token=${longLivedToken}`;
      const pagesRes = await fetch(pagesUrl);
      const pagesData = await pagesRes.json() as any;
      if (pagesData.error) {
        throw new Error(pagesData.error.message);
      }

      const pages = pagesData.data || [];
      if (pages.length === 0) {
        throw new Error("No Facebook Pages found linked to this Facebook Account.");
      }

      let igAccountData = null;

      for (const page of pages) {
        const pageId = page.id;
        const pageAccessToken = page.access_token;

        const igLookupUrl = `https://graph.facebook.com/v19.0/${pageId}?fields=instagram_business_account{id,username}&access_token=${pageAccessToken}`;
        const igLookupRes = await fetch(igLookupUrl);
        const igLookupData = await igLookupRes.json() as any;

        if (igLookupData.instagram_business_account) {
          igAccountData = {
            instagramId: igLookupData.instagram_business_account.id,
            username: igLookupData.instagram_business_account.username,
            accessToken: pageAccessToken,
            expiresAt,
          };
          break;
        }
      }

      if (!igAccountData) {
        throw new Error("No connected Instagram Business or Creator Accounts found on your Facebook Pages.");
      }

      const payload = {
        userId,
        instagramId: igAccountData.instagramId,
        username: igAccountData.username,
        accessToken: igAccountData.accessToken,
        expiresAt: igAccountData.expiresAt,
      };

      const existing = await instagramRepository.findByInstagramId(payload.instagramId);
      if (existing) {
        return instagramRepository.update(existing.id, payload);
      }
      return instagramRepository.create(payload);
    } catch (error: any) {
      logger.error("Failed to connect Instagram account", { error: error.message });
      throw new BadRequestError(`Instagram link failed: ${error.message}`);
    }
  }

  async disconnectInstagram(userId: string) {
    const account = await instagramRepository.findByUserId(userId);
    if (!account) {
      throw new NotFoundError("No connected Instagram Account found");
    }
    return instagramRepository.delete(account.id);
  }

  async getConnectedAccount(userId: string) {
    const account = await instagramRepository.findByUserId(userId);
    if (!account) return null;
    return {
      id: account.id,
      instagramId: account.instagramId,
      username: account.username,
      connectedAt: account.connectedAt,
    };
  }

  async sendDirectMessage(
    instagramAccountId: string,
    recipientIgId: string,
    messageText: string,
    accessToken: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    if (this.isSandbox()) {
      logger.info(
        `[Sandbox Mode] Simulating send DM from IG Account ${instagramAccountId} to Recipient ${recipientIgId}`
      );
      logger.info(`[Sandbox Mode] Message text: "${messageText}"`);
      return { success: true, messageId: `mock_msg_${Math.random().toString(36).substring(2, 11)}` };
    }

    try {
      const sendUrl = `https://graph.facebook.com/v19.0/me/messages?access_token=${accessToken}`;
      const response = await fetch(sendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: { id: recipientIgId },
          message: { text: messageText },
        }),
      });

      const data = await response.json() as any;
      if (data.error) {
        return { success: false, error: data.error.message };
      }
      return { success: true, messageId: data.message_id };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to hit Instagram Graph Send API" };
    }
  }
}

export const instagramService = new InstagramService();
