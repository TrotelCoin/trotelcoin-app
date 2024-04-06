export type InventoryItemType = {
  name: string;
  price: bigint;
  discount: bigint;
  quantity: bigint;
  emoji: string;
};

export type InventoryItemTypeFinal = {
  name: string;
  price: number;
  discount: number;
  quantity: number;
  emoji: string;
};
