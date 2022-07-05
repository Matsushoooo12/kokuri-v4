import {
  Avatar,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
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

  const handleSignOut = async () => {
    await signOut(auth).then(() => {
      router.push("/");
    });
  };

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
      <Tabs w="100%" h="100%" colorScheme="teal" variant="soft-rounded">
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
