import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Spinner,
  Text,
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

const Editor = dynamic(import("../../components/Editor/index"), { ssr: false });

const DetailProject = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project] = useDocumentData(doc(db, "projects", id));
  const [user] = useAuthState(auth);
  const [loading, setLoading] = React.useState(true);

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
      <Heading fontSize="24px" mb="24px">
        {project?.title}
      </Heading>
      <HStack spacing="32px">
        <Flex alignItems="center">
          <IconButton
            //   disabled={project?.likeUsers?.includes(user?.uid)}
            bg={
              project?.likeUsers?.includes(user?.uid) ? "gray.100" : "teal.100"
            }
            onClick={
              project?.likeUsers?.includes(user?.uid)
                ? handleRemoveBookmark
                : handleCreateBookmark
            }
            as={MdOutlineBookmarkBorder}
            p="8px"
            mr="8px"
          >
            Bookmark
          </IconButton>
          <Text>{project?.likeUsers?.length}</Text>
        </Flex>
        <IconButton
          onClick={() => router.push(`/projects/${id}/group`)}
          p="8px"
          as={RiLoginBoxLine}
        />
      </HStack>
      <Text mb="16px">{project?.summary}</Text>
      <HStack spacing="8px" fontSize="12px" mb="16px">
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
        w="600px"
        h="400px"
        src={project?.thumbnail}
        alt="thumbnail"
        mb="32px"
      />
      {project?.text && (
        <Box w="700px">
          <Editor
            readOnly={true}
            editorState={EditorState.createWithContent(
              convertFromRaw(JSON.parse(project?.text))
            )}
          />
        </Box>
      )}
    </Flex>
  );
};

export default DetailProject;
