import { Address } from "viem";
import axios from "axios";
import { Audios } from "@/providers/audio";

export const handleClaimRewards = async (
  address: Address,
  quizId: number,
  multipliers: number | null,
  setIsLearnerDisconnected: React.Dispatch<React.SetStateAction<boolean>>,
  setClaimingLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setClaimedRewards: React.Dispatch<React.SetStateAction<boolean>>,
  setClaimedRewardsMessage: React.Dispatch<React.SetStateAction<boolean>>,
  setClaimingError: React.Dispatch<React.SetStateAction<boolean>>,
  playAudio: (key: Audios) => void
) => {
  if (!address) {
    setIsLearnerDisconnected(true);
    return;
  }

  setClaimingLoading(true);

  // update database rewards by calling api and if success
  const rewards = await axios
    .post(
      `/api/user/rewards?wallet=${address}&quizId=${quizId}&multipliers=${
        multipliers ?? 1
      }`
    )
    .then((response) => {
      setClaimedRewards(true);
      setClaimedRewardsMessage(true);
      return response.data.rewards;
    })
    .catch((error) => {
      console.error(error);
      setClaimingError(true);
    });

  playAudio("claimedRewards");

  setClaimingLoading(false);

  return rewards;
};
