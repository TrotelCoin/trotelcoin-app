import BlueSimplePopover from "@/app/[lang]/components/blueSimplePopover";
import { Lang } from "@/types/lang";
import * as Select from "@radix-ui/react-select";
import * as Switch from "@radix-ui/react-switch";
import * as Popover from "@radix-ui/react-popover";
import { Cog6ToothIcon } from "@heroicons/react/20/solid";
import React from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Settings = ({
  lang,
  enableRefuel,
  setEnableRefuel,
}: {
  lang: Lang;
  enableRefuel: boolean;
  setEnableRefuel: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <Popover.Root>
        <Popover.Trigger>
          <BlueSimplePopover>
            <Cog6ToothIcon className="w-4 h-4 md:h-5 md:w-5 text-gray-100" />
          </BlueSimplePopover>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            side="bottom"
            align="center"
            sideOffset={10}
            className="max-w-xl flex flex-col bg-gray-100 dark:bg-gray-800 divide-y divide-gray-900/10 dark:divide-gray-100/10 border border-gray-900/10 dark:border-gray-100/10 backdrop-blur-xl rounded-xl"
          >
            <div className="flex gap-12 justify-between items-center px-4 py-4">
              <span className="text-gray-900 dark:text-gray-100 text-sm">
                {lang === "en" ? "Enable Refuel" : "Activer le Refuel"}
              </span>
              <Switch.Root
                checked={enableRefuel}
                onCheckedChange={() => setEnableRefuel(!enableRefuel)}
                className={classNames(
                  enableRefuel ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-700",
                  "w-[36px] h-[20px] bg-gray-100 dark:bg-gray-800 rounded-full relative data-[state=checked]:bg-blue-500 outline-none cursor-default"
                )}
              >
                <Switch.Thumb className="block w-[15px] h-[15px] bg-white rounded-full transition-transform duration-100 translate-x-1 will-change-transform data-[state=checked]:translate-x-[18px]" />
              </Switch.Root>
            </div>

            <div className="flex w-full justify-between items-center px-4 py-4">
              <span className="text-gray-900 dark:text-gray-100 text-sm">
                {lang === "en" ? "Sort by" : "Trier par"}
              </span>
              <Select.Root></Select.Root>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
};

export default Settings;
