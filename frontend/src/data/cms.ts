export interface FAQItem {
  question: string;
  answer: string;
}

export interface PortfolioProject {
  title: string;
  category: string;
  description: string;
  tech: string[];
  link: string;
}

export interface SiteCMS {
  // Global & Header
  announcementText: string;
  supportPhone: string;
  supportEmail: string;
  officeAddress: string;
  workingHours: string;

  // Home Page
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  promoTitle: string;
  promoSubtitle: string;

  // Shop Page
  shopTitle: string;
  shopSubtitle: string;

  // About Page
  aboutTitle: string;
  aboutSubtitle: string;
  aboutMission: string;

  // Contact Page
  contactTitle: string;
  contactSubtitle: string;

  // Privacy Policy
  privacyTitle: string;
  privacyContent: string;

  // Terms & Conditions
  termsTitle: string;
  termsContent: string;

  // Returns & Refunds
  returnsTitle: string;
  returnsContent: string;

  // TechMate Care Warranty
  warrantyTitle: string;
  warrantyContent: string;

  // FAQ Page
  faqTitle: string;
  faqSubtitle: string;
  faqList: FAQItem[];

  // Personal Portfolio Page
  portfolioName: string;
  portfolioRole: string;
  portfolioBio: string;
  portfolioGithub: string;
  portfolioLinkedin: string;
  portfolioEmail: string;
  portfolioProjects: PortfolioProject[];
}

