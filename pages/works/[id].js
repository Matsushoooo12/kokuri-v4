import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { convertFromRaw, EditorState } from "draft-js";
import { doc } from "firebase/firestore";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase/config";

const Editor = dynamic(import("../../components/Editor/index"), { ssr: false });

const DetailWorks = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = React.useState(true);
  const [worksItem] = useDocumentData(doc(db, "works", id));
  console.log("work", worksItem);
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
              {worksItem?.title}
            </Heading>
          </Flex>
          <Text alignSelf="flex-start" mb="16px">
            {worksItem?.summary}
          </Text>
          <Link
            color="blue.500"
            href={worksItem?.link}
            alignSelf="flex-start"
            mb="16px"
            target="_blank"
          >
            {worksItem?.link}
          </Link>
          <HStack
            spacing="32px"
            mb="16px"
            alignItems="center"
            alignSelf="flex-start"
          >
            <HStack spacing="8px" fontSize="12px" alignSelf="center">
              <Text>募集役割：</Text>
              {worksItem?.roles?.map((role) => (
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
            {worksItem?.tags?.map((tag) => (
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
            src={worksItem?.thumbnail}
            alt="thumbnail"
            mb="56px"
          />
          {worksItem?.text && (
            <Box w="100%">
              <Editor
                readOnly={true}
                editorState={EditorState.createWithContent(
                  convertFromRaw(JSON.parse(worksItem?.text))
                )}
              />
            </Box>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default DetailWorks;
