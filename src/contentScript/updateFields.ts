import {
  getFieldType,
  goatFatherTitle,
  setInputValue,
  setSelectDropdownValue,
  waitForElm,
} from "./utils";

export const updateFieldsValuesInModal = (fields) =>
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
      });
    });
  });
