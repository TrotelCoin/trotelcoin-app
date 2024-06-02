import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";
import { z } from "zod";

export const dynamic = "force-dynamic";

const inputSchema = z.object({
  wallet: z.custom<Address>(),
});

/* GET /api/waitlist
 * Returns whether a user is in the waitlist and their position.
 * @param {string} wallet - The wallet address of the user.
 * @returns {boolean} isWaiting - Whether the user is in the waitlist.
 * @returns {number} position - The position of the user in the waitlist.
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  try {
    const { wallet } = inputSchema.safeParse({
      wallet: searchParams.get("wallet"),
    }).data as unknown as { wallet: Address };

    const { data: learnerWaitlist } = await supabase
      .from("waitlist")
      .select("created_at, wallet, granted")
      .order("created_at", { ascending: true });

    let isWaiting: boolean = false;
    let position: number = 0;

    if (learnerWaitlist && learnerWaitlist.length > 0) {
      learnerWaitlist
        .filter((entry) => !entry.granted)
        .sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );

      position = learnerWaitlist.findIndex((entry) => entry.wallet === wallet);
      if (position !== -1) {
        isWaiting = true;
        position += 1;
      }
    }

    return NextResponse.json(
      { isWaiting: isWaiting, position: position },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { isWaiting: false, position: 0 },
      { status: 500 }
    );
  }
}

/* POST /api/waitlist
 * Adds a user to the waitlist.
 * @param {string} wallet - The wallet address of the user.
 * @param {string} mail - The email address of the user.
 * @returns {number} position - The position of the user in the waitlist.
 * @example response - 200 - application/json
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;
  const mail: string = searchParams.get("mail") as string;

  try {
    // check if learners exist
    const { data: learner } = await supabase
      .from("learners")
      .select("wallet")
      .eq("wallet", wallet);

    // learner doesn't exist
    if (learner && learner.length === 0) {
      await supabase.from("learners").insert({
        wallet: wallet,
        number_of_quizzes_answered: 0,
        number_of_quizzes_created: 0,
        total_rewards_pending: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }

    // anticipate user position
    let position: number = 0;
    const { data: learnerWaitlistLength } = await supabase
      .from("waitlist")
      .select("wallet, granted");

    if (!learnerWaitlistLength) {
      return NextResponse.json(0, { status: 200 });
    }

    position =
      learnerWaitlistLength.filter((entry) => !entry.granted).length + 1;

    // add user to waitlist if doesn't exist
    const { data: learnerWaitlist } = await supabase
      .from("waitlist")
      .select("wallet")
      .eq("wallet", wallet);

    if (learnerWaitlist && learnerWaitlist.length === 0) {
      await supabase.from("waitlist").insert({
        wallet: wallet,
        mail: mail,
        created_at: new Date().toISOString(),
      });
    }

    return NextResponse.json(position, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(0, { status: 500 });
  }
}
