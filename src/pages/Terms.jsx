import SEO from '../components/SEO.jsx';
import LegalLayout from '../components/LegalLayout.jsx';
import { company } from '../config/company.js';

const sections = [
  {
    heading: 'Acceptance of terms',
    paragraphs: [
      `These Terms and Conditions apply to your use of the RAR Consultant website and describe the general basis on which we discuss and provide services. By using the website, you agree to these terms. A signed or accepted project proposal may add or replace terms for that specific engagement.`,
    ],
  },
  {
    heading: 'About RAR Consultant and the services',
    paragraphs: [
      `RAR Consultant is an Indian IT services business. Services may include website development, custom software development, search engine optimization, e-commerce platforms or portals, local business digital setup, and website maintenance. The precise deliverables depend on the written proposal or agreement for the project.`,
    ],
  },
  {
    heading: 'Eligibility',
    paragraphs: [
      `You must be at least 18 years old to enter into a service engagement, or act with the consent and involvement of a parent or legal guardian where permitted by law. You confirm that you have authority to act for any business you represent.`,
    ],
  },
  {
    heading: 'Scope, quotations, and engagement',
    paragraphs: [
      `A website enquiry does not create a client relationship or commit either party to a project. We discuss requirements and may provide a written quotation or proposal. An engagement begins only when the parties accept a written agreement or proposal that sets out scope, deliverables, schedule, fees, responsibilities, and other project-specific conditions. That signed or accepted document governs the actual project if it conflicts with these general terms.`,
    ],
  },
  {
    heading: 'Payment terms and taxes',
    paragraphs: [
      `Fees, payment milestones, due dates, late-payment arrangements, and any applicable GST will be stated in the written proposal or agreement. Placeholder milestones: [Insert agreed advance and milestone schedule]. GST applicability will be determined according to applicable Indian law and the parties’ registration and transaction details. No fixed price is promised on this website.`,
    ],
  },
  {
    heading: 'Client responsibilities',
    paragraphs: [
      `You will supply accurate project information, content, brand assets, access credentials, approvals, and feedback reasonably needed for the work. You will provide feedback within agreed review windows and ensure that materials you provide may lawfully be used for the project. Delays in content, access, payment, or decisions may affect delivery dates and scope.`,
    ],
  },
  {
    heading: 'Intellectual property',
    paragraphs: [
      `Subject to full payment of all amounts due, ownership of project-specific deliverables will transfer as set out in the written agreement. Until payment is complete, the deliverables remain subject to the rights described in that agreement.`,
      `Pre-existing tools, templates, know-how, open-source components, fonts, stock assets, plugins, and other third-party materials remain subject to their original owners’ terms and licenses. Where the agreement permits, RAR Consultant may identify publicly launched work in its portfolio, unless the client has agreed to confidentiality or requested otherwise in writing.`,
    ],
  },
  {
    heading: 'Confidentiality',
    paragraphs: [
      `Each party will use reasonable care to protect non-public information received from the other and use it only for the engagement. This obligation does not cover information that is public without breach, independently developed, already lawfully known, or required to be disclosed by law.`,
    ],
  },
  {
    heading: 'Revisions and change requests',
    paragraphs: [
      `The included review rounds and acceptance process will be stated in the proposal. A request that materially changes agreed scope, functionality, content, or integration may require a revised quote and timeline. We will discuss material changes before proceeding with additional work.`,
    ],
  },
  {
    heading: 'Website maintenance terms and exclusions',
    paragraphs: [
      `Maintenance may include agreed updates, backups, security monitoring, performance tuning, content changes, and uptime support. The selected plan or proposal will define frequency, response expectations, access, and fees. Unless expressly included, maintenance excludes major redesigns, new features, third-party outages, hosting or domain charges, recovery from unauthorized changes, and work outside the agreed scope.`,
    ],
  },
  {
    heading: 'Search engine optimization disclaimer',
    paragraphs: [
      `SEO work may include research, technical improvements, on-page updates, local profile guidance, and reporting. Search engines set their own policies and ranking systems. We do not guarantee specific rankings, traffic, leads, or timing.`,
    ],
  },
  {
    heading: 'E-commerce and payment gateway disclaimer',
    paragraphs: [
      `E-commerce delivery may rely on third-party payment gateways, shipping services, platforms, and plugins. Their availability, approval, fees, security, and terms are controlled by those providers. The client is responsible for its products, pricing, tax treatment, fulfilment, refund rules, consumer disclosures, and regulatory compliance unless a written proposal expressly assigns a specific task to RAR Consultant.`,
    ],
  },
  {
    heading: 'Acceptable use',
    paragraphs: [
      `You must not use the website or any deliverable to violate law, infringe rights, distribute malware, deceive users, interfere with systems, or publish unlawful or harmful content. You are responsible for ensuring that your instructions and supplied materials are lawful.`,
    ],
  },
  {
    heading: 'Third-party services',
    paragraphs: [
      `Projects may integrate hosting, domains, CMS platforms, app stores, APIs, analytics, payment providers, email, or other external services. Those services are subject to third-party terms and may change or become unavailable. Unless expressly stated in an agreement, RAR Consultant does not control and is not responsible for a third party’s independent acts, pricing, or availability.`,
    ],
  },
  {
    heading: 'Warranties and limitation of liability',
    paragraphs: [
      `Services will be provided with reasonable care and skill, subject to the written scope. Except for warranties that cannot be excluded by law or those expressly stated in a project agreement, the website and general information are provided without additional guarantees.`,
      `To the maximum extent permitted by law, neither party is liable for indirect or consequential loss arising from the website or an engagement. Any project-specific liability cap and exclusions will be stated in the written agreement. Nothing in these terms excludes liability that cannot lawfully be excluded.`,
    ],
  },
  {
    heading: 'Indemnification',
    paragraphs: [
      `You are responsible for claims arising from materials or instructions you supply, your unlawful use of a deliverable, or your breach of these terms, except to the extent caused by RAR Consultant’s own breach or unlawful conduct. Any detailed indemnity will be set out in the project agreement.`,
    ],
  },
  {
    heading: 'Termination',
    paragraphs: [
      `Either party may terminate an engagement as described in the written agreement. If no project-specific termination process is included, either party may request termination in writing after discussing an orderly handover. Fees for completed work, committed third-party costs, access return, and transfer of paid deliverables will be handled under the accepted proposal and applicable law.`,
    ],
  },
  {
    heading: 'Refund and cancellation policy',
    paragraphs: [
      `Project cancellation, refunds, deposits, and non-refundable third-party costs will be described in the written proposal or agreement. Placeholder: [Insert cancellation notice period, refund calculation, and treatment of work completed]. No refund promise is made by this general website notice beyond rights required by applicable law.`,
    ],
  },
  {
    heading: 'Force majeure',
    paragraphs: [
      `Neither party is responsible for delay caused by events beyond reasonable control, such as natural disasters, public emergencies, infrastructure failures, labour disruption, or third-party platform outages. The affected party will notify the other and take reasonable steps to reduce the impact. If the event continues, the parties will discuss a fair adjustment or termination under the project agreement.`,
    ],
  },
  {
    heading: 'Governing law and jurisdiction',
    paragraphs: [
      `These terms are governed by the laws of India. Subject to applicable consumer and other mandatory jurisdiction rules, courts at [City], [State], India will have jurisdiction over disputes arising from these terms.`,
    ],
  },
  {
    heading: 'Dispute resolution',
    paragraphs: [
      `The parties will first attempt to resolve a dispute through good-faith discussion. If that does not resolve it, they may consider mediation or arbitration under a written process agreed between them and consistent with applicable Indian law. No arbitration procedure or seat is fixed by this general notice; project-specific terms may define it.`,
    ],
  },
  {
    heading: 'Changes to these terms',
    paragraphs: [
      `We may update these Terms and Conditions from time to time. The updated version will appear on this page with its latest revision date. Continued use of the website after an update means the revised terms apply to website use; an existing project remains governed by its accepted agreement unless both parties agree to a change.`,
    ],
  },
  {
    heading: 'Contact information',
    paragraphs: [
      `For questions about these terms or our services, contact RAR Consultant at ${company.email} or ${company.phoneDisplay}. Registered address: ${company.registeredAddress}, ${company.city}, ${company.state}, India.`,
    ],
  },
];

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms and Conditions"
        description="Review the general terms for using the RAR Consultant website and discussing a service engagement."
        path="/terms-and-conditions"
      />
      <LegalLayout
        title="Terms and Conditions"
        description="These terms explain the general basis for using this site and discussing a project with RAR Consultant. Written proposals govern specific engagements."
        sections={sections}
      />
    </>
  );
}
