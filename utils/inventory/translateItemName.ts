import { Lang } from "@/types/language/lang";
import { SetStateAction } from "react";

export const translateItemName = (
  name: string,
  lang: Lang,
  setDisplayedName: React.Dispatch<SetStateAction<string | null>>
) => {
  switch (name) {
    case "Potion":
      const potion = lang === "en" ? "Potion" : "Potion";
      setDisplayedName(potion);
      break;
    case "Hourglass":
      const hourglass = lang === "en" ? "Hourglass" : "Sablier";
      setDisplayedName(hourglass);
      break;
    case "Clock":
      const clock = lang === "en" ? "Clock" : "Horloge";
      setDisplayedName(clock);
      break;
    case "Closed Lock":
      const closedLock = lang === "en" ? "Closed Lock" : "Serrure";
      setDisplayedName(closedLock);
      break;
    case "Shield":
      const shield = lang === "en" ? "Shield" : "Bouclier";
      setDisplayedName(shield);
      break;
    case "Castle":
      const castle = lang === "en" ? "Castle" : "Château";
      setDisplayedName(castle);
      break;
    case "King":
      const king = lang === "en" ? "King" : "Roi";
      setDisplayedName(king);
      break;
    default:
      setDisplayedName(name);
      break;
  }
};
