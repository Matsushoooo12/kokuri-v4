import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

const Introduction = () => {
  return (
    <Flex w="800px" flexWrap="wrap" justifyContent="center">
      <Flex direction="column" mb="32px">
        <Heading fontSize="24px" mb="16px">
          自己紹介
        </Heading>
        <Text mb="16px">
          ああああああああああああああああああああああああああああああああああああああ
          ああああああああああああああああああああああああああああああ
          <br />
          ああああああああああああああああああああああああああああああ
          <br />
          あああああああああああああああああああああああああああああああああ
          あああああああああああああああああああああ
          <br />
        </Text>
        <Image w="400px" h="250px" bg="gray.300" alt="" />
      </Flex>
      <Flex direction="column" mb="32px">
        <Heading fontSize="24px" mb="16px">
          自己紹介
        </Heading>
        <Text mb="16px">
          ああああああああああああああああああああああああああああああああああああああ
          ああああああああああああああああああああああああああああああ
          <br />
          ああああああああああああああああああああああああああああああ
          <br />
          あああああああああああああああああああああああああああああああああ
          あああああああああああああああああああああ
          <br />
        </Text>
        <Image w="400px" h="250px" bg="gray.300" alt="" />
      </Flex>
      <Flex direction="column" mb="32px">
        <Heading fontSize="24px" mb="16px">
          自己紹介
        </Heading>
        <Text mb="40px">
          ああああああああああああああああああああああああああああああああああああああ
          ああああああああああああああああああああああああああああああ
          <br />
          ああああああああああああああああああああああああああああああ
          <br />
          あああああああああああああああああああああああああああああああああ
          あああああああああああああああああああああ
          <br />
        </Text>
      </Flex>
    </Flex>
  );
};

export default Introduction;
