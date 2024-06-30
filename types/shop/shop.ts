export type ShopCategoriesName =
  | "lifePotions"
  | "streakBackups"
  | "lifeShields"
  | "rewardMultipliers";

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
