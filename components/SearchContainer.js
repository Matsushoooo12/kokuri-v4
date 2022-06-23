/* eslint-disable react/no-children-prop */
import {
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const SearchContainer = () => {
  return (
    <Flex minW="300px" h="100vh" borderLeft="1px solid black">
      <Flex direction="column" mx="30px">
        <InputGroup mt="50px">
          <Input borderRadius="xl" placeholder="キーワードで検索" />
          <InputRightElement children={<Icon as={BiSearch} />} />
        </InputGroup>
        <Flex direction="column" mt="20px">
          <Heading fontSize="16px">分野</Heading>
          <Flex direction="column" fontSize="14px" mt="10px">
            <Flex
              cursor="pointer"
              mb="6px"
              _hover={{ bg: "gray.100" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>Web開発エンジニア</Text>
              <Icon as={AiOutlinePlus} />
            </Flex>
            <Flex
              cursor="pointer"
              mb="6px"
              _hover={{ bg: "gray.100" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>アプリ開発エンジニア</Text>
              <Icon as={AiOutlinePlus} />
            </Flex>
            <Flex
              cursor="pointer"
              mb="6px"
              _hover={{ bg: "gray.100" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>インフラエンジニア</Text>
              <Icon as={AiOutlinePlus} />
            </Flex>
            <Flex
              cursor="pointer"
              mb="6px"
              _hover={{ bg: "gray.100" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>UIデザイナー</Text>
              <Icon as={AiOutlinePlus} />
            </Flex>
            <Flex
              cursor="pointer"
              mb="6px"
              _hover={{ bg: "gray.100" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>イラストレーター</Text>
              <Icon as={AiOutlinePlus} />
            </Flex>
            <Flex
              cursor="pointer"
              mb="6px"
              _hover={{ bg: "gray.100" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>動画編集</Text>
              <Icon as={AiOutlinePlus} />
            </Flex>
            <Flex
              cursor="pointer"
              mb="6px"
              _hover={{ bg: "gray.100" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>3DCGモデラー</Text>
              <Icon as={AiOutlinePlus} />
            </Flex>
            <Flex
              cursor="pointer"
              mb="6px"
              _hover={{ bg: "gray.100" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>シナリオライター</Text>
              <Icon as={AiOutlinePlus} />
            </Flex>
            <Flex
              cursor="pointer"
              mb="6px"
              _hover={{ bg: "gray.100" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>その他</Text>
              <Icon as={AiOutlinePlus} />
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="column" mt="20px">
          <Heading fontSize="16px">進行状態</Heading>
          <Flex direction="column" fontSize="14px" mt="10px">
            <Flex
              cursor="pointer"
              mb="6px"
              _hover={{ bg: "gray.100" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>未スタート</Text>
              <Icon as={AiOutlinePlus} />
            </Flex>
            <Flex
              cursor="pointer"
              mb="6px"
              _hover={{ bg: "gray.100" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>進行中</Text>
              <Icon as={AiOutlinePlus} />
            </Flex>
            <Flex
              cursor="pointer"
              mb="6px"
              _hover={{ bg: "gray.100" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>完了</Text>
              <Icon as={AiOutlinePlus} />
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="column" mt="20px">
          <Heading fontSize="16px">募集状況</Heading>
          <Flex direction="column" fontSize="14px" mt="10px">
            <Flex
              cursor="pointer"
              mb="6px"
              _hover={{ bg: "gray.100" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>募集中</Text>
              <Icon as={AiOutlinePlus} />
            </Flex>
            <Flex
              cursor="pointer"
              mb="6px"
              _hover={{ bg: "gray.100" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>締め切り</Text>
              <Icon as={AiOutlinePlus} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SearchContainer;
