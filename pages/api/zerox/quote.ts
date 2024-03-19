import qs from "qs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const query = qs.stringify(req.query);
  const response = await fetch(
    `https://polygon.api.0x.org/swap/v1/quote?${query}`,
    {
      headers: {
        "0x-api-key": process.env.ZEROX_API_KEY as string,
      },
    }
  );

  const data = await response.json();

  res.status(200).json(data);
}
