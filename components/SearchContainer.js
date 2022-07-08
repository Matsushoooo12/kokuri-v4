/* eslint-disable react/no-children-prop */
import React from "react";
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { useRouter } from "next/router";
import { BsCircleFill } from "react-icons/bs";

const SearchContainer = () => {
  const router = useRouter();
  const { id } = router.query;
  const [projectsSnapshot] = useCollection(collection(db, "projects"));
  const projects = projectsSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const project = projects?.find((project) => project.id === id);

  const [roomsSnapshot] = useCollection(collection(db, "rooms"));
  const rooms = roomsSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log("rooms", rooms);
  const homeUrl = (url) => {
    if (url === process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
      return true;
    } else if (url === `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}?tab=projects`) {
      return true;
    } else if (url === `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}?tab=users`) {
      return true;
    }
  };

  const projectUrl = (url) => {
    if (url === `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}projects/${id}`) {
      return true;
    }
  };

  return (
    <Flex
      minW="350px"
      h="100vh"
      borderLeft="1px solid black"
      justifyContent="center"
      zIndex="50"
      bg="white"
    >
      <Flex direction="column" w="100%" mx="30px">
        <InputGroup mt="50px">
          <Input borderRadius="xl" placeholder="キーワードで検索" />
          <InputRightElement children={<Icon as={BiSearch} />} />
        </InputGroup>
        {homeUrl(window.location.href) && (
          <>
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
          </>
        )}
        {projectUrl(window.location.href) && (
          <Flex direction="column" alignItems="center" mt="32px">
            <Flex
              direction="column"
              p="16px"
              w="290px"
              h="100%"
              border="1px solid black"
              borderColor="gray.300"
              borderRadius="lg"
              boxShadow="md"
              mb="32px"
            >
              <Flex alignItems="center">
                <Avatar src={project?.user.avatar} mr="16px" />
                <VStack
                  direction="column"
                  spacing="8px"
                  alignItems="flex-start"
                >
                  <Text fontWeight="bold">{project?.user.name}</Text>
                  <Button size="sm">マッチング申請</Button>
                </VStack>
              </Flex>
              <Flex mt="16px">
                <Text fontSize="12px">
                  現在は就職活動のためにポートフォリオ作成をしています！チーム開発の経験を積むためにいろんな開発に携わりたいです！
                </Text>
              </Flex>
              <HStack spacing="8px" fontSize="12px" mt="16px">
                <Text borderRadius="full" p="4px 8px" border="1px solid black">
                  HTML
                </Text>
                <Text borderRadius="full" p="4px 8px" border="1px solid black">
                  CSS
                </Text>
                <Text borderRadius="full" p="4px 8px" border="1px solid black">
                  JavaScript
                </Text>
              </HStack>
            </Flex>
            <Flex
              direction="column"
              p="16px"
              w="290px"
              h="100%"
              border="1px solid black"
              borderColor="gray.300"
              borderRadius="lg"
              boxShadow="md"
            >
              <Heading fontSize="16px" mb="16px">
                目次
              </Heading>
              <Flex alignItems="center" mb="4px" cursor="pointer">
                <Icon
                  color="teal.500"
                  fontSize="12px"
                  as={BsCircleFill}
                  mr="16px"
                />
                <Text fontSize="14px">はじめに・ご挨拶</Text>
              </Flex>
              <Divider
                orientation="vertical"
                h="24px"
                ml="5.5px"
                variant="dashed"
                mb="4px"
              />
              <Flex alignItems="center" mb="4px" cursor="pointer">
                <Icon
                  fontSize="12px"
                  color="teal.500"
                  as={BsCircleFill}
                  mr="16px"
                />
                <Text fontSize="14px">このプロジェクトで実現したいこと</Text>
              </Flex>
              <Divider
                orientation="vertical"
                h="24px"
                ml="5.5px"
                variant="dashed"
                mb="4px"
              />
              <Flex alignItems="center" cursor="pointer">
                <Icon
                  fontSize="12px"
                  color="teal.500"
                  as={BsCircleFill}
                  mr="16px"
                />
                <Text fontSize="14px">
                  このプロジェクトをやろうと思った理由
                </Text>
              </Flex>
              <Divider
                orientation="vertical"
                h="24px"
                ml="5.5px"
                variant="dashed"
                mb="4px"
              />
              <Flex alignItems="center" cursor="pointer">
                <Icon
                  fontSize="12px"
                  color="teal.500"
                  as={BsCircleFill}
                  mr="16px"
                />
                <Text fontSize="14px">実施スケジュール</Text>
              </Flex>
              <Divider
                orientation="vertical"
                h="24px"
                ml="5.5px"
                variant="dashed"
                mb="4px"
              />
              <Flex alignItems="center" cursor="pointer">
                <Icon
                  fontSize="12px"
                  color="teal.500"
                  as={BsCircleFill}
                  mr="16px"
                />
                <Text fontSize="14px">最後に</Text>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default SearchContainer;
