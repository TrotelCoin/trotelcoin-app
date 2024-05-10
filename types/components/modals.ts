import { Lang } from "@/types/language/lang";

export interface Modals {
  title: string;
  show: boolean;
  message: string;
  onClose: () => void;
  lang: Lang;
}
