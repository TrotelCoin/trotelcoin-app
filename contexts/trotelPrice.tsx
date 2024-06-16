import React, { Dispatch } from "react";

const TrotelPriceContext = React.createContext({
  trotelPrice: null as number | null,
  setTrotelPrice: {} as Dispatch<React.SetStateAction<number | null>>,
  trotelPriceLoading: false as boolean,
  setTrotelPriceLoading: {} as Dispatch<React.SetStateAction<boolean>>,
});

export default TrotelPriceContext;
