import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase/config";
import { convertFromRaw, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { RiLoginBoxLine } from "react-icons/ri";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { BiPaperPlane } from "react-icons/bi";

const Editor = dynamic(import("../../components/Editor/index"), { ssr: false });

const DetailProject = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project] = useDocumentData(doc(db, "projects", id));
  const [user] = useAuthState(auth);
  const [loading, setLoading] = React.useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCreateBookmark = async () => {
    const projectRef = await doc(db, "projects", id);
    await updateDoc(projectRef, {
      likeUsers: arrayUnion(user.uid),
    });
  };

  const handleRemoveBookmark = async () => {
    const projectRef = await doc(db, "projects", id);
    await updateDoc(projectRef, {
      likeUsers: arrayRemove(user.uid),
    });
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

  return (
    <>
      <VStack
        spacing="16px"
        direction="column"
        position="absolute"
        right="80px"
        top="60px"
        alignItems="flex-start"
      >
        <Flex alignItems="center">
          <IconButton
            borderRadius="full"
            bg={
              project?.likeUsers?.includes(user?.uid) ? "teal.100" : "gray.100"
            }
            onClick={
              project?.likeUsers?.includes(user?.uid)
                ? handleRemoveBookmark
                : handleCreateBookmark
            }
            as={MdOutlineBookmarkBorder}
            p="8px"
            mr="8px"
          />
          <Text fontWeight="bold" fontSize="24px">
            {project?.likeUsers?.length}
          </Text>
        </Flex>
        {project?.members.includes(user?.uid) ? (
          <IconButton
            borderRadius="full"
            onClick={() => router.push(`/projects/${id}/group`)}
            p="8px"
            as={RiLoginBoxLine}
            cursor="pointer"
            bg="teal.100"
          />
        ) : (
          <IconButton
            borderRadius="full"
            onClick={onOpen}
            p="8px"
            as={BiPaperPlane}
            cursor="pointer"
            bg="teal.100"
          />
        )}
      </VStack>
      <Flex
        w="100%"
        pt="64px"
        px="32px"
        h="100%"
        overflowX="scroll"
        className="scrollbar-off"
        direction="column"
        alignItems="center"
      >
        <Flex w="768px" direction="column" alignItems="center" mb="80px">
          <Flex alignItems="center" mb="16px" alignSelf="flex-start">
            <Heading fontSize="24px" mr="16px">
              {project?.title}
            </Heading>
          </Flex>
          <Text mb="16px">{project?.summary}</Text>
          <HStack
            spacing="32px"
            mb="16px"
            alignItems="center"
            alignSelf="flex-start"
          >
            <HStack spacing="8px" fontSize="12px" alignSelf="center">
              <Text>募集役割：</Text>
              {project?.roles?.map((role) => (
                <Text
                  key={Math.random()}
                  borderRadius="full"
                  p="4px 8px"
                  border="1px solid black"
                >
                  {role.text}
                </Text>
              ))}
            </HStack>
          </HStack>
          <HStack
            spacing="8px"
            fontSize="12px"
            mb="32px"
            alignSelf="flex-start"
          >
            <Text>関連タグ：</Text>
            {project?.tags?.map((tag) => (
              <Text
                key={Math.random()}
                borderRadius="full"
                p="4px 8px"
                border="1px solid black"
              >
                {tag.text}
              </Text>
            ))}
          </HStack>
          <Image
            objectFit="cover"
            w="100%"
            src={project?.thumbnail}
            alt="thumbnail"
            mb="56px"
          />
          {project?.text && (
            <Box w="100%">
              <Editor
                readOnly={true}
                editorState={EditorState.createWithContent(
                  convertFromRaw(JSON.parse(project?.text))
                )}
              />
            </Box>
          )}
        </Flex>
      </Flex>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody my="40px">
            <Flex mb="16px" fontWeight="bold" fontSize="24px">
              参加希望メッセージを送る
            </Flex>
            <Textarea
              resize="none"
              fontSize="16px"
              fontWeight="bold"
              placeholder="テーマに沿って自分を表現してみましょう"
              type="text"
              h="100px"
              mb="24px"
            />
            <Button w="100%">送信</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DetailProject;
