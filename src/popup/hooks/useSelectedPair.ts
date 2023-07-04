import { useEffect, useState } from "react";
import {
  getSelectedPairFromStorage,
  setSelectedPairInStorage,
} from "../storage";

export const useSelectedPair = (defaultPair: string) => {
  const [pair, setPair] = useState(defaultPair);

  const handleSetSelectedPair = (pair: string) => {
    setSelectedPairInStorage(pair);
    setPair(pair);
  };
  useEffect(() => {
    getSelectedPairFromStorage().then((selectedPair) => {
      setPair(selectedPair);
    });
  }, []);

  return {
    selectedPair: pair,
    setSelectedPair: handleSetSelectedPair,
  };
};
