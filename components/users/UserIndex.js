import { Flex } from "@chakra-ui/react";
import React from "react";

const UserIndex = () => {
  return (
    <Flex w="100%" overflowX="scroll" h="100%" justifyContent="center">
      <Flex w="768px" h="100%" direction="column">
        Users
      </Flex>
    </Flex>
  );
};

export default UserIndex;
