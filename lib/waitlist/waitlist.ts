import axios from "axios";
import { Address } from "viem";

export const isMailCorrect = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const handleNotify = async (
  address: Address,
  mail: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<boolean>>,
  setIsWaiting: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoading(true);

  if (!mail) {
    setErrorMessage(true);
    return;
  }

  if (mail && !isMailCorrect(mail)) {
    setErrorMessage(true);
    return;
  }

  const position = await axios
    .post(`/api/database/postNewLearnerWaitlist?wallet=${address}&mail=${mail}`)
    .catch((error) => {
      console.error(error);
      setErrorMessage(true);
      setIsLoading(false);
    })
    .then((position) => {
      setIsWaiting(true);
      setIsLoading(false);
      return position?.data;
    });

  return position;
};
