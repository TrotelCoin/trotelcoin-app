import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;

  if (!wallet) {
    return NextResponse.json("Parameters not found", { status: 400 });
  }

  const { data: learnerWaitlist, error: learnerWaitlistError } = await supabase
    .from("waitlist")
    .select("created_at, wallet")
    .order("created_at", { ascending: true });

  if (learnerWaitlistError) {
    console.error(learnerWaitlistError);
    return NextResponse.json(learnerWaitlistError, { status: 500 });
  }

  let isWaiting: boolean = false;
  let position: number = 0;

  if (learnerWaitlist.length > 0) {
    learnerWaitlist.sort(
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
    { status: 200 }
  );
}
