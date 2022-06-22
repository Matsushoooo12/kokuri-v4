import { Flex } from "@chakra-ui/react";
import React from "react";

const Users = () => {
  return (
    <Flex
      w="100%"
      overflowX="scroll"
      h="100%"
      justifyContent="center"
      pr="64px"
    >
      <Flex w="768px" h="100%" direction="column">
        Users
      </Flex>
    </Flex>
  );
};

export default Users;
