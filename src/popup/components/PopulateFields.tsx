import React from "react";
import { Button, Box, Heading } from "@chakra-ui/react";
import { sendTabMessage } from "../utils";
import { getPairSettingsFromDB } from "../db";
import { useGetPairSettingsFromDB } from "../hooks/useGetPairSettingsFromDB";
import { Fields, Overview } from "./ListFields";

export const PopulateFields = ({ onLoading, firebaseApp, pair }) => {
  const { fields, overview } = useGetPairSettingsFromDB(firebaseApp, pair);

  const handlePopulateFields = async (pair: string) => {
    onLoading("Populating fields...");
    const latestSettingsFromDb = await getPairSettingsFromDB(firebaseApp, pair);

    sendTabMessage(
      "PopulatePairSettings",
      (response) => {
        onLoading(false);
      },
      latestSettingsFromDb.fields
    );
  };

  if (overview.length === 0 && fields.length === 0) {
    return (
      <Box marginBottom={5}>
        <Heading marginBottom={5} size="md">
          There is not data for this pair in the database
        </Heading>
      </Box>
    );
  }
  return (
    <Box marginBottom={5}>
      {/* Actions */}
      <Button
        colorScheme="teal"
        marginBottom={5}
        onClick={() => handlePopulateFields(pair)}
      >
        Populate field values from database
      </Button>
      <Heading marginBottom={5} size="md">
        Saved fields for this pair from the database
      </Heading>

      {/* List */}
      <Overview overview={overview} />
      <Fields fields={fields} />
    </Box>
  );
};
