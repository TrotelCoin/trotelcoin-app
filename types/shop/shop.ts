export type ShopItemType = {
  name: string;
  description: string;
  price: number;
  emoji: string;
  id: number;
  quantity: number;
  discount?: number;
};

export type ShopCategories = "potions" | "clocks" | "shields";
