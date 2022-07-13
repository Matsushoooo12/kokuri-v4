import { Button, Flex, Heading, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const Introduction = (props) => {
  const { currentUser, id, onOpen, introductions } = props;
  return (
    <Flex w="800px" flexWrap="wrap" justifyContent="flex-start">
      {currentUser?.uid !== id && (
        <>
          {!introductions && (
            <Flex alignSelf="flex-start">まだ経歴はありません</Flex>
          )}
        </>
      )}
      <Flex direction="column" w="100%">
        {currentUser?.uid === id && (
          <Flex>
            <Button
              onClick={onOpen}
              leftIcon={<AiOutlinePlus />}
              mb="40px"
              mt="20px"
            >
              新たな内容を追加する
            </Button>
          </Flex>
        )}
        {introductions?.map((i) => (
          <Flex key={Math.random()} direction="column" mb="48px">
            <Heading fontSize="24px" mb="16px">
              {i.title}
            </Heading>
            <Text mb="16px" whiteSpace="pre-wrap" wordBreak="break-all">
              {i.content}
            </Text>
            <Image w="400px" h="250px" bg="gray.300" alt="" src={i.image} />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default Introduction;
