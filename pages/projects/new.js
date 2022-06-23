import React from "react";
import { auth, db } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "../_app";
import Link from "next/link";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { FaFileUpload } from "react-icons/fa";

const CreateProject = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [title, setTitle] = React.useState("");
  const [thumbnail, setThubmnail] = React.useState(null);
  const [preview, setPreview] = React.useState("");
  const { currentUser } = React.useContext(AuthContext);
  const previewRef = React.useRef();
  // プレビュー機能
  const previewImage = React.useCallback((e) => {
    const file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
  }, []);
  const onClick = () => {
    if (previewRef.current) {
      previewRef.current.click();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "projects"), {
        title: title,
        uid: user.uid,
        timestamp: serverTimestamp(),
      }).then(() => {
        router.push("/");
      });
    } catch (e) {
      console.log(e);
    }
    setTitle("");
  };

  return (
    <Flex
      w="100%"
      pt="64px"
      mb="96px"
      px="32px"
      h="100%"
      justifyContent="center"
      overflowX="scroll"
      className="scrollbar-off"
    >
      <Flex alignItems="center" w="960px" direction="column">
        {currentUser ? (
          <>
            <Heading fontSize="24px" mb="64px">
              プロジェクトを作成しよう
            </Heading>
            <InputGroup as="form" onSubmit={handleSubmit} w="100%">
              <Flex direction="column" w="100%">
                <Flex w="100%" justifyContent="space-between" mb="32px">
                  <Text w="200px" fontWeight="bold" fontSize="16px">
                    タイトル
                  </Text>
                  <Input
                    w="700px"
                    type="text"
                    placeholder="作りたいものが表現できるタイトルを付けてみましょう"
                    borderRadius="xl"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Flex>
                <Divider />
                <Flex w="100%" justifyContent="space-between" mt="32px">
                  <Text w="200px" fontWeight="bold" fontSize="16px">
                    概要
                  </Text>
                  <Textarea
                    //   flex={1}
                    w="700px"
                    type="text"
                    placeholder="３行程度で作りたいものが伝わる概要を書いてみましょう"
                    borderRadius="xl"
                  />
                </Flex>
                <Divider my="32px" />
                <Flex w="100%" justifyContent="space-between">
                  <Text w="200px" fontWeight="bold" fontSize="16px">
                    サムネイル
                  </Text>
                  {preview ? (
                    <Image
                      objectFit="cover"
                      loading="lazy"
                      type="text"
                      borderRadius="xl"
                      h="460px"
                      w="700px"
                      src={preview}
                      onClick={onClick}
                      bg="gray.100"
                      alt="project-thumbnail"
                      cursor="pointer"
                      border="1px solid teal"
                    />
                  ) : (
                    <Center
                      onClick={onClick}
                      borderRadius="xl"
                      h="460px"
                      w="700px"
                      bg="gray.100"
                      position="relative"
                      cursor="copy"
                    >
                      <Flex direction="column" alignItems="center">
                        <VStack spacing="16px">
                          <Icon as={FaFileUpload} fontSize="48px" />
                          <Text fontSize="24px" fontWeight="bold">
                            サムネイル画像を追加
                          </Text>
                          <Box textAlign="center">
                            {/* <Text>ドラッグ＆ドロップ</Text> */}
                            <Text mb="16px">
                              {/* または */}
                              クリックしてファイルをアップロード
                            </Text>
                            <Text>縦横比４：６推奨</Text>
                          </Box>
                        </VStack>
                      </Flex>
                    </Center>
                  )}
                  <Input
                    type="file"
                    onChange={(e) => previewImage(e)}
                    style={{ display: "none" }}
                    name="image"
                    id="image"
                    ref={previewRef}
                  />
                </Flex>
                <Divider my="32px" />
                <Box>
                  <Button disabled={title === "" && true} type="submit">
                    プロジェクト作成
                  </Button>
                </Box>
              </Flex>
            </InputGroup>
          </>
        ) : (
          <>
            <h1>new</h1>
            <Link href="/login">
              <a>ログインへ</a>
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default CreateProject;
