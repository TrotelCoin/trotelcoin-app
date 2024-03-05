"use client";

import React from "react";
import { Lang } from "@/types/types";
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
            In this course, you will learn what is Bitcoin, what's the
            philosophy behind it and how it works. You will also learn what's
            money and how Bitcoin is different from it. Let's get started !
          </>
        ) : (
          <>
            Dans ce cours, vous apprendrez ce qu'est Bitcoin, quelle est la
            philosophie derrière et comment il fonctionne. Vous apprendrez
            également ce qu'est l'argent et comment Bitcoin est différent de
            cela. Commençons !
          </>
        )}
      </p>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang == "en" ? (
            <>Understanding money and currency</>
          ) : (
            <>Comprendre la monnaie et l'argent</>
          )}
        </h1>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              Let's first have an overview of traditional fiat currencies. What
              is money and how it works. What is the difference between money
              and currency.
              <br />
              <br />
              So first, what is money? Money is a medium of exchange, a unit of
              account, and a store of value. It is a medium of exchange because
              it is widely accepted in exchange for goods and services.
              <br />
              <br />
              It is a unit of account because it is used to measure the value of
              goods and services. It is a store of value because it allows
              people to transfer purchasing power from the present to the
              future.
              <Image
                className="my-4"
                width={1400}
                height={600}
                src="/assets/courses/9/unicorn-exchange.png"
                alt="Unicorn exchange for a car"
              />
              As an analogy, let's imagine that you have a unicorn and you want
              to a buy a car. You can't directly exchange your unicorn for a
              car. You need to first sell your unicorn for money and then use
              that money to buy a car. This is where money comes into play.
              <br />
              <br />
              Now, what is currency? Currency is a system of money in general
              use in a particular country. It is the physical form of money. It
              is the coins and banknotes that are used in a particular country.
              <br />
              <br />
              So, in summary, money is a broader concept that includes currency.
              Currency is a specific type of money that is used in a particular
              country.
            </>
          ) : (
            <>
              Tout d'abord, regardons de plus près les monnaies fiduciaires
              traditionnelles. Qu'est-ce que l'argent et comment cela
              fonctionne. Quelle est la différence entre l'argent et la monnaie.
              <br />
              <br />
              Alors d'abord, qu'est-ce que l'argent? L'argent est un moyen
              d'échange, une unité de compte et une réserve de valeur. C'est un
              moyen d'échange car l'argent est largement accepté en échange de
              biens et de services.
              <br />
              <br />
              C'est une unité de compte car l'argent est utilisé pour mesurer la
              valeur des biens et des services. C'est une réserve de valeur car
              elle permet aux gens de transférer du pouvoir d'achat du présent
              vers le futur.
              <Image
                className="my-4"
                width={1400}
                height={600}
                src="/assets/courses/9/unicorn-exchange.png"
                alt="Unicorn exchange for a car"
              />
              Par analogie, imaginons que vous avez une licorne et que vous
              voulez acheter une voiture. Vous ne pouvez pas échanger
              directement votre licorne contre une voiture directement. Vous
              devez d'abord vendre votre licorne contre de l'argent, puis
              utiliser cet argent pour acheter une voiture. C'est là que
              l'argent entre en jeu.
              <br />
              <br />
              Maintenant, qu'est-ce que la monnaie? La monnaie est un système
              d'argent généralement utilisé dans un pays particulier. C'est la
              forme physique de l'argent. Ce sont les pièces et les billets qui
              sont utilisés dans un pays particulier.
              <br />
              <br />
              En résumé, l'argent est un concept plus large qui inclut la
              monnaie. La monnaie est un type spécifique d'argent qui est
              utilisé dans un pays particulier.
            </>
          )}
        </p>
      </div>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang == "en" ? (
            <>Historical perspective on money</>
          ) : (
            <>Perspective historique sur l'argent</>
          )}
        </h1>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              To begin with, let's have a look at the history of money. Money
              has been around for a long time. It has been used in various forms
              for thousands of years. The first form of money was commodity
              money.
              <br />
              <br />
              Commodity money is a type of money that is made of a valuable
              commodity. It has intrinsic value. It is a physical object that
              has value in itself as well as value in its use as money. For
              example, gold, silver, and salt were used as commodity money.
              <Image
                className="my-4"
                width={1400}
                height={600}
                src="/assets/courses/9/commodities.png"
                alt="Commodity money"
              />
              Then came the representative money. Representative money is a type
              of money that represents something else. It is a claim on a
              commodity. For example, a banknote that can be exchanged for a
              specific amount of gold.
              <br />
              <br />
              Then came the fiat money. Fiat money is a type of money that is
              not backed by a physical commodity. It is backed by the
              government. It has value because the government says it has value.
              For example, the US dollar, the Euro, and the British pound are
              fiat money.
              <br />
              <br />
              Finally, we have the digital money. Digital money is a type of
              money that is only available in digital form. It is not available
              in physical form. For example, Bitcoin is a digital money.
              <br />
              <br />
              The issue with traditional fiat currencies is that they are prone
              to inflation. The government can print as much money as they want
              and this can lead to inflation. This is where Bitcoin comes into
              play. Bitcoin is not controlled by any government. More about this
              later in the course.
            </>
          ) : (
            <>
              Pour commencer, jetons un coup d'œil à l'histoire de l'argent.
              L'argent existe depuis longtemps. Il a été utilisé sous diverses
              formes depuis des milliers d'années. La première forme d'argent
              était les ressources naturelles.
              <br />
              <br />
              Les ressources naturelles sont un type d'argent qui fait d'une
              ressource naturelle précieuse. Elles ont une valeur intrinsèque.
              Ce sont des objets physiques qui ont une valeur en eux-même ainsi
              qu'une valeur dans leur utilisation comme la monnaie. Par exemple,
              l'or, l'argent et le sel ont été utilisés comme ressources
              naturelles.
              <Image
                className="my-4"
                width={1400}
                height={600}
                src="/assets/courses/9/commodities.png"
                alt="Commodity money"
              />
              Puis est venu l'argent représentatif. L'argent représentatif est
              un type d'argent qui représente autre chose. C'est une réclamation
              sur une ressource naturelle. Par exemple, un billet de banque qui
              peut être échangé contre une quantité spécifique d'or.
              <br />
              <br />
              Puis est venu l'argent fiduciaire. L'argent fiduciaire est un type
              d'argent qui n'est pas adossé à une ressource naturelle. Il est
              adossé au gouvernement. Il a de la valeur parce que le
              gouvernement dit qu'il a de la valeur. Par exemple, le dollar
              américain, l'euro et la livre sterling sont des monnaies
              fiduciaires.
              <br />
              <br />
              Enfin, nous avons l'argent numérique. L'argent numérique est un
              type d'argent qui n'est disponible qu'en forme numérique. Il n'est
              pas disponible en forme physique. Par exemple, Bitcoin est un
              argent numérique.
              <br />
              <br />
              Le problème avec les monnaies fiduciaires traditionnelles est
              qu'elles sont sujettes à l'inflation. Le gouvernement peut
              imprimer autant d'argent qu'il le souhaite et cela peut conduire à
              l'inflation. C'est là que Bitcoin entre en jeu. Bitcoin n'est pas
              contrôlé par un gouvernement. On va approfondir ce sujet plus tard
              dans le cours.
            </>
          )}
        </p>
      </div>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang == "en" ? (
            <>How Bitcoin works?</>
          ) : (
            <>Comment fonctionne Bitcoin ?</>
          )}
        </h1>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              We dedicated a course about the history of Bitcoin. Here is a
              brief overview of how Bitcoin works.
              <br />
              <br />
              Bitcoin was created by an unknown person or group of people using
              the name Satoshi Nakamoto. It was released as open-source software
              in 2009.
              <br />
              <br />
              Bitcoin is a decentralized digital currency. It is not controlled
              by any government or financial institution as we've seen it
              before. It is a peer-to-peer network.
              <br />
              <br />
              This means that it is a network of computers that are connected to
              each other. There is no central server that stores all the
              information. The information is stored on all the computers in the
              network.
              <br />
              <br />
              Bitcoin uses a technology called blockchain. A blockchain is a way
              of storing information. It is a chain of blocks that contain
              information. Each block contains a list of transactions.
              <br />
              <br />
              When a new transaction is made, it is added to a block. When the
              block is full, it is added to the blockchain. The blockchain is
              updated every 10 minutes approximately.
              <br />
              <br />
              So why does Bitcoin use blockchain? The main reason is security.
              The blockchain is a secure way of storing information. It is
              secure because it is decentralized. Because, the information is
              stored on all the computers in the network. This makes it
              difficult to hack.
              <br />
              <br />
              Indeed, to hack the blockchain, you would need to hack at least
              the half of the computers in the network at the same time. This is
              almost impossible.
              <br />
              <br />
              Another reason is transparency. The blockchain is a transparent
              way of storing information. It is transparent because all the
              information is stored on all the computers in the network. This
              makes it difficult to cheat.
              <br />
              <br />
              We have a dedicated course about blockchain so you can better
              understand how it works.
            </>
          ) : (
            <>
              Nous avons consacré un cours sur l'histoire de Bitcoin. Voici un
              bref aperçu de son fonctionnement.
              <br />
              <br />
              Bitcoin a été créé par une personne inconnue ou un groupe de
              personnes utilisant le nom de Satoshi Nakamoto. Il a été publié
              comme logiciel open-source en 2009.
              <br />
              <br />
              Bitcoin est une monnaie numérique décentralisée. Elle n'est pas
              contrôlée par un gouvernement ou une institution financière comme
              nous l'avons vu précédemment. C'est un réseau pair à pair.
              <br />
              <br />
              Cela signifie que c'est un réseau d'ordinateurs qui sont connectés
              les uns aux autres. Il n'y a pas de serveur central qui stocke
              toutes les informations. Les informations sont stockées sur tous
              les ordinateurs du réseau.
              <br />
              <br />
              Bitcoin utilise une technologie appelée blockchain. Une blockchain
              est une manière de stocker des informations. C'est une chaîne de
              blocs qui contiennent des informations. Chaque bloc contient une
              liste de transactions.
              <br />
              <br />
              Lorsqu'une nouvelle transaction est effectuée, elle est ajoutée à
              un bloc. Lorsque le bloc est plein, il est ajouté à la blockchain.
              La blockchain est mise à jour toutes les 10 minutes environ.
              <br />
              <br />
              Pourquoi Bitcoin utilise-t-il la blockchain? La principale raison
              est la sécurité. La blockchain est un moyen sécurisé de stocker
              des informations. Elle est sécurisée car elle est décentralisée.
              En effet, les informations sont stockées sur tous les ordinateurs
              du réseau. Cela rend difficile le piratage.
              <br />
              <br />
              En effet, pour pirater la blockchain, vous auriez besoin de
              pirater au moins la moitié des ordinateurs du réseau en même
              temps. C'est presque impossible.
              <br />
              <br />
              Une autre raison est la transparence. La blockchain est un moyen
              transparent de stocker des informations. Elle est transparente car
              toutes les informations sont stockées sur tous les ordinateurs du
              réseau. Cela rend difficile la triche.
              <br />
              <br />
              Nous avons un cours dédié sur la blockchain pour que vous puissiez
              mieux comprendre comment cela fonctionne.
            </>
          )}
        </p>
      </div>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang == "en" ? (
            <>Exploring the role of cryptography in Bitcoin</>
          ) : (
            <>Explorons le rôle de la cryptographie dans Bitcoin</>
          )}
        </h1>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              Cryptocurrencies use cryptography and it explains its name.
              <br />
              <br />
              Cryptography is a method of protecting information and
              communications through the use of codes so that only those for
              whom the information is intended can read and process it. It is a
              way of securing information.
              <br />
              <br />
              Bitcoin uses cryptography to secure its transactions. It uses
              public key cryptography. Public key cryptography is a method of
              securing information using a pair of keys. We also have a
              dedicated course about cryptography since it is a vast topic.
              <Image
                className="my-4"
                width={1400}
                height={600}
                src="/assets/courses/9/encryption.png"
                alt="Cryptography"
              />
              In summary, Bitcoin is a decentralized digital currency that uses
              a technology called blockchain and it uses cryptography to secure
              its transactions.
              <br />
              <br />
              Why is cryptography securing Bitcoin transactions? Let's take an
              example.
              <br />
              <br />
              Imagine that you want to send money to a friend. You create a
              transaction and you sign it with your private key. Your friend can
              verify that the transaction is from you by using your public key.
              <br />
              <br />
              As an example, let's imagine you're using WhatsApp that is using a
              technology called end-to-end encryption. This means that only you
              and the person you're communicating with can read what is sent.
              <br />
              <br />
              This is the same principle with Bitcoin. The transaction is
              encrypted reducing the risks of hacking. However, the transaction
              remains public and can be verified by anyone.
            </>
          ) : (
            <>
              Les cryptomonnaies utilisent la cryptographie et cela explique
              leur nom.
              <br />
              <br />
              La cryptographie est une méthode de protection des informations et
              des communications par l'utilisation de codes afin que seules les
              personnes pour lesquelles les informations sont destinées puissent
              les lire et les traiter. C'est un moyen de sécuriser les
              informations.
              <br />
              <br />
              Bitcoin utilise la cryptographie pour sécuriser ses transactions.
              Ainsi, il utilise la cryptographie à clé publique. La
              cryptographie à clé publique est une méthode de sécurisation des
              informations à l'aide d'une paire de clés. Nous avons également un
              cours dédié sur la cryptographie car c'est un vaste sujet.
              <Image
                className="my-4"
                width={1400}
                height={600}
                src="/assets/courses/9/encryption.png"
                alt="Cryptography"
              />
              En résumé, Bitcoin est une monnaie numérique décentralisée qui
              utilise une technologie appelée blockchain et utilise la
              cryptographie pour sécuriser ses transactions.
              <br />
              <br />
              Pourquoi la cryptographie sécurise-t-elle les transactions
              Bitcoin? Prenons un exemple.
              <br />
              <br />
              Imaginez que vous voulez envoyer de l'argent à un ami. Vous créez
              une transaction et vous la signez avec votre clé privée. Votre ami
              peut vérifier que la transaction vient de vous en utilisant votre
              clé publique.
              <br />
              <br />
              Par exemple, imaginons que vous utilisez WhatsApp qui utilise une
              technologie appelée chiffrement de bout en bout. Cela signifie que
              seules vous et la personne avec laquelle vous communiquez pouvez
              lire ce qui est envoyé.
              <br />
              <br />
              C'est le même principe avec Bitcoin. La transaction est chiffrée
              réduisant ainsi les risques de piratage. Cependant, la transaction
              reste publique et peut être vérifiée par n'importe qui.
            </>
          )}
        </p>
      </div>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang == "en" ? (
            <>Bitcoin mining and network consensus</>
          ) : (
            <>Minage Bitcoin et consensus du réseau</>
          )}
        </h1>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              Next up, let's talk about Bitcoin mining and network consensus.
              <br />
              <br />
              Bitcoin mining is the process of adding transaction records to
              Bitcoin's public ledger of past transactions called the
              blockchain.
              <br />
              <br />
              The role of miners is to secure the network and to process every
              Bitcoin transaction. Miners achieve this by solving a
              computational problem which allows them to chain together blocks
              of transactions.
              <br />
              <br />
              The first miner to solve the problem announces the solution to the
              network and the other miners verify the solution. Once the
              solution is verified, the block is added to the blockchain and the
              miner is rewarded with new Bitcoins.
              <br />
              <br />
              The process of adding new blocks to the blockchain is called
              mining because it is similar to the process of mining for gold or
              other precious metals.
              <br />
              <br />
              The network consensus is the process of agreeing on which
              transactions are valid and which are not. The network consensus is
              achieved through a process called proof-of-work.
              <br />
              <br />
              Proof-of-work is a method of securing a network by requiring
              participants to perform a certain amount of computational work.
              This makes it difficult to attack the network.
              <br />
              <br />
              The network consensus is important because it ensures that all
              participants agree on the state of the network. It prevents
              double-spending and other attacks.
              <br />
              <br />
              We have a dedicated course about Bitcoin mining and network
              consensus so you can better understand how it works.
            </>
          ) : (
            <>
              Ensuite, parlons du minage Bitcoin et du consensus du réseau.
              <br />
              <br />
              Le minage Bitcoin est le processus d'ajout d'enregistrements de
              transactions à la blockchain de Bitcoin.
              <br />
              <br />
              Le rôle des mineurs est de sécuriser le réseau et de traiter
              chaque transaction Bitcoin. Les mineurs y parviennent en résolvant
              un problème computationnel qui leur permet de chaîner des blocs de
              transactions.
              <br />
              <br />
              Le premier mineur à résoudre le problème annonce la solution au
              réseau et les autres mineurs vérifient la solution. Une fois la
              solution vérifiée, le bloc est ajouté à la blockchain et le mineur
              est récompensé par de nouveaux Bitcoins.
              <br />
              <br />
              Le processus d'ajout de nouveaux blocs à la blockchain s'appelle
              le minage car il est similaire au processus d'extraction de l'or
              ou d'autres métaux précieux.
              <br />
              <br />
              Le consensus du réseau est le processus d'accord sur les
              transactions valides et celles qui ne le sont pas. Le consensus du
              réseau est obtenu grâce à un processus appelé preuve de travail.
              <br />
              <br />
              La preuve de travail est une méthode de sécurisation d'un réseau
              en obligeant les participants à effectuer une certaine quantité de
              travail computationnel. Cela rend difficile d'attaquer le réseau.
              <br />
              <br />
              Le consensus du réseau est important car il garantit que tous les
              participants sont d'accord sur l'état du réseau. Cela empêche la
              double-dépense et d'autres attaques.
              <br />
              <br />
              Nous avons un cours dédié sur le minage Bitcoin et le consensus du
              réseau pour que vous puissiez mieux comprendre comment cela
              fonctionne.
            </>
          )}
        </p>
      </div>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang == "en" ? (
            <>Examples to summarize</>
          ) : (
            <>Exemples pour résumer</>
          )}
        </h1>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              Bitcoin is difficult to understand at first. Let's take some
              examples inspired from your daily life to summarize.
              <br />
              <br />
              Imagine that you have a piggy bank. You can put money in it and
              take money out of it. You can also give it to someone else. This
              is similar to Bitcoin. You can send and receive Bitcoins. You can
              also store them and for that you use a wallet.
              <br />
              <br />
              Now, imagine that you have a notebook where you write down all the
              transactions you make. This is similar to the blockchain. The
              blockchain is a public ledger that contains all the transactions
              made with Bitcoin.
              <br />
              <br />
              Finally, imagine that you have a friend who checks your notebook
              to make sure that you're not cheating. This is similar to Bitcoin
              mining and network consensus. Miners secure the network and
              process every Bitcoin transaction.
              <br />
              <br />
              This is a simple way to understand Bitcoin.
            </>
          ) : (
            <>
              Bitcoin est difficile à comprendre au début. Prenons quelques
              exemples inspirés de votre vie quotidienne pour résumer.
              <br />
              <br />
              Imaginez que vous avez une tirelire. Vous pouvez y mettre de
              l'argent et en sortir. Vous pouvez aussi le donner à quelqu'un
              d'autre. C'est similaire à Bitcoin. Vous pouvez envoyer et
              recevoir des Bitcoins. Vous pouvez également les stocker et pour
              cela, vous utilisez un portefeuille.
              <br />
              <br />
              Maintenant, imaginez que vous avez un cahier où vous notez toutes
              les transactions que vous effectuez. C'est similaire à la
              blockchain. La blockchain est un grand livre public qui contient
              toutes les transactions effectuées avec Bitcoin.
              <br />
              <br />
              Enfin, imaginez que vous avez un ami qui vérifie votre cahier pour
              s'assurer que vous ne trichez pas. C'est similaire au minage
              Bitcoin et au consensus du réseau. Les mineurs sécurisent le
              réseau et traitent chaque transaction Bitcoin.
              <br />
              <br />
              C'est une manière simple de comprendre Bitcoin.
            </>
          )}
        </p>
      </div>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang == "en" ? (
            <>Legal and ethical considerations</>
          ) : (
            <>Les considérations légales et éthiques</>
          )}
        </h1>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              There are so much things to say about Bitcoin since it is a vast
              topic. You also need to understand that the protocol is still
              evolving and that it is not perfect. We have other courses to
              cover those topics.
              <br />
              <br />
              In the meantime, you also need to understand the challenges of
              legal and ethical considerations since Bitcoin is not regulated by
              any government.
              <br />
              <br />
              For example, Bitcoin is considered to be often used for illegal
              activities such as money laundering and drug trafficking. This is
              not really true for many reasons. Cash is still the king for
              illegal activities.
              <br />
              <br />
              Indeed, Bitcoin is not anonymous. It is pseudonymous. This means
              that all the transactions are public and can be verified by
              anyone. This makes it difficult to use Bitcoin for illegal
              activities.
              <br />
              <br />
              Recently, the European Union has proposed a new law to regulate
              cryptocurrencies. This is a good thing since it will bring more
              clarity and legal certainty to the market but it also raises
              concerns about privacy.
              <br />
              <br />
              Finally, while Bitcoin is being adopted by more and more
              countries, it is still illegal in some countries. For example,
              Bitcoin is illegal in Algeria, Bolivia, Ecuador, and Nepal. This
              course isn't updated in real-time so you need to check the latest
              news.
              <br />
              <br />
              On the political side, Bitcoin is often seen as a threat to the
              traditional financial system. It is often seen as a threat to the
              US dollar and the Euro. This is not really true since Bitcoin is
              still a small market compared to traditional fiat currencies.
            </>
          ) : (
            <>
              Il y a beaucoup de choses à dire sur Bitcoin car c'est un vaste
              sujet. Vous devez également comprendre que le protocole est en
              constante évolution et qu'il n'est pas parfait. Nous avons
              d'autres cours pour couvrir ces sujets.
              <br />
              <br />
              En attendant, vous devez également comprendre les défis des
              considérations légales et éthiques car Bitcoin n'est pas
              réglementé par un gouvernement.
              <br />
              <br />
              Par exemple, Bitcoin est considéré comme étant souvent utilisé
              pour des activités illégales telles que le blanchiment d'argent et
              le trafic de drogue. Ce n'est pas vraiment vrai pour de nombreuses
              raisons. L'argent liquide est toujours le roi pour les activités
              illégales.
              <br />
              <br />
              En effet, Bitcoin n'est pas anonyme. Il est pseudonyme. Cela
              signifie que toutes les transactions sont publiques et peuvent
              être vérifiées par n'importe qui. Cela rend difficile
              l'utilisation de Bitcoin pour des activités illégales.
              <br />
              <br />
              Récemment, l'Union européenne a proposé une nouvelle loi pour
              réglementer les cryptomonnaies. C'est une bonne chose car cela
              apportera plus de clarté et de certitude juridique au marché, mais
              cela soulève également des préoccupations en matière de
              confidentialité.
              <br />
              <br />
              Enfin, bien que Bitcoin soit adopté par de plus en plus de pays,
              il est toujours illégal dans certains pays. Par exemple, Bitcoin
              est illégal en Algérie, en Bolivie, en Équateur et au Népal. Ce
              cours n'est pas mis à jour en temps réel, vous devez donc vérifier
              les dernières nouvelles.
              <br />
              <br />
              Sur le plan politique, Bitcoin est souvent considéré comme une
              menace pour le système financier traditionnel. Il est souvent
              considéré comme une menace pour le dollar américain et l'euro. Ce
              n'est pas vraiment vrai puisque Bitcoin est encore un petit marché
              par rapport aux monnaies fiduciaires traditionnelles.
            </>
          )}
        </p>
      </div>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang == "en" ? (
            <>Bitcoin comparison with Gold</>
          ) : (
            <>Comparaison de Bitcoin avec l'Or</>
          )}
        </h1>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              Bitcoin is often compared to gold. Let's see why.
              <br />
              <br />
              Gold is a precious metal that has been used as a store of value
              for thousands of years. It has intrinsic value. It is a physical
              object that has value in itself as well as value in its use as
              money.
              <br />
              <br />
              Bitcoin is often called digital gold. It is a decentralized
              digital currency that has been used as a store of value for a
              decade. It is a digital object that has value in itself as well as
              value in its use as money.
              <br />
              <br />
              Both gold and Bitcoin are scarce. There is a limited amount of
              gold and Bitcoin. This makes them valuable. This is different from
              traditional fiat currencies that can be printed as much as the
              government wants.
              <br />
              <br />
              Indeed, Bitcoin has a maximum supply of 21 million Bitcoins. This
              means that there will never be more than 21 million Bitcoins. This
              makes it valuable.
              <br />
              <br />
              Both gold and Bitcoin are durable. They can last for a long time.
              This is different from traditional fiat currencies that can be
              destroyed.
              <br />
              <br />
              Finally, both gold and Bitcoin are divisible. You can divide them
              into smaller units. This is different from traditional fiat
              currencies that have a limited divisibility.
              <br />
              <br />
              In summary, Bitcoin is often compared to gold because they share
              similar characteristics such as scarcity, durability, and
              divisibility.
              <br />
              <br />
              Even the vocabulary is similar. For example, Bitcoin mining is
              similar to gold mining. The process of adding new Bitcoins to the
              network is called mining because it is similar to the process of
              mining for gold or other precious metals.
              <br />
              <br />
              Let's finish this course with the halving. The halving is an event
              that occurs every four years approximately. It is an event that
              reduces the reward for mining new Bitcoins. This makes Bitcoin
              more scarce and valuable.
              <br />
              <br />
              Why is the halving important? The halving is important because it
              ensures that the supply of Bitcoin is limited. This makes Bitcoin
              valuable. Thus, Bitcoin is inflation-resistant. This is different
              from traditional fiat currencies that are prone to inflation.
            </>
          ) : (
            <>
              Bitcoin est souvent comparé à l'or. Voyons pourquoi.
              <br />
              <br />
              L'or est un métal précieux qui a été utilisé comme réserve de
              valeur depuis des milliers d'années. Il a une valeur intrinsèque.
              C'est un objet physique qui a une valeur en lui-même ainsi qu'une
              valeur dans son utilisation comme monnaie.
              <br />
              <br />
              Bitcoin est souvent appelé or numérique. C'est une monnaie
              numérique décentralisée qui a été utilisée comme réserve de valeur
              depuis une décennie. C'est un objet numérique qui a une valeur en
              lui-même ainsi qu'une valeur dans son utilisation comme monnaie.
              <br />
              <br />
              L'or et Bitcoin sont rares. Il y a une quantité limitée d'or et de
              Bitcoin. Cela les rend précieux. C'est différent des monnaies
              fiduciaires traditionnelles qui peuvent être imprimées autant que
              le gouvernement le souhaite.
              <br />
              <br />
              En effet, Bitcoin a une offre maximale de 21 millions de Bitcoins.
              Cela signifie qu'il n'y aura jamais plus de 21 millions de
              Bitcoins. Cela le rend précieux.
              <br />
              <br />
              L'or et Bitcoin sont durables. Ils peuvent durer longtemps. C'est
              différent des monnaies fiduciaires traditionnelles qui peuvent
              être détruites.
              <br />
              <br />
              Enfin, l'or et Bitcoin sont divisibles. Vous pouvez les diviser en
              unités plus petites. C'est différent des monnaies fiduciaires
              traditionnelles qui ont une divisibilité limitée.
              <br />
              <br />
              En résumé, Bitcoin est souvent comparé à l'or car ils partagent
              des caractéristiques similaires telles que la rareté, la
              durabilité et la divisibilité.
              <br />
              <br />
              Même le vocabulaire est similaire. Par exemple, le minage de
              Bitcoin est similaire au minage de l'or. Le processus d'ajout de
              nouveaux Bitcoins au réseau s'appelle le minage car il est
              similaire au processus d'extraction de l'or ou d'autres métaux
              précieux.
              <br />
              <br />
              Terminons ce cours avec le halving. Le halving est un événement
              qui se produit tous les quatre ans environ. C'est un événement qui
              réduit la récompense pour le minage de nouveaux Bitcoins. Cela
              rend Bitcoin plus rare et précieux.
              <br />
              <br />
              Pourquoi le halving est-il important? Le halving est important car
              il garantit que l'offre de Bitcoin est limitée. Cela rend Bitcoin
              précieux. Ainsi, Bitcoin est résistant à l'inflation. C'est
              différent des monnaies fiduciaires traditionnelles qui sont
              sujettes à l'inflation.
            </>
          )}
        </p>
      </div>
    </>
  );
};

export default CoursePage;
