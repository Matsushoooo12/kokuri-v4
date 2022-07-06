import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { ImFire } from "react-icons/im";
import { auth, db } from "../../firebase/config";
import { AuthContext } from "../_app";
import { FiMail } from "react-icons/fi";
import { Doughnut } from "react-chartjs-2";
import { IoIosSchool } from "react-icons/io";

const DetailUser = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user] = useDocumentData(doc(db, "users", id));
  const [loading, setLoading] = React.useState(true);
  const { currentUser } = React.useContext(AuthContext);

  const [snapshot] = useCollection(collection(db, "rooms"));
  const rooms = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  const followsQuery = query(collection(db, `users/${id}/follows`));
  const [follows] = useCollectionData(followsQuery);
  const followersQuery = query(collection(db, `users/${id}/followers`));
  const [followers] = useCollectionData(followersQuery);

  const roomExist = (uid) => {
    const idUserRoom = rooms?.filter((room) =>
      room.users.find((user) => user.uid === uid)
    );
    const room = idUserRoom.find((room) =>
      room.users.find((user) => user.uid === currentUser.uid)
    );
    return room?.id;
  };

  // const handleSignOut = async () => {
  //   await signOut(auth).then(() => {
  //     router.push("/");
  //   });
  // };

  const handleCreateDm = async (e) => {
    e.preventDefault();
    if (!roomExist(id)) {
      await addDoc(collection(db, "rooms"), {
        users: [
          {
            uid: currentUser.uid || null,
            name: currentUser.username || null,
            avatar: currentUser.avatar || null,
          },
          {
            uid: id || null,
            name: user.name || null,
            avatar: user.photoURL || null,
          },
        ],
      }).then((res) => {
        router.push(`/messages/${res.id}`);
      });
    } else {
      router.push(`/messages/${roomExist(id)}`);
    }
  };

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

  const handleFollow = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, `users/${id}/followers`, currentUser.uid), {
      uid: currentUser.uid,
      timestamp: serverTimestamp(),
    });
    await setDoc(doc(db, `users/${currentUser.uid}/follows`, id), {
      uid: id,
      timestamp: serverTimestamp(),
    });
  };

  const handleUnFollow = async (e) => {
    e.preventDefault();
    await deleteDoc(doc(db, `users/${id}/followers`, currentUser.uid));

    await deleteDoc(doc(db, `users/${currentUser.uid}/follows`, id));
  };

  const matching = () => {
    if (follows?.length && followers?.length) {
      if (
        follows?.find((follow) => follow.uid === currentUser?.uid) &&
        followers?.find((follower) => follower.uid === currentUser?.uid)
      ) {
        return "マッチング中";
      } else if (
        follows?.find((follow) => follow.uid === currentUser?.uid) &&
        followers?.find((follower) => follower.uid !== currentUser?.uid)
      ) {
        return "マッチングリクエストを許可する";
      } else if (
        follows?.find((follow) => follow.uid !== currentUser?.uid) &&
        followers?.find((follower) => follower.uid === currentUser?.uid)
      ) {
        return "マッチングリクエスト中";
      } else {
        return "マッチング申請する";
      }
    } else if (follows?.length && !followers?.length) {
      if (follows?.find((follow) => follow.uid === currentUser?.uid)) {
        return "マッチングリクエストを許可する";
      } else {
        return "マッチング申請する";
      }
    } else if (!follows?.length && followers?.length) {
      if (followers?.find((follower) => follower.uid === currentUser?.uid)) {
        return "マッチングリクエスト中";
      } else {
        return "マッチング申請する";
      }
    }
  };

  const followingToggle = () => {
    if (follows?.length && followers?.length) {
      if (
        follows?.find((follow) => follow.uid === currentUser?.uid) &&
        followers?.find((follower) => follower.uid === currentUser?.uid)
      ) {
        return false;
      } else if (
        follows?.find((follow) => follow.uid === currentUser?.uid) &&
        followers?.find((follower) => follower.uid !== currentUser?.uid)
      ) {
        return true;
      } else if (
        follows?.find((follow) => follow.uid !== currentUser?.uid) &&
        followers?.find((follower) => follower.uid === currentUser?.uid)
      ) {
        return false;
      } else {
        return true;
      }
    } else if (follows?.length && !followers?.length) {
      if (follows?.find((follow) => follow.uid === currentUser?.uid)) {
        return true;
      } else {
        return true;
      }
    } else if (!follows?.length && followers?.length) {
      if (followers?.find((follower) => follower.uid === currentUser?.uid)) {
        return false;
      } else {
        return true;
      }
    }
  };

  const dmButtonToggle = () => {
    if (follows?.length && followers?.length) {
      if (
        follows?.find((follow) => follow.uid === currentUser?.uid) &&
        followers?.find((follower) => follower.uid === currentUser?.uid)
      ) {
        return true;
      }
    }
  };

  console.log(
    "p",
    follows?.find((follow) => follow.uid !== currentUser?.uid)
  );

  // doughnut chart
  const percentage1 = 75;
  const backgroundColor = "#319795";

  const data1 = {
    datasets: [
      {
        label: "My First Dataset",
        data: [percentage1, 100 - percentage1],
        backgroundColor: [backgroundColor, "white"],
        borderColor: "white",
        hoverOffset: 0,
        cutout: "80%",
      },
    ],
    labels: ["Ruby"],
  };

  const percentage2 = 50;

  const data2 = {
    datasets: [
      {
        label: "My First Dataset",
        data: [percentage2, 100 - percentage2],
        backgroundColor: [backgroundColor, "white"],
        borderColor: "white",
        hoverOffset: 0,
        cutout: "80%",
      },
    ],
    labels: ["React"],
  };

  const percentage3 = 25;

  const data3 = {
    datasets: [
      {
        label: "My First Dataset",
        data: [percentage3, 100 - percentage3],
        backgroundColor: [backgroundColor, "white"],
        borderColor: "white",
        hoverOffset: 0,
        cutout: "80%",
      },
    ],
    labels: ["AWS"],
  };

  const omittedContent = (string) => {
    // 定数で宣言
    const MAX_LENGTH = 10;

    // もしstringの文字数がMAX_LENGTH（今回は10）より大きかったら末尾に...を付け足して返す。
    if (string.length > MAX_LENGTH) {
      // substr(何文字目からスタートするか, 最大値);
      return string.substr(0, MAX_LENGTH) + "...";
    }
    //　文字数がオーバーしていなければそのまま返す
    return string;
  };

  return (
    <Flex
      w="800px"
      h="100vh"
      direction="column"
      alignItems="center"
      pt="74px"
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
            <HStack alignItems="center" spacing="8px" fontSize="12px" mr="32px">
              <Text border="1px solid black" p="4px 8px" borderRadius="md">
                エンジニア
              </Text>
              <Text border="1px solid black" p="4px 8px" borderRadius="md">
                デザイナー
              </Text>
            </HStack>
            {id === currentUser?.uid && (
              <Button
                bg="teal.100"
                onClick={() => router.push("/settings/profile")}
              >
                プロフィール編集
              </Button>
            )}
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
            {id !== currentUser?.uid && (
              <>
                <Button
                  disabled={dmButtonToggle()}
                  onClick={followingToggle() ? handleFollow : handleUnFollow}
                  bg="gray.300"
                >
                  {matching()}
                </Button>
                {dmButtonToggle() && (
                  <IconButton p="8px" onClick={handleCreateDm} as={FiMail} />
                )}
              </>
            )}
          </HStack>
        </Flex>
      </Flex>
      <Tabs w="100%" h="100vh" colorScheme="teal" variant="soft-rounded">
        <TabList w="500px">
          <Tab>スキル</Tab>
          <Tab>経歴</Tab>
          <Tab>作品</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex spacing="24px" flexWrap="wrap">
              <Flex
                mr="16px"
                mb="16px"
                w="140px"
                h="100%"
                bg="gray.300"
                // bg="white"
                p="8px"
                direction="column"
                alignItems="center"
              >
                <Tooltip hasArrow label="上級者" placement="right" bg="red.500">
                  <Flex h="100%" w="100%" position="relative" mb="4px">
                    <Image
                      position="absolute"
                      top="0"
                      bottom="0"
                      left="0"
                      right="0"
                      margin="auto"
                      src="/ruby.png"
                      alt=""
                      w="56px"
                    />
                    <Doughnut width="120px" height="120px" data={data1} />
                  </Flex>
                </Tooltip>
                <Tooltip
                  hasArrow
                  label="Ruby on Rails"
                  placement="bottom"
                  bg="red.500"
                >
                  <Text
                    color="teal.500"
                    fontWeight="bold"
                    fontSize="20px"
                    wordBreak="break-all"
                    overflowX="scroll"
                    w="100%"
                  >
                    {omittedContent("Ruby on Rails")}
                  </Text>
                </Tooltip>
              </Flex>
              <Flex
                mr="16px"
                mb="16px"
                w="140px"
                h="100%"
                // bg="gray.300"
                bg="white"
                p="8px"
                direction="column"
                alignItems="center"
              >
                <Tooltip
                  hasArrow
                  label="中級者"
                  placement="right"
                  bg="blue.200"
                >
                  <Flex h="100%" w="100%" position="relative" mb="4px">
                    <Image
                      position="absolute"
                      top="0"
                      bottom="0"
                      left="0"
                      right="0"
                      margin="auto"
                      src="/react.png"
                      alt=""
                      w="56px"
                    />
                    <Doughnut width="120px" height="120px" data={data2} />
                  </Flex>
                </Tooltip>
                <Text color="teal.500" fontWeight="bold" fontSize="20px">
                  React
                </Text>
              </Flex>
              <Flex
                mr="16px"
                mb="16px"
                w="140px"
                h="100%"
                // bg="gray.300"
                bg="white"
                p="8px"
                direction="column"
                alignItems="center"
              >
                <Tooltip hasArrow label="初級者" placement="right" bg="#FF9900">
                  <Flex h="100%" w="100%" position="relative" mb="4px">
                    <Image
                      position="absolute"
                      top="0"
                      bottom="0"
                      left="0"
                      right="0"
                      margin="auto"
                      src="/aws.png"
                      alt=""
                      w="56px"
                    />
                    <Doughnut width="120px" height="120px" data={data3} />
                  </Flex>
                </Tooltip>
                <Text color="teal.500" fontWeight="bold" fontSize="20px">
                  AWS
                </Text>
              </Flex>
              <Flex
                mr="16px"
                mb="16px"
                w="140px"
                h="100%"
                // bg="gray.300"
                bg="white"
                p="8px"
                direction="column"
                alignItems="center"
              >
                <Tooltip
                  hasArrow
                  label="中級者"
                  placement="right"
                  bg="blue.200"
                >
                  <Flex h="100%" w="100%" position="relative" mb="4px">
                    <Image
                      position="absolute"
                      top="0"
                      bottom="0"
                      left="0"
                      right="0"
                      margin="auto"
                      src="/photoshop_gif.gif"
                      alt=""
                      w="56px"
                    />
                    <Doughnut width="120px" height="120px" data={data2} />
                  </Flex>
                </Tooltip>
                <Text color="teal.500" fontWeight="bold" fontSize="20px">
                  React
                </Text>
              </Flex>
              <Flex
                mr="16px"
                mb="16px"
                w="140px"
                h="100%"
                // bg="gray.300"
                bg="white"
                p="8px"
                direction="column"
                alignItems="center"
              >
                <Tooltip hasArrow label="上級者" placement="right" bg="red.500">
                  <Flex h="100%" w="100%" position="relative" mb="4px">
                    <Image
                      position="absolute"
                      top="0"
                      bottom="0"
                      left="0"
                      right="0"
                      margin="auto"
                      src="/illustrator_gif.gif"
                      alt=""
                      w="56px"
                    />
                    <Doughnut width="120px" height="120px" data={data1} />
                  </Flex>
                </Tooltip>
                <Text color="teal.500" fontWeight="bold" fontSize="20px">
                  Illustrator
                </Text>
              </Flex>
              <Flex
                mr="16px"
                mb="16px"
                w="160px"
                h="160px"
                bg="gray.300"
              ></Flex>
              <Flex
                mr="16px"
                mb="16px"
                w="160px"
                h="160px"
                bg="gray.300"
              ></Flex>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex direction="column">
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
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* <Button onClick={handleSignOut}>ログアウト</Button> */}
    </Flex>
  );
};

export default DetailUser;
