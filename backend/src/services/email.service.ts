import { Resend } from "resend";
import { logger } from "../utils/logger";
import { userRepository } from "../repositories/user.repository";

export class EmailService {
  private resend: Resend | null = null;
  private fromEmail = "NudgeDM <noreply@nudgedm.com>";

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey && apiKey !== "re_mock") {
      this.resend = new Resend(apiKey);
    } else {
      logger.info("Resend API Key is missing or using mock key. Running email service in console mode.");
    }
  }

  private async sendMail(to: string, subject: string, html: string) {
    if (this.resend) {
      try {
        await this.resend.emails.send({
          from: this.fromEmail,
          to,
          subject,
          html,
        });
        logger.info(`Email sent successfully to ${to} (Subject: "${subject}")`);
      } catch (err) {
        logger.error(`Failed to send email to ${to} via Resend:`, err);
      }
    } else {
      logger.info(`[MOCK EMAIL] TO: ${to} | SUBJECT: "${subject}" | BODY:\n${html}\n-------------------`);
    }
  }

  async sendWelcomeEmail(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) return;
    const html = `
      <h1>Welcome to NudgeDM, ${user.name}!</h1>
      <p>We are excited to help you automate your Instagram direct messages.</p>
      <p>Here is what to do next:</p>
      <ol>
        <li>Connect your Instagram account from your Dashboard.</li>
        <li>Create your first comment automation.</li>
        <li>Comment on your own post to test it!</li>
      </ol>
      <p>Best regards,<br>The NudgeDM Team</p>
    `;
    await this.sendMail(user.email, "Welcome to NudgeDM 👋", html);
  }

  async sendSubscriptionConfirmation(userId: string, plan: string) {
    const user = await userRepository.findById(userId);
    if (!user) return;
    const html = `
      <h1>Subscription Confirmed!</h1>
      <p>Hi ${user.name}, you have successfully subscribed to the <strong>${plan}</strong> plan.</p>
      <p>Thank you for choosing NudgeDM! Your limits have been updated automatically.</p>
    `;
    await this.sendMail(user.email, `Subscription Confirmed: NudgeDM ${plan} Plan`, html);
  }

  async sendPaymentSuccessEmail(userId: string, amount: number) {
    const user = await userRepository.findById(userId);
    if (!user) return;
    const html = `
      <h1>Receipt of Payment</h1>
      <p>Hi ${user.name}, we have successfully processed your payment of $${(amount / 100).toFixed(2)} for your NudgeDM subscription.</p>
    `;
    await this.sendMail(user.email, "Payment Received - NudgeDM", html);
  }

  async sendPaymentFailedEmail(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) return;
    const html = `
      <h1>Billing Alert: Payment Failed</h1>
      <p>Hi ${user.name}, we were unable to process your subscription payment.</p>
      <p>Please update your billing information on your settings panel to keep your automations active.</p>
    `;
    await this.sendMail(user.email, "Payment Failed - NudgeDM Action Required", html);
  }

  async sendUsageLimitReachedEmail(userId: string, plan: string) {
    const user = await userRepository.findById(userId);
    if (!user) return;
    const html = `
      <h1>Usage Limit Reached</h1>
      <p>Hi ${user.name}, your account has hit the monthly direct message limits for your <strong>${plan}</strong> plan.</p>
      <p>Any incoming comments will be logged but DMs will not be sent until the next billing cycle restarts, or when you upgrade to a higher tier plan.</p>
      <p><a href="${process.env.BETTER_AUTH_URL}/dashboard/billing">Upgrade now</a> to keep your automations active!</p>
    `;
    await this.sendMail(user.email, "Action Required: NudgeDM Limit Reached ⚠️", html);
  }

  async sendAccountDeletedEmail(email: string, name: string) {
    const html = `
      <h1>Goodbye, ${name}</h1>
      <p>We are sad to see you go. Your NudgeDM account has been deleted successfully, and all active subscriptions have been cancelled.</p>
      <p>If you have any feedback on how we can improve, please let us know.</p>
    `;
    await this.sendMail(email, "Your NudgeDM Account has been Deleted", html);
  }
}

export const emailService = new EmailService();
