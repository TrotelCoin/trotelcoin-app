import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/db";
import { Address } from "viem";
import { checkIfCourseIsAvailable } from "@/lib/quizzes/quizzes";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const quizId: number = Number(searchParams.get("quizId"));
  const numberOfWrongAnswers: number = Number(
    searchParams.get("numberOfWrongAnswers")
  );
  const totalQuestions: number = Number(searchParams.get("totalQuestions"));
  const wallet: Address = searchParams.get("wallet") as Address;

  // check if quiz exists
  const { data: quizExistence, error: quizExistenceError } = await supabase
    .from("quizzes")
    .select("quiz_id")
    .eq("quiz_id", quizId);

  if (quizExistenceError) {
    console.error(quizExistenceError);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }

  // if quiz doesn't exist, create it if available
  if (!quizExistence || quizExistence.length === 0) {
    const isCourseAvailable = checkIfCourseIsAvailable(quizId);

    if (isCourseAvailable) {
      const { error } = await supabase.from("quizzes").insert({
        quiz_id: quizId,
      });

      if (error) {
        console.error(error);
        return NextResponse.json(error, { status: 500 });
      }
    } else {
      console.error("Quiz not found with the specified quizId");
      return NextResponse.json(
        { error: "Quiz not found." },
        {
          status: 404,
        }
      );
    }
  }

  const { data, error: existsError } = await supabase
    .from("quizzes_results")
    .select("marks")
    .eq("quiz_id", quizId)
    .eq("wallet", wallet);

  if (existsError) {
    console.error(existsError);
    return NextResponse.json(existsError, { status: 500 });
  }

  if (data.length > 0) {
    return NextResponse.json("Already exists", {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const numberOfGoodAnswers =
    Number(totalQuestions) - Number(numberOfWrongAnswers);

  const { error } = await supabase.from("quizzes_results").insert({
    quiz_id: Number(quizId),
    wallet: wallet,
    number_of_wrong_answers: Number(numberOfWrongAnswers),
    total_questions: Number(totalQuestions),
    answered_at: new Date().toISOString(),
    marks: (Number(numberOfGoodAnswers) / Number(totalQuestions)) * 20,
  });

  if (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json("Results submitted", {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}
