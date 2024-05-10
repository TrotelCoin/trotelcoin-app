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
