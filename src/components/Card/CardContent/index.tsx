import { Flex, FlexProps } from "@chakra-ui/core";
import * as React from "react";

type CardContentProps = FlexProps;

const CardContent: React.FC<CardContentProps> = ({ children, ...rest }) => {
  return (
    <Flex borderTopWidth="1px" {...rest}>
      {children}
    </Flex>
  );
};

export default CardContent;

CardContent.defaultProps = {
  pt: 2,
  pb: 2,
  pr: 4,
  pl: 4,
  bg: "white",
  roundedBottomLeft: 4,
  roundedBottomRight: 4,
  flexDirection: "column",
  border: "none",
};
