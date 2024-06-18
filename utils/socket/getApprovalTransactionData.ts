import axios from "axios";
import { Address } from "viem";

export const getApprovalTransactionData = async (
  chainId: number,
  owner: Address,
  allowanceTarget: Address,
  tokenAddress: Address,
  amount: number
) => {
  const response = await axios
    .get(
      `https://api.socket.tech/v2/approval/build-tx?chainID=${chainId}&owner=${owner}&allowanceTarget=${allowanceTarget}&tokenAddress=${tokenAddress}&amount=${amount}`,
      {
        headers: {
          "API-KEY": process.env.NEXT_PUBLIC_SOCKET_API_KEY as string,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
    .then((response) => response.data);

  return response;
};
