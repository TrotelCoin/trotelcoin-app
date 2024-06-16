import { Skeleton } from "@radix-ui/themes";

const SkeletonCourseCard = ({ isLoading }: { isLoading: boolean }) => {
  const borderClass = `border border-gray-900/10 dark:border-gray-100/10`;

  return (
    <>
      <div
        className={`rounded-xl relative h-64 w-64 overflow-hidden flex flex-col justify-between items-start ${borderClass} backdrop-blur-xl`}
      >
        <div className="flex items-center justify-center overflow-hidden w-full h-full bg-gray-100 dark:bg-gray-700">
          <Skeleton width="500px" height="500px" loading={isLoading} />
        </div>

        <div className="p-4 w-full h-full flex flex-col justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-0.5">
              <div className="text-xs text-gray-700 dark:text-gray-300 flex items-center gap-1">
                <Skeleton loading={isLoading}>Category</Skeleton>
              </div>
            </div>

            <div className="flex items-center">
              <div className={`font-semibold text-gray-900 dark:text-gray-100`}>
                <Skeleton loading={isLoading}>Title of the course</Skeleton>
              </div>
            </div>
          </div>

          <div className="px-1">
            <div className="inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium bg-gray-500 text-gray-100">
              <Skeleton loading={isLoading}>Rank 🐣</Skeleton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonCourseCard;
