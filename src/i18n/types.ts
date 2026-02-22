export type Locale = "he" | "en";

export interface Translations {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  nav: {
    services: string;
    process: string;
    industries: string;
    about: string;
    contact: string;
    languageToggle: string;
    menuOpen: string;
    menuClose: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: Array<{ title: string; description: string }>;
    positioningStatement: string;
  };
  process: {
    title: string;
    subtitle: string;
    steps: Array<{ title: string; description: string }>;
  };
  industries: {
    title: string;
    subtitle: string;
    items: Array<{ name: string; examples: string[]; bullets: string[] }>;
    closingStatement: string;
    closingCta: string;
  };
  about: {
    title: string;
    subtitle: string;
    narrative: string;
    principlesTitle: string;
    principles: Array<{ title: string; description: string }>;
    founderTab: string;
    principlesTab: string;
    founder: {
      name: string;
      role: string;
      bio: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    intro: string;
    emailLabel: string;
    whatsappLabel: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      company: string;
      companyPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      submitting: string;
      successTitle: string;
      successMessage: string;
      errorTitle: string;
      errorMessage: string;
    };
    validation: {
      nameRequired: string;
      nameMin: string;
      emailRequired: string;
      emailInvalid: string;
      companyRequired: string;
      companyMin: string;
      phoneInvalid: string;
      messageRequired: string;
      messageMin: string;
    };
  };
  footer: {
    copyright: string;
    tagline: string;
    location: string;
    navigationTitle: string;
    legalTitle: string;
    contactTitle: string;
    privacyPolicy: string;
    termsOfService: string;
    cookiePolicy: string;
    accessibility: string;
    whatsappChat: string;
    followTitle: string;
  };
  privacy: {
    title: string;
    lastUpdated: string;
    content: string;
  };
  terms: {
    title: string;
    lastUpdated: string;
    content: string;
  };
  cookies: {
    title: string;
    lastUpdated: string;
    content: string;
  };
  accessibility: {
    title: string;
    lastUpdated: string;
    content: string;
  };
  notFound: {
    title: string;
    message: string;
    backHome: string;
  };
  common: {
    scrollToTop: string;
    skipToContent: string;
  };
}