export const DEFAULT_SITE_CMS: SiteCMS = {
  // Global & Header
  announcementText: '⚡ Welcome to TechMate Solution Store — Official Tech Marketplace • Free Express Delivery on orders over $50',
  supportPhone: '+977 1-4000000 / +977 9800000000',
  supportEmail: 'support@techmate.com.np',
  officeAddress: 'TechMate Tower, New Road, Kathmandu, Nepal',
  workingHours: 'Sunday - Friday: 9:00 AM - 8:00 PM',

  // Home Page
  heroTitle: "Nepal's #1 TechMate Solution Store",
  heroSubtitle: 'Shop over 400+ genuine headphones, 4K webcams, RGB mechanical keyboards, and smart gadgets.',
  heroCtaText: 'EXPLORE TECHMATE CATALOG (400) →',
  promoTitle: 'Supercharge Your Tech Workspace Today',
  promoSubtitle: 'Limited-time deals on mechanical keyboards, 4K webcams, and ergonomic accessories.',

  // Shop Page
  shopTitle: 'TechMate Solution Store 400+ Electronics Catalog',
  shopSubtitle: "Browse Nepal's largest genuine tech inventory with live stock tracking and instant delivery.",

  // About Page
  aboutTitle: 'About TechMate Solution Store',
  aboutSubtitle: 'Empowering creators, developers, and tech enthusiasts across Nepal with genuine electronics.',
  aboutMission: 'At TechMate Solution Store, our mission is to deliver authentic, enterprise-grade technology to every district in Nepal. We curate over 400 products with strict quality assurance and dedicated post-purchase warranty support.',

  // Contact Page
  contactTitle: 'TechMate Support & Help Center',
  contactSubtitle: 'We are available 24/7 to assist with order tracking, warranty claims, and technical guidance.',

  // Privacy Policy
  privacyTitle: 'Privacy Policy',
  privacyContent: `At TechMate Nepal, we respect your privacy and are committed to protecting your personal data. 

1. Information We Collect: We collect information you provide directly to us when placing an order, including your name, shipping address, email address, and phone number.
2. How We Use Information: Your data is strictly used to fulfill orders, process payments via authorized partners (eSewa, Khalti, IME Pay, Card), and provide warranty support.
3. Data Protection: We implement bank-grade encryption to protect your sensitive billing and personal information. We never sell or share your data with unauthorized third parties.`,

  // Terms & Conditions
  termsTitle: 'Terms & Conditions',
  termsContent: `Welcome to TechMate Nepal. By accessing or purchasing from our platform, you agree to the following terms:

1. General Conditions: All products listed on TechMate are guaranteed genuine. Prices are subject to change without notice.
2. Orders & Payments: Orders are confirmed upon successful payment verification via digital wallet, card, or cash on delivery confirmation.
3. Shipping Policy: Orders are processed within 24 hours and delivered across Nepal within 2-4 business days.
4. Product Warranty: Products come with standard manufacturer warranty backed by TechMate Care.`,

  // Returns & Refunds
  returnsTitle: 'Return & Refund Policy',
  returnsContent: `We want you to be completely satisfied with your purchase from TechMate.

1. 7-Day Replacement Guarantee: If your item arrives defective or damaged, contact us within 7 days for a 100% free replacement.
2. Return Eligibility: Returned products must be unused, in original packaging with all included accessories and warranty cards.
3. Refund Processing: Approved refunds are processed to your original payment method (eSewa, Khalti, or Bank Transfer) within 3-5 business days.`,

  // Warranty Page
  warrantyTitle: 'TechMate Care Warranty',
  warrantyContent: `Every electronics purchase from TechMate is protected by TechMate Care official warranty.

1. Coverage: Protects against technical defects, manufacturing flaws, and internal component failures.
2. How to Claim: Submit your order number and issue description to support@techmate.com.np or visit our Kathmandu service center.
3. Service Guarantee: Repairs or replacements are fulfilled within 5-7 working days under official warranty terms.`,

  // FAQ Page
  faqTitle: 'Frequently Asked Questions (FAQ)',
  faqSubtitle: 'Find answers to common questions regarding ordering, payment, shipping, and warranty.',
  faqList: [
    {
      question: 'How do I place an order on TechMate?',
      answer: 'Browse our catalog of 400+ products, click "+ Add to Cart", open your cart drawer, and proceed to checkout to enter your delivery address and payment method.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept eSewa, Khalti, IME Pay, Cash on Delivery (COD), and Visa / Mastercard.',
    },
    {
      question: 'How long does delivery take in Nepal?',
      answer: 'Kathmandu Valley orders are delivered within 24 hours. Delivery to other 77 districts takes 2-4 business days.',
    },
    {
      question: 'Are all 400 products genuine?',
      answer: 'Yes! Every single product on TechMate is 100% genuine and comes with official manufacturer warranty.',
    },
    {
      question: 'Can I edit website content from the Admin Backend?',
      answer: 'Yes! Non-technical administrators can edit all text, titles, announcements, privacy policies, terms, and FAQs directly from the Admin Dashboard CMS.',
    },
  ],

  // Personal Portfolio
  portfolioName: 'Karki',
  portfolioRole: 'Founder & Principal Software Engineer',
  portfolioBio: 'Passionate tech entrepreneur and full-stack software engineer based in Kathmandu, Nepal. Architect of TechMate — Nepal\'s leading enterprise tech marketplace serving 400+ genuine products.',
  portfolioGithub: 'https://github.com',
  portfolioLinkedin: 'https://linkedin.com',
  portfolioEmail: 'karki@techmate.com.np',
  portfolioProjects: [
    {
      title: 'TechMate E-Commerce Marketplace',
      category: 'Full-Stack Next.js / Node.js App',
      description: 'Daraz-inspired e-commerce platform supporting 400+ active items, custom CMS, eSewa/Khalti digital checkout, and real-time inventory management.',
      tech: ['Next.js', 'TypeScript', 'Node.js', 'Prisma', 'TailwindCSS'],
      link: '/',
    },
    {
      title: 'Nepal Logistics & Parcel Tracking SDK',
      category: 'Cloud Infrastructure Engine',
      description: 'Distributed shipping notification engine automating parcel tracking and SMS dispatch across all 77 districts of Nepal.',
      tech: ['Node.js', 'PostgreSQL', 'Redis', 'WebSockets'],
      link: '/checkout',
    },
    {
      title: 'eSewa & Khalti Payment Integration Library',
      category: 'Fintech Gateway',
      description: 'Lightweight merchant payment SDK for seamless digital wallet verification and instant transaction reconciliation.',
      tech: ['TypeScript', 'REST API', 'Crypto HMAC'],
      link: '/shop',
    },
  ],
};

export function getSiteCMS(): SiteCMS {
  if (typeof window === 'undefined') return DEFAULT_SITE_CMS;
  const saved = localStorage.getItem('site_cms');
  if (saved) {
    try {
      return { ...DEFAULT_SITE_CMS, ...JSON.parse(saved) };
    } catch (e) {
      return DEFAULT_SITE_CMS;
    }
  }
  return DEFAULT_SITE_CMS;
}

export function saveSiteCMS(cms: Partial<SiteCMS>): SiteCMS {
  const current = getSiteCMS();
  const updated = { ...current, ...cms };
  if (typeof window !== 'undefined') {
    localStorage.setItem('site_cms', JSON.stringify(updated));
  }
  return updated;
}
