/* eslint-disable react/no-children-prop */
import { PhoneIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";

const SearchContainer = () => {
  return (
    <Flex w="300px" borderLeft="1px solid black">
      <Flex direction="column" mx="30px">
        <InputGroup mt="50px">
          <Input
            focusBorderColor="none"
            borderRadius="xl"
            placeholder="キーワードで検索"
          />
          <InputRightElement children={<Icon as={BiSearch} />} />
        </InputGroup>
        <Flex direction="column" mt="20px">
          <Heading fontSize="16px">分野</Heading>
          <Flex direction="column" fontSize="14px" mt="10px">
            <Text cursor="pointer" mb="6px" _hover={{ bg: "gray.100" }}>
              Web開発エンジニア
            </Text>
            <Text cursor="pointer" mb="6px" _hover={{ bg: "gray.100" }}>
              アプリ開発エンジニア
            </Text>
            <Text cursor="pointer" mb="6px" _hover={{ bg: "gray.100" }}>
              インフラエンジニア
            </Text>
            <Text cursor="pointer" mb="6px" _hover={{ bg: "gray.100" }}>
              UIデザイナー
            </Text>
            <Text cursor="pointer" mb="6px" _hover={{ bg: "gray.100" }}>
              イラストレーター
            </Text>
            <Text cursor="pointer" mb="6px" _hover={{ bg: "gray.100" }}>
              動画編集
            </Text>
            <Text cursor="pointer" mb="6px" _hover={{ bg: "gray.100" }}>
              3DCGモデラー
            </Text>
            <Text cursor="pointer" mb="6px" _hover={{ bg: "gray.100" }}>
              シナリオライター
            </Text>
            <Text cursor="pointer" mb="6px" _hover={{ bg: "gray.100" }}>
              その他
            </Text>
          </Flex>
        </Flex>
        <Flex direction="column" mt="20px">
          <Heading fontSize="16px">進行状態</Heading>
          <Flex direction="column" fontSize="14px" mt="10px">
            <Text cursor="pointer" mb="6px" _hover={{ bg: "gray.100" }}>
              未スタート
            </Text>
            <Text cursor="pointer" mb="6px" _hover={{ bg: "gray.100" }}>
              進行中
            </Text>
            <Text cursor="pointer" mb="6px" _hover={{ bg: "gray.100" }}>
              完了
            </Text>
          </Flex>
        </Flex>
        <Flex direction="column" mt="20px">
          <Heading fontSize="16px">募集状況</Heading>
          <Flex direction="column" fontSize="14px" mt="10px">
            <Text cursor="pointer" mb="6px" _hover={{ bg: "gray.100" }}>
              募集中
            </Text>
            <Text cursor="pointer" mb="6px" _hover={{ bg: "gray.100" }}>
              締め切り
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SearchContainer;
