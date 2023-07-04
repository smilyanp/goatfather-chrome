import { CollectedFields } from "../types/fields";
import { User } from "firebase/auth";
export const getSelectedPairFromStorage = async () => {
  const result = await chrome.storage.local.get(["selectedPair"]);
  return result.selectedPair;
};
export const getCollectedFieldsFromStorage = async () => {
  const result = await chrome.storage.local.get(["collectedFields"]);
  return result.collectedFields;
};
export const getLoggedInUserFromStorage = async () => {
  const result = await chrome.storage.local.get(["user"]);
  return result.user;
};

export const setSelectedPairInStorage = async (selectedPair: string) => {
  await chrome.storage.local.set({ selectedPair });
};
export const setCollectedFieldsInStorage = async (
  collectedFields: CollectedFields
) => {
  await chrome.storage.local.set({ collectedFields });
};
export const setLoggedInUserInStorage = async (user: User | null) => {
  await chrome.storage.local.set({ user });
};
