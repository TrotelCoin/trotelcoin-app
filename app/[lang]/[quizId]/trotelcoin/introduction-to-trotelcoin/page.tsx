"use client";

import React from "react";
import { Lang } from "@/types/types";
import Link from "next/link";
import Image from "next/image";

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        {lang == "en" ? <>Introduction</> : <>Introduction</>}
      </h1>
      <p className="mt-6 font-light">
        {lang == "en" ? (
          <>
            Greetings and welcome to the initial course offered by TrotelCoin.
            Here, you will embark on a journey to gain knowledge about crypto,
            Web3, DeFi, blockchain, and more.
            <br />
            <br />
            Perhaps these concepts have crossed your path before, and you found
            them a bit puzzling. However, if you're here, it means you're
            prepared and eager to learn.
            <br />
            <br />
            As a starting point, let me clarify why understanding Web3 is
            immensely significant and why deeping into it now is worthwhile.
          </>
        ) : (
          <>
            Bonjour et bienvenue dans ce premier cours sur TrotelCoin. Ici, vous
            allez vous embarquer dans un voyage pour acquérir des connaissances
            sur les crypto, Web3, DeFi, blockchain, et plus encore.
            <br />
            <br />
            Peut-être que ces concepts ont déjà croisé votre chemin et que vous
            les avez trouvés un peu déroutants. Cependant, si vous êtes ici,
            cela signifie que vous êtes prêt et désireux d'apprendre.
            <br />
            <br />
            Pour commencer, permettez-moi de préciser pourquoi il est
            extrêmement important de comprendre le Web3 et pourquoi il vaut la
            peine de s'y mettre dès maintenant.
          </>
        )}
      </p>
      <figure className="mt-10 border-l border-yellow-500 dark:border-yellow-300 pl-9">
        <blockquote className="text-gray-900 dark:text-gray-100">
          <p className="font-light">
            {lang == "en" ? (
              <>
                The root problem with conventional currency is all the trust
                that's required to make it work. The central bank must be
                trusted not to debase the currency, but the history of fiat
                currencies is full of breaches of that trust. Banks must be
                trusted to hold our money and transfer it electronically, but
                they lend it out in waves of credit bubbles with barely a
                fraction in reserve. We have to trust them with our privacy,
                trust them not to let identity thieves drain our accounts. Their
                massive overhead costs make micropayments impossible.
              </>
            ) : (
              <>
                Le problème fondamental de la monnaie conventionnelle est toute
                la confiance qui est nécessaire pour qu'elle fonctionne. Il faut
                faire confiance à la banque centrale pour qu'elle ne dévalorise
                pas la monnaie, mais l'histoire des monnaies fiduciaires est
                pleine d'abus de confiance. Il faut faire confiance aux banques
                pour détenir notre argent et le transférer électroniquement mais
                elles le prêtent dans des vagues de de crédit, avec à peine une
                fraction en réserve. Nous devons leur faire confiance de notre
                vie privée, de ne pas laisser les usurpateurs d'identité vider
                nos comptes. Leurs frais généraux considérables rendent les
                micropaiements impossible.
              </>
            )}
          </p>
        </blockquote>
        <figcaption className="mt-6 flex gap-x-4">
          <div className="text-sm leading-6">
            <strong className="font-semibold text-gray-900 dark:text-gray-100">
              Satoshi Nakamoto
            </strong>{" "}
            &ndash;{" "}
            <span className="font-light">
              {lang == "en" ? (
                <>Founder of Bitcoin</>
              ) : (
                <>Fondateur de Bitcoin</>
              )}
            </span>
          </div>
        </figcaption>
      </figure>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang == "en" ? (
            <>Why should you learn about crypto now?</>
          ) : (
            <>Pourquoi devriez-vous apprendre la crypto maintenant ?</>
          )}
        </h1>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              Blockchain is a technology with the potential to bring about a
              revolution in various aspects of society.
              <br />
              <br />
              In contrast to companies like GAFA that own and profit from your
              personal data, Web3 empowers you to take control of your own data.
              <br />
              <br />
              The values upheld by blockchain, like transparency and individual
              data ownership, challenge the involvement of intermediaries such
              as central banks and major players in the current economic system.
              <br />
              <br />
              However, taking back control also means taking responsibility for
              how you handle your money and data.
              <br />
              <br />
              That's why we're here to provide you with education, ensuring you
              can navigate safely in this new world.
              <br />
              <br />
              With that understanding, let's begin.
            </>
          ) : (
            <>
              La blockchain est une technologie qui a le potentiel de
              révolutionner divers aspects de la société.
              <br />
              <br />
              Contrairement à des entreprises comme les GAFA qui possèdent et
              profitent de vos données personnelles, le Web3 vous permet de
              reprendre le contrôle de vos propres données.
              <br />
              <br />
              Les valeurs défendues par la blockchain, comme la transparence et
              la propriété individuelle des données, remettent en cause
              l'implication d'intermédiaires tels que les banques centrales et
              les grands acteurs du système économique actuel.
              <br />
              <br />
              Cependant, reprendre le contrôle signifie également assumer la
              responsabilité de la manière dont vous gérez votre argent et vos
              données.
              <br />
              <br />
              C'est pourquoi nous sommes là pour vous former afin que vous
              puissiez naviguer en toute sécurité dans ce nouveau monde.
            </>
          )}
        </p>
      </div>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang === "en" ? <>Our mission</> : <>Notre mission</>}
        </h1>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              Our mission is to empower individuals with the knowledge and tools
              to navigate in the world of Web3.
              <br />
              <br />
              We understand that the crypto space can seem mysterious, which is
              why we provide a comprehensive educational platform.
              <br />
              <br />
              Our goal is to simplify complex concepts and offer practical
              examples, allowing individuals to understand deeply what are
              transactions, decentralized finance (DeFi), and more.
              <br />
              <br />
              By democratizing access to the DeFi and fostering a vibrant
              community, TrotelCoin aims to drive widespread adoption of Web3
              technologies.
            </>
          ) : (
            <>
              Notre mission est de donner aux individus les connaissances et les
              outils nécessaires pour naviguer dans le monde du Web3.
              <br />
              <br />
              Nous comprenons que l'espace crypto peut sembler mystérieux, c'est
              pourquoi nous avons crée cette plate-forme éducative complète.
              <br />
              <br />
              Notre objectif est de simplifier les concepts complexes et
              d'offrir des exemples pratiques, permettant aux individus de
              comprendre profondément ce que sont les transactions, la finance
              décentralisée (DeFi), et plus encore.
              <br />
              <br />
              En démocratisant l'accès à la finance décentralisée et en
              encourageant une communauté dynamique, TrotelCoin vise à favoriser
              l'adoption généralisée des technologies Web3.
            </>
          )}
        </p>
      </div>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang === "en" ? <>Our vision</> : <>Notre vision</>}
        </h1>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              Our vision is to create a world where individuals have the
              knowledge to fully understand the potential of Web3.
              <br />
              <br />
              We envision a future where people from everywhere can confidently
              navigate the crypto ecosystem, make informed transactions, and
              actively participate in the decentralized financial revolution.
              <br />
              <br />
              By giving individuals the necessary skills and creating a
              supportive community, TrotelCoin aims to be a catalyst for the
              mass adoption of Web3 technologies.
            </>
          ) : (
            <>
              Notre vision est de créer un monde où les individus ont les
              connaissances nécessaires pour comprendre pleinement le potentiel
              du Web3.
              <br />
              <br />
              Nous envisageons un avenir où les gens de partout peuvent naviguer
              en toute confiance dans l'écosystème crypto, faire des
              transactions éclairées, et participer activement à la révolution
              financière décentralisée.
              <br />
              <br />
              En donnant aux individus les compétences nécessaires et en créant
              une communauté de soutien, TrotelCoin vise à être un catalyseur
              pour l'adoption massive des technologies Web3.
            </>
          )}
        </p>
      </div>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang === "en" ? (
            <>What&apos;s TrotelCoin?</>
          ) : (
            <>Qu'est-ce que TrotelCoin?</>
          )}
        </h1>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              TrotelCoin serves as an educational platform designed for an
              engaging exploration of cryptocurrencies.
              <br />
              <br />
              Through this platform, you'll have access to educational resources
              that aim to provide an understanding of cryptocurrencies and
              blockchain technology.
              <br />
              <br />
              Additionally, interactive quizzes and activities are added to
              facilitate direct interaction with the blockchain, enhancing your
              learning experience.
              <br />
              <br />
              Furthermore, you have the opportunity to earn TrotelCoins as a
              reward for progressing through your learning journey.
              <br />
              <br />
              This serves two purposes: firstly, TrotelCoins act as incentives,
              motivating you to go deeper into these topics, and secondly,
              receiving cryptocurrencies encourages you to learn how to use and
              manipulate them.
            </>
          ) : (
            <>
              TrotelCoin est une plateforme éducative conçue pour une
              exploration attractive des crypto.
              <br />
              <br />
              Grâce à cette plateforme, vous aurez accès à des ressources
              éducatives qui visent à vous faire comprendre ce que sont les
              cryptomonnaies et la technologie blockchain.
              <br />
              <br />
              De plus, des quiz et des activités interactives sont présents pour
              faciliter l'interaction directe avec la blockchain, améliorant
              ainsi votre expérience d'apprentissage.
              <br />
              <br />
              Enfin, vous avez la possibilité de gagner des TrotelCoins en guise
              de récompense pour avoir progressé dans votre parcours
              d'apprentissage.
              <br />
              <br />
              Cela sert deux objectifs : premièrement, les TrotelCoins agissent
              comme des incitations, vous motivant à approfondir ces sujets, et
              deuxièmement, recevoir des crypto-monnaies vous encourage à
              apprendre à les utiliser et à les manipuler.
            </>
          )}
        </p>
      </div>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang === "en" ? <>How to get started?</> : <>Comment se lancer?</>}
        </h1>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              To begin earning TrotelCoins, you'll need a crypto wallet.
              <br />
              <br />
              This is also the tool you use to create an account on the platform
              and enjoy other features like personalized courses, streaks,
              gamification, and more.
              <br />
              <br />
              But don't worry, it's not a must.
              <br />
              <br />
              If you're here just to learn without earning TrotelCoins, feel
              free to explore our free courses.
              <br />
              <br />
              However, if you want the full experience, we recommend checking
              out courses in the "Wallet" category.
              <br />
              <br />
              There, you'll discover what a wallet is, how to use it for website
              sign-ins, and crypto transactions.
              <br />
              <br />
              We decided to register users with a wallet so we don't require
              your data—no need for your email or password.
              <br />
              <br />
              Plus, it's your first challenge in the Web3 world. Best of luck!
            </>
          ) : (
            <>
              Pour commencer à gagner des TrotelCoins, vous aurez besoin d'un
              portefeuille crypto.
              <br />
              <br />
              C'est également l'outil que vous utilisez pour créer un compte sur
              la plateforme et profiter d'autres fonctionnalités telles que les
              cours personnalisés, les séries, la gamification, et plus encore.
              <br />
              <br />
              Mais ne vous inquiétez pas, ce n'est pas indispensable. Si vous
              êtes ici juste pour apprendre sans gagner de TrotelCoins,
              n'hésitez pas à explorer nos cours gratuits.
              <br />
              <br />
              Cependant, si vous souhaitez profiter pleinement de l'expérience,
              nous vous recommandons de consulter les cours de la catégorie
              "Wallet".
              <br />
              <br />
              Vous y découvrirez ce qu'est un portefeuille, comment l'utiliser
              pour se connecter à une application décentralisée et effectuer des
              transactions en crypto.
              <br />
              <br />
              Nous avons décidé d'enregistrer les utilisateurs avec un
              portefeuille afin de ne pas avoir besoin de vos données, ni de
              votre mail ou de votre mot de passe.
              <br />
              <br />
              De plus, c'est votre premier défi dans le monde du Web3. Bonne
              chance !
            </>
          )}
        </p>
      </div>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang === "en" ? <>Tokenomics</> : <>Tokénomique</>}
        </h1>
        <Image
          className="mt-6"
          width={1400}
          height={600}
          src="/assets/courses/1/tokenomics.png"
          alt="tokenomics"
        ></Image>
        <h2 className="mt-6 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          {lang === "en" ? <>Definition</> : <>Définition</>}
        </h2>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              Before we explore the details, let's briefly understand the
              concept of crypto tokenomics.
              <br />
              <br />
              Tokenomics refers to the economic model and system of a
              cryptocurrency.
              <br />
              <br />
              It outlines how the token operates within its ecosystem, including
              aspects like distribution, supply, and utility.
            </>
          ) : (
            <>
              Avant d'explorer les détails, comprenons brièvement le concept de
              tokénomique.
              <br />
              <br />
              La tokenomique fait référence au modèle économique et au système
              d'une crypto-monnaie.
              <br />
              <br />
              Elle décrit le fonctionnement du jeton au sein de son écosystème,
              y compris des aspects tels que la distribution, l'offre et
              l'utilité.
            </>
          )}
        </p>
        <h2 className="mt-6 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          {lang === "en" ? (
            <>TrotelCoin&apos;s token</>
          ) : (
            <>Token de TrotelCoin</>
          )}
        </h2>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              Now, turning our attention back to TrotelCoin &ndash; the project
              have its own token known as TROTEL. You can find this token on the{" "}
              <Link
                href="https://polygonscan.com/token/0x85057d5a8d063f9075ba963101d76352051675e5"
                target="_blank"
                className="text-blue-500 dark:text-blue-300"
              >
                Polygon explorer
              </Link>
              . This token serves as a key to unlock various features on the
              platform.
              <br />
              <br />
              Additionally, TrotelCoin token holders can actively participate in
              the governance of the protocol.
              <br />
              <br />
              Proposals are introduced on{" "}
              <Link
                href="https://vote.trotelcoin.com"
                target="_blank"
                className="text-blue-500 dark:text-blue-300"
              >
                vote.trotelcoin.com
              </Link>
              , providing TrotelCoin holders with the opportunity to vote on
              these proposals.
            </>
          ) : (
            <>
              Pour en revenir à TrotelCoin - le projet a sa propre cryptomonnaie
              appelée TROTEL. Vous pouvez trouver ce jeton sur l'
              <Link
                href="https://polygonscan.com/token/0x85057d5a8d063f9075ba963101d76352051675e5"
                target="_blank"
                className="text-blue-500 dark:text-blue-300"
              >
                explorateur Polygon
              </Link>
              . Ce jeton sert de clé pour débloquer diverses fonctionnalités sur
              la plateforme.
              <br />
              <br />
              De plus, les détenteurs de jetons TrotelCoin peuvent participer
              activement à la gouvernance du protocole. Des propositions sont
              introduites sur{" "}
              <Link
                href="https://vote.trotelcoin.com"
                target="_blank"
                className="text-blue-500 dark:text-blue-300"
              >
                vote.trotelcoin.com
              </Link>
              , offrant aux détenteurs de TrotelCoin la possibilité de voter sur
              ces propositions.
            </>
          )}
        </p>
        <h2 className="mt-6 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          {lang === "en" ? (
            <>Initial distribution</>
          ) : (
            <>Distribution initiale</>
          )}
        </h2>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              Initially, the total supply of TrotelCoin tokens was fixed at
              100,000,000.
              <br />
              <br />
              Half of these tokens are securely stored in the Uniswap liquidity
              pool and the liquidity is locked so even the founder of TrotelCoin
              can&apos;t take them back.
              <br />
              <br />
              Another 5% has been reserved for future airdrops, aiming to
              stimulate engagement and support marketing operations.
              <br />
              <br />
              The remaining portion is reserved for private sales and strategic
              initiatives, playing a crucial role in helping the growth of the
              project.
            </>
          ) : (
            <>
              Initialement, l'offre totale de jetons TrotelCoin était fixée à
              100 000 000.
              <br />
              <br />
              La moitié de ces jetons est stockée en toute sécurité dans la pool
              de liquidité d'Uniswap et la liquidité est verrouillée de sorte
              que même le fondateur de TrotelCoin ne peut pas les reprendre.
              <br />
              <br />
              De plus, 5% des tokens ont été réservés pour de futurs airdrops,
              visant à stimuler l'engagement et à soutenir les opérations de
              marketing.
              <br />
              <br />
              La part restante est réservée aux ventes privées et aux
              initiatives stratégiques, jouant un rôle crucial dans la
              croissance du projet.
            </>
          )}
        </p>
      </div>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang === "en" ? (
            <>Algorithm distribution</>
          ) : (
            <>Algorithme de distribution</>
          )}
        </h1>
        <Image
          src="/assets/courses/1/algorithm-simulation.png"
          width={640}
          height={480}
          alt="algorithm simulation"
          className="mt-6"
        ></Image>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              The distribution of TrotelCoins as rewards follow a specific
              algorithm. Let explain it.
              <br />
              <br />
              There is a special part in the program (called the
              TrotelCoin&apos;s distribution function) that gives the rewards.
              The rewards depend on how many tokens are left daily.
              <br />
              <br />
              The more tokens there are, the more rewards you might get. It's
              like a game where you win prizes. This mechanism is put in place
              to ensure there are no spam since the reward is decreasing.
              <br />
              <br />
              Another program calculates the minimum and maximum rewards you can
              get. It uses percentages (like 10% and 25%) to decide the range of
              rewards.
              <br />
              <br />
              Then, it randomly picks a number within that range to be your
              reward.
            </>
          ) : (
            <>
              La distribution des TrotelCoins en tant que récompenses suit un
              algorithme spécifique. Expliquons-le.
              <br />
              <br />
              Il y a une partie spéciale dans le programme (appelée fonction de
              distribution des TrotelCoins) qui donne les récompenses. Les
              récompenses dépendent du nombre de jetons restants chaque jour.
              <br />
              <br />
              Plus il y a de jetons, plus vous pouvez obtenir de récompenses.
              C'est comme un jeu où l'on gagne des prix. Ce mécanisme est mis en
              place pour éviter les spams, car les récompenses sont dégressives.
              <br />
              <br />
              Un autre programme calcule les récompenses minimales et maximales
              que vous pouvez obtenir. Il utilise des pourcentages (comme 10 %
              et 25 %) pour déterminer la fourchette des récompenses.
              <br />
              <br />
              Ensuite, il choisit au hasard un nombre dans cette fourchette
              comme récompense.
            </>
          )}
        </p>
      </div>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang === "en" ? <>Notion of liquidity</> : <>Notion de liquidité</>}
        </h1>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              To help the TrotelCoin community, you can add an equal value of
              MATIC and TROTEL tokens to the Uniswap liquidity pool. You&apos;ll
              be able to learn more about a liquidity pool in another course.
              <br />
              <br />
              But to make it simple, this action makes it easier for users to
              trade TROTEL smoothly while keeping things stable.
              <br />
              <br />
              When you join the liquidity pool, you not only support the
              ecosystem but also get a chance to earn commissions from
              transactions on Uniswap using TrotelCoin.
              <br />
              <br />
              Uniswap sets a fixed default fee that you benefit from. The fees
              from our liquidity pool is used for the platform development and
              marketing. This ensures the project's growth and success in the
              long run.
              <br />
              <br />
              Contributing to the pool not only benefits you by providing
              liquidity and stability but also plays a role in the ongoing
              growth and sustainability of the project.
              <br />
              <br />
              Additionally, we've decided to burn some tokens as part of our
              strategy to maintain the current token supply, preventing
              potential disruptions in the ecosystem caused by new token
              minting.
              <br />
              <br />
              This strategy helps keep the token's value stable, ensuring a
              dependable experience for our community while maintaining the
              intended distribution and utility of the tokens.
            </>
          ) : (
            <>
              Pour aider la communauté TrotelCoin, vous pouvez ajouter une
              valeur égale de jetons MATIC et TROTEL au pool de liquidité
              Uniswap. Vous pourrez en apprendre plus sur les pools de liquidité
              dans un autre cours.
              <br />
              <br />
              Mais pour simplifier, cette action permet aux utilisateurs
              d'échanger plus facilement des TROTEL tout en maintenant la
              stabilité.
              <br />
              <br />
              En rejoignant la pool de liquidité, vous soutenez non seulement
              l'écosystème, mais vous avez également la possibilité de gagner
              des commissions sur les transactions effectuées sur Uniswap avec
              TrotelCoin.
              <br />
              <br />
              Uniswap fixe une commission par défaut dont vous bénéficiez. Les
              frais de notre pool de liquidité sont utilisés pour le
              développement et le marketing de la plateforme et sont fixés à 1%.
              Cela permet de garantir la croissance et le succès du projet à
              long terme.
              <br />
              <br />
              Contribuer au pool ne vous apporte pas seulement de la liquidité
              et de la stabilité, mais joue également un rôle dans la croissance
              et la durabilité du projet.
              <br />
              <br />
              En outre, nous avons décidé de brûler certains tokens dans le
              cadre de notre stratégie visant à maintenir l'offre actuelle de
              tokens, en évitant les perturbations potentielles dans
              l'écosystème causées par la frappe de nouveaux tokens.
              <br />
              <br />
              Cette stratégie permet de maintenir la valeur des jetons stable et
              d'assurer une expérience fiable à notre communauté tout en
              maintenant la distribution et l'utilité prévues des jetons.
            </>
          )}
        </p>
      </div>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang === "en" ? (
            <>Preventing frauds and bots</>
          ) : (
            <>Prévenir les fraudes et les bots</>
          )}
        </h1>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              Please remember, you can only do the quiz once.
              <br />
              <br />
              We're putting in a captcha before each quiz to stop any spam from
              bots.
              <br />
              <br />
              These rules show how we're committed to being fair and honest,
              making sure the quiz is open and fair for everyone.
              <br />
              <br />
              Also, our system is set up to make it less rewarding for spammers,
              so they're not encouraged to respond to the quizzes when many
              people are doing them.
              <br />
              <br />
              In the future, we&apos;ll make this system even more secure.
            </>
          ) : (
            <>
              N'oubliez pas que vous ne pouvez faire le quiz qu'une seule fois.
              <br />
              <br />
              Nous avons mis en place un captcha avant chaque quiz afin
              d'empêcher les bots d'envoyer des requêtes de façon abusive.
              <br />
              <br />
              Ces règles montrent que nous nous engageons à être justes et
              honnêtes, en veillant à ce que le quiz soit ouvert et équitable
              pour tout le monde.
              <br />
              <br />
              En outre, notre système est conçu de manière à ne pas récompenser
              les spammeurs, qui ne sont donc pas encouragés à répondre aux quiz
              lorsque de nombreuses personnes s'y adonnent.
              <br />
              <br />À l'avenir, nous rendrons ce système encore plus sûr.
            </>
          )}
        </p>
      </div>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang === "en" ? <>Token utility</> : <>Utilité du token</>}
        </h1>
        <h2 className="mt-6 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          {lang === "en" ? <>Ranks with NFTs</> : <>Rangs avec les NFTs</>}
        </h2>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              When you have TrotelCoins, you can access more courses and cool
              stuff. Right now, there are two levels: Intermediate and Expert.
              <br />
              <br />
              These levels give you access to advanced courses, extra features,
              and some experimental things.
            </>
          ) : (
            <>
              Lorsque vous avez des TrotelCoins, vous pouvez accéder à plus de
              cours et de fonctionnalités sympas. Pour l'instant, il y a deux
              niveaux : Intermédiaire et Expert.
              <br />
              <br />
              Ces niveaux vous donnent accès à des cours avancés, à des
              fonctionnalités supplémentaires et à certaines choses
              expérimentales.
            </>
          )}
        </p>
        <h2 className="mt-6 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          {lang === "en" ? (
            <>Taking part in governance</>
          ) : (
            <>Prendre part à la gouvernance</>
          )}
        </h2>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              If you own TrotelCoin, you can join in and help make decisions
              about how the platform works.
              <br />
              <br />
              You can vote on ideas to change how things are done or make the
              user experience better.
              <br />
              <br />
              Also, having a certain amount of TrotelCoin lets you suggest your
              own ideas.
            </>
          ) : (
            <>
              Si vous possédez des TrotelCoins, vous pouvez participer et aider
              à prendre des décisions sur le fonctionnement de la plateforme.
              <br />
              <br />
              Vous pouvez voter sur des idées pour changer la façon dont les
              choses sont faites ou pour améliorer l'expérience de
              l'utilisateur.
              <br />
              <br />
              De plus, si vous possédez un certain montant de TrotelCoin, vous
              pouvez suggérer vos propres idées.
            </>
          )}
        </p>
        <h2 className="mt-6 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          {lang === "en" ? <>Helping Businesses</> : <>Aider les entreprises</>}
        </h2>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              The token is made to protect everyone in the community. On the
              platform, we'll feature sponsored courses, but we'll make sure
              they're high quality. This gives businesses a chance to show off
              what they're doing and bring in users.
              <br />
              <br />
              And when businesses want to be on the platform, they use
              TrotelCoin as the way to pay for it.
            </>
          ) : (
            <>
              Le jeton est conçu pour protéger tous les membres de la
              communauté.
              <br />
              <br />
              Sur la plateforme, nous proposerons des cours sponsorisés, mais
              nous veillerons à ce qu'ils soient de grande qualité. Cela permet
              aux entreprises de montrer ce qu'elles font et d'attirer des
              utilisateurs.
              <br />
              <br />
              Et lorsque les entreprises veulent être présentes sur la
              plateforme, elles utilisent TrotelCoin comme moyen de paiement.
            </>
          )}
        </p>
      </div>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang === "en" ? <>Conclusion</> : <>Conclusion</>}
        </h1>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              In conclusion, TrotelCoin aims to change how people learn about
              cryptocurrencies, helping them feel safe in this new world.
              <br />
              <br />
              Our Web3 platform offers users fun ways to learn, earn, and
              connect with others in a friendly environment that supports
              learning and teamwork.
              <br />
              <br />
              Lastly, there's a quiz below to check what you've learned.
              Answering the quiz will get you TrotelCoins as a reward.
              <br />
              <br />
              Wishing you the best of luck in your learning adventure with
              TrotelCoin!
            </>
          ) : (
            <>
              En conclusion, TrotelCoin vise à changer la façon dont les gens
              apprennent les crypto, en les aidant à se sentir en sécurité dans
              ce nouveau monde.
              <br />
              <br />
              Notre plateforme Web3 offre aux utilisateurs des moyens amusants
              d'apprendre, de gagner de l'argent et de se connecter avec
              d'autres dans un environnement convivial qui favorise
              l'apprentissage et le travail d'équipe.
              <br />
              <br />
              Enfin, vous trouverez ci-dessous un quiz qui vous permettra de
              vérifier ce que vous avez appris. En répondant au quiz, vous
              obtiendrez des TrotelCoins en guise de récompense.
              <br />
              <br />
              Nous vous souhaitons bonne chance dans votre aventure
              d'apprentissage avec TrotelCoin !
            </>
          )}
        </p>
      </div>
    </>
  );
};

export default CoursePage;
