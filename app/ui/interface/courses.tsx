import React from "react";
import { Lessons } from "@/types/types";

const lessons: Lessons[] = [
  {
    category: "Wallet",
    percentage: 0,
    courses: [
      {
        title: "Setting up your first wallet",
        href: "/wallet/setting-up-your-first-wallet",
        status: "Not started",
      },
    ],
  },
];

const Courses = () => {
  return (
    <>
      {lessons.map((item) => {
        <span key={item.category}>{item.category}</span>;
      })}
    </>
  );
};

export default Courses;
