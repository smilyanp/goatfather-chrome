import { useEffect, useState } from "react";
import { CollectedFields } from "../../types/fields";
import {
  getCollectedFieldsFromStorage,
  setCollectedFieldsInStorage,
} from "../storage";

export const useCollectedFields = (defaultCollectedFields: CollectedFields) => {
  const [collectedFields, setCollectedFields] = useState(
    defaultCollectedFields
  );

  const handleSetCollectedFields = async (updatedFields: CollectedFields) => {
    await setCollectedFieldsInStorage(updatedFields);
    setCollectedFields(updatedFields);
  };

  const handleResetCollectedFields = async () => {
    const emptyFields = { fields: [], overview: [] };
    await setCollectedFieldsInStorage(emptyFields);
    setCollectedFields(emptyFields);
  };

  useEffect(() => {
    getCollectedFieldsFromStorage().then((savedFields) => {
      setCollectedFields(savedFields);
    });
  }, []);

  return {
    collectedFields,
    setCollectedFields: handleSetCollectedFields,
    resetCollectedFields: handleResetCollectedFields,
  };
};
