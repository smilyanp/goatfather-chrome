import React from "react";
import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import { CollectedFields } from "../../types/fields";
import { sendTabMessage } from "../utils";
import { Fields, Overview } from "./ListFields";
import { savePairSettingsToDB } from "../db";
import { useCollectedFields } from "../hooks/useCollectedFields";

export const CollectFields = ({
  firebaseApp,
  onLoading,
  pair,
  defaultCollectedFields,
}) => {
  const { collectedFields, setCollectedFields, resetCollectedFields } =
    useCollectedFields(defaultCollectedFields);

  const handleSaveFields = async (
    updatedFields: CollectedFields,
    pair: string
  ) => {
    onLoading("Saving fields to database...");
    await savePairSettingsToDB(firebaseApp, updatedFields, pair);
    onLoading(false);
  };

  const handleGetFields = async () => {
    onLoading("Collecting field values from modal...");
    sendTabMessage("GetPairSettings", (scraped) => {
      if (scraped) {
        setCollectedFields({
          fields: scraped.fields,
          overview: scraped.overview,
        });
      }
      onLoading(false);
    });
  };

  const handleResetFields = () => {
    onLoading("Clearing collected fields...");
    resetCollectedFields();
    onLoading(false);
  };

  return (
    <>
      {/* Actions */}
      <Box marginBottom={5}>
        <Stack direction="row" spacing={4}>
          <Button colorScheme="teal" onClick={() => handleGetFields()}>
            Collect field values
          </Button>
          {collectedFields?.fields && collectedFields.fields.length > 0 && (
            <Button onClick={() => handleSaveFields(collectedFields, pair)}>
              Save collection to database
            </Button>
          )}
          {collectedFields?.fields && collectedFields.fields.length > 0 && (
            <Button variant="outline" onClick={() => handleResetFields()}>
              Clear collection
            </Button>
          )}
        </Stack>
      </Box>

      {/* List */}
      {collectedFields?.fields && collectedFields.fields.length > 0 && (
        <Box marginBottom={5}>
          <Heading marginBottom={5} size="md">
            Collected fields
          </Heading>
          <Overview overview={collectedFields.overview} />
          <Fields fields={collectedFields.fields} />
        </Box>
      )}
    </>
  );
};
