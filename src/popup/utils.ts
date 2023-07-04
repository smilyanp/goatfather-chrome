import { FieldInDB, FieldInUI, OverviewValue } from "../types/fields";

export const sendTabMessage = (subject: string, callback: any, data?: any) => {
  const queryOptions = { active: true, currentWindow: true };
  chrome.tabs.query(queryOptions).then((tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { from: "popup", subject, data },
      callback
    );
  });
};
export const convertUiFieldsToDbFields = (fields: FieldInUI[]) =>
  fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]: {
        name: field.name,
        type: field.type,
        value: field.value,
      },
    }),
    {}
  );

export const convertDataToDb = (
  overview: OverviewValue[],
  fields: FieldInUI[]
) => {
  const dbFields = convertUiFieldsToDbFields(fields);
  console.log("** convertOverviewToDbFields", overview, dbFields);
  const additionalValues = [
    // Target
    "Glaz Histogram Rise/Drop %",
    "Fixed Target Multiple Ratio",

    // Stoploss
    "ATR Length",
    "ATR Stoploss Multiple from Entry",
    "No of Previous Candles to check for Swing High/Low Stop",
    "Type of Stoploss",
  ];

  // Bottom back testing bar values
  const overviewValues = overview.reduce(
    (acc, item) => ({
      ...acc,
      [item.name]: {
        ...item,
      },
    }),
    {}
  );

  additionalValues.forEach((value) => {
    overviewValues[dbFields[value].name] = {
      name: dbFields[value].name,
      value: dbFields[value].value,
    };
  });

  console.log("** convertOverviewToDbFields - overviewValues", overviewValues);

  return {
    overview: overviewValues,
    fields: dbFields,
  };
};

export const convertDbFieldsToUiFields = (fields: FieldInDB) =>
  Object.keys(fields).map((key) => ({
    name: key,
    type: fields[key].type,
    value: fields[key].value,
  }));
