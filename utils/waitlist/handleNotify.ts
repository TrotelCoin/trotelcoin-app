import axios from "axios";
import { Address } from "viem";
import { isMailCorrect } from "@/utils/waitlist/isMailCorrect";

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
    .post(`/api/waitlist`, {
      wallet: address,
      mail
    })
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
