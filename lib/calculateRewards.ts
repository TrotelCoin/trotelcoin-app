export function calculateRewards(remainingRewards: number): number {
    const minReward = remainingRewards / 10;
    const maxReward = remainingRewards / 4;
    return Math.floor(Math.random() * (maxReward - minReward + 1)) + minReward;
}