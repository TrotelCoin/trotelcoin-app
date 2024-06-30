import { Address } from "viem";

export interface StakingLog {
  id: number;
  wallet: Address;
  event: string;
  amount: number;
  reward?: number;
  duration?: number;
  trotel_price?: number;
  event_at: string;
  chain_id: number;
}
