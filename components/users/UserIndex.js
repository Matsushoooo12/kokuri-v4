import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IoMdBuild } from "react-icons/io";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { RiShieldUserLine } from "react-icons/ri";
import { ImFire } from "react-icons/im";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

const UserIndex = () => {
  // const userQuery = query(collection(db, "users"), orderBy("timestamp"));
  // const [users] = useCollectionData(userQuery);
  // console.log(users);
  const [snapshot, loading, error] = useCollection(collection(db, "users"));
  const users = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  const router = useRouter();
  return (
    <Flex w="100%" h="100%" justifyContent="center">
      <Flex w="800px" h="100%" direction="column" px="24px">
        {/* Projectカード一覧 */}
        {users?.map((user) => (
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
              <Avatar w="60px" h="60px" src={user.photoURL} alt="avatar" />
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
                <HStack alignItems="center" spacing="8px" fontSize="12px">
                  <Text border="1px solid black" p="4px 8px" borderRadius="md">
                    エンジニア
                  </Text>
                  <Text border="1px solid black" p="4px 8px" borderRadius="md">
                    デザイナー
                  </Text>
                </HStack>
              </Flex>
              <Text mb="16px">
                現在は就職活動のためにポートフォリオ作成をしています！チーム開発の経験を積むためにいろんな開発に携わりたいです！
              </Text>
              <HStack spacing="8px" fontSize="12px">
                <Text borderRadius="full" p="4px 8px" border="1px solid black">
                  React
                </Text>
                <Text borderRadius="full" p="4px 8px" border="1px solid black">
                  Rails
                </Text>
                <Text borderRadius="full" p="4px 8px" border="1px solid black">
                  HTML
                </Text>
              </HStack>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default UserIndex;
