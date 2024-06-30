"use client";

import React from "react";
import Link from "next/link";
import type { Lang } from "@/types/language/lang";

const Page = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const lastUpdated = "June 14, 2024";
  const mail = "hello@trotelcoin.com";

  return (
    <>
      <div className="mx-auto max-w-2xl whitespace-normal break-words text-base leading-7 text-gray-900 dark:text-gray-100">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Privacy Policy
        </h1>
        <span className="text-gray-600 dark:text-gray-400">
          Last updated: {lastUpdated}
        </span>
        <p className="mt-6 font-light">
          This privacy notice for{" "}
          <span className="font-medium">TrotelCoin Labs</span> (&quot;we,&quot;
          &quot;us,&quot; or &quot;our&quot;), describes how and why we might
          collect, store, use, and/or share (&quot;process&quot;) your
          information when you use our services (&quot;Services&quot;), such as
          when you:
        </p>
        <ul className="mt-4 list-disc pl-6 font-light">
          <li>
            Visit our website at{" "}
            <span className="font-medium">app.trotelcoin.com</span>, or any
            website of ours that links to this privacy notice
          </li>
          <li>
            Engage with us in other related ways, including any sales,
            marketing, or events
          </li>
        </ul>
        <p className="mt-1 font-light">
          Questions or concerns? Reading this privacy notice will help you
          understand your privacy rights and choices. If you do not agree with
          our policies and practices, please do not use our Services. If you
          still have any questions or concerns, please contact us at{" "}
          <Link href={`mailto:${mail}`} target="_blank" className="font-medium">
            {mail}
          </Link>
          .
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          Summary of Key Points
        </h2>
        <p className="mt-6 font-light">
          This summary provides key points from our privacy notice.
        </p>
        <p className="mt-6 font-light">
          <span className="font-medium">
            What personal information do we process?
          </span>{" "}
          When you visit, use, or navigate our Services, we may process personal
          information depending on how you interact with us and the Services,
          the choices you make, and the products and features you use. Learn
          more about personal information you disclose to us.{" "}
        </p>
        <p className="mt-6 font-light">
          <span className="font-medium">
            Do we process any sensitive personal information?
          </span>{" "}
          We do not process sensitive personal information.
        </p>
        <p className="mt-6 font-light">
          <span className="font-medium">
            Do we collect any information from third parties?
          </span>{" "}
          We do not collect any information from third parties.
        </p>
        <p className="mt-6 font-light">
          <span className="font-medium">
            How do we process your information?
          </span>{" "}
          We process your information to provide, improve, and administer our
          Services, communicate with you, for security and fraud prevention, and
          to comply with law. We may also process your information for other
          purposes with your consent. We process your information only when we
          have a valid legal reason to do so. Learn more about how we process
          your information.
        </p>
        <p className="mt-6 font-light">
          <span className="font-medium">
            In what situations and with which types of parties do we share
            personal information?
          </span>{" "}
          We may share information in specific situations and with specific
          categories of third parties. Learn more about when and with whom we
          share your personal information.
        </p>
        <p className="mt-6 font-light">
          <span className="font-medium">
            How do we keep your information safe?
          </span>{" "}
          We have organizational and technical processes and procedures in place
          to protect your personal information. However, no electronic
          transmission over the internet or information storage technology can
          be guaranteed to be 100% secure, so we cannot promise or guarantee
          that hackers, cybercriminals, or other unauthorized third parties will
          not be able to defeat our security and improperly collect, access,
          steal, or modify your information. Learn more about how we keep your
          information safe.
        </p>
        <p className="mt-6 font-light">
          <span className="font-medium">What are your rights?</span> Depending
          on where you are located geographically, the applicable privacy law
          may mean you have certain rights regarding your personal information.
          Learn more about your privacy rights.
        </p>
        <p className="mt-6 font-light">
          <span className="font-medium">How do you exercise your rights?</span>{" "}
          The easiest way to exercise your rights is by submitting a data
          subject access request, or by contacting us. We will consider and act
          upon any request in accordance with applicable data protection laws.
        </p>
        <p className="mt-6 font-light">
          <span className="font-medium">
            Want to learn more about what we do with any information we collect?
          </span>{" "}
          Review the privacy notice in full.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          1. What Information Do We Collect?
        </h2>
        <p className="mt-6 font-light">
          <span className="font-medium">In Short:</span> We collect personal
          information that you provide to us.
        </p>
        <p className="mt-6 font-light">
          We collect personal information that you voluntarily provide to us
          when you register on the Services, express an interest in obtaining
          information about us or our products and Services, when you
          participate in activities on the Services, or otherwise when you
          contact us.
        </p>
        <p className="mt-6 font-light">
          The personal information that we collect depends on the context of
          your interactions with us and the Services, the choices you make, and
          the products and features you use. The personal information we collect
          may include the following: email addresses and wallet addresses.
        </p>
        <p className="mt-6 font-light">
          We do not process sensitive information.
        </p>
        <p className="mt-6 font-light">
          We may collect data necessary to process your payment if you choose to
          make purchases, such as your payment instrument number, and the
          security code associated with your payment instrument. All payment
          data is handled and stored by Flooz, BIM Exchange and You may find
          their privacy notice link(s) here:{" "}
          <Link
            href={`https://flooz.xyz/privacy-policy`}
            target="_blank"
            className="text-blue-500 hover:text-blue-400 dark:text-blue-300 dark:hover:text-blue-400"
          >
            https://flooz.xyz/privacy-policy
          </Link>
          ,{" "}
          <Link
            href={`https://exchange.bim.finance/en/privacyPolicy`}
            target="_blank"
            className="text-blue-500 hover:text-blue-400 dark:text-blue-300 dark:hover:text-blue-400"
          >
            https://exchange.bim.finance/en/privacyPolicy
          </Link>{" "}
          .{" "}
        </p>
        <p className="mt-6 font-light">
          We may provide you with the option to register with us using your
          existing social media account details, like your Facebook, X, or other
          social media account. If you choose to register in this way,
          WalletConnect will collect the Information described in their privacy
          policy available here:{" "}
          <Link
            href={`https://walletconnect.com/privacy`}
            target="_blank"
            className="text-blue-500 hover:text-blue-400 dark:text-blue-300 dark:hover:text-blue-400"
          >
            https://walletconnect.com/privacy
          </Link>
          .
        </p>
        <p className="mt-6 font-light">
          <span className="font-medium">In Short:</span> Some information such
          as your Internet Protocol (IP) address and/or browser and device
          characteristics is collected automatically when you visit our
          Services.
        </p>
        <p className="mt-6 font-light">
          We automatically collect certain information when you visit, use, or
          navigate the Services. This information does not reveal your specific
          identity (like your name or contact information) but may include
          device and usage information, such as your IP address, browser and
          device characteristics, operating system, language preferences,
          referring URLs, device name, country, location, information about how
          and when you use our Services, and other technical information. This
          information is primarily needed to maintain the security and operation
          of our Services, and for our internal analytics and reporting
          purposes. Like many businesses, we also collect information through
          cookies and similar technologies.
        </p>
        <p className="mt-6 font-light">
          <span className="font-medium">Log and Usage Data.</span> Log and usage
          data is service-related, diagnostic, usage, and performance
          information our servers automatically collect when you access or use
          our Services and which we record in log files. Depending on how you
          interact with us, this log data may include your IP address, device
          information, browser type, and settings and information about your
          activity in the Services (such as the date/time stamps associated with
          your usage, pages and files viewed, searches, and other actions you
          take such as which features you use), device event information (such
          as system activity, error reports (sometimes called &quot;crash
          dumps&quot;), and hardware settings).
        </p>
        <p className="mt-6 font-light">
          <span className="font-medium">Device Data.</span> We collect device
          data such as information about your computer, phone, tablet, or other
          device you use to access the Services. Depending on the device used,
          this device data may include information such as your IP address (or
          proxy server), device and application identification numbers,
          location, browser type, hardware model, Internet service provider
          and/or mobile carrier, operating system, and system configuration
          information.
        </p>
        <p className="mt-6 font-light">
          <span className="font-medium">Location Data.</span> We collect
          location data such as information about your device&apos;s location,
          which can be either precise or imprecise. How much information we
          collect depends on the type and settings of the device you use to
          access the Services. For example, we may use GPS and other
          technologies to collect geolocation data that tells us your current
          location (based on your IP address). You can opt out of allowing us to
          collect this information either by refusing access to the information
          or by disabling your Location setting on your device. However, if you
          choose to opt out, you may not be able to use certain aspects of the
          Services.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          2. How Do We Process Your Information?
        </h2>
        <p className="mt-6 font-light">
          <span className="font-medium">In Short:</span> We process your
          information to provide, improve, and administer our Services,
          communicate with you, for security and fraud prevention, and to comply
          with law. We may also process your information for other purposes with
          your consent.
        </p>
        <p className="mt-6 font-light">
          We process your personal information for a variety of reasons,
          depending on how you interact with our Services, including:
        </p>
        <ul className="mt-4 list-disc pl-6 font-light">
          <li>
            To facilitate account creation and authentication and otherwise
            manage user accounts. We may process your information so you can
            create and log in to your account, as well as keep your account in
            working order.
          </li>
          <li>
            To save or protect an individual&apos;s vital interest. We may
            process your information when necessary to save or protect an
            individual&apos;s vital interest, such as to prevent harm.
          </li>
        </ul>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          3. What Legal Base Do We Rely On To Process Your Information?
        </h2>
        <p className="mt-6 font-light">
          <span className="font-medium">In Short:</span> We only process your
          personal information when we believe it is necessary and we have a
          valid legal reason (i.e., legal basis) to do so under applicable law,
          like with your consent, to comply with laws, to provide you with
          services to enter into or fulfill our contractual obligations, to
          protect your rights, or to fulfill our legitimate business interests.
        </p>
        <p className="mt-6 font-medium">
          If you are located in the EU or UK, this section applies to you.
        </p>
        <p className="mt-6 font-light">
          The General Data Protection Regulation (GDPR) and UK GDPR require us
          to explain the valid legal bases we rely on in order to process your
          personal information. As such, we may rely on the following legal
          bases to process your personal information:
        </p>
        <p className="mt-6 font-light">
          <span className="font-medium">Consent.</span> We may process your
          information if you have given us permission (i.e., consent) to use
          your personal information for a specific purpose. You can withdraw
          your consent at any time. Learn more about withdrawing your consent.
        </p>
        <p className="mt-6 font-light">
          <span className="font-medium">Legal Obligations.</span> We may process
          your information where we believe it is necessary for compliance with
          our legal obligations, such as to cooperate with a law enforcement
          body or regulatory agency, exercise or defend our legal rights, or
          disclose your information as evidence in litigation in which we are
          involved.
        </p>
        <p className="mt-6 font-light">
          <span className="font-medium">Vital Interests.</span> We may process
          your information where we believe it is necessary to protect your
          vital interests or the vital interests of a third party, such as
          situations involving potential threats to the safety of any person.
        </p>
        <p className="mt-6 font-medium">
          If you are located in Canada, this section applies to you.
        </p>
        <p className="mt-6 font-light">
          We may process your information if you have given us specific
          permission (i.e., express consent) to use your personal information
          for a specific purpose, or in situations where your permission can be
          inferred (i.e., implied consent). You can withdraw your consent at any
          time. In some exceptional cases, we may be legally permitted under
          applicable law to process your information without your consent,
          including, for example:
        </p>
        <ul className="mt-4 list-disc pl-6 font-light">
          <li>
            If collection is clearly in the interests of an individual and
            consent cannot be obtained in a timely way
          </li>
          <li>For investigations and fraud detection and prevention</li>
          <li>For business transactions provided certain conditions are met</li>
          <li>
            If it is contained in a witness statement and the collection is
            necessary to assess, process, or settle an insurance claim
          </li>
          <li>
            For identifying injured, ill, or deceased persons and communicating
            with next of kin
          </li>
          <li>
            If we have reasonable grounds to believe an individual has been, is,
            or may be victim of financial abuse
          </li>
          <li>
            If it is reasonable to expect collection and use with consent would
            compromise the availability or the accuracy of the information and
            the collection is reasonable for purposes related to investigating a
            breach of an agreement or a contravention of the laws of Canada or a
            province
          </li>
          <li>
            If disclosure is required to comply with a subpoena, warrant, court
            order, or rules of the court relating to the production of records
          </li>
          <li>
            If it was produced by an individual in the course of their
            employment, business, or profession and the collection is consistent
            with the purposes for which the information was produced
          </li>
          <li>
            If the collection is solely for journalistic, artistic, or literary
            purposes
          </li>
          <li>
            If the information is publicly available and is specified by the
            regulations
          </li>
        </ul>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          4. When And With Whom Do We Share Your Information?
        </h2>
        <p className="mt-6 font-light">
          <span className="font-medium">In Short:</span> We may share your
          information in specific situations and with specific categories of
          third parties.
        </p>
        <p className="mt-6 font-light">
          <span className="font-medium">
            Vendors, Consultants, and Other Third-Party Service Providers.
          </span>{" "}
          We may share your data with third-party vendors, service providers,
          contractors, or agents (&quot;third parties&quot;) who perform
          services for us or on our behalf and require access to such
          information to do that work. The categories of third parties we may
          share personal information with are as follows: Ad Networks, Data
          Analytics Services, Finance & Accounting Tools and Social Networks.
        </p>
        <p className="mt-6 font-light">
          We also may need to share your personal information in the following
          situations:
        </p>
        <p className="mt-6 font-light">
          <span className="font-medium">Business Transfers.</span> We may share
          or transfer your information in connection with, or during
          negotiations of, any merger, sale of company assets, financing, or
          acquisition of all or a portion of our business to another company.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          5. What Is Our Stance On Third-Party Websites?
        </h2>
        <p className="mt-6 font-light">
          <span className="font-medium">In Short:</span> We are not responsible
          for the safety of any information that you share with third-party
          providers who advertise, but are not affiliated with, our website.
        </p>
        <p className="mt-6 font-light">
          The Services may link to third-party websites, online services, or
          mobile applications and/or contain advertisements from third parties
          that are not affiliated with us and which may link to other websites,
          services, or applications. Accordingly, we do not make any guarantee
          regarding any such third parties, and we will not be liable for any
          loss or damage caused by the use of such third-party websites,
          services, or applications. The inclusion of a link towards a
          third-party website, service, or application does not imply an
          endorsement by us. We cannot guarantee the safety and privacy of data
          you provide to any third parties. Any data collected by third parties
          is not covered by this privacy notice. We are not responsible for the
          content or privacy and security practices and policies of any third
          parties, including other websites, services, or applications that may
          be linked to or from the Services. You should review the policies of
          such third parties and contact them directly to respond to your
          questions.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          6. Do We Use Cookies And Other Tracking Technologies?
        </h2>
        <p className="mt-6 font-light">
          <span className="font-medium">In Short:</span> We may use cookies and
          other tracking technologies to collect and store your information.
        </p>
        <p className="mt-6 font-light">
          We may use cookies and similar tracking technologies (like web beacons
          and pixels) to gather information when you interact with our Services.
          Some online tracking technologies help us maintain the security of our
          Services and your account, prevent crashes, fix bugs, save your
          preferences, and assist with basic site functions.
        </p>
        <p className="mt-6 font-light">
          We also permit third parties and service providers to use online
          tracking technologies on our Services for analytics and advertising,
          including to help manage and display advertisements, to tailor
          advertisements to your interests, or to send abandoned shopping cart
          reminders (depending on your communication preferences). The third
          parties and service providers use their technology to provide
          advertising about products and services tailored to your interests
          which may appear either on our Services or on other websites.
        </p>
        <p className="mt-6 font-light">
          Specific information about how we use such technologies and how you
          can refuse certain cookies is set out in our Cookie Notice.
        </p>
        <p className="mt-6 font-light">
          <span className="font-medium">Google Analytics.</span> We may share
          your information with Google Analytics to track and analyze the use of
          the Services. To opt out of being tracked by Google Analytics across
          the Services, visit{" "}
          <Link
            href={`https://tools.google.com/dlpage/gaoptout`}
            target="_blank"
            className="text-blue-500 hover:text-blue-400 dark:text-blue-300 dark:hover:text-blue-400"
          >
            https://tools.google.com/dlpage/gaoptout
          </Link>
          . For more information on the privacy practices of Google, please
          visit the{" "}
          <Link
            href={`https://policies.google.com/privacy`}
            target="_blank"
            className="text-blue-500 hover:text-blue-400 dark:text-blue-300 dark:hover:text-blue-400"
          >
            Google Privacy & Terms
          </Link>{" "}
          page.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          7. How Do We Handle Your Social Logins?
        </h2>
        <p className="mt-6 font-light">
          <span className="font-medium">In Short:</span> If you choose to
          register or log in to our Services using a social media account, we
          may have access to certain information about you.
        </p>
        <p className="mt-6 font-light">
          Our Services offer you the ability to register and log in using your
          third-party social media account details (like your Facebook or X
          logins). Where you choose to do this, we will receive certain profile
          information about you from your social media provider. The profile
          information we receive may vary depending on the social media provider
          concerned, but will often include your name, email address, friends
          list, and profile picture, as well as other information you choose to
          make public on such a social media platform.
        </p>
        <p className="mt-6 font-light">
          We will use the information we receive only for the purposes that are
          described in this privacy notice or that are otherwise made clear to
          you on the relevant Services. Please note that we do not control, and
          are not responsible for, other uses of your personal information by
          your third-party social media provider. We recommend that you review
          their privacy notice to understand how they collect, use, and share
          your personal information, and how you can set your privacy
          preferences on their sites and apps.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          8. How Long Do We Keep Your Information?
        </h2>
        <p className="mt-6 font-light">
          <span className="font-medium">In Short:</span> We keep your
          information for as long as necessary to fulfill the purposes outlined
          in this privacy notice unless otherwise required by law.
        </p>
        <p className="mt-6 font-light">
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this privacy notice, unless a
          longer retention period is required or permitted by law (such as tax,
          accounting, or other legal requirements). No purpose in this notice
          will require us keeping your personal information for longer than six
          (6) months past the termination of the user&apos;s account.
        </p>
        <p className="mt-6 font-light">
          When we have no ongoing legitimate business need to process your
          personal information, we will either delete or anonymize such
          information, or, if this is not possible (for example, because your
          personal information has been stored in backup archives), then we will
          securely store your personal information and isolate it from any
          further processing until deletion is possible.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          9. How Do We Keep Your Information Safe?
        </h2>
        <p className="mt-6 font-light">
          <span className="font-medium">In Short:</span> We aim to protect your
          personal information through a system of organizational and technical
          security measures.
        </p>
        <p className="mt-6 font-light">
          We have implemented appropriate and reasonable technical and
          organizational security measures designed to protect the security of
          any personal information we process. However, despite our safeguards
          and efforts to secure your information, no electronic transmission
          over the Internet or information storage technology can be guaranteed
          to be 100% secure, so we cannot promise or guarantee that hackers,
          cybercriminals, or other unauthorized third parties will not be able
          to defeat our security and improperly collect, access, steal, or
          modify your information. Although we will do our best to protect your
          personal information, transmission of personal information to and from
          our Services is at your own risk. You should only access the Services
          within a secure environment.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          10. Do We Collect Information From Minors?
        </h2>
        <p className="mt-6 font-light">
          <span className="font-medium">In Short:</span> We do not knowingly
          collect data from or market to children under 18 years of age.
        </p>
        <p className="mt-6 font-light">
          We do not knowingly collect, solicit data from, or market to children
          under 18 years of age, nor do we knowingly sell such personal
          information. By using the Services, you represent that you are at
          least 18 or that you are the parent or guardian of such a minor and
          consent to such minor dependent&apos;s use of the Services. If we
          learn that personal information from users less than 18 years of age
          has been collected, we will deactivate the account and take reasonable
          measures to promptly delete such data from our records. If you become
          aware of any data we may have collected from children under age 18,
          please contact us at{" "}
          <Link
            href={`mailto:${mail}`}
            target="_blank"
            className="text-blue-500 hover:text-blue-400 dark:text-blue-300 dark:hover:text-blue-400"
          >
            {mail}
          </Link>
          .
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          11. What Are Your Privacy Rights?
        </h2>
        <p className="mt-6 font-light">
          <span className="font-medium">In Short:</span> Depending on your state
          of residence in the US or in some regions, such as the European
          Economic Area (EEA), United Kingdom (UK), Switzerland, and Canada, you
          have rights that allow you greater access to and control over your
          personal information. You may review, change, or terminate your
          account at any time, depending on your country, province, or state of
          residence.
        </p>
        <p className="mt-6 font-light">
          In some regions (like the EEA, UK, Switzerland, and Canada), you have
          certain rights under applicable data protection laws. These may
          include the right (i) to request access and obtain a copy of your
          personal information, (ii) to request rectification or erasure; (iii)
          to restrict the processing of your personal information; (iv) if
          applicable, to data portability; and (v) not to be subject to
          automated decision-making. In certain circumstances, you may also have
          the right to object to the processing of your personal information.
          You can make such a request by contacting us by using the contact
          details provided in the section &quot;HOW CAN YOU CONTACT US ABOUT
          THIS NOTICE?&quot; below.
        </p>
        <p className="mt-6 font-light">
          We will consider and act upon any request in accordance with
          applicable data protection laws.
        </p>
        <p className="mt-6 font-light">
          If you are located in the EEA or UK and you believe we are unlawfully
          processing your personal information, you also have the right to
          complain to your{" "}
          <Link
            href={`https://ec.europa.eu/newsroom/article29/items/612080`}
            target="_blank"
            className="text-blue-500 hover:text-blue-400 dark:text-blue-300 dark:hover:text-blue-400"
          >
            Member State data protection authority
          </Link>
          or{" "}
          <Link
            href={`https://ico.org.uk/make-a-complaint/data-protection-complaints/data-protection-complaints/`}
            target="_blank"
            className="text-blue-500 hover:text-blue-400 dark:text-blue-300 dark:hover:text-blue-400"
          >
            UK data protection authority
          </Link>
          .
        </p>
        <p className="mt-6 font-light">
          If you are located in Switzerland, you may contact the
          <Link
            href={`https://www.edoeb.admin.ch/edoeb/en/home.html`}
            target="_blank"
            className="text-blue-500 hover:text-blue-400 dark:text-blue-300 dark:hover:text-blue-400"
          >
            Swiss Federal Data Protection and Information Commissioner
          </Link>
          .
        </p>
        <p className="mt-6 font-light">
          <span className="font-medium underline">
            Withdrawing your consent:
          </span>{" "}
          If we are relying on your consent to process your personal
          information, which may be express and/or implied consent depending on
          the applicable law, you have the right to withdraw your consent at any
          time. You can withdraw your consent at any time by contacting us by
          using the contact details provided in the section &quot;HOW CAN YOU
          CONTACT US ABOUT THIS NOTICE?&quot; below.
        </p>
        <p className="mt-6 font-light">
          However, please note that this will not affect the lawfulness of the
          processing before its withdrawal nor, when applicable law allows, will
          it affect the processing of your personal information conducted in
          reliance on lawful processing grounds other than consent.
        </p>
        <p className="mt-6 font-light">
          <span className="font-medium">Account Information:</span> If you would
          at any time like to review or change the information in your account
          or terminate your account, you can:
        </p>
        <ul className="mt-4 list-disc pl-6 font-light">
          <li>Log in to your account settings and update your user account.</li>
          <li>Contact us using the contact information provided.</li>
        </ul>
        <p className="mt-6 font-light">
          Upon your request to terminate your account, we will deactivate or
          delete your account and information from our active databases.
          However, we may retain some information in our files to prevent fraud,
          troubleshoot problems, assist with any investigations, enforce our
          Terms of Use and/or comply with legal requirements.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          12. Controls For Do-Not-Track Features
        </h2>
        <p className="mt-6 font-light">
          Most web browsers and some mobile operating systems and mobile
          applications include a Do-Not-Track (&quot;DNT&quot;) feature or
          setting you can activate to signal your privacy preference not to have
          data about your online browsing activities monitored and collected. At
          this stage, no uniform technology standard for recognizing and
          implementing DNT signals has been finalized. As such, we do not
          currently respond to DNT browser signals or any other mechanism that
          automatically communicates your choice not to be tracked online. If a
          standard for online tracking is adopted that we must follow in the
          future, we will inform you about that practice in a revised version of
          this privacy notice.
        </p>
        <p className="mt-6 font-light">
          California law requires us to let you know how we respond to web
          browser DNT signals. Because there currently is not an industry or
          legal standard for recognizing or honoring DNT signals, we do not
          respond to them at this time.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          13. Do We Make Updates To This Notice?
        </h2>
        <p className="mt-6 font-light">
          <span className="font-medium">In Short:</span> Yes, we will update
          this notice as necessary to stay compliant with relevant laws.
        </p>
        <p className="mt-6 font-light">
          We may update this privacy notice from time to time. The updated
          version will be indicated by an updated &quot;Revised&quot; date and
          the updated version will be effective as soon as it is accessible. If
          we make material changes to this privacy notice, we may notify you
          either by prominently posting a notice of such changes or by directly
          sending you a notification. We encourage you to review this privacy
          notice frequently to be informed of how we are protecting your
          information.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          14. How Can You Contact Us About This Notice?
        </h2>
        <p className="mt-6 font-light">
          If you have questions or comments about this notice, you may email us
          at{" "}
          <Link
            href={`mailto:${mail}`}
            target="_blank"
            className="text-blue-500 hover:text-blue-400 dark:text-blue-300 dark:hover:text-blue-400"
          >
            {mail}
          </Link>
          .
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          15. How Can You Review, Update, Or Delete The Data We Collect From
          You?
        </h2>
        <p className="mt-6 font-light">
          Based on the applicable laws of your country or state of residence in
          the US, you may have the right to request access to the personal
          information we collect from you, details about how we have processed
          it, correct inaccuracies, or delete your personal information. You may
          also have the right to withdraw your consent to our processing of your
          personal information. These rights may be limited in some
          circumstances by applicable law. To request to review, update, or
          delete your personal information, please fill out and submit a{" "}
          <Link
            href={`https://app.termly.io/notify/78988631-d417-4d30-b74e-49335f0aa3c2`}
            target="_blank"
            className="text-blue-500 hover:text-blue-400 dark:text-blue-300 dark:hover:text-blue-400"
          >
            data subject asset request
          </Link>
          .
        </p>
      </div>
    </>
  );
};

export default Page;
