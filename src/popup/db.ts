import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { FirebaseApp } from "firebase/app";
import { convertDataToDb, convertDbFieldsToUiFields } from "./utils";
import { FieldInUI, OverviewValue } from "../types/fields";

export const getPairSettingsFromDB = async (
  firebaseApp: FirebaseApp,
  pair: string
) => {
  const db = getFirestore(firebaseApp);

  const docSnapshot = await getDoc(doc(db, "pairSettings", pair));
  if (docSnapshot.exists()) {
    const pairData = docSnapshot.data();
    const fields = convertDbFieldsToUiFields(pairData.fields) as FieldInUI[];
    const overview = convertDbFieldsToUiFields(
      pairData.overview
    ) as OverviewValue[];
    console.log("** fields", fields, "overview", overview);
    return {
      fields,
      overview,
    };
  }
  return {
    fields: [],
    overview: [],
  };
};

export const savePairSettingsToDB = async (
  firebaseApp: FirebaseApp,
  { fields, overview }: { fields: FieldInUI[]; overview: OverviewValue[] },
  pair: string
) => {
  const db = getFirestore(firebaseApp);
  await setDoc(
    doc(db, "pairSettings", pair),
    convertDataToDb(overview, fields)
  );
};

export const getAllPairsFromDB = async (
  firebaseApp: FirebaseApp
): Promise<string[]> => {
  const db = getFirestore(firebaseApp);

  const pairsSnapshot = await getDocs(collection(db, "pairSettings"));
  const pairs = [];
  pairsSnapshot.forEach((pair) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log("** pairs", pair.id, " => ", pair.data());
    pairs.push(pair.id);
  });
  return pairs;
};

// reset all pair settings to empty
// export const saveAllPairSettingsToDB = async (firebaseApp: FirebaseApp) => {
//   const allPairs = [
//     "ETHUSD",
//     "BTCUSD",
//     "XAUUSD",
//     "AUDCAD",
//     "AUDCHF",
//     "AUDJPY",
//     "AUDNZD",
//     "AUDUSD",
//     "CADCHF",
//     "CADJPY",
//     "CHFJPY",
//     "EURAUD",
//     "EURCAD",
//     "EURCHF",
//     "EURGBP",
//     "EURJPY",
//     "EURNZD",
//     "EURUSD",
//     "NZDCAD",
//     "NZDCHF",
//     "NZDJPY",
//     "NZDUSD",
//     "GBPAUD",
//     "GBPCAD",
//     "GBPCHF",
//     "GBPJPY",
//     "GBPNZD",
//     "GBPUSD",
//     "USDCAD",
//     "USDCHF",
//     "USDJPY",
//   ];
//   const db = getFirestore(firebaseApp);
//   allPairs.forEach(async (pair) => {
//     await setDoc(doc(db, "pairSettings", pair), { overview: {}, fields: {} });
//   });
// };
