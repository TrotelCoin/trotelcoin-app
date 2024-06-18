import { Category, Subcategory } from "@/types/courses/categories";

export type Categories = {
  category: Category;
  subcategories: Subcategory[];
}[];

export const categories: Categories = [
  {
    category: "Web3",
    subcategories: ["Cryptocurrencies", "Trading", "DeFi"]
  },
  {
    category: "Finance",
    subcategories: ["Investment", "Cryptocurrencies", "Stocks"]
  }
];
