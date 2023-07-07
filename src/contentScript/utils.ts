export const goatFatherTitle = '[data-dialog-name="Goatfather 4.0"]';

export function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

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
