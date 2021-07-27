import { Flex } from "@chakra-ui/core";
import styled from "@emotion/styled";

import { color, justifyContent, space, SpaceProps } from "styled-system";

export const StyledTable = styled.div<SpaceProps>`
  ${space};
  flex: 1;
  width: 100%;
  display: flex;
  max-width: 100%;
  overflow-x: auto;
  border-radius: 4px;
  flex-direction: column;
  box-sizing: border-box;
`;

export const TableHead = styled.div<SpaceProps>`
  ${space};
  display: flex;
  flex-direction: row;
`;

export const TableCell = styled(Flex)`
  ${space};
  ${color};
  ${justifyContent};
  flex: 1;
  width: auto;
  display: flex;
  min-width: 50px;
  align-items: center;
  border-bottom-width: 1px;
`;

export const TableRow = styled(Flex)`
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.01);
  }
`;
