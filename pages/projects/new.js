import React from "react";
import { auth, db, storage } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "../_app";
import Link from "next/link";
import {
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  Select,
  Text,
  Textarea,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { FaFileUpload } from "react-icons/fa";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  AiOutlineUnderline,
  AiOutlineBold,
  AiOutlineStrikethrough,
  AiOutlineItalic,
  AiOutlineAlignLeft,
  AiOutlineAlignCenter,
  AiOutlineAlignRight,
  AiOutlineLink,
} from "react-icons/ai";
import {
  BsTypeH1,
  BsTypeH2,
  BsTypeH3,
  BsImage,
  BsBlockquoteLeft,
  BsCodeSlash,
} from "react-icons/bs";
import { MdHorizontalRule } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";

const CreateProject = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [title, setTitle] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [thumbnail, setThubmnail] = React.useState(null);
  const [preview, setPreview] = React.useState("");
  const { currentUser } = React.useContext(AuthContext);
  const previewRef = React.useRef();

  //画面遷移しようとする前に確認ダイアログを出す.
  window.onbeforeunload = function () {
    //Chromeでは動かない.デフォルトの文言が表示される.
    return "編集中です。本当に他のページに移動しますか?";
  };

  const onClick = () => {
    if (previewRef.current) {
      previewRef.current.click();
    }
  };

  const onChangeImageHandler = (e) => {
    if (e.target.files[0]) {
      // プレビュー機能
      const file = e.target.files[0];
      setPreview(window.URL.createObjectURL(file));
      // サムネイル
      setThubmnail(e.target.files[0]);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadProjectThumbnail = uploadBytesResumable(
      ref(storage, `projects/${thumbnail.name}`),
      thumbnail
    );
    uploadProjectThumbnail.on(
      "state_changed",
      () => {},
      (err) => {
        alert(err.message);
      },
      async () => {
        await getDownloadURL(ref(storage, `projects/${thumbnail.name}`)).then(
          async (url) => {
            try {
              await addDoc(collection(db, "projects"), {
                title: title,
                summary: summary,
                user: {
                  name: user.displayName,
                  avatar: user.photoURL,
                },
                thumbnail: url,
                timestamp: serverTimestamp(),
              }).then(() => {
                router.push("/");
              });
            } catch (e) {
              console.log(e);
            }
            setTitle("");
            setSummary("");
            setThubmnail(null);
          }
        );
      }
    );
  };

  return (
    <Flex
      w="100%"
      pt="64px"
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
                  <Flex w="200px" alignItems="center">
                    <Text fontWeight="bold" fontSize="16px" mr="8px">
                      タイトル
                    </Text>
                    <Badge colorScheme="red">必須</Badge>
                  </Flex>
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
                  <Flex w="200px" alignItems="center">
                    <Text fontWeight="bold" fontSize="16px" mr="8px">
                      概要
                    </Text>
                    <Badge colorScheme="red">必須</Badge>
                  </Flex>
                  <Textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    w="700px"
                    type="text"
                    placeholder="３行程度で作りたいものが伝わる概要を書いてみましょう"
                    borderRadius="xl"
                  />
                </Flex>
                <Divider my="32px" />
                <Flex w="100%" justifyContent="space-between">
                  <Flex w="200px" alignItems="center">
                    <Text fontWeight="bold" fontSize="16px" mr="8px">
                      サムネイル
                    </Text>
                    <Badge colorScheme="red">必須</Badge>
                  </Flex>
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
                            <Text>
                              {/* または */}
                              クリックしてファイルをアップロード
                            </Text>
                          </Box>
                          <Text>縦横比４：６推奨</Text>
                        </VStack>
                      </Flex>
                    </Center>
                  )}
                  <Input
                    type="file"
                    onChange={(e) => onChangeImageHandler(e)}
                    style={{ display: "none" }}
                    name="image"
                    id="image"
                    ref={previewRef}
                  />
                </Flex>
                <Divider my="32px" />
                <Flex w="100%" h="100%" justifyContent="space-between">
                  <Flex w="200px" alignItems="center">
                    <Text fontWeight="bold" fontSize="16px" mr="8px">
                      本文
                    </Text>
                    <Badge colorScheme="red" mr="16px">
                      必須
                    </Badge>
                    <Link href="">
                      <a style={{ fontWeight: "bold", color: "teal" }}>
                        プレビュー
                      </a>
                    </Link>
                  </Flex>
                  <Flex
                    direction="column"
                    w="700px"
                    h="500px"
                    // bg="gray.100"
                    borderRadius="xl"
                    position="relative"
                    top="0"
                    border="1px solid gray"
                    borderColor="gray.300"
                  >
                    <Flex
                      w="100%"
                      h="40px"
                      //   bg="yellow.100"
                      position="absolute"
                      borderTopRadius="xl"
                      borderBottom="1px solid gray"
                      borderColor="gray.300"
                      pl="16px"
                      bg="white"
                      zIndex="10"
                    >
                      <IconButton
                        cursor="pointer"
                        bg="white"
                        p="8px"
                        as={BsTypeH1}
                        h="39px"
                        w="39px"
                      />
                      <IconButton
                        cursor="pointer"
                        bg="white"
                        p="8px"
                        as={BsTypeH2}
                        h="39px"
                        w="39px"
                      />
                      <IconButton
                        cursor="pointer"
                        bg="white"
                        p="8px"
                        as={BsTypeH3}
                        h="39px"
                        w="39px"
                      />
                      <IconButton
                        cursor="pointer"
                        bg="white"
                        p="8px"
                        as={AiOutlineBold}
                        h="39px"
                        w="39px"
                      />
                      <IconButton
                        cursor="pointer"
                        bg="white"
                        p="8px"
                        as={AiOutlineUnderline}
                        h="39px"
                        w="39px"
                      />
                      <IconButton
                        cursor="pointer"
                        bg="white"
                        p="8px"
                        as={AiOutlineStrikethrough}
                        h="39px"
                        w="39px"
                      />
                      <IconButton
                        cursor="pointer"
                        bg="white"
                        p="8px"
                        as={AiOutlineItalic}
                        h="39px"
                        w="39px"
                      />
                      <IconButton
                        cursor="pointer"
                        bg="white"
                        p="8px"
                        as={BsBlockquoteLeft}
                        h="39px"
                        w="39px"
                      />
                      <IconButton
                        cursor="pointer"
                        bg="white"
                        p="8px"
                        as={BsCodeSlash}
                        h="39px"
                        w="39px"
                      />
                      <IconButton
                        cursor="pointer"
                        bg="white"
                        p="8px"
                        as={AiOutlineAlignLeft}
                        h="39px"
                        w="39px"
                      />
                      <IconButton
                        cursor="pointer"
                        bg="white"
                        p="8px"
                        as={AiOutlineAlignCenter}
                        h="39px"
                        w="39px"
                      />
                      <IconButton
                        cursor="pointer"
                        bg="white"
                        p="8px"
                        as={AiOutlineAlignRight}
                        h="39px"
                        w="39px"
                      />
                      <IconButton
                        cursor="pointer"
                        bg="white"
                        p="8px"
                        as={AiOutlineLink}
                        h="39px"
                        w="39px"
                      />
                      <IconButton
                        cursor="pointer"
                        bg="white"
                        p="8px"
                        as={BsImage}
                        h="39px"
                        w="39px"
                      />
                    </Flex>
                    <Box
                      w="100%"
                      h="100%"
                      //   bg="green.100"
                      overflowY="scroll"
                      borderRadius="xl"
                    >
                      <Box
                        w="100%"
                        h="1000px"
                        // bg="blue.100"
                        borderRadius="xl"
                        pt="56px"
                      ></Box>
                    </Box>
                  </Flex>
                </Flex>
                <Divider my="32px" />
                <Box pb="96px">
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
