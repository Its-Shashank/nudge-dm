export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#faq" },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Connect Your Account",
    description:
      "Securely link your Instagram profile in seconds. We use official Meta APIs to ensure your data stays safe.",
  },
  {
    step: 2,
    title: "Set Your Trigger",
    description:
      'Choose a post and a specific keyword that triggers an automated DM. "INFO", "LINK", or "COUPON" — you decide.',
  },
  {
    step: 3,
    title: "Automate Growth",
    description:
      "Sit back as NudgeDM handles the replies 24/7. Drive traffic, capture leads, and boost conversions effortlessly.",
  },
] as const;

export const FEATURES = [
  {
    icon: "filter_list",
    title: "Keyword Triggers",
    description:
      "Filter responses based on specific words to target only the most interested customers.",
    iconBg: "bg-primary-fixed",
    iconColor: "text-primary",
  },
  {
    icon: "person_pin",
    title: "Smart Personalization",
    description:
      "Include user names and custom variables to make every automated message feel personal and genuine.",
    iconBg: "bg-secondary-fixed",
    iconColor: "text-secondary",
  },
  {
    icon: "perm_media",
    title: "Rich Media Support",
    description:
      "Don't just send text. Embed high-quality images, product videos, or direct checkout links.",
    iconBg: "bg-tertiary-fixed",
    iconColor: "text-tertiary",
  },
] as const;

export const PRICING_PLAN = {
  name: "Pro Plan",
  price: 49,
  period: "month",
  badge: "Recommended",
  features: [
    "Unlimited Automations",
    "Advanced Keyword Triggers",
    "Full Personalization Suite",
    "Premium Support",
  ],
} as const;

export const FAQ_ITEMS = [
  {
    question: "Is NudgeDM safe for my account?",
    answer:
      "Yes, absolutely. NudgeDM uses official Meta APIs and complies with all platform regulations to ensure your account remains secure and in good standing.",
  },
  {
    question: "Can I customize the reply message?",
    answer:
      "Of course! You have full control over the message content, including variables like the user's name, emojis, and links.",
  },
  {
    question: "Do I need coding skills?",
    answer:
      "No coding required. Our visual builder allows you to set up complex automations with simple drag-and-drop or keyword-matching logic.",
  },
] as const;

export const FOOTER_LINKS = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Integrations", href: "#" },
    { label: "Pricing", href: "#pricing" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Legal", href: "#" },
  ],
  resources: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
} as const;

export const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBPkUjepL_9yeRqRVo8RBmOaD3dVI_8Rm5HWu2r2xMh2drV62sZUIU4122rJgEuxG41esXt8igjKMMl_etVRuYUlREk4YZ_4s7ylSXZfZUB5zEijMW8tnT7wDHedsFmitgLQJ3a5lUR9iX7Ja1X1CqdrckaFX2At-Fp1PDaRom5SfGlURjCi0U-EpPkmiVrj-uHYBXU2KIyBAIq95_Zb6lXfNwY4q4WRUcmkHZVdK4_ffRurBhzUK20bICcUQqGofiK3Ov_uxp0Uhpy";

export const FEATURES_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCNMLgKZlxW5WJNVHzkhialVARJ7FFA84Zc6L8iQ0D92yMsL_EvBjIp4VTLmPgHpURKdsXTGsg7Mv-xdQpGqu3gmM4DxVB4XB-yN4kVmzbA8PZfO5jMwq2bmXYKvWzG1yKojcOnjC2EZCWdRR594ic_mvG1Wqg1My96EMPwcCxsAbL5eW6qYsDn4aPf0vedImNQlGg9gKlxSGS_h-QkVuWglpJG8e9fA0aY-vmIwplUSPvkSYjMg8cx8aQF0DlU4DGndwMGtAWrY5QF";
