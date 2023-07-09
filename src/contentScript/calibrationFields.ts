const YesNo = ["Yes", "No"];

/*

Target section

    Fields:
    - Fixed Target Multiple Ratio - values: 0.25, 0.5, ... to 2

    Rules:
    - For each value in the field above, run a new report of the below sections

Stoploss section

    Fields:
    - Type of Stoploss - values: "ATR", "Swing High/Low"
    = ATR Stoploss Multiple from Entry - values: 0.25, 0.5, ... to 5
    = No of Previous Candles to check for Swing High/Low Stop - values: 5, 10, ... to 50

    Rules:
    - For each type of stop loss, change the respective input field and
    - run a new report of the below sections

EMA section

    Fields:
    - Fast EMA - values: 5, 7.5, ... to 100
    - Slow EMA - values: 50, 60, ... to 300

    Rules:
    - Start with the Slow EMA at 50
    - Increase the Fast EMA from 5 to 45 by 2.5
    - When the Fast EMA reaches close to the slow one, increase the slow by 10 until 100
    - Then keep increasing the Fast one until 95

    - Alternatively, when Fast EMA get to 45, keep increasing the slow one by then in parallel



*/

export const fieldsToUpdate = [
  {
    name: "Fixed Target Multiple Ratio",
    type: "input",
    startingValue: 0.25,
    increments: 0.25,
    attempts: 4,
  },

  // start with slow at 50
  // run fast all the way

  {
    // 2-100
    name: "Fast EMA",
    type: "input",
    startingValue: 5,
    increments: 2.5,
    attempts: 5,
  },
  {
    // 2-100
    name: "ATR Stoploss Multiple from Entry",
    type: "input",
    startingValue: 1,
    increments: 0.25,
    attempts: 5, // Maximum value to be 5
  },

  // No of Previous Candles to check for Swing High/Low Stop
  // Max value 50
  // Increment 5
  // Start at 5
  {
    // 2-100
    name: "ATR Length",
    type: "input",
    startingValue: 14,
    increments: 0,
    attempts: 0,
  },
  {
    // 50-300
    name: "Slow EMA",
    type: "input",
    startingValue: 20,
    increments: 5,
    attempts: 5,
  },
  {
    name: "Type of Stoploss",
    type: "select",
    startingValue: "ATR",
    options: ["ATR", "Swing Low/High"],
  },
  {
    name: "Use Fast EMA Cross Valid Candles Filter",
    type: "select",
    startingValue: "No",
    options: YesNo,
  },
  {
    name: "Use Slow EMA Cross Valid Candles Filter",
    type: "select",
    startingValue: "No",
    options: YesNo,
  },
  {
    name: "Use QQE Filter",
    type: "select",
    startingValue: "No",
    options: YesNo,
  },
  {
    name: "Use RSI Filter",
    type: "select",
    startingValue: "No",
    options: YesNo,
  },
  {
    name: "Use VMC Chart Signal Filter",
    type: "select",
    startingValue: "No",
    options: YesNo,
  },
  {
    name: "Use Buy/Sell Signal Filter",
    type: "select",
    startingValue: "No",
    options: YesNo,
  },
  {
    name: "Use Normalised MACD Cross Filter",
    type: "select",
    startingValue: "No",
    options: YesNo,
  },
  {
    name: "Use Normalised MACD Change % Filter",
    type: "select",
    startingValue: "No",
    options: YesNo,
  },
  {
    name: "Use Stochastic Cross Filter",
    type: "select",
    startingValue: "No",
    options: YesNo,
  },
  {
    name: "Use Stochastic Change % Filter",
    type: "select",
    startingValue: "No",
    options: YesNo,
  },
  {
    name: "Use Consolidation Zone Minimum EMA Filter",
    type: "select",
    startingValue: "No",
    options: YesNo,
  },
  {
    name: "Use Candle Cluster Filter",
    type: "select",
    startingValue: "No",
    options: YesNo,
  },
];
