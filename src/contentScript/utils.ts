import { waitForElm } from "../utils";

export const goatFatherTitle = '[data-dialog-name="Goatfather 4.0"]';

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

export const getFieldValuesInModal = () => {
  return new Promise((resolve, reject) => {
    waitForElm(goatFatherTitle).then((el: HTMLElement) => {
      const fields = scrapeEachField();
      resolve(fields);
    });
  });
};

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

export const getFieldType = (label: string) => {
  const checkbox = $(`:econtains('${label}')`)
    .children()
    .find('input[type="checkbox"]').length;

  if (checkbox > 0) return "checkbox";

  const input = $(`:econtains('${label}')`)
    .parent()
    .next()
    .find("input").length;

  if (input > 0) return "input";

  const select = $(`:econtains('${label}')`)
    .parent()
    .next()
    .find('[data-role="listbox"]').length;

  if (select > 0) return "select";

  const colorSelect = $(`:econtains('${label}')`)
    .parent()
    .next()
    .find('[data-name="color-select"]').length;

  if (colorSelect > 0) return "colorSelect";

  return "unknown";
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

export const setSelectDropdownValue = (label: string, value: string) => {
  // Find select and open it
  $(`:econtains('${label}')`)
    .parent()
    .next()
    .find('[data-role="listbox"]')
    .trigger("click");

  // Select the value from the drop-down
  $('[data-name="menu-inner"]')
    .find(`:econtains('${value}')`)
    .first()
    .trigger("click");
};

export const setInputValue = (label: string, value: string) => {
  // Find input and set value
  $(`:econtains('${label}')`).parent().next().find("input").val(value);
};

export const getSelectDropdownValue = (label: string) => {
  // Find select and open it
  return $(`:econtains('${label}')`)
    .parent()
    .next()
    .find('[data-role="listbox"]')
    .find("[class^=button-children]")
    .children()
    .text();
};

export const getInputValue = (label: string) => {
  // Find input and set value
  return $(`:econtains('${label}')`).parent().next().find("input").val();
};
