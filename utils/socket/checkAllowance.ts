import axios from "axios";
import { Address } from "viem";
import { SOCKET_API_KEY } from "@/config/socket";

export const checkAllowance = async (
  chainId: number,
  owner: Address,
  allowanceTarget: Address,
  tokenAddress: Address
) => {
  const response = await axios
    .get(
      `https://api.socket.tech/v2/approval/check-allowance?chainID=${chainId}&owner=${owner}&allowanceTarget=${allowanceTarget}&tokenAddress=${tokenAddress}`,
      {
        headers: {
          "API-KEY": SOCKET_API_KEY,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
    .then((response) => response.data);

  return response;
};
