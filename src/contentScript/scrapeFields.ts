import {
  getFieldType,
  getInputValue,
  getSelectDropdownValue,
  goatFatherTitle,
  waitForElm,
} from "./utils";

export const getFieldValuesInModal = () => {
  return new Promise((resolve, reject) => {
    waitForElm(goatFatherTitle).then((el: HTMLElement) => {
      const fields = scrapeEachField();
      resolve(fields);
    });
  });
};

export const scrapeEachField = () => {
  const fieldRows = getFieldRows();

  const fields = [];
  $(fieldRows).each((index, fieldRow) => {
    const fieldLabel = $(fieldRow).children().text();
    const fieldType = getFieldType(fieldLabel);

    const forbiddenFields = ["unknown", "colorSelect", "checkbox"];

    if (!forbiddenFields.includes(fieldType)) {
      if (fieldType === "input") {
        const value = getInputValue(fieldLabel);
        fields.push({
          type: fieldType,
          name: fieldLabel,
          value,
        });
      }

      if (fieldType === "select") {
        const value = getSelectDropdownValue(fieldLabel);
        fields.push({
          type: fieldType,
          name: fieldLabel,
          value,
        });
      }
    }
  });

  return fields;
};

export const getOverviewValues = () => {
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

export const getFieldRows = () => {
  const cells = $('[data-dialog-name="Goatfather 4.0"] [class^=cell-]');
  const firstAndFillCells = [...cells].filter(
    (element) =>
      (element.getAttribute("class").includes("first-") ||
        element.getAttribute("class").includes("fill-")) &&
      !element.getAttribute("class").includes("adaptive-") && // remove titles
      !element.getAttribute("class").includes("inlineCell-") // remove checkboxes with inputs
  );
  return firstAndFillCells;
};
