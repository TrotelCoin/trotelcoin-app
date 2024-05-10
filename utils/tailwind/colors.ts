import { Colors } from "@/types/components/components";

export const blueClass =
  "bg-blue-500 dark:bg-blue-500 active:bg-blue-400 dark:active:bg-blue-400";

export const greenClass =
  "bg-green-500 dark:bg-green-500 active:bg-green-400 dark:active:bg-green-400";

export const orangeClass =
  "bg-orange-500 dark:bg-orange-500 active:bg-orange-400 dark:active:bg-orange-400";

export const purpleClass =
  "bg-purple-500 dark:bg-purple-500 active:bg-purple-400 dark:active:bg-purple-400";

export const redClass =
  "bg-red-500 dark:bg-red-500 active:bg-red-400 dark:active:bg-red-400";

export const yellowClass =
  "bg-yellow-500 dark:bg-yellow-500 active:bg-yellow-400 dark:active:bg-yellow-400";

export const colorClass = (color: Colors) => {
  let colorClass: string = "";

  switch (color) {
    case "Blue":
      colorClass = blueClass;
      break;
    case "Green":
      colorClass = greenClass;
      break;
    case "Orange":
      colorClass = orangeClass;
      break;
    case "Purple":
      colorClass = purpleClass;
      break;
    case "Red":
      colorClass = redClass;
      break;
    case "Yellow":
      colorClass = yellowClass;
      break;
    default:
      break;
  }

  return colorClass;
};
