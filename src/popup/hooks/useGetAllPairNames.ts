import { useEffect, useState } from "react";
import { FirebaseApp } from "@firebase/app";
import { getAllPairsFromDB } from "../db";

export const useGetAllPairNames = (firebaseApp: FirebaseApp) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pairs, setPairs] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    getAllPairsFromDB(firebaseApp).then((pairs) => {
      setPairs(pairs);
      setIsLoading(false);
    });
  }, []);

  return {
    isLoading,
    pairs,
  };
};
