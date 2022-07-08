import {
  Avatar,
  Center,
  Flex,
  HStack,
  Icon,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { collection, query } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { ImFire } from "react-icons/im";
import { db } from "../../../firebase/config";
import { AuthContext } from "../../_app";

const Projects = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const { id } = router.query;
  const [snapshot] = useCollection(collection(db, "users"));
  const users = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  const followsQuery = query(collection(db, `users/${id}/follows`));
  const [follows] = useCollectionData(followsQuery);
  const followersQuery = query(collection(db, `users/${id}/followers`));
  const [followers] = useCollectionData(followersQuery);

  console.log("id", id);

  console.log("follows", follows);

  console.log("follwers", followers);

  console.log("users", users);

  React.useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    );
  }
  return (
    <Tabs
      position="relative"
      h="100vh"
      w="100%"
      variant="soft-rounded"
      colorScheme="teal"
    >
      <Flex direction="column" w="100%" alignItems="center">
        <TabList
          bg="white"
          position="absolute"
          zIndex="10"
          w="800px"
          pt="32px"
          justifyContent="flex-start"
        >
          <Tab>マッチング中ユーザー</Tab>
          <Tab>マッチング申請中ユーザー</Tab>
          <Tab>マッチング申請してきたユーザー</Tab>
        </TabList>
      </Flex>
      <TabPanels
        h="100%"
        overflowX="scroll"
        pt="100px"
        w="100%"
        className="scrollbar-off"
      >
        <TabPanel>
          <Flex w="100%" h="100%" justifyContent="center">
            <Flex w="800px" h="100%" direction="column" px="24px">
              {users
                ?.filter(
                  (user) =>
                    user.id ===
                      followers?.find((follower) => follower.uid === user.id)
                        ?.uid &&
                    user.id ===
                      follows?.find((follow) => follow.uid === user.id)?.uid
                )
                .map((user) => (
                  <Flex
                    key={user.id}
                    w="100%"
                    h="100%"
                    mb="32px"
                    borderBottom="1px solid #ddd"
                    cursor="pointer"
                    pb="32px"
                  >
                    <Flex mr="24px">
                      <Avatar
                        w="60px"
                        h="60px"
                        src={user.photoURL}
                        alt="avatar"
                      />
                    </Flex>
                    <Flex direction="column">
                      <Flex mb="16px">
                        <Flex alignItems="center" mr="24px">
                          <Text
                            fontSize="20px"
                            fontWeight="bold"
                            mr="8px"
                            onClick={() => router.push(`/users/${user.id}`)}
                          >
                            {user.name}
                          </Text>
                          <Icon fontSize="20px" color="red.500" as={ImFire} />
                        </Flex>
                        <HStack
                          alignItems="center"
                          spacing="8px"
                          fontSize="12px"
                        >
                          <Text
                            border="1px solid black"
                            p="4px 8px"
                            borderRadius="md"
                          >
                            エンジニア
                          </Text>
                          <Text
                            border="1px solid black"
                            p="4px 8px"
                            borderRadius="md"
                          >
                            デザイナー
                          </Text>
                        </HStack>
                      </Flex>
                      <Text mb="16px">
                        現在は就職活動のためにポートフォリオ作成をしています！チーム開発の経験を積むためにいろんな開発に携わりたいです！
                      </Text>
                      <HStack spacing="8px" fontSize="12px">
                        <Text
                          borderRadius="full"
                          p="4px 8px"
                          border="1px solid black"
                        >
                          React
                        </Text>
                        <Text
                          borderRadius="full"
                          p="4px 8px"
                          border="1px solid black"
                        >
                          Rails
                        </Text>
                        <Text
                          borderRadius="full"
                          p="4px 8px"
                          border="1px solid black"
                        >
                          HTML
                        </Text>
                      </HStack>
                    </Flex>
                  </Flex>
                ))}
            </Flex>
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex w="100%" h="100%" justifyContent="center">
            <Flex w="800px" h="100%" direction="column" px="24px">
              {users
                ?.filter(
                  (user) =>
                    user.id ===
                      follows?.find((follow) => follow.uid === user.id)?.uid &&
                    !followers?.find((follower) => follower.uid === user.id)
                )
                .map((user) => (
                  <Flex
                    key={user.id}
                    w="100%"
                    h="100%"
                    mb="32px"
                    borderBottom="1px solid #ddd"
                    cursor="pointer"
                    pb="32px"
                  >
                    <Flex mr="24px">
                      <Avatar
                        w="60px"
                        h="60px"
                        src={user.photoURL}
                        alt="avatar"
                      />
                    </Flex>
                    <Flex direction="column">
                      <Flex mb="16px">
                        <Flex alignItems="center" mr="24px">
                          <Text
                            fontSize="20px"
                            fontWeight="bold"
                            mr="8px"
                            onClick={() => router.push(`/users/${user.id}`)}
                          >
                            {user.name}
                          </Text>
                          <Icon fontSize="20px" color="red.500" as={ImFire} />
                        </Flex>
                        <HStack
                          alignItems="center"
                          spacing="8px"
                          fontSize="12px"
                        >
                          <Text
                            border="1px solid black"
                            p="4px 8px"
                            borderRadius="md"
                          >
                            エンジニア
                          </Text>
                          <Text
                            border="1px solid black"
                            p="4px 8px"
                            borderRadius="md"
                          >
                            デザイナー
                          </Text>
                        </HStack>
                      </Flex>
                      <Text mb="16px">
                        現在は就職活動のためにポートフォリオ作成をしています！チーム開発の経験を積むためにいろんな開発に携わりたいです！
                      </Text>
                      <HStack spacing="8px" fontSize="12px">
                        <Text
                          borderRadius="full"
                          p="4px 8px"
                          border="1px solid black"
                        >
                          React
                        </Text>
                        <Text
                          borderRadius="full"
                          p="4px 8px"
                          border="1px solid black"
                        >
                          Rails
                        </Text>
                        <Text
                          borderRadius="full"
                          p="4px 8px"
                          border="1px solid black"
                        >
                          HTML
                        </Text>
                      </HStack>
                    </Flex>
                  </Flex>
                ))}
            </Flex>
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex w="100%" h="100%" justifyContent="center">
            <Flex w="800px" h="100%" direction="column" px="24px">
              {users
                ?.filter(
                  (user) =>
                    user.id ===
                      followers?.find((follower) => follower.uid === user.id)
                        ?.uid &&
                    !follows?.find((follow) => follow.uid === user.id)
                )
                .map((user) => (
                  <Flex
                    key={user.id}
                    w="100%"
                    h="100%"
                    mb="32px"
                    borderBottom="1px solid #ddd"
                    cursor="pointer"
                    pb="32px"
                  >
                    <Flex mr="24px">
                      <Avatar
                        w="60px"
                        h="60px"
                        src={user.photoURL}
                        alt="avatar"
                      />
                    </Flex>
                    <Flex direction="column">
                      <Flex mb="16px">
                        <Flex alignItems="center" mr="24px">
                          <Text
                            fontSize="20px"
                            fontWeight="bold"
                            mr="8px"
                            onClick={() => router.push(`/users/${user.id}`)}
                          >
                            {user.name}
                          </Text>
                          <Icon fontSize="20px" color="red.500" as={ImFire} />
                        </Flex>
                        <HStack
                          alignItems="center"
                          spacing="8px"
                          fontSize="12px"
                        >
                          <Text
                            border="1px solid black"
                            p="4px 8px"
                            borderRadius="md"
                          >
                            エンジニア
                          </Text>
                          <Text
                            border="1px solid black"
                            p="4px 8px"
                            borderRadius="md"
                          >
                            デザイナー
                          </Text>
                        </HStack>
                      </Flex>
                      <Text mb="16px">
                        現在は就職活動のためにポートフォリオ作成をしています！チーム開発の経験を積むためにいろんな開発に携わりたいです！
                      </Text>
                      <HStack spacing="8px" fontSize="12px">
                        <Text
                          borderRadius="full"
                          p="4px 8px"
                          border="1px solid black"
                        >
                          React
                        </Text>
                        <Text
                          borderRadius="full"
                          p="4px 8px"
                          border="1px solid black"
                        >
                          Rails
                        </Text>
                        <Text
                          borderRadius="full"
                          p="4px 8px"
                          border="1px solid black"
                        >
                          HTML
                        </Text>
                      </HStack>
                    </Flex>
                  </Flex>
                ))}
            </Flex>
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Projects;
