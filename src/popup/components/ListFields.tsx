import React from "react";
import { FieldInUI, OverviewValue } from "../../types/fields";
import {
  Stat,
  StatLabel,
  StatNumber,
  Wrap,
  WrapItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  TableContainer,
} from "@chakra-ui/react";

export const Fields = ({
  fields,
}: {
  fields: FieldInUI[] | [] | undefined;
}) => {
  return (
    <>
      {fields && fields.length > 0 && (
        <TableContainer marginBottom={5}>
          <Table
            __css={{ tableLayout: "fixed", width: "full" }}
            variant="striped"
            size="sm"
          >
            <Thead>
              <Tr>
                <Th>Field</Th>
                <Th>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {fields.map((field) => (
                <Tr key={field.name + "-" + field.value}>
                  <Td>
                    <Wrap>
                      <Text
                        as="b"
                        style={{
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                        }}
                      >
                        {field.name}
                      </Text>
                    </Wrap>
                  </Td>
                  <Td>{field.value}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export const Overview = ({
  overview,
}: {
  overview: OverviewValue[] | [] | undefined;
}) => {
  return (
    <>
      {overview && overview.length > 0 ? (
        <Wrap marginBottom={5}>
          {overview.map((item) => (
            <WrapItem
              flex="1 25%"
              marginBottom={5}
              key={item.name + "--" + item.value}
            >
              <Stat key={item.name}>
                <StatLabel>{item.name}</StatLabel>
                <StatNumber fontSize="md">{item.value}</StatNumber>
              </Stat>
            </WrapItem>
          ))}
        </Wrap>
      ) : null}
    </>
  );
};
