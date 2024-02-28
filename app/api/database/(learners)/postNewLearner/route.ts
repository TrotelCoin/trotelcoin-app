import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  try {
    // check if the wallet exists in the database
    const { data: userExists, error: userExistsError } = await supabase
      .from("learners")
      .select("*")
      .eq("wallet", wallet);

    if (userExistsError) {
      console.error(userExistsError);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }

    if (!userExists.length) {
      // wallet does not exist in the database
      const { error: insertError } = await supabase.from("learners").insert([
        {
          wallet: wallet as Address,
          number_of_quizzes_answered: 0,
          number_of_quizzes_created: 0,
          total_rewards_pending: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);

      if (insertError) {
        console.error(insertError);
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { success: "New learner added." },
        { status: 200, headers: { "Cache-Control": "no-store" } }
      );
    }

    return NextResponse.json(
      { success: "Learner already exists." },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
