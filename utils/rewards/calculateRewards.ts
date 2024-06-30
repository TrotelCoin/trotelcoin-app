export function calculateRewards(
  remainingRewards: number,
  multipliers: number
): number {
  const minReward = (multipliers * remainingRewards) / 10;
  const maxReward = (multipliers * remainingRewards) / 4;
  return Math.floor(Math.random() * (maxReward - minReward + 1)) + minReward;
}
