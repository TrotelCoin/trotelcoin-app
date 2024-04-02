export type InventoryItemType = [
  {
    name: string;
    price: bigint;
    discount: bigint;
  },
  bigint
];

export type Items =
  | "Potion"
  | "Hourglass"
  | "Clock"
  | "Closed Lock"
  | "Shield"
  | "Castle"
  | "King";

export type InventoryItemTypeFinal = {
  name: Items;
  price: number;
  discount: number;
  quantity: number;
};
