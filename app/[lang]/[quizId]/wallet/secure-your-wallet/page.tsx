"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const cards = {
  en: [
    {
      title: "Trade on safe exchanges",
      text: "Secure your crypto by trading on reputable exchanges like Binance, Coinbase or Kraken with robust cybersecurity teams.",
    },
    {
      title: "Use multiple cold wallets",
      text: "Safeguard your cryptos with cold hardware wallets such as Ledger and Trezor, keeping them offline and secure from cyber threats.",
    },
    {
      title: "Avoid public WiFi",
      text: "Protect your crypto by avoiding public wifi, which can be vulnerable to cyber attacks, and use secure internet connections.",
    },
    {
      title: "Use 2FA and multiple passwords",
      text: "Enhance security with 2FA or MFA and strong password management, reducing the risk of unauthorized access to your crypto assets.",
    },
    {
      title: "Don't disclose any information on your wallet",
      text: "Keep your crypto safe by avoiding sharing sensitive information like passwords or private keys, minimizing the risk of cyber scams.",
    },
    {
      title: "Stay updated on the latest threats",
      text: "Stay informed about crypto security threats by following trusted news sources and analytics platforms to mitigate potential risks effectively.",
    },
    {
      title: "Always check the recipient wallet address twice",
      text: "Prevent loss of crypto by verifying recipient wallet addresses multiple times before transactions, avoiding irreversible mistakes.",
    },
    {
      title: "Use updated antivirus programs",
      text: "Ensure the security of your crypto assets by regularly updating antivirus software and maintaining a secure environment.",
    },
    {
      title: "Be aware of scams and phishing attempts",
      text: "Protect against phishing scams by maintaining skepticism towards unsolicited communications and verifying contacts through official channels.",
    },
    {
      title: "Monitor your transactions regularly",
      text: "Maintain the security of your crypto wallet by monitoring transactions for any suspicious activity and taking immediate action if necessary.",
    },
    {
      title: "What if my crypto wallet has already been hacked?",
      text: "Take swift action by contacting your service provider or exchange if you suspect unauthorized access, and consider migrating funds to a new wallet with enhanced security measures.",
    },
  ],
  fr: [
    {
      title: "Échanger sur des plateformes sécurisées",
      text: "Sécurisez votre crypto en échangeant sur des plateformes réputées comme Binance, Coinbase ou Kraken avec des équipes de cybersécurité robustes.",
    },
    {
      title:
        "Utilisez plusieurs portefeuilles froids",
      text: "Protégez votre crypto avec des portefeuilles matériels froids tels que Ledger et Trezor, en les maintenant hors ligne et à l'abri des menaces cyber.",
    },
    {
      title: "Évitez le wifi public",
      text: "Protégez vos cryptos en évitant le wifi public, qui peut être vulnérable aux attaques cyber, et utilisez des connexions Internet sécurisées.",
    },
    {
      title:
        "Utilisez la 2FA et plusieurs mots de passe",
      text: "Renforcez la sécurité avec l'authentification à 2FA ou MFA et une gestion solide des mots de passe, réduisant le risque d'accès non autorisé à vos actifs.",
    },
    {
      title: "Ne divulguez aucune information sur votre portefeuille",
      text: "Gardez votre crypto en sécurité en évitant de partager des informations sensibles comme les mots de passe ou les clés privées, minimisant ainsi le risque d'escroquerie.",
    },
    {
      title: "Restez à jour sur les dernières menaces",
      text: "Restez informé des menaces sur la sécurité crypto en suivant des sources d'information et des platesformes d'analyse de confiance pour atténuer efficacement les risques potentiels.",
    },
    {
      title:
        "Vérifiez toujours deux fois l'adresse du portefeuille du destinataire",
      text: "Évitez la perte de vos cryptos en vérifiant plusieurs fois les adresses de portefeuille du destinataire avant les transactions, évitant ainsi les erreurs irréversibles.",
    },
    {
      title: "Utilisez des programmes antivirus à jour",
      text: "Assurez la sécurité de vos actifs crypto en mettant régulièrement à jour les logiciels antivirus et en maintenant un environnement sécurisé.",
    },
    {
      title: "Soyez conscient des escroqueries et des tentatives de phishing",
      text: "Protégez-vous contre les escroqueries de phishing en maintenant un scepticisme à l'égard des communications non sollicitées et en vérifiant les contacts via des canaux officiels.",
    },
    {
      title: "Surveillez régulièrement vos transactions",
      text: "Maintenez la sécurité de votre portefeuille crypto en surveillant les transactions pour toute activité suspecte et en prenant des mesures immédiates si nécessaire.",
    },
    {
      title: "Que faire si mon portefeuille de crypto a déjà été piraté ?",
      text: "Agissez rapidement en contactant votre fournisseur de services ou votre échange si vous soupçonnez un accès non autorisé, et envisagez de transférer les fonds vers un nouveau portefeuille avec des mesures de sécurité renforcées.",
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
