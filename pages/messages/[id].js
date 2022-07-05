import {
  Avatar,
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { BsImage } from "react-icons/bs";
import { db } from "../../firebase/config";
import { AuthContext } from "../_app";

const DetailMessages = () => {
  const router = useRouter();
  const { id } = router.query;
  const [room] = useDocumentData(doc(db, "rooms", id));

  const [input, setInput] = React.useState("");
  const { currentUser } = React.useContext(AuthContext);
  const q = query(collection(db, `rooms/${id}/messages`), orderBy("timestamp"));
  const [messages] = useCollectionData(q);
  const sendMessage = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, `rooms/${id}/messages`), {
      text: input,
      sender: {
        name: currentUser.username || null,
        avatar: currentUser.avatar || null,
        uid: currentUser.uid || null,
      },
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  const getMessages = () => {
    return (
      <>
        {messages?.map((message) => (
          <Flex
            key={Math.random()}
            my={2}
            mr={message.sender.uid === currentUser.uid && "32px"}
            ml={message.sender.uid !== currentUser.uid && "32px"}
            alignSelf={
              message.sender.uid === currentUser.uid ? "flex-end" : "flex-start"
            }
            alignItems="center"
          >
            <Avatar
              display={
                message.sender.uid === currentUser.uid ? "none" : "block"
              }
              src={message.sender.avatar}
              size="sm"
              mr="16px"
              onClick={() => router.push(`/users/${message.sender.uid}`)}
              cursor="pointer"
            />
            <Flex direction="column">
              <Text
                bg={
                  message.sender.uid === currentUser.uid
                    ? "red.100"
                    : "blue.100"
                }
                w="fit-content"
                p="8px 16px"
                borderRadius={
                  message.sender.uid === currentUser.uid
                    ? "8px 8px 0 8px"
                    : "8px 8px 8px 0"
                }
              >
                {message.text}
              </Text>
            </Flex>
          </Flex>
        ))}
      </>
    );
  };

  return (
    <Flex direction="column" h="100vh" w="100%">
      <Flex
        h="64px"
        w="100%"
        alignItems="center"
        px="24px"
        borderBottom="1px solid black"
        borderColor="gray.300"
      >
        <Avatar
          src={room?.users?.find((user) => user.uid !== currentUser.uid).avatar}
          mr="16px"
          w="32px"
          h="32px"
        />
        <Heading fontSize="18px">
          {room?.users?.find((user) => user.uid !== currentUser.uid).name}
        </Heading>
      </Flex>
      <Flex
        flex={1}
        direction="column"
        w="100%"
        overflowX="scroll"
        pt="16px"
        pb="16px"
        className="scrollbar-off"
      >
        {getMessages()}
      </Flex>
      <FormControl as="form" onSubmit={sendMessage}>
        <HStack
          spacing="16px"
          h="80px"
          w="100%"
          alignItems="center"
          px="40px"
          borderTop="1px solid black"
          borderColor="gray.300"
        >
          <IconButton as={BsImage} p="8px" />
          <Input
            bg="white"
            w="100%"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" hidden />
        </HStack>
      </FormControl>
    </Flex>
  );
};

export default DetailMessages;
