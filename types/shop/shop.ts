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
