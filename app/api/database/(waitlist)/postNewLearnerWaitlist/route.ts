import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export const dynamic = "force-dynamic";

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
