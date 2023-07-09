export const goatFatherName = "Goatfather 4.0";
export const goatFatherTitle = `[data-dialog-name="${goatFatherName}"]`;

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
  const input = $(`:econtains('${label}')`).parent().next().find("input");
  setNativeInputValue(input[0], value);
};

export const setInputValueAndRecalculate = (label: string, value: string) =>
  new Promise((resolve, reject) => {
    const input = $(`:econtains('${label}')`).parent().next().find("input");

    input.focus();
    setNativeInputValue(input[0], value);

    setTimeout(() => {
      input.blur();
      resolve(true);
    }, 600);
  });

export const setNativeInputValue = (element: any, value: string) => {
  // https://github.com/facebook/react/issues/10135
  const lastValue = element.value;
  element.value = value;
  // @ts-ignore
  const event = new Event("input", { target: element, bubbles: true });

  // React 16
  const tracker = element._valueTracker;
  if (tracker) {
    tracker.setValue(lastValue);
  }
  element.dispatchEvent(event);
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

export const openGoatfatherSettings = () => {
  $(`[data-name="legend-source-title"]:econtains("${goatFatherName}")`)
    .parent()
    .parent()
    .parent()
    .find('[data-name="legend-settings-action"]')[0]
    .dispatchEvent(new Event("touchend"));
};

// https://medium.com/hackernoon/functional-javascript-resolving-promises-sequentially-7aac18c4431e
export const runSequential = (funcs) =>
  funcs.reduce(
    (promise, func) =>
      promise.then((result) =>
        func().then(Array.prototype.concat.bind(result))
      ),
    Promise.resolve([])
  );

export const getBiggestProfitFromArray = (array) =>
  array.reduce((prev, current) =>
    prev.profit > current.profit ? prev : current
  );

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));
