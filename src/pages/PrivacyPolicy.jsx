import SEO from '../components/SEO.jsx';
import LegalLayout from '../components/LegalLayout.jsx';
import { company } from '../config/company.js';

const sections = [
  {
    heading: 'Introduction and who we are',
    paragraphs: [
      `RAR Consultant (“we”, “us”, or “our”) is an Indian IT services business and the Data Fiduciary for personal data described in this Privacy Policy. We provide website development, custom software, search engine optimization, e-commerce, local business digital setup, and website maintenance.`,
      `This notice explains how we handle personal data when you contact us, request a quote, or use this website.`,
    ],
  },
  {
    heading: 'Scope and applicable law',
    paragraphs: [
      `This Policy is intended to explain our practices in a clear, practical way and to support compliance with India’s Digital Personal Data Protection Act, 2023 (“DPDP Act”), the DPDP Rules as notified, and applicable baseline requirements under the Information Technology Act, 2000 and related rules. The applicable law and its commencement provisions govern where this notice and the law differ.`,
    ],
  },
  {
    heading: 'Personal data we collect',
    paragraphs: [
      `If you use our enquiry form, we ask only for your full name, mobile number, email address, service interest, and short description of your enquiry. These details help us understand and respond to your request.`,
      `This website does not run analytics by default. If optional analytics are added in the future and you choose them, technical data such as IP address, browser, device, and interaction information may be processed as explained in the consent notice. Hosting and security providers may also process limited technical data to deliver and protect the website.`,
    ],
  },
  {
    heading: 'Purpose and basis for processing',
    paragraphs: [
      `We use enquiry details to respond to your message, clarify requirements, prepare or discuss a quotation, and communicate about a potential or active engagement. We do not use enquiry details for unrelated marketing without a separate appropriate basis.`,
      `We rely on your consent when you submit the enquiry form. We may also process information for legitimate uses permitted by the DPDP Act, to comply with applicable law, or to establish, exercise, or defend legal claims, as relevant.`,
    ],
  },
  {
    heading: 'How we collect information',
    paragraphs: [
      `We collect information when you complete the contact form or choose to contact us by email, telephone, or WhatsApp. If you use a third-party channel, that provider’s own terms and privacy practices also apply.`,
      `Essential local storage remembers whether you have made a cookie choice. We do not activate optional analytics or advertising trackers by default.`,
    ],
  },
  {
    heading: 'Notice, consent, and withdrawal',
    paragraphs: [
      `Before the enquiry form is submitted, its consent checkbox explains that we will process your information to respond and provide a quote. It also discloses Web3Forms as a third-party form service acting as a Data Processor and explains that it may process information on servers outside India. The checkbox starts unticked.`,
      `You may withdraw consent or make a Data Principal request by emailing ${company.grievanceOfficerEmail}. Withdrawal does not affect processing already completed lawfully before withdrawal. We will make the withdrawal route no harder than the way consent was given.`,
    ],
  },
  {
    heading: 'Sharing and disclosure',
    paragraphs: [
      `We do not sell personal data. To deliver an enquiry, the information you enter is transmitted through Web3Forms, which acts as a third-party Data Processor, and may be delivered to our email provider. Website hosting providers may process technical information needed to serve the site. These providers handle information under their applicable terms and safeguards.`,
      `We may disclose information where required by law, a valid legal process, or to protect rights, safety, and security. We do not share enquiry information with unrelated parties for their own marketing.`,
    ],
  },
  {
    heading: 'Cross-border processing',
    paragraphs: [
      `Web3Forms is a third-party form service and may process enquiry data on servers outside India. Email, hosting, or other infrastructure providers may also operate servers or support systems in other locations. Where cross-border processing occurs, it remains subject to applicable Indian law and the provider’s relevant safeguards and terms.`,
      `Web3Forms currently describes AWS-hosted processing. Its location and safeguards may change; confirm the provider’s current terms and transfer details before launch.`,
    ],
  },
  {
    heading: 'Retention and erasure',
    paragraphs: [
      `${company.dataRetention} We may retain limited records for longer where required by law or necessary to resolve a dispute.`,
      `Web3Forms states that submissions may be kept for up to three years by default and that the account owner can choose a shorter per-form retention period. Configure the provider account to match this Policy before launch; otherwise the provider’s configured retention applies to its copy. You may request erasure by contacting us. We will assess the request and erase or de-identify data where it is no longer needed and no legal retention ground applies.`,
    ],
  },
  {
    heading: 'Security measures',
    paragraphs: [
      `We use reasonable technical and organizational steps appropriate to the information involved, including HTTPS for data transfer where supported, limiting access to people who need the information, and relying on service providers with their own security controls. No internet transmission or storage method can be guaranteed completely secure.`,
    ],
  },
  {
    heading: 'Your Data Principal rights',
    paragraphs: [
      `Subject to applicable law and verification, you may request information about processing, correction or updating of inaccurate or incomplete data, erasure when retention is no longer required, and grievance redressal. You may also nominate another person to exercise rights in the event of death or incapacity, in accordance with the DPDP Act.`,
      `To make a request, contact ${company.grievanceOfficerEmail}. Please describe the request and the contact details you used so we can locate the relevant information. We may ask for reasonable information to verify your identity before acting.`,
    ],
  },
  {
    heading: 'Duties of Data Principals',
    paragraphs: [
      `Please provide accurate information, do not impersonate another person, and do not submit unlawful or misleading content. You should not make a false or frivolous grievance or suppress material information where the law requires disclosure. Your use of rights remains subject to duties established by applicable law.`,
    ],
  },
  {
    heading: 'Children’s personal data',
    paragraphs: [
      `This website and our services are not directed to children under 18. We do not knowingly process a child’s personal data without verifiable consent from a parent or lawful guardian where required. If you believe a child has submitted information to us, contact ${company.grievanceOfficerEmail} so we can review and take appropriate steps.`,
    ],
  },
  {
    heading: 'Cookies and local storage',
    paragraphs: [
      `Essential local storage remembers your cookie choice and timestamp so the consent banner does not repeatedly appear. Optional preferences or analytics are off unless you make an explicit choice. No analytics script is active by default, and any future analytics integration must be gated on consent before it is loaded.`,
      `You may revisit Cookie Settings at any time from the website footer to review or withdraw optional choices. Clearing browser storage may cause the banner to appear again.`,
    ],
  },
  {
    heading: 'Third-party links',
    paragraphs: [
      `This website may link to services such as WhatsApp, email, or external platforms. When you follow those links, the third party’s privacy notice and terms apply. We do not control external websites or their data practices.`,
    ],
  },
  {
    heading: 'Personal data breach notification',
    paragraphs: [
      `If a personal data breach occurs, we will take appropriate steps to investigate, contain, and address it. We will notify the Data Protection Board of India and affected Data Principals as required by applicable law and the DPDP Rules as notified.`,
    ],
  },
  {
    heading: 'Grievance Officer and escalation',
    paragraphs: [
      `Grievance Officer: ${company.grievanceOfficerName}. Email: ${company.grievanceOfficerEmail}. Response timeline: ${company.grievanceResponseTimeline}. We will acknowledge and address grievances within the timeline required by applicable law or the stated operational timeline, whichever is applicable.`,
      `If your grievance is not resolved, you may approach the Data Protection Board of India through the process available under applicable law.`,
    ],
  },
  {
    heading: 'Policy updates',
    paragraphs: [
      `We may update this notice to reflect changes in the website, our services, or applicable law. The “Last updated” date above identifies the latest revision. Material changes will be shown on this page before they apply to future processing.`,
    ],
  },
  {
    heading: 'Contact details',
    paragraphs: [
      `For privacy questions, consent withdrawal, erasure, correction, or other rights requests, contact RAR Consultant at ${company.email} or call ${company.phoneDisplay}. Registered address: ${company.registeredAddress}, ${company.city}, ${company.state}, India.`,
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Learn how RAR Consultant collects, uses, shares, and protects enquiry information under its privacy and DPDP practices."
        path="/privacy-policy"
      />
      <LegalLayout
        title="Privacy Policy"
        description="This Policy explains the personal data we collect, why we use it, how it is shared, and how you can exercise your rights."
        sections={sections}
      />
    </>
  );
}
