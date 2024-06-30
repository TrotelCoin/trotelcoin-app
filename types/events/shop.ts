import { Address } from "viem";

export interface ShopLog {
  id: number;
  wallet: Address;
  itemId: number;
  quantity: number;
  price: number;
  trotel_price?: number;
  event_at: string;
  chain_id: number;
}
