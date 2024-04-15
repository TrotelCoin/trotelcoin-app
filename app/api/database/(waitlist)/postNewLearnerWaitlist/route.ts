import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;
  const mail: string = searchParams.get("mail") as string;

  if (!wallet || !mail) {
    return NextResponse.json("Parameters not found", { status: 400 });
  }

  // check if learners exist
  const { data: learner, error: learnerError } = await supabase
    .from("learners")
    .select("wallet")
    .eq("wallet", wallet);

  if (learnerError) {
    console.error(learnerError);
    return NextResponse.json(learnerError, { status: 500 });
  }

  // learner doesn't exist
  if (learner.length === 0) {
    const { error: insertLearnerError } = await supabase
      .from("learners")
      .insert({
        wallet: wallet,
        number_of_quizzes_answered: 0,
        number_of_quizzes_created: 0,
        total_rewards_pending: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    if (insertLearnerError) {
      console.error(insertLearnerError);
      return NextResponse.json(insertLearnerError, { status: 500 });
    }
  }

  // anticipate user position
  let position: number = 0;
  const { data: learnerWaitlistLength, error: learnerWaitlistErrorLength } =
    await supabase.from("waitlist").select("wallet, granted");

  if (learnerWaitlistErrorLength) {
    console.error(learnerWaitlistErrorLength);
    return NextResponse.json(learnerWaitlistErrorLength, { status: 500 });
  }

  position = learnerWaitlistLength.filter((entry) => !entry.granted).length + 1;

  // add user to waitlist if doesn't exist
  const { data: learnerWaitlist, error: learnerWaitlistError } = await supabase
    .from("waitlist")
    .select("wallet")
    .eq("wallet", wallet);

  if (learnerWaitlistError) {
    console.error(learnerWaitlistError);
    return NextResponse.json(learnerWaitlistError, { status: 500 });
  }

  if (learnerWaitlist.length === 0) {
    const { error: insertLearnerWaitlistError } = await supabase
      .from("waitlist")
      .insert({
        wallet: wallet,
        mail: mail,
        created_at: new Date().toISOString(),
      });

    if (insertLearnerWaitlistError) {
      console.error(insertLearnerWaitlistError);
      return NextResponse.json(insertLearnerWaitlistError, { status: 500 });
    }
  }

  return NextResponse.json(position, { status: 200, headers: { "Cache-Control": "no-store" } });
}
