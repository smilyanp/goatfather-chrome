import { Button } from "@chakra-ui/react";
import React from "react";
import { sendTabMessage } from "../utils";

export const Calibration = ({ onLoading }) => {
  const handleCalibration = () => {
    onLoading("Calibrating...");
    sendTabMessage("Calibrate", (calibrated) => {
      if (calibrated) {
        console.log("Calibrated");
      }
      onLoading(false);
    });
  };
  return <Button onClick={() => handleCalibration()}>Start calibration</Button>;
};
