import { ItemName } from "@/types/items/items";
import { Lang } from "@/types/language/lang";
import { SetStateAction } from "react";

export const translateItemName = (
  name: string,
  lang: Lang,
  setDisplayedName: React.Dispatch<SetStateAction<string | null>>
) => {
  let item = "";

  switch (name as ItemName) {
    case "Life Potion":
      item = lang === "en" ? "Life Potion" : "Potion de vie";
      break;
    case "72h Lost Backup":
      item = lang === "en" ? "72h Lost Backup" : "Sauvegarde de 72h";
      break;
    case "1w Lost Backup":
      item = lang === "en" ? "1w Lost Backup" : "Sauvegarde de 1w";
      break;
    case "Ultimate Lost Backup":
      const closedLock = (item =
        lang === "en" ? "Ultimate Lost Backup" : "Sauvegarde ultime");
      break;
    case "1h Shield":
      item = lang === "en" ? "1h Shield" : "Bouclier de 1h";
      break;
    case "24h Shield":
      item = lang === "en" ? "24h Shield" : "Bouclier de 24h";
      break;
    case "72h Shield":
      item = lang === "en" ? "72h Shield" : "Bouclier de 72h";
      break;
    case "1w Shield":
      item = lang === "en" ? "1w Shield" : "Bouclier de 1w";
      break;
    default:
      item = name;
      break;
  }

  setDisplayedName(item);
};
