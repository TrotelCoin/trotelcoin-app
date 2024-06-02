import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/db";
import { Address } from "viem";
import rateLimit from "@/utils/api/rateLimit";
import { z } from "zod";

export const dynamic = "force-dynamic";

const inputSchema = z.object({
  wallet: z.custom<Address>(),
});

/* GET /api/user/name
 * Returns the username of a user.
 * @param {string} wallet - The wallet address of the user.
 * @returns {string} username - The username of the user.
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  if (await rateLimit(req, res)) {
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const { wallet } = inputSchema.safeParse({
      wallet: searchParams.get("wallet"),
    }).data as unknown as { wallet: Address };

    const { data: result } = await supabase
      .from("learners")
      .select("username")
      .eq("wallet", wallet);

    if (!result) {
      return new NextResponse("No username for this user", {
        status: 404,
        headers: { "Cache-Control": "no-store" },
      });
    }

    return new NextResponse(JSON.stringify(result[0].username), {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(new Date().toISOString(), { status: 500 });
  }
}

/* POST /api/user/name
 * Updates the username of a user.
 * @param {string} wallet - The wallet address of the user.
 * @param {string} name - The new username of the user.
 * @returns {string} username - The username of the user.
 * @example response - 200 - application/json
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  try {
    const { wallet, name } = inputSchema.safeParse({
      wallet: searchParams.get("wallet"),
      name: searchParams.get("name"),
    }).data as unknown as { wallet: Address; name: string };

    await supabase
      .from("learners")
      .update({ username: name })
      .eq("wallet", wallet);
    return new NextResponse(JSON.stringify(name), {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(new Date().toISOString(), { status: 500 });
  }
}
