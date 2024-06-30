import React, { Dispatch } from "react";

const TrotelPriceContext = React.createContext({
  trotelPrice: null as number | null,
  setTrotelPrice: {} as Dispatch<React.SetStateAction<number | null>>,
  trotelPriceLoading: false as boolean,
  setTrotelPriceLoading: {} as Dispatch<React.SetStateAction<boolean>>,
  showTrotelInUsdc: false as boolean,
  setShowTrotelInUsdc: {} as Dispatch<React.SetStateAction<boolean>>,
  toggleShowInUsdc: {} as () => void,
  trotelPriceRounded: null as number | null,
  setTrotelPriceRounded: {} as Dispatch<React.SetStateAction<number | null>>,
  storedTrotelPrice: null as number | null,
  setStoredTrotelPrice: {} as Dispatch<React.SetStateAction<number | null>>
});

export default TrotelPriceContext;
