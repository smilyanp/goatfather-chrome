import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { User } from "firebase/auth";
import {
  Box,
  Heading,
  Text,
  Button,
  HStack,
  Divider,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import firebaseConfig from "./firebase.config";

import Login from "./components/Login";
import { Modal } from "./components/Modal";
import { PopulateFields } from "./components/PopulateFields";
import { CollectFields } from "./components/CollectFields";
import { GoatfatherSettingsNotOpen } from "./components/GoatfatherSettingsNotOpen";

import { CollectedFields } from "../types/fields";

import { useOnAuthChange } from "./hooks/useOnAuthChange";
import { useIsGoatfatherOpen } from "./hooks/useIsGoatfatherOpen";
import { useGetAllPairNames } from "./hooks/useGetAllPairNames";
import { useSignout } from "./hooks/useSignout";
import { useSelectedPair } from "./hooks/useSelectedPair";
import { Calibration } from "./components/Callibration";

// Connect to firebase
const firebaseApp = initializeApp(firebaseConfig);

// Main layout
function Popup({
  defaultUser,
  defaultPair,
  defaultCollectedFields,
}: {
  defaultUser: User | undefined;
  defaultPair: string | undefined;
  defaultCollectedFields: CollectedFields;
}) {
  const [loading, setLoading] = useState<string | boolean>(false);

  const updatedUser = useOnAuthChange(defaultUser);
  const { selectedPair, setSelectedPair } = useSelectedPair(defaultPair);
  const signout = useSignout();
  const isGoatfatherOpen = useIsGoatfatherOpen();

  const { isLoading, pairs } = useGetAllPairNames(firebaseApp);

  if (!isGoatfatherOpen) return <GoatfatherSettingsNotOpen />;
  if (!!updatedUser) {
    return (
      <Modal>
        {(loading || isLoading) && (
          <>
            <Heading size="md">{isLoading ? "Loading..." : loading}</Heading>
            <Text marginTop={5}>Please don't close the plugin</Text>
          </>
        )}

        <Box visibility={loading || isLoading ? "hidden" : "visible"}>
          <HStack spacing={2} marginBottom={5}>
            <PairSelector
              pairs={pairs}
              selectedPair={selectedPair}
              setSelectedPair={setSelectedPair}
            />
            <Button onClick={() => signout()}>Signout</Button>
            <Calibration onLoading={setLoading} />
          </HStack>

          {selectedPair && (
            <>
              <CollectFields
                firebaseApp={firebaseApp}
                onLoading={setLoading}
                pair={selectedPair}
                defaultCollectedFields={defaultCollectedFields}
              />
              <SectionSeparator title="Database section" />
              <PopulateFields
                firebaseApp={firebaseApp}
                onLoading={setLoading}
                pair={selectedPair}
              />
            </>
          )}
        </Box>
      </Modal>
    );
  }
  return <Login />;
}

const PairSelector = ({ selectedPair, pairs, setSelectedPair }) => (
  <Select
    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedPair(event.target.value);
    }}
  >
    <option
      value=""
      selected={selectedPair === "" || selectedPair === undefined}
    >
      Select pair
    </option>
    {pairs.map(({ name, isPopulated }) => (
      <option key={name} value={name} selected={selectedPair === name}>
        {name} {isPopulated && "🐐"}
      </option>
    ))}
  </Select>
);

const SectionSeparator = ({ title }: { title: string }) => (
  <Box position="relative" mt={10} mb={10}>
    <Divider />
    <AbsoluteCenter bg="white" px="4">
      {title}
    </AbsoluteCenter>
  </Box>
);

export default Popup;
