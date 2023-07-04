import React from "react";
import { Heading } from "@chakra-ui/react";
import { Modal } from "./Modal";

export const GoatfatherSettingsNotOpen = () => {
  return (
    <Modal>
      <Heading size="md">
        Open the Goatfather settings menu in Tradingview and try again
      </Heading>
    </Modal>
  );
};
