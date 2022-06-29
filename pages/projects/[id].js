import { Box, Flex, Heading, HStack, Image, Text } from "@chakra-ui/react";
// import {
//   ContentState,
//   convertFromRaw,
//   convertToRaw,
//   EditorState,
// } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { collection, doc, getDoc, serverTimestamp } from "firebase/firestore";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import {
  useCollection,
  useCollectionOnce,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";
import { convertFromRaw, Editor as DraftEditor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

const Editor = dynamic(import("../../components/Editor/index"), { ssr: false });

const DetailProject = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project] = useDocumentData(doc(db, "projects", id));

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
