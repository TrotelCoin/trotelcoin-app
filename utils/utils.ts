import { useState, useEffect } from "react";
import { Address } from "viem";

export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const reduceAddressSize = (address: Address): Address => {
  const prefix = address.slice(0, 6) as Address;
  const suffix = address.slice(-6);
  return `${prefix}...${suffix}`;
};
