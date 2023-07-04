export type FieldInDB = {
  [key: string]: {
    type: string;
    value: string;
    name: string;
  };
};

export type FieldInUI = {
  type: string;
  value: string;
  name: string;
};

export type OverviewValue = {
  name: string;
  value: string;
};

export type CollectedFields = {
  overview: OverviewValue[] | undefined;
  fields: FieldInUI[] | undefined;
};
