import { Skeleton } from "@radix-ui/themes";

const SkeletonCourseCard = ({ isLoading }: { isLoading: boolean }) => {
  const borderClass = `border border-gray-900/10 dark:border-gray-100/10`;

  return (
    <>
      <div>
        <div
          className={`relative flex h-64 w-64 flex-col items-start justify-between overflow-hidden rounded-xl ${borderClass} backdrop-blur-xl`}
        >
          <div className="flex h-full w-full items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-700">
            <Skeleton width="500px" height="500px" loading={isLoading} />
          </div>

          <div className="flex h-full w-full flex-col justify-between p-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5">
                <Skeleton loading={isLoading}>
                  <div className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300">
                    Category
                  </div>
                </Skeleton>
              </div>

              <div className="flex items-center">
                <Skeleton loading={isLoading}>
                  <div
                    className={`font-semibold text-gray-900 dark:text-gray-100`}
                  >
                    Title of the course
                  </div>
                </Skeleton>
              </div>
            </div>

            <div className="px-1">
              <Skeleton loading={isLoading}>
                <div className="inline-flex items-center rounded-xl bg-gray-500 px-2 py-1 text-xs font-medium text-gray-100">
                  Rank 🐣
                </div>
              </Skeleton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonCourseCard;
