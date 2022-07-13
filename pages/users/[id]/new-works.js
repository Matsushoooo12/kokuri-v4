import React from "react";
import { db, storage } from "../../../firebase/config";
import Link from "next/link";
import "draft-js/dist/Draft.css";
import {
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { FaFileUpload } from "react-icons/fa";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  AiOutlineUnderline,
  AiOutlineBold,
  AiOutlineStrikethrough,
  AiOutlineItalic,
  AiOutlineLink,
  AiOutlineUnorderedList,
  AiOutlineOrderedList,
} from "react-icons/ai";
import {
  BsTypeH1,
  BsTypeH2,
  BsImage,
  BsBlockquoteLeft,
  BsCodeSlash,
} from "react-icons/bs";
import dynamic from "next/dynamic";
import { convertFromRaw, convertToRaw, EditorState, RichUtils } from "draft-js";
import { RiParagraph } from "react-icons/ri";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AuthContext } from "../../_app";
import { PROJECT_TAGS } from "../../../components/Tag/projectTag";
import { useDocumentData } from "react-firebase-hooks/firestore";

const Editor = dynamic(import("../../../components/Editor/index"), {
  ssr: false,
});

const initData = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      key: "e3teg54g",
      text: "はじめに・ご挨拶",
      type: "header-one",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "d93bg",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "3rccl",
      text: "信頼性を高めるため、簡単な自己紹介を書きましょう。​​​",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "enp4g",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "6mccl",
      text: "このプロジェクトで実現したいこと",
      type: "header-one",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "624fk",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "7t02e",
      text: "企画内容と目的を具体的かつ論理的に書きましょう。",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "eipd4",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "46g5p",
      text: "このプロジェクトをやろうと思った理由",
      type: "header-one",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "en1eo",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "1ptgd",
      text: "プロジェクト立ち上げの背景や経緯を具体的に書きましょう。",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "a6322",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "8j8sc",
      text: "実施スケジュール",
      type: "header-one",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "4r5ei",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "f1lcj",
      text: "プロジェクト実施の計画を時系列で書きましょう。",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "7g3kt",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "42kpt",
      text: "最後に",
      type: "header-one",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "19fle",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "4929k",
      text: "最後に参加、応援したくなるような熱いメッセージを書きましょう。",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "fuot8",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "16lr7",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
});

const initState = EditorState.createWithContent(initData);

const ReactTags = require("react-tag-input").WithOutContext;

// tag

