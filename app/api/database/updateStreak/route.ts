import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const wallet = searchParams.get("wallet");

  try {
    // Check if wallet exists in "learners" table
    const { data: walletExists, error: walletExistsError } = await supabase
      .from("learners")
      .select("*")
      .eq("wallet", wallet as string);

    if (walletExistsError) {
      console.error(walletExistsError);
      return new NextResponse(
        JSON.stringify({ error: "Something went wrong." }),
        { status: 500 }
      );
    }

    if (!walletExists.length) {
      // wallet does not exist in the "learners" table
      const { error: insertError } = await supabase.from("learners").insert([
        {
          wallet: wallet as string,
          number_of_quizzes_answered: 0,
          number_of_quizzes_created: 0,
          total_rewards_pending: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);

      if (insertError) {
        console.error(insertError);
        return new NextResponse(
          JSON.stringify({ error: "Something went wrong." }),
          { status: 500 }
        );
      }
    }

    // Check if wallet exists in "streak" table
    const { data: streakExists, error: streakExistsError } = await supabase
      .from("streak")
      .select("*")
      .eq("wallet", wallet as string);

    if (streakExistsError) {
      console.error(streakExistsError);
      return new NextResponse(
        JSON.stringify({ error: "Something went wrong." }),
        { status: 500 }
      );
    }

    if (!streakExists.length) {
      // create a new streak if the wallet does not exist
      const { error: insertStreakError } = await supabase
        .from("streak")
        .insert([
          {
            wallet: wallet as string,
            current_streak: 1,
            max_streak: 1,
            last_streat_at: new Date().toISOString(),
          },
        ]);

      if (insertStreakError) {
        console.error(insertStreakError);
        return new NextResponse(
          JSON.stringify({ error: "Something went wrong." }),
          { status: 500 }
        );
      }

      return new NextResponse(JSON.stringify({ success: "Streak updated" }), {
        status: 200,
      });
    }

    // check if one day has passed since the last streak
    const { data: oneDay, error: oneDayError } = await supabase
      .from("streak")
      .select("*")
      .eq("wallet", wallet as string)
      .lte(
        "last_streak_at",
        new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      );

    if (oneDayError) {
      console.error(oneDayError);
      return new NextResponse(
        JSON.stringify({ error: "Something went wrong." }),
        { status: 500 }
      );
    }

    // fetch the current streak
    const { data: currentStreak, error: currentStreakError } = await supabase
      .from("streak")
      .select("current_streak")
      .eq("wallet", wallet as string);

    if (currentStreakError) {
      console.error(currentStreakError);
      return new NextResponse(
        JSON.stringify({ error: "Something went wrong." }),
        { status: 500 }
      );
    }

    // update only if the last streak was more than 1 day ago
    if (oneDay.length !== 0) {
      const { error: updateCurrentStreakError } = await supabase
        .from("streak")
        .update({
          current_streak: currentStreak[0].current_streak + 1,
          last_streak_at: new Date().toISOString(),
        })
        .eq("wallet", wallet as string);

      if (updateCurrentStreakError) {
        console.error(updateCurrentStreakError);
        return new NextResponse(
          JSON.stringify({ error: "Something went wrong." }),
          { status: 500 }
        );
      }

      // get max streak
      const { data: maxStreak, error: maxStreakError } = await supabase
        .from("streak")
        .select("max_streak")
        .eq("wallet", wallet as string);

      if (maxStreakError) {
        console.error(maxStreakError);
        return new NextResponse(
          JSON.stringify({ error: "Something went wrong." }),
          { status: 500 }
        );
      }

      // update max streak
      const { error: updateMaxStreakError } = await supabase
        .from("streak")
        .update({
          max_streak: Math.max(
            maxStreak[0].max_streak,
            currentStreak[0].current_streak + 1
          ),
        })
        .eq("wallet", wallet as string);

      if (updateMaxStreakError) {
        console.error(updateMaxStreakError);
        return new NextResponse(
          JSON.stringify({ error: "Something went wrong." }),
          { status: 500 }
        );
      }

      return new NextResponse(JSON.stringify({ success: "Streak updated." }), {
        status: 200,
      });
    } else {
      return new NextResponse(
        JSON.stringify({ success: "Streak not updated." }),
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong." }),
      {
        status: 200,
      }
    );
  }
}
