import { Shield } from "@/types/items/items";
import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";
import { z } from "zod";
import { isUserAuthenticated } from "@/utils/auth/auth";

export const dynamic = "force-dynamic";

const inputSchema = z.object({
  wallet: z.custom<Address>()
});

/* GET /api/user/items/shield-enabled
 * Returns whether the shield is enabled for a user and the time left.
 * @param {string} wallet - The wallet address of the user.
 * @returns {boolean} shieldEnabled - Whether the shield is enabled for the user.
 * @returns {number} timeLeft - The time left for the shield to expire.
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  if (!isUserAuthenticated(req)) {
    return NextResponse.json(
      { error: "You are not authenticated." },
      { status: 401 }
    );
  }

  try {
    const { wallet } = inputSchema.safeParse({
      wallet: searchParams.get("wallet")
    }).data as unknown as { wallet: Address };

    const { data } = await supabase
      .from("shields")
      .select("start_time, wallet, shield_name")
      .eq("wallet", wallet);

    if (data && data.length > 0) {
      let shieldEnabled: boolean = false;
      let timeLeft: number = 0;

      data.forEach((shieldItem) => {
        const now = new Date();
        const shieldStartTime = new Date(shieldItem.start_time);

        const differenceInMs = now.getTime() - shieldStartTime.getTime();
        const differenceInHours = differenceInMs / (1000 * 60 * 60);

        let hours: number = 0;

        switch (shieldItem.shield_name as Shield) {
          case "Closed Lock":
            hours = 1;
            break;
          case "Shield":
            hours = 24;
            break;
          case "Castle":
            hours = 72;
            break;
          case "King":
            hours = 168;
            break;
          default:
            break;
        }

        if (differenceInHours <= hours) {
          shieldEnabled = true;
          timeLeft += hours * 60 - Math.floor(differenceInMs / (1000 * 60));
        }
      });

      return NextResponse.json(
        { shieldEnabled: shieldEnabled, timeLeft: timeLeft },
        { status: 200, headers: { "Cache-Control": "no-store" } }
      );
    } else {
      return NextResponse.json(false, {
        status: 200,
        headers: { "Cache-Control": "no-store" }
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}
