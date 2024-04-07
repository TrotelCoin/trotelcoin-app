import { Category, Subcategory } from "@/types/courses/courses";

export type Categories = {
  category: Category;
  subcategories: Subcategory[];
}[];

export const categories: Categories = [
  {
    category: "Web3",
    subcategories: ["Crypto", "Trading", "DeFi"],
  },
  {
    category: "Finance",
    subcategories: ["Investment", "Cryptocurrencies", "Stocks"],
  },
];
