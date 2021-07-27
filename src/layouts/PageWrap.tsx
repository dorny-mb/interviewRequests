import { Flex, FlexProps } from "@chakra-ui/core";
import moment from "moment";
import * as React from "react";
import { Helmet } from "react-helmet";

type PageWrapProps = FlexProps & {
  title: string;
  withNav?: boolean;
};

const PageWrap: React.FC<PageWrapProps> = ({ children, title, ...rest }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Flex {...rest}>{children}</Flex>
      <Flex fontSize="xs" textAlign="center" justify="center" align="center">
        Copyright {moment().format("yyyy")} &copy; Designed by Dorny Muba
      </Flex>
    </>
  );
};

PageWrap.defaultProps = {
  p: 0,
  flex: 1,
  bg: "gray.100",
  height: "100%",
  flexDir: "column",
  minHeight: "100vh",
  align: "flex-start",
  justify: "flex-start",
};

export default PageWrap;
