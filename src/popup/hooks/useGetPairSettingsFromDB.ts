import { useEffect, useState } from "react";
import { FirebaseApp } from "firebase/app";
import { getPairSettingsFromDB } from "../db";
import { CollectedFields } from "../../types/fields";

export const useGetPairSettingsFromDB = (
  firebaseApp: FirebaseApp,
  pair: string
) => {
  const [settings, setSettings] = useState<CollectedFields>({
    fields: [],
    overview: [],
  });

  useEffect(() => {
    getPairSettingsFromDB(firebaseApp, pair).then((dbSettings) => {
      setSettings(dbSettings);
    });
  }, [firebaseApp, pair]);

  return settings;
};
