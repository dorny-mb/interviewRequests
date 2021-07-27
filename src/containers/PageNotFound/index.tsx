import { Button, Flex, Image } from "@chakra-ui/core";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Nav } from "../../components";
import { PageWrap } from "../../layouts";
import { images } from "../../theme";
import { H4, Text } from "../../typography";

const PageNotFound: React.FC<RouteComponentProps> = ({ history }) => {
  console.log(images);
  return (
    <Nav>
      <PageWrap
        title="404"
        justify="center"
        align="center"
        height="100vh"
        width="100vw"
      >
        <Flex justify="center" align="center" p={4} flexDir="column">
          <Image
            mb={6}
            src={images.notFound.default}
            width="350px"
            maxWidth="100%"
            objectFit="contain"
            height="350px"
          />
          <H4>Sorry, we couldn&apos;t find what you were looking for.</H4>
          <Button onClick={() => history.push("/")} mt={6} variantColor="gray">
            <Text fontWeight="lighter">Back Home</Text>
          </Button>
        </Flex>
      </PageWrap>
    </Nav>
  );
};

export default PageNotFound;
