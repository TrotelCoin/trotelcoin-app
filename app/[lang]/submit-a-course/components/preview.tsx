import type { CourseJSON } from "@/types/courses/courses";
import type { Lang } from "@/types/language/lang";
import React from "react";
import { CodeBlock } from "react-code-block";

const PreviewCourseData = ({
  lang,
  json,
}: {
  lang: Lang;
  json: CourseJSON;
}) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-gray-900 dark:text-gray-100">
          {lang === "en"
            ? "Here are the details that will be submitted to the blockchain."
            : "Voici les informations qui seront soumises à la blockchain."}
        </span>
        <CodeBlock code={JSON.stringify(json, null, 2)} language="json">
          <CodeBlock.Code className="bg-gray-900 dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-900/10 dark:border-gray-100/10">
            <div className="table-row">
              <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
              <CodeBlock.LineContent className="table-cell">
                <CodeBlock.Token />
              </CodeBlock.LineContent>
            </div>
          </CodeBlock.Code>
        </CodeBlock>
      </div>
    </>
  );
};

export default PreviewCourseData;
