import { fieldsToUpdate } from "./calibrationFields";
import {
  getPercentProfitableValue,
  getTotalClosedTradesValue,
} from "./scrapeFields";
import {
  delay,
  getBiggestProfitFromArray,
  goatFatherTitle,
  runSequential,
  setInputValueAndRecalculate,
  setSelectDropdownValue,
  waitForElm,
} from "./utils";

export const calibratePair = async () => {
  // Make sure the modal is open
  await waitForElm(goatFatherTitle);

  // Create of fields to analyse
  const promises = fieldsToUpdate.map((field) => async () => {
    await findBestProfitForField(field);
  });

  // Delay start so we can click back into the settings modal
  await delay(3000);

  // Analyse each field
  await runSequential(promises);
};

const findBestProfitForField = async (field: any) => {
  let tries;
  let inputValue;
  let results = [];

  if (field.type === "input") {
    tries = new Array(field.attempts).fill(0);
    inputValue = Number(field.startingValue);
    await setInputValueAndRecalculate(field.name, `${inputValue}`);
  }
  if (field.type === "select") {
    tries = field.options;
    inputValue = field.startingValue;
    setSelectDropdownValue(field.name, inputValue);
  }

  const startingProfit = await waitForLatestPercentProfitable();
  const startingClosedTrades = getTotalClosedTradesValue();

  // Add the starting value as a consideration
  results.push({
    profit: startingProfit,
    trades: startingClosedTrades,
    value: field.startingValue,
    type: field.type,
  });

  const promises = tries.map((selectValue) => async () => {
    if (field.type === "input") {
      inputValue = inputValue + Number(field.increments);
      await setInputValueAndRecalculate(field.name, `${inputValue}`);
    }
    if (field.type === "select") {
      inputValue = inputValue + Number(field.increments);
      setSelectDropdownValue(field.name, selectValue);
    }

    const updatedProfit = await waitForLatestPercentProfitable();
    const totalClosedTrades = getTotalClosedTradesValue();

    return {
      profit: updatedProfit,
      trades: totalClosedTrades,
      value: field.type === "input" ? inputValue : selectValue,
      type: field.type,
    };
  });

  results.push(...(await runSequential(promises)));
  const bestField = getBiggestProfitFromArray(results);

  if (field.type === "input") {
    await setInputValueAndRecalculate(field.name, `${bestField.value}`);
  }
  if (field.type === "select") {
    setSelectDropdownValue(field.name, bestField.value);
  }

  // Delay before starting the next field
  await delay(200);
  console.log("**", field.name, bestField, results);
};

const spinnerSelector =
  "[class^=backtesting-content-wrapper] .tv-spinner.tv-spinner--shown";
const percentProfitableSelector =
  "[class^=reportContainer] [class^=containerCell]:nth-child(3) > [class^=secondRow] > div:first-child";

const waitForLatestPercentProfitable = () => {
  return new Promise(async (resolve, reject) => {
    // Wait for loader
    await waitForElm(spinnerSelector);
    // Then wait for report container
    await waitForElm(percentProfitableSelector);
    await delay(600);

    resolve(getPercentProfitableValue());
  });
};
