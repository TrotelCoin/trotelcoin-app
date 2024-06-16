import { Lang } from "@/types/language/lang";
import { Skeleton } from "@radix-ui/themes";

const Pagination = ({
  lang,
  setPage,
  list,
  filteredList,
  page,
  itemsPerPage,
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
      className="flex items-center justify-between border-t border-gray-900/10 dark:border-gray-100/10 bg-white dark:bg-gray-900 px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {lang === "en" ? "Showing" : "Affichage"}{" "}
          <span className="font-medium">
            <Skeleton loading={!page}>{page}</Skeleton>
          </span>{" "}
          {lang === "en" ? "to" : "à"}{" "}
          <span className="font-medium">
            <Skeleton loading={!list || !list.length || !itemsPerPage}>
              {Math.ceil(list.length / itemsPerPage)}
            </Skeleton>
          </span>{" "}
          {lang === "en" ? "of" : "de"}{" "}
          <span className="font-medium">
            <Skeleton loading={!list || !list.length}>{list.length}</Skeleton>
          </span>{" "}
          {lang === "en" ? "results" : "résultats"}
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          onClick={() => prevPage()}
          className="relative inline-flex items-center border border-gray-900/10 dark:border-gray-100/10 rounded-xl bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus-visible:outline-offset-0"
        >
          {lang === "en" ? "Previous" : "Précédent"}
        </button>
        <button
          onClick={() => nextPage()}
          className="relative ml-3 inline-flex items-center border border-gray-900/10 dark:border-gray-100/10 rounded-xl bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus-visible:outline-offset-0"
        >
          {lang === "en" ? "Next" : "Suivant"}
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
