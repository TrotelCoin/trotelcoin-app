export type ItemType = {
  name: string;
  price: bigint;
  discount: bigint;
  emoji: string;
  description: string;
  disabled: boolean;
};

export type ItemTypeFinal = {
  name: string;
  price: number;
  discount?: number;
  emoji: string;
  description: string;
  id: number;
  categoryId: number;
  quantity?: number;
  disabled: boolean;
};

export type Shield = "1h Shield" | "24h Shield" | "72h Shield" | "1w Shield";

export type ItemName =
  | "Life Potion"
  | "72h Lost Backup"
  | "1w Lost Backup"
  | "Ultimate Lost Backup"
  | "1h Shield"
  | "24h Shield"
  | "72h Shield"
  | "1w Shield"
  | "x2"
  | "x5"
  | "x10"
  | "x25";
