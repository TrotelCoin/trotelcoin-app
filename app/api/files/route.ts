import { NextResponse, NextRequest } from "next/server";

/*
export const config = {
  api: {
    bodyParser: false,
  },
};
*/

export const dynamic = "force-dynamic";

/* POST /api/files
 * Uploads a file to IPFS using Pinata.
 * @returns {string} IpfsHash - The IPFS hash of the uploaded file.
 * @example response - 200 - application/json
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    data.append("file", file);
    data.append("pinataMetadata", JSON.stringify({ name: "File to upload" }));
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
      body: data,
    });
    const { IpfsHash } = await res.json();
    console.log(IpfsHash);

    return NextResponse.json({ IpfsHash }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
