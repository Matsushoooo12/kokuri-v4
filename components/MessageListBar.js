import React from "react";
import { Avatar, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { collection, orderBy, query } from "firebase/firestore";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { db } from "../firebase/config";
import { AuthContext } from "../pages/_app";
import { useRouter } from "next/router";

const MessageListBar = () => {
  const router = useRouter();
  const { id } = router.query;
  const { currentUser } = React.useContext(AuthContext);
  const [roomsSnapshot] = useCollection(collection(db, "rooms"));
  const rooms = roomsSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const q = query(collection(db, `rooms/${id}/messages`), orderBy("timestamp"));
  const [messages] = useCollectionData(q);

  const getLastMessage = () => {
    const idUserMessages = messages?.filter(
      (message) => message.sender.uid !== currentUser?.uid
    );
    const lastData = idUserMessages?.pop();
    return lastData;
  };

  console.log("getLastMessage", getLastMessage()?.text);
  const roomList = () => {
    return rooms
      ?.filter((room) =>
        room.users?.find((user) => user.uid === currentUser.uid)
      )
      .map((room) => (
        <Flex
          key={room.id}
          h="100%"
          borderBottom="1px solid black"
          borderColor="gray.100"
          onClick={() => router.push(`/messages/${room.id}`)}
          cursor="pointer"
          alignItems="center"
          py="16px"
          px="32px"
          _first={{ borderTop: "1px solid black", borderColor: "gray.100" }}
          _hover={room.id !== id && { backgroundColor: "gray.100" }}
          justifyContent="center"
          bg={room.id === id ? "gray.300" : "white"}
        >
          <Flex alignItems="center" w="100%">
            <Avatar
              w="40px"
              h="40px"
              borderRadius="full"
              src={
                room?.users?.find((user) => user.uid !== currentUser.uid).avatar
              }
              alt=""
              mr="16px"
            />
            <Flex direction="column">
              <Text mb="8px">
                {room?.users?.find((user) => user.uid !== currentUser.uid).name}
              </Text>
              <Text fontSize="12px">ああああああああああああ</Text>
            </Flex>
          </Flex>
        </Flex>
      ));
  };
  return (
    <Flex
      w="280px"
      h="100vh"
      alignItems="center"
      direction="column"
      borderRight="1px solid black"
      borderColor="gray.300"
    >
      <Heading
        fontSize="24px"
        mt="24px"
        mb="24px"
        onClick={() => router.push("/messages")}
        cursor="pointer"
      >
        Messages
      </Heading>
      <Input placeholder="ユーザーを検索" w="260px" mb="24px" />
      <Flex direction="column" w="100%">
        {roomList()}
      </Flex>
    </Flex>
  );
};

export default MessageListBar;
