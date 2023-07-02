import { Field } from "../types/fields";
import { waitForElm } from "../utils";
import {
  getInputValue,
  getSelectDropdownValue,
  processEachField,
  setInputValue,
  setSelectDropdownValue,
} from "./utils";

chrome.runtime.onMessage.addListener(async (msg, sender, response) => {
  if (msg.from === "popup" && msg.subject === "GetPairSettings") {
    const fields = await getFieldValuesInModal();
    response(fields as Field[]);
  }
  if (msg.from === "popup" && msg.subject === "PopulatePairSettings") {
    await updateFieldsValuesInModal();
    response("done");
  }
});

const getFieldValuesInModal = () => {
  return new Promise((resolve, reject) => {
    const title = '[data-dialog-name="Goatfather 4.0"]';
    waitForElm(title).then((el: HTMLElement) => {
      const fields = [];
      processEachField((type, name) => {
        if (type === "input") {
          const value = getInputValue(name);
          fields.push({
            name,
            value,
          });
        }
        if (type === "select") {
          const value = getSelectDropdownValue(name);
          fields.push({
            name,
            value,
          });
        }
      });
      console.log("** fields", fields);
      resolve(fields);
    });
  });
};

const updateFieldsValuesInModal = () =>
  new Promise((resolve, reject) => {
    const title = '[data-dialog-name="Goatfather 4.0"]';
    waitForElm(title).then((el: HTMLElement) => {
      console.log("populate values");
      setInputValue("Slow EMA", "500");
      setSelectDropdownValue("Type of Stoploss", "ATR");
      setSelectDropdownValue("Type of Target", "BOS");
    });
  });
