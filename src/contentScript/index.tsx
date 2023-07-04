import { FieldInUI } from "../types/fields";
import { waitForElm } from "../utils";
import {
  getFieldType,
  scrapeEachField,
  setInputValue,
  setSelectDropdownValue,
} from "./utils";

const goatFatherTitle = '[data-dialog-name="Goatfather 4.0"]';

chrome.runtime.onMessage.addListener(async (msg, sender, response) => {
  if (msg.from === "popup" && msg.subject === "IsGoatfatherSettingsOpen") {
    response($(goatFatherTitle).length > 0);
  }
  if (msg.from === "popup" && msg.subject === "GetPairSettings") {
    const fields = await getFieldValuesInModal();
    const overview = await getOverviewValues();

    response({
      overview,
      fields,
    });
  }
  if (msg.from === "popup" && msg.subject === "PopulatePairSettings") {
    await updateFieldsValuesInModal(msg.data);
    response("done");
  }
});

const getOverviewValues = () => {
  return new Promise((resolve, reject) => {
    const overviewValues = [];
    const overviewFields = $(".backtesting-content-wrapper").find(
      "[class^=containerCell-]"
    );
    $.each(overviewFields, (index, record) => {
      const fieldName = $(record).find("[class^=title-]").text();
      const fieldValue = $(record)
        .find("[class^=secondRow-]")
        .children()
        .first()
        .text();
      overviewValues.push({ name: fieldName, value: fieldValue });
    });
    resolve(overviewValues);
  });
};

const getFieldValuesInModal = () => {
  return new Promise((resolve, reject) => {
    waitForElm(goatFatherTitle).then((el: HTMLElement) => {
      const fields = scrapeEachField();
      resolve(fields);
    });
  });
};

const updateFieldsValuesInModal = (fields) =>
  new Promise((resolve, reject) => {
    waitForElm(goatFatherTitle).then((el: HTMLElement) => {
      fields.forEach((field) => {
        const fieldType = getFieldType(field.name);
        if (fieldType === "input") {
          setInputValue(field.name, field.value);
        }
        if (fieldType === "select") {
          setSelectDropdownValue(field.name, field.value);
        }
        console.log("populate values");
      });
    });
  });
