"use client";

import React from "react";
import Link from "next/link";
import { Lang } from "@/types/lang";

const Page = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <div className="mx-auto max-w-2xl text-base leading-7 text-gray-900 dark:text-gray-100 whitespace-normal break-words">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-6 font-light">
          These Terms of Service, also known as the "Agreement," clarify the
          terms and conditions for accessing and using{" "}
          <Link
            href={`/${lang}/home`}
            className="text-blue-500 dark:text-blue-300"
          >
            https://app.trotelcoin.com
          </Link>
          . Also, you need to carefully read this Agreement, as it oversees your
          usage of the Website and any connected subdomains of{" "}
          <Link
            href="https://trotelcoin.com"
            target="_blank"
            className="text-blue-500 dark:text-blue-300"
          >
            https://trotelcoin.com
          </Link>
          . When you enter or use the website, it means you have read,
          understood, and agreed to follow all the rules in this Agreement. If
          you don't agree, you can't use the website and should avoid doing so.
        </p>
        <p className="mt-6">
          IMPORTANT: This Agreement includes crucial details, such as a
          mandatory arbitration clause and a waiver of class action, affecting
          your rights in resolving disputes. The Website is accessible to you,
          and you should only enter if you fully agree with these terms.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">Introduction</h2>
        <p className="mt-6 font-light">
          The Website grants access to (a) a decentralized protocol on a public
          blockchain, specifically Polygon PoS. This protocol allows users
          interested in learning to earn rewards in TrotelCoins, the
          cryptocurrency of the TrotelCoin's ecosystem ("the TrotelCoin
          protocol" or the "Protocol"), as well as other services. The Website
          serves as one method, but not the exclusive method, to access the
          Protocol.
        </p>
        <p className="mt-6 font-light">
          To enter the Website, you need to use non-custodial wallet software,
          enabling you to engage with public blockchains. Your connection with
          the non-custodial wallet provider is regulated by the terms of service
          of that third party, not by this Agreement. Wallets are not managed,
          operated, or associated with us, and we do not possess custody or
          control over your wallet's contents, with no capability to recover or
          move its contents. By linking your wallet to our Website, you agree to
          adhere to this Agreement and all the terms mentioned herein by
          reference.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          Modification of this Agreement
        </h2>
        <p className="mt-6 font-light">
          We have the right, on our own judgment, to change this Agreement
          occasionally. If we make significant changes, we will be keeping an
          updated version of the Agreement at{" "}
          <Link
            href={`/${lang}/terms-of-service`}
            className="text-blue-500 dark:text-blue-300"
          >
            https://app.trotelcoin.com/terms-of-service
          </Link>
          . All changes become effective upon posting, and if you continue to
          access or use the Website, it will indicate your acceptance of those
          changes. If you disagree with any modifications to this Agreement, you
          must promptly cease accessing and using the Website.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          Description of Services provided through the Website
        </h2>
        <p className="mt-6 font-light">
          The Website offers a way to access the Protocol through a web or
          mobile platform.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          Website for accessing Protocol
        </h2>
        <p className="mt-6 font-light">
          The Website is separate from the Protocol and acts as one, though not
          the exclusive, way to access it. The Protocol is made up of
          open-source or source-available self-executing smart contracts
          deployed on a public blockchain, specifically Polygon PoS. When
          traders pay fees to receive their rewards, these fees are directed to
          validators who stake $MATIC or $POL tokens to operate the Polygon PoS
          blockchain. The Protocol was originally established on the Polygon PoS
          chain, a blockchain, and there is potential for it to be deployed on
          different blockchain networks in the future.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">Eligibility</h2>
        <p className="mt-6 font-light">
          To use the Website, you need to be capable of entering into a legal
          agreement with us. Therefore, you assert that you have reached the age
          of majority in your jurisdiction (for instance, 18 years old in the
          United States or France) and have the complete right, authority, and
          power to accept and adhere to the terms and conditions of this
          Agreement, both for yourself and any company or legal entity on whose
          behalf you access or use the Website.
        </p>
        <p className="mt-6 font-light">
          You additionally confirm that you are not (a) under economic or trade
          sanctions imposed by any governmental authority or listed as
          prohibited or restricted (including lists maintained by the Office of
          Foreign Assets Control of the U.S. Department of the Treasury), or (b)
          a citizen, resident, or organized in a jurisdiction or territory
          subject to comprehensive country-wide, territory-wide, or regional
          economic sanctions by the United States. Lastly, you assert that your
          use of the Website will fully adhere to all applicable laws and
          regulations, and you will not use the Website for any illegal
          activities or to promote such activities.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          Intellectual Property Rights
        </h2>
        <p className="mt-6 font-light">
          TrotelCoin possesses all the intellectual property and other rights
          related to the Website and its contents, covering elements like
          software, text, images, trademarks, service marks, copyrights,
          patents, designs, and its overall "look and feel." In contrast, the
          Protocol consist entirely of open-source or source-available software
          operating on public blockchains.
        </p>
        <p className="mt-6 font-light">
          By utilizing the Website to list, post, promote, or display NFTs or
          courses, you are granting us a worldwide, non-exclusive,
          sublicensable, royalty-free license to utilize, copy, modify, and
          showcase any content. This content encompasses, but is not limited to,
          text, materials, images, files, communications, comments, feedback,
          suggestions, ideas, concepts, questions, data, or any other materials
          that you post on or through the Website for our present and future
          business purposes. These purposes include providing, promoting, and
          enhancing the services. This license also extends to any digital file,
          art, or other material linked to or associated with any NFTs that are
          displayed.
        </p>
        <p className="mt-6 font-light">
          You declare and assure that you possess, or have acquired, all the
          rights, licenses, consents, permissions, power, and/or authority
          needed to provide the rights specified here for any NFTs or courses
          that you list, post, promote, or display on or through the Website.
          You further assert that such content does not include material subject
          to copyright, trademark, publicity rights, or other intellectual
          property rights, unless you have the required permission or are
          legally entitled to post the material and grant us the license
          mentioned earlier. Additionally, you affirm that the content does not
          breach any laws.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          Additional Rights
        </h2>
        <p className="mt-6 font-light">
          We retain the following rights, which are not considered obligations
          on our part: (a) to modify, substitute, remove, or add to the Website
          with or without notifying you; (b) to review, modify, filter, disable,
          delete, and remove any and all content and information from the
          Website; and (c) to collaborate with any law enforcement, court,
          government investigation, or third party requesting or directing us to
          disclose information or content that you provide.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          Prohibited Activity
        </h2>
        <p className="mt-6 font-light">
          You agree not to engage in, or attempt to engage in, any of the
          following categories of prohibited activity in relation to your access
          and use of the Website:
        </p>
        <ul className="mt-4 list-disc pl-6 font-light">
          <li>
            Intellectual Property Infringement: Activities that violate or
            infringe upon any copyright, trademark, service mark, patent, right
            of publicity, right of privacy, or other proprietary or intellectual
            property rights under the law.
          </li>
          <li>
            Cyberattack: Activities that aim to disrupt or compromise the
            integrity, security, or proper functioning of any computer, server,
            network, personal device, or other information technology system.
            This includes deploying viruses and conducting denial-of-service
            attacks.
          </li>
          <li>
            Fraud and Misrepresentation: Activities intended to defraud us or
            any other person or entity. This includes providing false,
            inaccurate, or misleading information to unlawfully obtain the
            property of another.
          </li>
          <li>
            Market Manipulation: Activities that violate any applicable law,
            rule, or regulation regarding the integrity of trading markets. This
            includes manipulative tactics such as "rug pulls," pumping and
            dumping, and wash trading.
          </li>
          <li>
            Securities and Derivatives Violations: Activities that violate any
            applicable law, rule, or regulation related to the trading of
            securities or derivatives. This includes the unregistered offering
            of securities and offering leveraged and margined commodity products
            to retail customers in the United States.
          </li>
          <li>
            Sale of Stolen Property: Buying, selling, or transferring stolen
            items, fraudulently obtained items, items taken without
            authorization, and/or any other illegally obtained items.
          </li>
          <li>
            Data Mining or Scraping: Activities involving data mining, robots,
            scraping, or similar data gathering or extraction methods of content
            or information from the Website.
          </li>
          <li>
            Objectionable Content. Activity that involves soliciting information
            from anyone under the age of 18 or that is otherwise harmful,
            threatening, abusive, harassing, tortious, excessively violent,
            defamatory, vulgar, obscene, pornographic, libelous, invasive of
            another&apos;s privacy, hateful, discriminatory, or otherwise
            objectionable.
          </li>
          <li>
            Any Other Unlawful Conduct. Activity that violates any applicable
            law, rule, or regulation of the United States or another relevant
            jurisdiction, including (but not limited to) the restrictions and
            regulatory requirements imposed by U.S. law.
          </li>
        </ul>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          Not Registered with the SEC or Any Other Agency
        </h2>
        <p className="mt-6 font-light">
          We are not registered with the U.S. Securities and Exchange Commission
          as a national securities exchange or in any other capacity. You
          understand and acknowledge that we do not handle trading orders on
          your behalf. We also do not assist in the execution or settlement of
          your trades, as these processes take place entirely on public
          distributed blockchains like Polygon PoS.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          Non-Solicitation; No Investment Advice
        </h2>
        <p className="mt-6 font-light">
          You agree and understand that: (a) all trades you submit through the
          Website are considered unsolicited, meaning they are initiated solely
          by you; (b) you have not received any investment advice from us
          regarding any trades; and (c) we do not conduct a suitability review
          of any trades you submit.
        </p>
        <p className="mt-6 font-light">
          We may share details about tokens on the Website obtained from
          third-party data partners. Additionally, we may include warning labels
          for specific tokens. However, the provision of informational materials
          doesn't mean that trades in those tokens are solicited. We are not
          trying to encourage you to make any purchases based on the provided
          information. All information presented on the Website is solely for
          informational purposes and should not be seen as investment advice or
          a suggestion that a particular token is a safe or wise investment. You
          should not take, or refrain from taking, any action based on the
          information contained in the Website. While we provide token
          information for your convenience, we do not offer investment
          recommendations or express opinions on the merits of any transaction
          or opportunity. It is your responsibility to determine whether any
          investment, investment strategy, or related transaction is suitable
          for you, considering your personal investment objectives, financial
          situation, and risk tolerance.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          Non-Custodial and No Fiduciary Duties
        </h2>
        <p className="mt-6 font-light">
          The Website operates as a purely non-custodial application, indicating
          that we never have custody, possession, or control of your digital
          assets at any point. Certainly, referring to pending TrotelCoins means
          that we store the quantity of TrotelCoins associated with your account
          in our database. However, it's crucial to note that these TrotelCoins
          should be considered non-existent as they have not been publicly
          minted on a public blockchain when they are pending. This implies that
          you bear the sole responsibility for safeguarding the cryptographic
          private keys to your digital asset wallets, and you should refrain
          from sharing your wallet credentials or seed phrase with anyone. We
          assume no responsibility or liability in connection with your use of a
          wallet, and we provide no assurances regarding how the Website will
          interact with any specific wallet. Similarly, any actions or omissions
          related to your wallet are solely your responsibility, and we are not
          accountable for any compromises that may occur.
        </p>
        <p className="mt-6 font-light">
          This Agreement is not designed to, and does not, establish or enforce
          any fiduciary duties on our part. To the maximum extent permitted by
          law, you recognize and consent that we are not bound by any fiduciary
          duties or liabilities to you or any other party. If any such duties or
          liabilities exist by law or in equity, you explicitly disclaim, waive,
          and eliminate them. Additionally, you agree that the only duties and
          obligations we owe you are those explicitly stated in this Agreement.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          Compliance and Tax Obligations
        </h2>
        <p className="mt-6 font-light">
          The Website might not be accessible or suitable for use in your
          jurisdiction. By accessing or using the Website, you affirm that you
          are solely and entirely responsible for adhering to all applicable
          laws and regulations that may be relevant to you.
        </p>
        <p className="mt-6 font-light">
          Specifically, your utilization of the Website or the Protocol may lead
          to various tax implications, including income or capital gains tax,
          value-added tax, goods and services tax, or sales tax in specific
          jurisdictions. It is your responsibility to ascertain whether taxes
          are applicable to any transactions you initiate or receive. If taxes
          are applicable, you are responsible for reporting and/or remitting the
          correct tax amount to the appropriate tax authority.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          Assumption of Risk
        </h2>
        <p className="mt-6 font-light">
          By accessing and using the Website, you declare that you possess the
          financial and technical acumen necessary to comprehend the inherent
          risks linked with using cryptographic and blockchain-based systems.
          Furthermore, you assert that you have a practical understanding of the
          usage and complexities of digital assets like matic (MATIC),
          stablecoins, and other digital tokens adhering to the Ethereum Token
          Standard (ERC-20), or standards of any other digital tokens transacted
          on TrotelCoin.
        </p>
        <p className="mt-6 font-light">
          Specifically, you comprehend that the markets for these digital assets
          are in the early stages of development and are exceedingly volatile,
          influenced by various risk factors such as adoption, speculation,
          technology, security, and regulation. You acknowledge the possibility
          that individuals can create tokens, including fraudulent versions of
          existing tokens and tokens falsely asserting representation of
          projects. You also accept the risk that you might unintentionally
          trade such tokens or others. It's important to note that so-called
          stablecoins may not exhibit the stability they claim, might lack full
          or sufficient collateralization, and could be vulnerable to panics and
          runs.
        </p>
        <p className="mt-6 font-light">
          Additionally, you grasp that smart contract transactions execute and
          settle automatically, and once confirmed, blockchain-based
          transactions become irreversible. You recognize and agree that the
          cost and speed associated with transactions on cryptographic and
          blockchain-based systems, like Polygon PoS, are subject to variability
          and could undergo significant increases unexpectedly.
        </p>
        <p className="mt-6 font-light">
          If you engage as a liquidity provider to the Protocol through another
          websites, you comprehend that the value of your digital assets may
          decrease, potentially leading to a partial or complete loss, while
          they are provided to the Protocol. This reduction in value is
          attributed to the fluctuation of token prices within a trading pair or
          liquidity pool.
        </p>
        <p className="mt-6 font-light">
          In conclusion, you recognize that we are not accountable for these
          factors or risks, do not possess or oversee the Protocol, and cannot
          be held responsible for any losses you may incur while accessing or
          using the Website. Consequently, you comprehend and consent to taking
          full responsibility for all the risks associated with accessing and
          using the Website to engage with the Protocol.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          Third-Party Resources and Promotions
        </h2>
        <p className="mt-6 font-light">
          The Website might include references or links to third-party
          resources, such as information, materials, products, or services,
          which we neither own nor control. Additionally, third parties may
          present promotions related to your access and use of the Website. We
          do not endorse, monitor, approve, warrant, or take responsibility for
          any of these resources or promotions. If you decide to access such
          resources or engage in promotions, you do so at your own risk, and
          it's important to note that this Agreement does not govern your
          interactions or relationships with any third parties. You explicitly
          release us from any and all liability arising from your use of such
          resources or participation in promotions.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          Release of Claims
        </h2>
        <p className="mt-6 font-light">
          You agree that you take on all the risks associated with accessing and
          using the Website. Additionally, you explicitly give up any claims or
          demands against us for any harm, legal actions, or damages connected
          to your use of the Website. If you live in California, you also
          relinquish the rights and safeguards provided by California Civil Code
          § 1542, which states: "[a] general release does not extend to claims
          that the creditor or releasing party does not know or suspect to exist
          in his or her favor at the time of executing the release and that, if
          known by him or her, would have materially affected his or her
          settlement with the debtor or released party."
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">Indemnity</h2>
        <p className="mt-6 font-light">
          You agree to protect, exempt, defend, and compensate us, along with
          our officers, directors, employees, contractors, agents, affiliates,
          and subsidiaries, from any and all claims, damages, responsibilities,
          losses, liabilities, costs, and expenses that may arise from: (a) your
          use of the Website; (b) your breach of any term or condition in this
          Agreement, the rights of any third party, or any other relevant law,
          rule, or regulation; and (c) any other individual's use of the Website
          facilitated by you or through any device or account under your
          ownership or control.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          No Warranties
        </h2>
        <p className="mt-6 font-light">
          The Website is provided as it is and as available. To the fullest
          extent allowed by the law, we deny making any promises or guarantees,
          whether explicitly, implicitly, or according to the law, including
          (but not limited to) assurances of quality and suitability for a
          specific purpose. You recognize and agree that your use of the Website
          carries its own risks. We do not assert or guarantee continuous,
          uninterrupted, timely, or secure access to the Website; accuracy,
          reliability, completeness, or currency of the information on the
          Website; or freedom from errors, defects, viruses, or other harmful
          elements on the Website. Any advice, information, or statement we
          provide should not be considered as creating any assurance about the
          Website. We do not support, assure, or take responsibility for any
          advertisements, offers, or statements made by third parties regarding
          the Website.
        </p>
        <p className="mt-6 font-light">
          In a similar manner, the Protocol is provided "AS IS," and you use it
          at your own risk, without any guarantees. Despite our initial code
          contributions to the Protocol, we do not own or control it. The
          Protocol operates independently through smart contracts on various
          blockchains, without any central oversight. Generally, the community
          of TROTEL token holders manages upgrades and modifications to the
          Protocol. No developer or entity involved in creating the Protocol
          will be responsible for any claims or damages related to your use,
          inability to use, or interactions with other Protocol users. This
          includes any direct, indirect, incidental, special, exemplary,
          punitive, or consequential damages, or loss of profits,
          cryptocurrencies, tokens, or any other valuable items. We do not
          support, assure, or take responsibility for any advertisements,
          offers, or statements made by third parties regarding the Protocol.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          Limitation of Liability
        </h2>
        <p className="mt-6 font-light">
          In no circumstance will we or any of our officers, directors,
          employees, contractors, agents, affiliates, or subsidiaries be held
          responsible for any indirect, punitive, incidental, special,
          consequential, or exemplary damages, including (but not limited to)
          damages for the loss of profits, goodwill, use, data, or other
          intangible property, arising from or related to any access or use of
          the interface. Additionally, we will not be held accountable for any
          damage, loss, or injury resulting from hacking, tampering, or
          unauthorized access or use of the interface or the information within
          it. Our liability is disclaimed for: (a) Errors, mistakes, or
          inaccuracies of content. (b) Personal injury or property damage
          resulting from any access or use of the interface. (c) Unauthorized
          access or use of any secure server or database in our control, or the
          use of any information or data stored therein. (d) Interruption or
          cessation of function related to the interface. (e) Bugs, viruses,
          trojan horses, or similar harmful elements that may be transmitted
          through the interface. (f) Errors or omissions in, or loss or damage
          incurred as a result of the use of, any content made available through
          the interface. (g) The defamatory, offensive, or illegal conduct of
          any third party.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          Dispute Resolution
        </h2>
        <p className="mt-6 font-light">
          We will make every effort to settle any possible disagreements through
          informal and sincere discussions. If a disagreement arises, you should
          reach out to us by sending an email to{" "}
          <Link
            href="mailto:hello@trotelcoin.com"
            className="text-blue-500 dark:text-blue-300"
          >
            hello@trotelcoin.com
          </Link>
          , allowing us to try to resolve the matter without turning to formal
          dispute resolution. If an informal resolution is not achieved within
          sixty days of your email, both parties agree to address the potential
          dispute according to the process outlined below.
        </p>
        <p className="mt-6 font-light">
          Any disagreement or issue arising from or related to the Website, this
          Agreement, or any acts or omissions for which you believe we are
          responsible, including (but not limited to) disputes about
          arbitrability ("Dispute"), will be conclusively and exclusively
          resolved through arbitration under the Arbitration Rules of a
          recognized arbitration center in France, such as the International
          Chamber of Commerce (ICC) International Court of Arbitration. You
          acknowledge the obligation to settle all Disputes through binding
          arbitration. The arbitration will be conducted confidentially by a
          single arbitrator, chosen in accordance with the selected arbitration
          center's rules. The arbitration proceedings will take place in France,
          unless both parties agree on a different location. Unless otherwise
          agreed, the arbitrator is not permitted to combine your claims with
          those of any other party. Any judgment based on the arbitrator's
          decision may be entered in any court with jurisdiction.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          Class Action and Jury Trial Waiver
        </h2>
        <p className="mt-6 font-light">
          If you have any disagreements with us, you must address them as an
          individual and not as a participant in any supposed class action,
          collective action, private attorney general action, or other
          representative proceeding. This includes class arbitration. Both you
          and we agree to give up the right to request a trial by jury.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          Governing Law
        </h2>
        <p className="mt-6 font-light">
          You agree that the laws of France, without regard to principles of
          conflict of laws, govern this Agreement and any Dispute between you
          and us. You further agree that the Website shall be deemed to be based
          solely in France, and that although the Website may be available in
          other jurisdictions, its availability does not give rise to general or
          specific personal jurisdiction in any forum outside France. Any
          arbitration conducted pursuant to this Agreement shall be governed by
          the applicable rules of the selected arbitration center in France. You
          agree that the courts of France are the proper forum for any appeals
          of an arbitration award or for court proceedings in the event that
          this Agreement's binding arbitration clause is found to be
          unenforceable.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          Entire Agreement
        </h2>
        <p className="mt-6 font-light">
          These terms make up the complete agreement between you and us
          regarding the subject matter discussed here. This Agreement replaces
          any previous or concurrent written and oral agreements,
          communications, and other understandings (if any) concerning the
          subject matter of these terms.
        </p>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">Gas Fees</h2>
        <p className="mt-6 font-light">
          For blockchain transactions, it is necessary to pay transaction fees
          to the relevant network, known as "Gas Fees." Unless explicitly stated
          otherwise in the terms of another offer by TrotelCoin, you will be
          solely responsible for covering the Gas Fees for any transaction you
          initiate.
        </p>
      </div>
    </>
  );
};

export default Page;
