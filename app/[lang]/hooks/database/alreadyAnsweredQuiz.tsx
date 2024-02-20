import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/db";
import { useAddress } from "@thirdweb-dev/react";
import { Address } from "viem";

const alreadyAnsweredQuiz = ({ quizId }: { quizId: string }) => {
  const [answered, setAnswered] = useState(false);

  const address = useAddress();

  useEffect(() => {
    const fetchAlreadyAnsweredQuiz = async () => {
      // select answered from "quizzes_answered"
      const { data: result, error } = await supabase
        .from("quizzes_answered")
        .select("answered, quiz_id")
        .eq("wallet", address as Address);

      if (error) {
        console.error(error);
      }

      if (!Array.isArray(result)) {
        console.error("Result is not an array.");
      }

      if (result) {
        const matchingResult = result.find(
          (object) => object.quiz_id === parseFloat(quizId as string)
        );

        let answeredValue = false;

        if (matchingResult) {
          answeredValue = matchingResult.answered;
        }
        setAnswered(answeredValue);
      } else {
        setAnswered(false);
      }
    };

    try {
      fetchAlreadyAnsweredQuiz();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return answered;
};

export default alreadyAnsweredQuiz;
