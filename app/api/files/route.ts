import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import * as dotenv from "dotenv";

dotenv.config();

const PINATA_JWT = process.env.PINATA_JWT as string;

export const dynamic = "force-dynamic";

const FormDataSchema = z.object({
  title: z.string().optional(),
  file: z.instanceof(File)
});

/* POST /api/files
 * Uploads a file to IPFS using Pinata.
 * @returns {string} IpfsHash - The IPFS hash of the uploaded file.
 * @example response - 200 - application/json
 */
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.formData();
    const title: string = data.get("title")?.toString() ?? "Untitled";
    const file: File | null = data.get("file") as unknown as File;

    const formDataResult = FormDataSchema.safeParse({
      title,
      file
    });

    if (!formDataResult.success) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    const validatedData = formDataResult.data;

    const pinataData = new FormData();
    pinataData.append("file", validatedData.file);
    pinataData.append(
      "pinataMetadata",
      JSON.stringify({
        name: `TrotelCoin | ${validatedData.title ?? "Untitled"}`
      })
    );

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`
      },
      body: pinataData
    });

    const { IpfsHash } = await res.json();

    return NextResponse.json({ IpfsHash }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
