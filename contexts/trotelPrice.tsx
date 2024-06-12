import React, { Dispatch } from "react";

const TrotelPriceContext = React.createContext({
  trotelPrice: 0 as number,
  setTrotelPrice: {} as Dispatch<React.SetStateAction<number>>,
  trotelPriceLoading: false as boolean,
  setTrotelPriceLoading: {} as Dispatch<React.SetStateAction<boolean>>,
});

export default TrotelPriceContext;
