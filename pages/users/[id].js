import {
  Avatar,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { ImFire } from "react-icons/im";
import { auth, db } from "../../firebase/config";
import { AuthContext } from "../_app";

const DetailUser = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user] = useDocumentData(doc(db, "users", id));
  const { currentUser } = React.useContext(AuthContext);

  const handleSignOut = async () => {
    await signOut(auth).then(() => {
      router.push("/");
    });
  };

  return (
    <Flex
      w="800px"
      h="100%"
      direction="column"
      alignItems="center"
      mt="74px"
      px="24px"
    >
      <Flex cursor="pointer" justifyContent="center" mb="40px">
        <Flex mr="24px">
          <Avatar w="60px" h="60px" src={user?.photoURL} alt="avatar" />
        </Flex>
        <Flex direction="column">
          <Flex mb="16px">
            <Flex alignItems="center" mr="24px">
              <Text fontSize="20px" fontWeight="bold" mr="8px">
                {user?.name}
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
      <Tabs w="100%" h="100%" colorScheme="teal">
        <TabList w="500px">
          <Tab>スキル</Tab>
          <Tab>経歴</Tab>
          <Tab>作品</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button onClick={handleSignOut}>ログアウト</Button>
    </Flex>
  );
};

export default DetailUser;
