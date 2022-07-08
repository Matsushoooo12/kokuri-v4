import { Box, Flex, Heading, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import { IoIosSchool } from "react-icons/io";

const History = () => {
  return (
    <Flex w="800px" alignItems="center" direction="column">
      <Flex alignItems="flex-start" pb="40px" position="relative">
        <Box
          w="5px"
          h="100%"
          bg="gray.300"
          position="absolute"
          top="0"
          left="120px"
          zIndex="1"
        />
        <Flex alignItems="center">
          <Text color="gray.500" fontSize="14px" mr="16px">
            2019/04/01
          </Text>
          <Flex direction="column" zIndex="2">
            <Flex
              w="64px"
              h="64px"
              bg="gray.300"
              borderRadius="full"
              alignItems="center"
              justifyContent="center"
              mr="16px"
            >
              <Icon as={IoIosSchool} fontSize="28px" />
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="column">
          <Heading fontSize="24px">デジタルハリウッド大学入学</Heading>
          <Text fontWeight="bold" fontSize="14px" mb="24px">
            デジタルコミュニケーション学部　デジタルコンテンツ学科
          </Text>
          <Text mb="16px">
            自分のWebサービスが作りたくてデジタルハリウッド大学に入学しました。
            様々な専門分野の人達とつながることができました。
          </Text>
          <Image w="100%" h="300px" bg="gray.300" alt="" />
        </Flex>
      </Flex>
      <Flex alignItems="flex-start" pb="40px" position="relative">
        <Box
          w="5px"
          h="100%"
          bg="gray.300"
          position="absolute"
          top="0"
          left="120px"
          zIndex="1"
        />
        <Flex alignItems="center">
          <Text color="gray.500" fontSize="14px" mr="16px">
            2019/04/01
          </Text>
          <Flex direction="column" zIndex="2">
            <Flex
              w="64px"
              h="64px"
              bg="gray.300"
              borderRadius="full"
              alignItems="center"
              justifyContent="center"
              mr="16px"
            >
              <Icon as={IoIosSchool} fontSize="28px" />
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="column">
          <Heading fontSize="24px">デジタルハリウッド大学入学</Heading>
          <Text fontWeight="bold" fontSize="14px" mb="24px">
            デジタルコミュニケーション学部　デジタルコンテンツ学科
          </Text>
          <Text>
            自分のWebサービスが作りたくてデジタルハリウッド大学に入学しました。
            様々な専門分野の人達とつながることができました。
          </Text>
        </Flex>
      </Flex>
      <Flex alignItems="flex-start" pb="40px" position="relative">
        <Box
          w="5px"
          h="100%"
          bg="gray.300"
          position="absolute"
          top="0"
          left="120px"
          zIndex="1"
        />
        <Flex alignItems="center">
          <Text color="gray.500" fontSize="14px" mr="16px">
            2019/04/01
          </Text>
          <Flex direction="column" zIndex="2">
            <Flex
              w="64px"
              h="64px"
              bg="gray.300"
              borderRadius="full"
              alignItems="center"
              justifyContent="center"
              mr="16px"
            >
              <Icon as={IoIosSchool} fontSize="28px" />
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="column">
          <Heading fontSize="24px">デジタルハリウッド大学入学</Heading>
          <Text fontWeight="bold" fontSize="14px" mb="24px">
            デジタルコミュニケーション学部　デジタルコンテンツ学科
          </Text>
          <Text>
            自分のWebサービスが作りたくてデジタルハリウッド大学に入学しました。
            様々な専門分野の人達とつながることができました。
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default History;
