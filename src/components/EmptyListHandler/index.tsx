import { Flex, Image, Text } from "@chakra-ui/core";
import * as React from "react";
import { images } from "../../theme";
import { H2 } from "../../typography";
import Card from "../Card";
import RevealFlex from "../RevealFlex/index";

type EmptyListHandlerProps = {
  title?: string;
  subTitle?: string;
};

const EmptyListHandler: React.FC<EmptyListHandlerProps> = ({
  title,
  subTitle,
}) => {
  return (
    <Card
      p={4}
      flex={1}
      width="100%"
      align="center"
      maxWidth="100%"
      justify="center"
      flexDirection="column"
    >
      <RevealFlex>
        <Image
          src={images.noData.default}
          width="300px"
          objectFit="contain"
          maxWidth="100%"
          height="300px"
        />
        <Flex
          flexDirection="column"
          textAlign="center"
          w="100%"
          my={4}
          justify="center"
          align="center"
          px={6}
        >
          <H2 fontWeight="400">{title}</H2>
          <Text fontWeight="light">{subTitle}</Text>
        </Flex>
      </RevealFlex>
    </Card>
  );
};

export default EmptyListHandler;

EmptyListHandler.defaultProps = {
  title: "Nothing to see here, yet.",
  subTitle: "Go ahead and create your first record to get started.",
};
