import { logger } from "../src/utils/logger";

const BASE_URL = "http://localhost:5001";
let sessionCookie = "";
let userId = "";

async function request(path: string, options: RequestInit = {}) {
  const url = `${BASE_URL}${path}`;
  const headers = new Headers(options.headers || {});

  if (sessionCookie) {
    headers.set("Cookie", sessionCookie);
  }

  const response = await fetch(url, { ...options, headers });

  const setCookie = response.headers.get("set-cookie");
  if (setCookie) {
    const tokenCookie = setCookie.split(";")[0];
    if (tokenCookie.includes("better-auth.session_token")) {
      const value = tokenCookie.split("=").slice(1).join("=");
      sessionCookie = value ? tokenCookie : "";
    }
  }

  const contentType = response.headers.get("content-type");
  let body: unknown = null;
  if (contentType && contentType.includes("application/json")) {
    body = await response.json();
  } else {
    body = await response.text();
  }

  return { status: response.status, body, headers: response.headers };
}

async function runTests() {
  logger.info("================ STARTING BACKEND VERIFICATION TESTS ================");

  logger.info("Test 1: Health Check...");
  const health = await request("/health");
  const healthBody = health.body as { status?: string };
  if (health.status !== 200 || healthBody.status !== "ok") {
    throw new Error(`Health check failed: ${JSON.stringify(health.body)}`);
  }
  logger.info("✔ Health check ok!");

  logger.info("Test 2: Register User...");
  let reg = await request("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "test_verification@nudgedm.com",
      password: "password123",
      name: "Verification User",
    }),
  });

  if (reg.status === 400) {
    logger.info("User already exists, logging in instead...");
    reg = await request("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test_verification@nudgedm.com",
        password: "password123",
      }),
    });
  }

  const regBody = reg.body as { user?: { id: string } };
  if ((reg.status !== 201 && reg.status !== 200) || !sessionCookie) {
    throw new Error(`Registration failed: Status ${reg.status}, Body: ${JSON.stringify(reg.body)}`);
  }
  userId = regBody.user?.id || "";
  logger.info(`✔ Registration successful! Cookie cached: ${sessionCookie}`);

  logger.info("Test 3: Me Profile Lookup...");
  const profile = await request("/auth/me");
  const profileBody = profile.body as { user?: { email: string; id: string } };
  if (profile.status !== 200 || profileBody.user?.email !== "test_verification@nudgedm.com") {
    throw new Error(`Me profile failed: Status ${profile.status}, Body: ${JSON.stringify(profile.body)}`);
  }
  userId = profileBody.user?.id || userId;
  logger.info("✔ Me profile returned correct metadata!");

  logger.info("Test 4: Instagram Connect URL...");
  const conn = await request("/instagram/connect");
  const connBody = conn.body as { url?: string };
  if (conn.status !== 200 || !connBody.url) {
    throw new Error(`Connect URL failed: Status ${conn.status}, Body: ${JSON.stringify(conn.body)}`);
  }
  logger.info(`✔ Connect URL fetched successfully: ${connBody.url}`);

  logger.info("Test 5: Simulating Instagram OAuth Callback...");
  const cb = await request("/instagram/callback?code=mock_code");
  if (cb.status !== 200 && cb.status !== 302) {
    throw new Error(`Callback simulation failed: Status ${cb.status}`);
  }
  logger.info("✔ OAuth callback processed and account linked!");

  logger.info("Test 6: Verify Linked Instagram Account...");
  const account = await request("/instagram/account");
  const accountBody = account.body as { username?: string };
  if (account.status !== 200 || accountBody.username !== "mock_creator_nudge") {
    throw new Error(`Linked account check failed: Status ${account.status}, Body: ${JSON.stringify(account.body)}`);
  }
  logger.info(`✔ Linked account matches: @${accountBody.username}`);

  logger.info("Test 7: Create Automation...");
  const auto = await request("/automations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Guide Automator",
      keywords: "guide,pdf,free",
      message: "Hey! Here is the PDF guide you requested: https://nudgedm.com/guide 👋",
      delay: 0,
    }),
  });
  const autoBody = auto.body as { id?: string; name?: string };
  if (auto.status !== 201 || autoBody.name !== "Guide Automator") {
    throw new Error(`Automation creation failed: Status ${auto.status}, Body: ${JSON.stringify(auto.body)}`);
  }
  const automationId = autoBody.id;
  logger.info(`✔ Automation created successfully: ID = ${automationId}`);

  logger.info("Test 8: Simulate Instagram Comment Webhook Trigger...");
  const webhook = await request("/instagram/webhook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      object: "instagram",
      entry: [
        {
          id: "mock_ig_account_789",
          time: Date.now(),
          changes: [
            {
              field: "comments",
              value: {
                id: "comment_event_999",
                text: "I want the free guide please!",
                from: {
                  id: "commenter_user_111",
                  username: "commenter_person",
                },
                media: {
                  id: "media_post_222",
                },
              },
            },
          ],
        },
      ],
    }),
  });
  const webhookBody = webhook.body as { processed?: number };
  if (webhook.status !== 200 || webhookBody.processed !== 1) {
    throw new Error(`Webhook simulation failed: Status ${webhook.status}, Body: ${JSON.stringify(webhook.body)}`);
  }
  logger.info("✔ Webhook matched keyword and executed successfully!");

  logger.info("Test 9: Verify Dashboard stats and activity log...");
  const dash = await request("/dashboard");
  const dashBody = dash.body as {
    messagesSent?: number;
    totalAutomations?: number;
    recentActivity?: { status: string }[];
  };
  if (
    dash.status !== 200 ||
    dashBody.messagesSent !== 1 ||
    dashBody.totalAutomations !== 1 ||
    !dashBody.recentActivity ||
    dashBody.recentActivity.length !== 1
  ) {
    throw new Error(`Dashboard aggregation verification failed: Status ${dash.status}, Body: ${JSON.stringify(dash.body)}`);
  }
  logger.info(`✔ Dashboard counters: Sent = ${dashBody.messagesSent}, Total = ${dashBody.totalAutomations}`);
  logger.info(`✔ Dashboard recent log status: ${dashBody.recentActivity[0].status}`);

  logger.info("Test 10: Upgrade Plan via Sandbox Stripe Checkout...");
  const upgrade = await request(`/billing/sandbox-checkout-success?userId=${userId}&plan=STARTER`);
  if (upgrade.status !== 200 && upgrade.status !== 302) {
    throw new Error(`Sandbox subscription check failed: Status ${upgrade.status}`);
  }
  logger.info("✔ Simulated checkout redirect completed!");

  logger.info("Test 11: Verify Subscription Status is STARTER...");
  const sub = await request("/billing/subscription");
  const subBody = sub.body as { plan?: string };
  if (sub.status !== 200 || subBody.plan !== "STARTER") {
    throw new Error(`Plan status mismatch: Status ${sub.status}, Body: ${JSON.stringify(sub.body)}`);
  }
  logger.info(`✔ Subscription active plan matches: ${subBody.plan}`);

  logger.info("Test 12: Logout User...");
  const logoutRes = await request("/auth/logout", { method: "POST" });
  if (logoutRes.status !== 200) {
    throw new Error(`Logout failed: Status ${logoutRes.status}`);
  }
  logger.info("✔ Session destroyed.");

  logger.info("Test 13: Verify Session Invalidation...");
  const unauth = await request("/auth/me");
  if (unauth.status !== 401) {
    throw new Error(`Session was not invalidated: Status ${unauth.status}`);
  }
  logger.info("✔ Profile access rejected with 401 (Unauthorized) successfully!");

  logger.info("================ ALL VERIFICATION TESTS COMPLETED SUCCESSFULLY! ================");
}

runTests().catch((error) => {
  logger.error("❌ Verification tests failed:", error);
  process.exit(1);
});
