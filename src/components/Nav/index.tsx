import { Flex, Image } from "@chakra-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { images } from "../../theme";

const Nav: React.FC = ({ children }) => {
  const history = useHistory();
  return (
    <>
      <Flex bg="brand.50">
        <Image
          onClick={() => history.push("/")}
          cursor="pointer"
          alt="Offerzen"
          width="8rem"
          mx={10}
          my={6}
          src={images.logo}
        />
      </Flex>
      {children}
    </>
  );
};

export default Nav;
