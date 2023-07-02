export const getFieldType = (label: string) => {
  const input = $(`:econtains('${label}')`)
    .parent()
    .next()
    .find("input").length;
  const select = $(`:econtains('${label}')`)
    .parent()
    .next()
    .find('[data-role="listbox"]').length;
  const colorSelect = $(`:econtains('${label}')`)
    .parent()
    .next()
    .find('[data-name="color-select"]').length;
  const checkbox = $(`:econtains('${label}')`)
    .children()
    .find('input[type="checkbox"]').length;

  if (input > 0) return "input";
  if (select > 0) return "select";
  if (colorSelect > 0) return "colorSelect";
  if (checkbox > 0) return "checkbox";
  return "unknown";
};

export const getFieldRows = () => {
  const cells = $('[data-dialog-name="Goatfather 4.0"] [class^=cell-]');
  const firstAndFillCells = [...cells].filter(
    (element) =>
      (element.getAttribute("class").includes("first-") ||
        element.getAttribute("class").includes("fill-")) &&
      !element.getAttribute("class").includes("adaptive-") &&
      !element.getAttribute("class").includes("inlineRow-")
  );
  return firstAndFillCells;
};

export const processEachField = (callback) => {
  const fieldRows = getFieldRows();
  $(fieldRows).each((index, fieldRow) => {
    const fieldLabel = $(fieldRow).children().text();
    const fieldType = getFieldType(fieldLabel);
    const forbiddenFields = ["unknown", "colorSelect", "checkbox"];

    if (!forbiddenFields.includes(fieldType)) {
      callback(fieldType, fieldLabel, fieldRow);
    }
  });
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
