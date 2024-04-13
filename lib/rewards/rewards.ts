import { Address } from "viem";
import axios from "axios";
import { Audios } from "@/app/[lang]/providers/audioProvider";

export const handleClaimRewards = async (
  address: Address,
  quizId: number,
  multipliers: number,
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
  await axios
    .post(
      `/api/database/postUpdateRewards?wallet=${address}&quizId=${quizId}&multipliers=${multipliers}`
    )
    .then(() => {
      setClaimedRewards(true);
      setClaimedRewardsMessage(true);
    })
    .catch((error) => {
      console.error(error);
      setClaimingError(true);
    });

  playAudio("claimedRewards");

  setClaimingLoading(false);
};
