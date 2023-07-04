import React from "react";
import { Box } from "@chakra-ui/react";

export const Modal = ({ children }: { children: any }) => {
  return (
    <Box width={650} minHeight={800} padding={10}>
      {children}
    </Box>
  );
};
