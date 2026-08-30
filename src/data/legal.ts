import type { LegalBlock } from "@/components/page/LegalTemplate";
import { site } from "@/data/site";

/*
 * ⚠ DRAFT CONTENT — REQUIRES LICENSEE REVIEW BEFORE LAUNCH.
 *
 * These three pages are required under ACL 515382 (scope §11). The wording
 * below is a working draft written from the scope, not legal advice, and must
 * be reviewed and approved — and in the case of the credit guide, replaced
 * with the licensee's own document — before the site goes live.
 */

export const legalPages: Record<
  string,
  { eyebrow: string; h1: string; intro: string; updated: string; blocks: LegalBlock[] }
> = {
  "credit-guide": {
    eyebrow: "Credit guide",
    h1: "Who we are and how we're paid.",
    intro:
      "What you're entitled to know before we arrange credit for you, in plain language.",
    updated: "August 2026",
    blocks: [
      {
        heading: "About us",
        body: [
          `${site.legalName} holds Australian Credit Licence ${site.acl} and operates under the ${site.aggregator} aggregator. We are credit assistance providers: we help you find and apply for credit, and we deal with the lender on your behalf.`,
          `We can be reached on ${site.phone} or at ${site.email}. Our offices are in ${site.offices.join(" and ")}, and we are licensed to arrange credit anywhere in Australia.`,
        ],
      },
      {
        heading: "What we do",
        body: [
          "We assess your requirements and objectives, compare products from the lenders we have access to, recommend a product and lender, and manage the application through to settlement.",
          "Before we suggest a particular loan we make reasonable enquiries about your requirements and objectives, and about your financial situation. We take reasonable steps to verify what you tell us. We must not suggest a loan that would be unsuitable for you.",
        ],
      },
      {
        heading: "How we are paid",
        body: [
          "On the residential home loans described on this website, the lender pays us a commission when the loan settles. It is generally an upfront amount calculated on the loan size, plus an ongoing trail while the loan remains open. You do not pay us a fee for those loans.",
          "Fees may apply to private lending and to some commercial and asset finance transactions. Where a fee applies, we will tell you the amount before you commit to anything, and it will be set out in writing in our credit proposal.",
          "The commission a lender pays can differ between lenders. That difference does not determine our recommendation, and we will tell you which lenders we compared and why we are recommending the one we are.",
        ],
      },
      {
        heading: "Lenders we work with",
        body: [
          "Holding our own Australian Credit Licence means we are not restricted to a single aggregator's panel. A current list of the lenders we can access is available on request.",
          "We do not work with every lender in the market, and no broker does. Where a product we cannot access would clearly suit you better, we will say so.",
        ],
      },
      {
        heading: "If something goes wrong",
        body: [
          "If you are not satisfied, please tell us first. Our internal dispute resolution process, and details of the external scheme available to you, are set out on our complaints and disputes page.",
        ],
      },
      {
        heading: "Documents you will receive",
        body: [
          "Before we provide credit assistance you will receive this credit guide. If we suggest a specific loan, you will receive a credit proposal disclosure setting out the fees payable, the commissions we expect to receive, and a reasonable estimate of your costs.",
          "You may request a copy of our preliminary assessment at any time up to seven years after we provide credit assistance, and we will provide it free of charge.",
        ],
      },
    ],
  },

  "privacy-policy": {
    eyebrow: "Privacy",
    h1: "What we collect, and what we do with it.",
    intro:
      "How we handle your personal information under the Privacy Act 1988 and the Australian Privacy Principles.",
    updated: "August 2026",
    blocks: [
      {
        heading: "What we collect",
        body: [
          "To assess a credit application we generally need your name and contact details, identification documents, employment and income details, details of your assets, liabilities and expenses, and information about the purpose of the loan.",
          "Where you use a calculator on this site, the figures you enter are processed in your browser and are not transmitted to us unless you submit an enquiry.",
        ],
      },
      {
        heading: "Why we collect it",
        body: [
          "We collect personal information to assess your requirements, to prepare and submit a credit application on your behalf, to comply with our obligations under the National Consumer Credit Protection Act and anti-money-laundering law, and to keep you informed about your application.",
          "If you do not provide the information we ask for, we may be unable to arrange credit for you.",
        ],
      },
      {
        heading: "Who we disclose it to",
        body: [
          "We may disclose your information to lenders and lenders mortgage insurers, to credit reporting bodies, to our aggregator, to valuers, to your accountant or adviser where you have asked us to, and to our professional advisers or as otherwise required by law.",
          "We do not sell your personal information, and we do not disclose it for marketing by third parties.",
        ],
      },
      {
        heading: "Credit reporting",
        body: [
          "In assessing an application we may obtain a credit report about you from a credit reporting body. We may also disclose information to those bodies, including information about applications and, where applicable, defaults.",
          "You have the right to request that a credit reporting body does not use your information for pre-screening direct marketing, and to request a ban on your credit information if you believe you have been the victim of fraud.",
        ],
      },
      {
        heading: "Storage and security",
        body: [
          "We take reasonable steps to protect the information we hold from misuse, loss and unauthorised access. Records are retained for the period required by law and destroyed or de-identified when no longer needed.",
        ],
      },
      {
        heading: "Accessing and correcting your information",
        body: [
          `You may request access to the personal information we hold about you, and ask us to correct it if it is inaccurate. Write to ${site.email} and we will respond within a reasonable period.`,
          "If you are concerned about how we have handled your information, please contact us first. If you are not satisfied with our response you may complain to the Office of the Australian Information Commissioner.",
        ],
      },
    ],
  },

  "complaints-and-disputes": {
    eyebrow: "Complaints & disputes",
    h1: "If we get it wrong, here's what happens.",
    intro:
      "Our internal process, and the free external scheme available to you if we can't resolve it.",
    updated: "August 2026",
    blocks: [
      {
        heading: "Tell us first",
        body: [
          `The fastest route is usually a phone call on ${site.phone}. You can also write to us at ${site.email}. Tell us what happened and what you would like us to do about it.`,
          "We will acknowledge your complaint promptly and let you know who is handling it.",
        ],
      },
      {
        heading: "Our internal dispute resolution process",
        body: [
          "We will investigate and respond in writing within the timeframes set by ASIC's requirements for internal dispute resolution — generally within 30 days of receiving your complaint.",
          "Our response will explain the outcome, the reasons for it, and what you can do if you are not satisfied.",
        ],
      },
      {
        heading: "The Australian Financial Complaints Authority",
        body: [
          "If we cannot resolve your complaint to your satisfaction, or if we do not respond within the required timeframe, you can take it to the Australian Financial Complaints Authority. AFCA provides fair and independent financial services complaint resolution that is free to consumers.",
          "AFCA can be contacted on 1800 931 678, at info@afca.org.au, or in writing to GPO Box 3, Melbourne VIC 3001. Further information is available at afca.org.au.",
          "There are time limits for lodging a complaint with AFCA. Contacting us first does not affect your right to go to AFCA.",
        ],
      },
      {
        heading: "Financial hardship",
        body: [
          "If you are having difficulty meeting repayments, tell us or your lender as early as you can. Lenders are required to consider reasonable hardship requests, and the options available are usually wider the earlier the conversation happens.",
        ],
      },
    ],
  },
};
