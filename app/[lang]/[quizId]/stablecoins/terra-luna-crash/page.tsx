"use client";

import type { Lang } from "@/types/lang";
import Course from "@/app/[lang]/[quizId]/components/course";

const cards = {
  en: [
    {
      title: "Introduction",
      text: "Terra Luna was a blockchain protocol and payment platform used for algorithmic stablecoin issuance.",
    },
    {
      title: "The team",
      text: "Terra Luna was founded by Daniel Shin and Do Kwon and launched in 2018 by Terraform Labs.",
    },
    {
      title: "LUNA",
      text: "So, LUNA was the native token of the Terra Luna blockchain, and was used to stabilize the value of the stablecoin UST.",
    },
    {
      title: "UST",
      text: "UST was an algorithmic stablecoin that was pegged to the US dollar and was used for payments.",
    },
    {
      title: "Market capitalization",
      text: "Terra Luna was one of the largest blockchain protocols and its stablecoin UST was one of the most popular algorithmic stablecoins being the third largest stablecoin by market capitalization.",
    },
    {
      title: "dApps",
      text: "Terra Luna had a number of decentralized applications (dApps) built on its blockchain, including Anchor Protocol, Mirror Protocol, and Pylon.",
    },
    {
      title: "UST Collateral",
      text: "The main collateral of UST was LUNA, remember, the native token of the Terra Luna blockchain.",
    },
    {
      title: "LUNA Mechanics",
      text: "So, the UST was made to be stable and the LUNA was made to absorb its volatility. When the UST was above the peg, the LUNA was burned, and when the UST was below the peg, the LUNA was minted.",
    },
    {
      title: "Anchor Protocol",
      text: "On 7 May, over $2 billion worth of UST was unstaked from Anchor Protocol and hundreds of millions were quickly liquidated, causing the price of UST to depeg from $1 to $0.91.",
    },
    {
      title: "The panic",
      text: "The algorithm tried to stabilize the UST by minting LUNA but a big inflation occured since the supply passed from 725 million to 7 trillion tokens between 5 and 13 May causing the LUNA price to crash from 99.9%.",
    },
    {
      title: "The Luna Foundation Guard",
      text: "The Luna Foundation Guard, created to stabilize the price of LUNA, ammased a $3.5 billion Bitcoin reserve to defend UST's peg but it wasn't enough. The LFG Bitcoin reserve depleted from 80,000 BTC to 313 BTC in the failed defense.",
    },
    {
      title: "The aftermath",
      text: "The UST was not back by fiat reserves unlike other stablecoins like USDT and USDC and the crash of Terra Luna was the biggest in the history of stablecoins.",
    },
    {
      title: "Conclusion",
      text: "Right after, the collapse of UST triggered a death spiral where the minting of LUNA to defend the peg only accelerated the crash of both. Major exchanges delisted UST and LUNA trading pairs.",
    },
    {
      title: "What to learn from this?",
      text: "The Terra Luna crash was a reminder that algorithmic stablecoins are not perfect yet and that they can crash if the algorithm fails to stabilize the price. It doesn't mean it will never work, it means it's not perfect yet and you should stay cautious.",
    },
  ],
  fr: [
    {
      title: "Introduction",
      text: "Terra Luna était un protocole blockchain et une plateforme de paiement utilisée pour l'émission de stablecoins algorithmiques.",
    },
    {
      title: "L'équipe",
      text: "Terra Luna a été fondée par Daniel Shin et Do Kwon et lancée en 2018 par Terraform Labs.",
    },
    {
      title: "LUNA",
      text: "Ainsi, LUNA était le jeton natif de la blockchain Terra Luna et était utilisé pour stabiliser la valeur du stablecoin UST.",
    },
    {
      title: "UST",
      text: "UST était un stablecoin algorithmique qui était ancré sur le dollar américain et était utilisé pour les paiements.",
    },
    {
      title: "Capitalisation boursière",
      text: "Terra Luna était l'un des plus grands protocoles blockchain et son stablecoin UST était l'un des stablecoins algorithmiques les plus populaires, étant le troisième plus grand stablecoin par capitalisation boursière.",
    },
    {
      title: "dApps",
      text: "Terra Luna avait un certain nombre d'applications décentralisées (dApps) construites sur sa blockchain, y compris Anchor Protocol, Mirror Protocol et Pylon.",
    },
    {
      title: "UST Collateral",
      text: "Le principal collatéral de l'UST était LUNA, rappelez-vous, le jeton natif de la blockchain Terra Luna.",
    },
    {
      title: "Mécanique de LUNA",
      text: "Ainsi, l'UST était conçu pour être stable et le LUNA était conçu pour absorber sa volatilité. Lorsque l'UST était au-dessus du peg, le LUNA était brûlé, et lorsque l'UST était en dessous du peg, le LUNA était minté.",
    },
    {
      title: "Anchor Protocol",
      text: "Le 7 mai, plus de 2 milliards de dollars d'UST ont été retirés du Anchor Protocol et des centaines de millions ont été rapidement liquidés, faisant passer le prix de l'UST de 1$ à 0.91$.",
    },
    {
      title: "La panique",
      text: "L'algorithme a essayé de stabiliser l'UST en mintant du LUNA mais une grosse inflation a eu lieu puisque l'offre est passée de 725 millions à 7 trillions de tokens entre le 5 et le 13 mai faisant crasher le prix du LUNA de 99.9%.",
    },
    {
      title: "La Luna Foundation Guard",
      text: "La Luna Foundation Guard, créée pour stabiliser le prix du LUNA, a amassé une réserve de 3.5 milliards de dollars en Bitcoin pour défendre le peg de l'UST mais ce n'était pas suffisant. La réserve de Bitcoin de la LFG est passée de 80,000 BTC à 313 BTC dans la défense ratée.",
    },
    {
      title: "Les conséquences",
      text: "L'UST n'était pas adossé à des réserves de monnaies fiduciaires contrairement à d'autres stablecoins comme l'USDT et l'UDSDC et le crash de Terra Luna était le plus grand de l'histoire des stablecoins.",
    },
    {
      title: "Conclusion",
      text: "Juste après, l'effondrement de l'UST a déclenché une spirale de la mort où le minting de LUNA pour défendre le peg n'a fait qu'accélérer le crash des deux. Les principaux exchanges ont retiré les paires de trading UST et LUNA.",
    },
    {
      title: "Que retenir de cela?",
      text: "Le crash de Terra Luna était un rappel que les stablecoins algorithmiques ne sont pas encore parfaits et qu'ils peuvent crasher si l'algorithme échoue à stabiliser le prix. Cela ne signifie pas que cela ne fonctionnera jamais, cela signifie juste que ce n'est pas encore parfait et que vous devriez rester prudent.",
    },
  ],
};

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <Course cards={cards} lang={lang} conditionIsOkay={true} />
    </>
  );
};

export default CoursePage;
