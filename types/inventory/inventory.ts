export type InventoryItemType = {
  name: string;
  price: bigint;
  discount: bigint;
  quantity: bigint;
  emoji: string;
  id: number;
  description: string;
  implicitQuantity?: number;
};

export type InventoryItemTypeFinal = {
  name: string;
  price: number;
  discount: number;
  quantity: number;
  emoji: string;
  id: number;
  description: string;
  implicitQuantity?: number;
};
