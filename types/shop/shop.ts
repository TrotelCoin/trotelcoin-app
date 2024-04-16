export type ShopCategoriesName = "potions" | "clocks" | "shields";

export type ShopCategories = {
  name: ShopCategoriesName;
  id: number;
};

export type Category = {
  name: string;
  categoryItems?: number[];
  id: number;
  disabled: boolean;
};

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
