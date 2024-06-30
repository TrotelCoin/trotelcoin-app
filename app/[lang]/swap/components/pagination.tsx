import { Lang } from "@/types/language/lang";
import { Skeleton } from "@radix-ui/themes";

const Pagination = ({
  lang,
  setPage,
  list,
  filteredList,
  page,
  itemsPerPage
}: {
  lang: Lang;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  list: any[];
  filteredList: any[];
  page: number;
  itemsPerPage: number;
}) => {
  const nextPage = () => {
    if (page < filteredList.length) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <nav
      className="flex items-center justify-between border-t border-gray-900/10 bg-white px-4 py-3 dark:border-gray-100/10 dark:bg-gray-900 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {lang === "en" ? "Showing" : "Affichage"}{" "}
          <Skeleton loading={!page}>
            <span className="font-medium">{page}</span>
          </Skeleton>{" "}
          {lang === "en" ? "to" : "à"}{" "}
          <Skeleton loading={!list || !list.length || !itemsPerPage}>
            <span className="font-medium">
              {Math.ceil(list.length / itemsPerPage)}
            </span>
          </Skeleton>{" "}
          {lang === "en" ? "of" : "de"}{" "}
          <Skeleton loading={!list || !list.length}>
            <span className="font-medium">{list.length}</span>
          </Skeleton>{" "}
          {lang === "en" ? "results" : "résultats"}
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          onClick={() => prevPage()}
          className="relative inline-flex items-center rounded-xl border border-gray-900/10 bg-white px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 focus-visible:outline-offset-0 dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
        >
          {lang === "en" ? "Previous" : "Précédent"}
        </button>
        <button
          onClick={() => nextPage()}
          className="relative ml-3 inline-flex items-center rounded-xl border border-gray-900/10 bg-white px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 focus-visible:outline-offset-0 dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
        >
          {lang === "en" ? "Next" : "Suivant"}
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