const tagSuggestions = PROJECT_TAGS.map((projectTag) => {
  return {
    id: projectTag,
    text: projectTag,
  };
});

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const CreateWorks = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user] = useDocumentData(doc(db, "users", id));
  const [loading, setLoading] = React.useState(true);
  const [editorState, setEditorState] = React.useState(initState);
  const [paragraphOpen, setParagraphOpen] = React.useState(true);
  const [focus, setFocus] = React.useState(false);
  const [date, setDate] = React.useState("");
  const [organization, setOrganization] = React.useState("1");
  const [link, setLink] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [roles, setRoles] = React.useState([]);
  const [h1Open, setH1Open] = React.useState(false);
  const [h2Open, setH2Open] = React.useState(false);
  const [unorderedlistOpen, setUnorderedlistOpen] = React.useState(false);
  const [orderedlistOpen, setOrderedlistOpen] = React.useState(false);
  const [blockquoteOpen, setBlockquoteOpen] = React.useState(false);
  const [codeblockOpen, setCodeblockOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [thumbnail, setThubmnail] = React.useState(null);
  const [preview, setPreview] = React.useState("");
  const { currentUser } = React.useContext(AuthContext);
  const previewRef = React.useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickThumbnailPreview = () => {
    if (previewRef.current) {
      previewRef.current.click();
    }
    setFocus(false);
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

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }

    return "not-handled";
  };

  const handleParagraph = (e) => {
    e.preventDefault();
    if (!paragraphOpen) {
      setParagraphOpen(true);
      setH1Open(false);
      setH2Open(false);
      setUnorderedlistOpen(false);
      setOrderedlistOpen(false);
      setBlockquoteOpen(false);
      setCodeblockOpen(false);
      setEditorState(RichUtils.toggleBlockType(editorState, "unstyled"));
    } else {
      setEditorState(RichUtils.toggleBlockType(editorState, "unstyled"));
    }
  };

  const handleH1 = (e) => {
    e.preventDefault();
    if (h1Open) {
      setH1Open(false);
      setParagraphOpen(true);
      setEditorState(RichUtils.toggleBlockType(editorState, "unstyled"));
    } else {
      setH1Open(true);
      setH2Open(false);
      setUnorderedlistOpen(false);
      setOrderedlistOpen(false);
      setBlockquoteOpen(false);
      setParagraphOpen(false);
      setCodeblockOpen(false);
      setEditorState(RichUtils.toggleBlockType(editorState, "header-one"));
    }
  };

  const handleH2 = (e) => {
    e.preventDefault();
    if (h2Open) {
      setH2Open(false);
      setParagraphOpen(true);
      setEditorState(RichUtils.toggleBlockType(editorState, "unstyled"));
    } else {
      setH2Open(true);
      setH1Open(false);
      setParagraphOpen(false);
      setUnorderedlistOpen(false);
      setOrderedlistOpen(false);
      setBlockquoteOpen(false);
      setCodeblockOpen(false);
      setEditorState(RichUtils.toggleBlockType(editorState, "header-two"));
    }
  };

  const handleUnorderedlistOpen = (e) => {
    e.preventDefault();
    if (unorderedlistOpen) {
      setUnorderedlistOpen(false);
      setParagraphOpen(true);
      setEditorState(RichUtils.toggleBlockType(editorState, "unstyled"));
    } else {
      setUnorderedlistOpen(true);
      setH1Open(false);
      setH2Open(false);
      setOrderedlistOpen(false);
      setBlockquoteOpen(false);
      setParagraphOpen(false);
      setCodeblockOpen(false);
      setEditorState(
        RichUtils.toggleBlockType(editorState, "unordered-list-item")
      );
    }
  };

  const handleOrderedlistOpen = (e) => {
    e.preventDefault();
    if (orderedlistOpen) {
      setOrderedlistOpen(false);
      setParagraphOpen(true);
      setEditorState(RichUtils.toggleBlockType(editorState, "unstyled"));
    } else {
      setOrderedlistOpen(true);
      setUnorderedlistOpen(false);
      setH1Open(false);
      setH2Open(false);
      setBlockquoteOpen(false);
      setParagraphOpen(false);
      setCodeblockOpen(false);
      setEditorState(
        RichUtils.toggleBlockType(editorState, "ordered-list-item")
      );
    }
  };

  const handleBlockquote = (e) => {
    e.preventDefault();
    if (blockquoteOpen) {
      setBlockquoteOpen(false);
      setParagraphOpen(true);
      setEditorState(RichUtils.toggleBlockType(editorState, "unstyled"));
    } else {
      setBlockquoteOpen(true);
      setH1Open(false);
      setH2Open(false);
      setUnorderedlistOpen(false);
      setOrderedlistOpen(false);
      setParagraphOpen(false);
      setCodeblockOpen(false);
      setEditorState(RichUtils.toggleBlockType(editorState, "blockquote"));
    }
  };

  const handleCodeblock = (e) => {
    e.preventDefault();
    if (codeblockOpen) {
      setCodeblockOpen(false);
      setParagraphOpen(true);
      setEditorState(RichUtils.toggleBlockType(editorState, "unstyled"));
    } else {
      setCodeblockOpen(true);
      setBlockquoteOpen(false);
      setH1Open(false);
      setH2Open(false);
      setUnorderedlistOpen(false);
      setOrderedlistOpen(false);
      setParagraphOpen(false);
      setEditorState(RichUtils.toggleBlockType(editorState, "code-block"));
    }
  };

  const handleBold = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const handleStrikethrough = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH"));
  };

  const handleUnderline = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const handleItalic = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadWorksThumbnail = uploadBytesResumable(
      ref(storage, `works/${thumbnail.name}`),
      thumbnail
    );
    uploadWorksThumbnail.on(
      "state_changed",
      () => {},
      (err) => {
        alert(err.message);
      },
      async () => {
        await getDownloadURL(ref(storage, `works/${thumbnail.name}`)).then(
          async (url) => {
            try {
              await addDoc(collection(db, "works"), {
                title: title,
                text: JSON.stringify(
                  convertToRaw(editorState.getCurrentContent())
                ),
                summary: summary,
                user: {
                  uid: id,
                  name: user.name,
                  avatar: user.photoURL,
                },
                date: date,
                organization: organization,
                link: link,
                members: [id],
                tags: tags,
                roles: roles,
                thumbnail: url,
                timestamp: serverTimestamp(),
              }).then(() => {
                router.push(`/users/${id}`);
              });
            } catch (e) {
              console.log(e);
            }
            setTitle("");
            setSummary("");
            setDate("");
            setThubmnail(null);
            setPreview("");
          }
        );
      }
    );
  };

  const handleEditorFocus = () => {
    setFocus(true);
  };

  const handleEditorUnFocus = () => {
    setFocus(false);
  };

  const editorRef = React.useRef(null);
  React.useEffect(() => {
    if (focus) {
      editorRef?.current?.focus();
    }
  }, [editorState, focus, setEditorState]);

  // tag
  const handleTagDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleTagAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleTagDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  // role
  const handleRoleDelete = (i) => {
    setRoles(roles.filter((role, index) => index !== i));
  };

  const handleRoleAddition = (role) => {
    setRoles([...roles, role]);
  };

  const handleRoleDrag = (role, currPos, newPos) => {
    const newRoles = roles.slice();

    newRoles.splice(currPos, 1);
    newRoles.splice(newPos, 0, role);

    // re-render
    setRoles(newRoles);
  };

  const handleRoleClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  console.log("roles", roles);

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

  console.log("organization", organization);

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
              作品を投稿しよう
            </Heading>
            <InputGroup as="form" w="100%">
              <Flex direction="column" w="100%">
                <Flex w="100%" justifyContent="space-between" mb="32px">
                  <Flex w="200px" alignItems="center">
                    <Text fontWeight="bold" fontSize="16px" mr="8px">
                      タイトル
                    </Text>
                    <Badge colorScheme="red">必須</Badge>
                  </Flex>
                  <Input
                    _focus={handleEditorUnFocus}
                    w="700px"
                    type="text"
                    placeholder="投稿したい作品のタイトルを書いてください"
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
                    resize="none"
                    _focus={handleEditorUnFocus}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    w="700px"
                    type="text"
                    placeholder="３行程度で作品が伝わる概要を書いてみましょう"
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
                      onClick={onClickThumbnailPreview}
                      bg="gray.100"
                      alt="project-thumbnail"
                      cursor="pointer"
                      border="1px solid teal"
                    />
                  ) : (
                    <Center
                      onClick={onClickThumbnailPreview}
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
                <Divider mt="32px" />
                <Flex w="100%" justifyContent="space-between" mt="32px">
                  <Flex w="200px" alignItems="center">
                    <Text fontWeight="bold" fontSize="16px" mr="8px">
                      組織
                    </Text>
                    <Badge colorScheme="red">必須</Badge>
                  </Flex>
                  {/* <Input
                    type="text"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    w="700px"
                    borderRadius="xl"
                  /> */}
                  <Select
                    placeholder="作成した組織を選んで"
                    w="700px"
                    borderRadius="xl"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                  >
                    <option value="1">個人</option>
                    <option value="2">組織</option>
                  </Select>
                </Flex>
                <Divider mt="32px" />
                <Flex w="100%" justifyContent="space-between" mt="32px">
                  <Flex w="200px" alignItems="center">
                    <Text fontWeight="bold" fontSize="16px" mr="8px">
                      作成日
                    </Text>
                    <Badge colorScheme="red">必須</Badge>
                  </Flex>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    w="700px"
                    borderRadius="xl"
                  />
                </Flex>
                <Divider mt="32px" />
                <Flex w="100%" justifyContent="space-between" mt="32px">
                  <Flex w="200px" alignItems="center">
                    <Text fontWeight="bold" fontSize="16px" mr="8px">
                      リンク
                    </Text>
                    <Badge colorScheme="red">必須</Badge>
                  </Flex>
                  <Input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    w="700px"
                    borderRadius="xl"
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
                    h="630px"
                    borderRadius="xl"
                    position="relative"
                    top="0"
                    border="1px solid gray"
                    borderColor="gray.300"
                    onClick={handleEditorFocus}
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
                      {paragraphOpen ? (
                        <IconButton
                          cursor="pointer"
                          bg="gray.300"
                          p="8px"
                          as={RiParagraph}
                          h="39px"
                          w="39px"
                          onClick={handleParagraph}
                        />
                      ) : (
                        <IconButton
                          cursor="pointer"
                          bg="white"
                          p="8px"
                          as={RiParagraph}
                          h="39px"
                          w="39px"
                          onClick={handleParagraph}
                        />
                      )}
                      {h1Open ? (
                        <IconButton
                          cursor="pointer"
                          bg="gray.300"
                          p="8px"
                          as={BsTypeH1}
                          h="39px"
                          w="39px"
                          onClick={handleH1}
                        />
                      ) : (
                        <IconButton
                          cursor="pointer"
                          bg="white"
                          p="8px"
                          as={BsTypeH1}
                          h="39px"
                          w="39px"
                          onClick={handleH1}
                        />
                      )}
                      {h2Open ? (
                        <IconButton
                          cursor="pointer"
                          bg="gray.300"
                          p="8px"
                          as={BsTypeH2}
                          h="39px"
                          w="39px"
                          onClick={handleH2}
                        />
                      ) : (
                        <IconButton
                          cursor="pointer"
                          bg="white"
                          p="8px"
                          as={BsTypeH2}
                          h="39px"
                          w="39px"
                          onClick={handleH2}
                        />
                      )}
                      {unorderedlistOpen ? (
                        <IconButton
                          cursor="pointer"
                          bg="gray.300"
                          p="8px"
                          as={AiOutlineUnorderedList}
                          h="39px"
                          w="39px"
                          onClick={handleUnorderedlistOpen}
                        />
                      ) : (
                        <IconButton
                          cursor="pointer"
                          bg="white"
                          p="8px"
                          as={AiOutlineUnorderedList}
                          h="39px"
                          w="39px"
                          onClick={handleUnorderedlistOpen}
                        />
                      )}
                      {orderedlistOpen ? (
                        <IconButton
                          cursor="pointer"
                          bg="gray.300"
                          p="8px"
                          as={AiOutlineOrderedList}
                          h="39px"
                          w="39px"
                          onClick={handleOrderedlistOpen}
                        />
                      ) : (
                        <IconButton
                          cursor="pointer"
                          bg="white"
                          p="8px"
                          as={AiOutlineOrderedList}
                          h="39px"
                          w="39px"
                          onClick={handleOrderedlistOpen}
                        />
                      )}
                      {blockquoteOpen ? (
                        <IconButton
                          cursor="pointer"
                          bg="gray.300"
                          p="8px"
                          as={BsBlockquoteLeft}
                          h="39px"
                          w="39px"
                          onClick={handleBlockquote}
                        />
                      ) : (
                        <IconButton
                          cursor="pointer"
                          bg="white"
                          p="8px"
                          as={BsBlockquoteLeft}
                          h="39px"
                          w="39px"
                          onClick={handleBlockquote}
                        />
                      )}
                      {codeblockOpen ? (
                        <IconButton
                          cursor="pointer"
                          bg="gray.300"
                          p="8px"
                          as={BsCodeSlash}
                          h="39px"
                          w="39px"
                          onClick={handleCodeblock}
                        />
                      ) : (
                        <IconButton
                          cursor="pointer"
                          bg="white"
                          p="8px"
                          as={BsCodeSlash}
                          h="39px"
                          w="39px"
                          onClick={handleCodeblock}
                        />
                      )}
                      <IconButton
                        cursor="pointer"
                        bg="white"
                        p="8px"
                        as={AiOutlineBold}
                        h="39px"
                        w="39px"
                        onClick={handleBold}
                      />
                      <IconButton
                        cursor="pointer"
                        bg="white"
                        p="8px"
                        as={AiOutlineUnderline}
                        h="39px"
                        w="39px"
                        onClick={handleUnderline}
                      />
                      <IconButton
                        cursor="pointer"
                        bg="white"
                        p="8px"
                        as={AiOutlineStrikethrough}
                        h="39px"
                        w="39px"
                        onClick={handleStrikethrough}
                      />
                      <IconButton
                        cursor="pointer"
                        bg="white"
                        p="8px"
                        as={AiOutlineItalic}
                        h="39px"
                        w="39px"
                        onClick={handleItalic}
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
                        // onClick={handleImage}
                      />
                    </Flex>
                    <Box w="100%" h="100%" overflowY="scroll" borderRadius="xl">
                      <Box
                        w="100%"
                        h="100%"
                        borderRadius="xl"
                        pt="72px"
                        px="24px"
                        pb="40px"
                      >
                        <Editor
                          editorRef={editorRef}
                          editorState={editorState}
                          setEditorState={setEditorState}
                          handleKeyCommand={handleKeyCommand}
                        />
                      </Box>
                    </Box>
                  </Flex>
                </Flex>
                <Divider my="32px" />
                <Box pb="96px">
                  <Button
                    disabled={title === "" && true}
                    onClick={onOpen}
                    // onClick={handleSubmit}
                  >
                    公開する
                  </Button>
                </Box>
              </Flex>
            </InputGroup>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                  <Flex direction="column" bg="white" p="24px">
                    <Flex justifyContent="center" mb="16px">
                      <Heading fontSize="32px">公開設定</Heading>
                    </Flex>
                    <Flex direction="column" mb="32px">
                      <Text fontWeight="bold" mb="8px">
                        関連タグ
                      </Text>
                      <Flex direction="column" w="100%" bg="gray.100">
                        <DndProvider backend={HTML5Backend}>
                          <ReactTags
                            tags={tags}
                            suggestions={tagSuggestions}
                            delimiters={delimiters}
                            handleDelete={handleTagDelete}
                            handleAddition={handleTagAddition}
                            handleDrag={handleTagDrag}
                            handleTagClick={handleTagClick}
                            inputFieldPosition="bottom"
                            autocomplete
                          />
                        </DndProvider>
                      </Flex>
                    </Flex>
                    <Flex direction="column">
                      <Text fontWeight="bold" mb="8px">
                        必要な役割
                      </Text>
                      <Flex direction="column" w="100%" bg="gray.100">
                        <DndProvider backend={HTML5Backend}>
                          <ReactTags
                            tags={roles}
                            delimiters={delimiters}
                            handleDelete={handleRoleDelete}
                            handleAddition={handleRoleAddition}
                            handleDrag={handleRoleDrag}
                            handleTagClick={handleRoleClick}
                            inputFieldPosition="bottom"
                            autocomplete
                          />
                        </DndProvider>
                      </Flex>
                    </Flex>
                    <FormControl as="form" onSubmit={handleSubmit}>
                      <Flex direction="column" mt="16px">
                        <Button type="submit">プロジェクト作成</Button>
                      </Flex>
                    </FormControl>
                  </Flex>
                </ModalBody>
              </ModalContent>
            </Modal>
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

export default CreateWorks;
