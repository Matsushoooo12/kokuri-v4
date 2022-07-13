import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Button,
  Center,
  Flex,
  HStack,
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
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { ImFire } from "react-icons/im";
import { db, storage } from "../../firebase/config";
import { AuthContext } from "../_app";
import { FiMail } from "react-icons/fi";
import SkilIndex from "../../components/users/SkilIndex";
import History from "../../components/users/History";
import Introduction from "../../components/users/Introduction";
import Works from "../../components/users/Works";
import { FaFileUpload, FaPen } from "react-icons/fa";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const DetailUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { id } = router.query;
  const [user] = useDocumentData(doc(db, "users", id));
  const [loading, setLoading] = React.useState(true);
  const { currentUser } = React.useContext(AuthContext);

  // history
  const [historyCategory, setHistoryCategory] = React.useState("1");
  const [historyTitle, setHistoryTitle] = React.useState("");
  const [historySubTitle, setHistorySubTitle] = React.useState("");
  const [historyContent, setHistoryContent] = React.useState("");
  const [historyImage, setHistoryImage] = React.useState("");
  const [historyStartTime, setHistoryStartTime] = React.useState("");
  const [historyEndTime, setHistoryEndTime] = React.useState("");
  const [historyImagePreview, setHistoryImagePreview] = React.useState("");
  const historyImagePreviewRef = React.useRef(null);

  // skils
  const [skilLevel, setSkilLevel] = React.useState("1");
  const [skilTitle, setSkilTitle] = React.useState("");
  const [skilImage, setSkilImage] = React.useState("");
  const [skilImagePreview, setSkilImagePreview] = React.useState("");
  const skilImagePreviewRef = React.useRef(null);

  // introduction
  const [introductionTitle, setIntroductionTitle] = React.useState("");
  const [introductionContent, setIntroductionContent] = React.useState("");
  const [introductionImage, setIntroductionImage] = React.useState("");
  const [introductionImagePreview, setIntroductionImagePreview] =
    React.useState("");
  const introductionImagePreviewRef = React.useRef(null);

  const [snapshot] = useCollection(collection(db, "rooms"));
  const rooms = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  const tabIndex = React.useRef(0);

  React.useEffect(() => {
    if (router.query.tab === "skils") {
      tabIndex.current = 0;
    } else if (router.query.tab === "history") {
      tabIndex.current = 1;
    } else if (router.query.tab === "works") {
      tabIndex.current = 2;
    } else if (router.query.tab === "introduction") {
      tabIndex.current = 3;
    }
    setLoading(false);
  }, [router.query.tab]);

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

  // imagePreview
  // history
  const onClickHistoryImagePreview = () => {
    if (historyImagePreviewRef.current) {
      historyImagePreviewRef.current.click();
    }
  };

  const onChangeHistoryImageHandler = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setHistoryImagePreview(window.URL.createObjectURL(file));
      setHistoryImage(e.target.files[0]);
      e.target.value = "";
    }
  };
  // skil
  const onClickSkilImagePreview = () => {
    if (skilImagePreviewRef.current) {
      skilImagePreviewRef.current.click();
    }
  };

  const onChangeSkilImageHandler = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setSkilImagePreview(window.URL.createObjectURL(file));
      setSkilImage(e.target.files[0]);
      e.target.value = "";
    }
  };

  // introduction
  const onClickIntroductionImagePreview = () => {
    if (introductionImagePreviewRef.current) {
      introductionImagePreviewRef.current.click();
    }
  };

  const onChangeIntroductionImageHandler = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setIntroductionImagePreview(window.URL.createObjectURL(file));
      setIntroductionImage(e.target.files[0]);
      e.target.value = "";
    }
  };

  const skilsUrl = () => {
    if (
      window.location.href ===
      `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}users/${id}?tab=skils`
    ) {
      return true;
    } else if (
      window.location.href ===
      `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}users/${id}`
    ) {
      return true;
    }
  };

  // submit
  // history
  const handleHistorySubmit = async (e) => {
    e.preventDefault();
    const userRef = await doc(db, "users", id);
    const uploadHistoryImage = uploadBytesResumable(
      ref(storage, `history/${historyImage.name}`),
      historyImage
    );
    uploadHistoryImage.on(
      "state_changed",
      () => {},
      (err) => {
        alert(err.message);
      },
      async () => {
        await getDownloadURL(ref(storage, `history/${historyImage.name}`)).then(
          async (url) => {
            try {
              if (user?.history) {
                await updateDoc(userRef, {
                  history: [
                    ...user.history,
                    {
                      category: historyCategory,
                      title: historyTitle,
                      subTitle: historySubTitle,
                      content: historyContent,
                      image: url,
                      startTime: historyStartTime,
                      endTime: historyEndTime,
                    },
                  ],
                }).then(() => {
                  onClose();
                });
              } else {
                await updateDoc(userRef, {
                  history: [
                    {
                      category: historyCategory,
                      title: historyTitle,
                      subTitle: historySubTitle,
                      content: historyContent,
                      image: url,
                      startTime: historyStartTime,
                      endTime: historyEndTime,
                    },
                  ],
                }).then(() => {
                  onClose();
                });
              }
            } catch (e) {
              console.log(e);
            }
            setHistoryCategory("1");
            setHistoryTitle("");
            setHistorySubTitle("");
            setHistoryContent("");
            setHistoryStartTime("");
            setHistoryEndTime("");
            setHistoryImage("");
            setHistoryImagePreview("");
          }
        );
      }
    );
  };

  // skil
  const handleSkilSubmit = async (e) => {
    e.preventDefault();
    const userRef = await doc(db, "users", id);
    const uploadSkilImage = uploadBytesResumable(
      ref(storage, `skil/${skilImage.name}`),
      skilImage
    );
    uploadSkilImage.on(
      "state_changed",
      () => {},
      (err) => {
        alert(err.message);
      },
      async () => {
        await getDownloadURL(ref(storage, `skil/${skilImage.name}`)).then(
          async (url) => {
            try {
              if (user?.skils) {
                await updateDoc(userRef, {
                  skils: [
                    ...user.skils,
                    {
                      level: skilLevel,
                      title: skilTitle,
                      image: url,
                    },
                  ],
                }).then(() => {
                  onClose();
                });
              } else {
                await updateDoc(userRef, {
                  skils: [
                    {
                      level: skilLevel,
                      title: skilTitle,
                      image: url,
                    },
                  ],
                }).then(() => {
                  onClose();
                });
              }
            } catch (e) {
              console.log(e);
            }
            setSkilLevel("1");
            setSkilTitle("");
            setSkilImage("");
            setSkilImagePreview("");
          }
        );
      }
    );
  };

  // skil
  const handleIntroductionSubmit = async (e) => {
    e.preventDefault();
    const userRef = await doc(db, "users", id);
    const uploadIntroductionImage = uploadBytesResumable(
      ref(storage, `introduction/${introductionImage.name}`),
      introductionImage
    );
    uploadIntroductionImage.on(
      "state_changed",
      () => {},
      (err) => {
        alert(err.message);
      },
      async () => {
        await getDownloadURL(
          ref(storage, `introduction/${introductionImage.name}`)
        ).then(async (url) => {
          try {
            if (user?.introductions) {
              await updateDoc(userRef, {
                introductions: [
                  ...user.introductions,
                  {
                    title: introductionTitle,
                    content: introductionContent,
                    image: url,
                  },
                ],
              }).then(() => {
                onClose();
              });
            } else {
              await updateDoc(userRef, {
                introductions: [
                  {
                    title: introductionTitle,
                    content: introductionContent,
                    image: url,
                  },
                ],
              }).then(() => {
                onClose();
              });
            }
          } catch (e) {
            console.log(e);
          }
          setIntroductionTitle("");
          setIntroductionContent("");
          setIntroductionImage("");
          setIntroductionImagePreview("");
        });
      }
    );
  };

  console.log("skilCategory", skilLevel);

  return (
    <>
      <Flex w="100%" h="100%" direction="column" zIndex="5">
        <Tabs
          defaultIndex={tabIndex.current}
          h="100vh"
          w="100%"
          // bg="red.100"
          colorScheme="teal"
          variant="soft-rounded"
          position="relative"
          top="0"
          justifyContent="center"
        >
          <Flex
            w="100%"
            h="240px"
            bg="white"
            position="absolute"
            top="0"
            pt="56px"
            justifyContent="center"
            zIndex="2"
          >
            <Flex
              cursor="pointer"
              justifyContent="center"
              mb="40px"
              w="800px"
              px="24px"
            >
              <Flex mr="24px">
                <Avatar w="60px" h="60px" src={user?.photoURL} alt="avatar" />
              </Flex>
              <Flex direction="column">
                <Flex mb="16px" justifyContent="space-between">
                  <Flex>
                    <Flex alignItems="center" mr="24px">
                      <Text fontSize="20px" fontWeight="bold" mr="8px">
                        {user?.name}
                      </Text>
                      <Icon fontSize="20px" color="red.500" as={ImFire} />
                    </Flex>
                    <HStack
                      alignItems="center"
                      spacing="8px"
                      fontSize="12px"
                      mr="32px"
                    >
                      <Text
                        border="1px solid black"
                        p="4px 8px"
                        borderRadius="md"
                      >
                        エンジニア
                      </Text>
                      <Text
                        border="1px solid black"
                        p="4px 8px"
                        borderRadius="md"
                      >
                        デザイナー
                      </Text>
                    </HStack>
                  </Flex>
                  {id === currentUser?.uid && (
                    <Icon as={FaPen} alignSelf="center" cursor="pointer" />
                  )}
                </Flex>
                <Text mb="16px">
                  現在は就職活動のためにポートフォリオ作成をしています！チーム開発の経験を積むためにいろんな開発に携わりたいです！
                </Text>
                <HStack spacing="8px" fontSize="12px">
                  <Text
                    borderRadius="full"
                    p="4px 8px"
                    border="1px solid black"
                  >
                    React
                  </Text>
                  <Text
                    borderRadius="full"
                    p="4px 8px"
                    border="1px solid black"
                  >
                    Rails
                  </Text>
                  <Text
                    borderRadius="full"
                    p="4px 8px"
                    border="1px solid black"
                  >
                    HTML
                  </Text>
                  {id !== currentUser?.uid && (
                    <>
                      <Button
                        disabled={dmButtonToggle()}
                        onClick={
                          followingToggle() ? handleFollow : handleUnFollow
                        }
                        bg="gray.300"
                      >
                        {matching()}
                      </Button>
                      {dmButtonToggle() && (
                        <IconButton
                          p="8px"
                          onClick={handleCreateDm}
                          as={FiMail}
                        />
                      )}
                    </>
                  )}
                </HStack>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            w="100%"
            // h="40px"
            bg="white"
            position="absolute"
            top="240px"
            left="0"
            direction="column"
            alignItems="center"
            zIndex="2"
          >
            <Flex w="800px">
              <TabList>
                <Tab
                  onClick={() =>
                    router.push(`${id}/?tab=skils`, undefined, {
                      shallow: true,
                    })
                  }
                >
                  スキル
                </Tab>
                <Tab
                  onClick={() =>
                    router.push(`${id}/?tab=history`, undefined, {
                      shallow: true,
                    })
                  }
                >
                  経歴
                </Tab>
                <Tab
                  onClick={() =>
                    router.push(`${id}/?tab=works`, undefined, {
                      shallow: true,
                    })
                  }
                >
                  作品
                </Tab>
                <Tab
                  onClick={() =>
                    router.push(`${id}/?tab=introduction`, undefined, {
                      shallow: true,
                    })
                  }
                >
                  自己紹介
                </Tab>
              </TabList>
            </Flex>
          </Flex>
          <Flex w="100%" h="100%" overflowX="scroll" direction="column">
            <TabPanels w="800px" h="100%" mt="300px" zIndex="1">
              <TabPanel w="100%" h="100%">
                <Flex
                  w="100%"
                  h="100%"
                  bg="white"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Flex w="800px" flexWrap="wrap">
                    <SkilIndex
                      currentUser={currentUser}
                      id={id}
                      onOpen={onOpen}
                      skils={user?.skils}
                    />
                  </Flex>
                </Flex>
              </TabPanel>
              <TabPanel w="100%" h="100%">
                <Flex w="100%" h="100%" bg="white">
                  <Flex w="100%" h="100%" justifyContent="center">
                    <History
                      currentUser={currentUser}
                      id={id}
                      onOpen={onOpen}
                      history={user?.history}
                    />
                  </Flex>
                </Flex>
              </TabPanel>
              <TabPanel w="100%" h="100%">
                <Flex
                  w="100%"
                  h="100%"
                  bg="white"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Flex w="800px" flexWrap="wrap" pb="80px">
                    <Works onOpen={onOpen} currentUser={currentUser} id={id} />
                  </Flex>
                </Flex>
              </TabPanel>
              <TabPanel w="100%" h="100%">
                <Flex w="100%" h="100%" bg="white">
                  <Flex w="100%" h="100%" justifyContent="center">
                    <Introduction
                      currentUser={currentUser}
                      id={id}
                      onOpen={onOpen}
                      introductions={user?.introductions}
                    />
                  </Flex>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Flex>
        </Tabs>
      </Flex>
      {skilsUrl() && (
        <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent bg="gray.100">
            <ModalCloseButton />
            <ModalBody my="40px">
              <Flex mb="16px" fontWeight="bold" fontSize="24px">
                スキル追加
              </Flex>
              <InputGroup as="form" onSubmit={handleSkilSubmit}>
                <Flex direction="column" w="100%">
                  <Accordion defaultIndex={[0]}>
                    <AccordionItem>
                      <AccordionButton>
                        <Text fontWeight="bold">自分で作成</Text>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb="16px">
                        <Flex direction="column" mb="16px">
                          <Text fontWeight="bold" mb="8px">
                            スキル・ツール名
                          </Text>
                          <Input
                            type="text"
                            value={skilTitle}
                            onChange={(e) => setSkilTitle(e.target.value)}
                            fontSize="24px"
                            fontWeight="bold"
                            placeholder="例）Photoshop"
                          />
                        </Flex>
                        <Flex direction="column" mb="16px" w="100%">
                          <Text fontWeight="bold" mb="8px">
                            ロゴ・アイコン画像
                          </Text>
                          {skilImagePreview ? (
                            <Image
                              objectFit="cover"
                              loading="lazy"
                              type="text"
                              borderRadius="xl"
                              h="140px"
                              w="200px"
                              src={skilImagePreview}
                              onClick={onClickSkilImagePreview}
                              bg="gray.100"
                              alt="project-thumbnail"
                              cursor="pointer"
                              border="1px solid teal"
                            />
                          ) : (
                            <Center
                              cursor="pointer"
                              w="200px"
                              h="140px"
                              bg="gray.300"
                              borderRadius="lg"
                              onClick={onClickSkilImagePreview}
                            >
                              <Flex direction="column" alignItems="center">
                                <VStack spacing="16px">
                                  <Icon as={FaFileUpload} fontSize="20px" />
                                  <Text fontSize="16px" fontWeight="bold">
                                    画像を追加
                                  </Text>
                                </VStack>
                              </Flex>
                            </Center>
                          )}
                          <Input
                            type="file"
                            onChange={(e) => onChangeSkilImageHandler(e)}
                            style={{ display: "none" }}
                            name="image"
                            id="image"
                            ref={skilImagePreviewRef}
                          />
                        </Flex>
                      </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                      <AccordionButton>
                        <Text fontWeight="bold">既にあるものから選択</Text>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb="16px"></AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                  {/* <Flex direction="column" mb="16px">
                    <Text fontWeight="bold" mb="8px">
                      スキル・ツール名
                    </Text>
                    <Input
                      type="text"
                      // value={historyTitle}
                      // onChange={(e) => setHistoryTitle(e.target.value)}
                      fontSize="24px"
                      fontWeight="bold"
                      placeholder="React"
                    />
                  </Flex>
                  <Flex direction="column" mb="16px" w="100%">
                    <Text fontWeight="bold" mb="8px">
                      ロゴ・アイコン画像
                    </Text>
                    {historyImagePreview ? (
                      <Image
                        objectFit="cover"
                        loading="lazy"
                        type="text"
                        borderRadius="xl"
                        h="140px"
                        w="200px"
                        src={historyImagePreview}
                        onClick={onClickHistoryImagePreview}
                        bg="gray.100"
                        alt="project-thumbnail"
                        cursor="pointer"
                        border="1px solid teal"
                      />
                    ) : (
                      <Center
                        cursor="pointer"
                        w="200px"
                        h="140px"
                        bg="gray.300"
                        borderRadius="lg"
                        onClick={onClickHistoryImagePreview}
                      >
                        <Flex direction="column" alignItems="center">
                          <VStack spacing="16px">
                            <Icon as={FaFileUpload} fontSize="20px" />
                            <Text fontSize="16px" fontWeight="bold">
                              画像を追加
                            </Text>
                          </VStack>
                        </Flex>
                      </Center>
                    )}
                    <Input
                      type="file"
                      onChange={(e) => onChangeHistoryImageHandler(e)}
                      style={{ display: "none" }}
                      name="image"
                      id="image"
                      ref={historyImagePreviewRef}
                    />
                  </Flex> */}
                  <Flex direction="column" mb="16px">
                    <Text fontWeight="bold" mb="8px">
                      自己評価
                    </Text>
                    <RadioGroup
                      onChange={setSkilLevel}
                      value={skilLevel}
                      mb="16px"
                    >
                      <Stack direction="row" fontWeight="bold">
                        <Radio value="1">初心者</Radio>
                        <Radio value="2">中級者</Radio>
                        <Radio value="3">上級者</Radio>
                        <Radio value="4">達人</Radio>
                      </Stack>
                    </RadioGroup>
                  </Flex>

                  <Button bg="teal.300" mt="16px" type="submit">
                    追加
                  </Button>
                </Flex>
              </InputGroup>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      {window.location.href ===
        `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}users/${id}?tab=history` && (
        <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent bg="gray.100">
            <ModalCloseButton />
            <ModalBody my="40px">
              <Flex mb="16px" fontWeight="bold" fontSize="24px">
                経歴追加
              </Flex>
              <InputGroup as="form" onSubmit={handleHistorySubmit}>
                <Flex direction="column" w="100%">
                  <RadioGroup
                    onChange={setHistoryCategory}
                    value={historyCategory}
                    mb="16px"
                  >
                    <Stack direction="row" fontWeight="bold">
                      <Radio value="1">職歴</Radio>
                      <Radio value="2">学歴</Radio>
                    </Stack>
                  </RadioGroup>
                  {historyCategory === "1" ? (
                    <>
                      <Flex direction="column" mb="16px">
                        <Text fontWeight="bold" mb="8px">
                          会社名
                        </Text>
                        <Input
                          type="text"
                          value={historyTitle}
                          onChange={(e) => setHistoryTitle(e.target.value)}
                          fontSize="24px"
                          fontWeight="bold"
                          placeholder="デジタルハリウッド株式会社"
                        />
                      </Flex>
                      <Flex direction="column" mb="16px">
                        <Text fontWeight="bold" mb="8px">
                          部署 / 役職
                        </Text>
                        <Input
                          type="text"
                          value={historySubTitle}
                          onChange={(e) => setHistorySubTitle(e.target.value)}
                          fontSize="16px"
                          fontWeight="bold"
                          placeholder="プロダクト部 / フロントエンドエンジニア"
                        />
                      </Flex>
                    </>
                  ) : (
                    <>
                      <Flex direction="column" mb="16px">
                        <Text fontWeight="bold" mb="8px">
                          学校名
                        </Text>
                        <Input
                          type="text"
                          value={historyTitle}
                          onChange={(e) => setHistoryTitle(e.target.value)}
                          fontSize="24px"
                          fontWeight="bold"
                          placeholder="デジタルハリウッド大学"
                        />
                      </Flex>
                      <Flex direction="column" mb="16px">
                        <Text fontWeight="bold" mb="8px">
                          学部名 / 学科名
                        </Text>
                        <Input
                          type="text"
                          value={historySubTitle}
                          onChange={(e) => setHistorySubTitle(e.target.value)}
                          fontSize="16px"
                          fontWeight="bold"
                          placeholder="デジタルコミュニケーション学部 / デジタルコンテンツ学科"
                        />
                      </Flex>
                    </>
                  )}
                  <Flex>
                    <Flex direction="column" mb="16px" w="50%">
                      <Text fontWeight="bold" mb="8px">
                        いつから
                      </Text>
                      <Input
                        fontSize="16px"
                        fontWeight="bold"
                        placeholder="Select Date and Time"
                        type="date"
                        value={historyStartTime}
                        onChange={(e) => setHistoryStartTime(e.target.value)}
                      />
                    </Flex>
                    <Flex direction="column" mb="16px" w="50%">
                      <Text fontWeight="bold" mb="8px">
                        いつまで
                      </Text>
                      <Input
                        fontSize="16px"
                        fontWeight="bold"
                        placeholder="Select Date and Time"
                        type="date"
                        value={historyEndTime}
                        onChange={(e) => setHistoryEndTime(e.target.value)}
                      />
                    </Flex>
                  </Flex>
                  <Flex direction="column" mb="16px" w="100%">
                    <Text fontWeight="bold" mb="8px">
                      内容
                    </Text>
                    <Textarea
                      resize="none"
                      fontSize="16px"
                      fontWeight="bold"
                      placeholder="あなたがここで目指したこと、役割だと思ったこと"
                      type="text"
                      value={historyContent}
                      onChange={(e) => setHistoryContent(e.target.value)}
                    />
                  </Flex>
                  <Flex direction="column" mb="16px" w="100%">
                    <Text fontWeight="bold" mb="8px">
                      画像
                    </Text>
                    {historyImagePreview ? (
                      <Image
                        objectFit="cover"
                        loading="lazy"
                        type="text"
                        borderRadius="xl"
                        h="140px"
                        w="200px"
                        src={historyImagePreview}
                        onClick={onClickHistoryImagePreview}
                        bg="gray.100"
                        alt="project-thumbnail"
                        cursor="pointer"
                        border="1px solid teal"
                      />
                    ) : (
                      <Center
                        cursor="pointer"
                        w="200px"
                        h="140px"
                        bg="gray.300"
                        borderRadius="lg"
                        onClick={onClickHistoryImagePreview}
                      >
                        <Flex direction="column" alignItems="center">
                          <VStack spacing="16px">
                            <Icon as={FaFileUpload} fontSize="20px" />
                            <Text fontSize="16px" fontWeight="bold">
                              画像を追加
                            </Text>
                          </VStack>
                        </Flex>
                      </Center>
                    )}
                    <Input
                      type="file"
                      onChange={(e) => onChangeHistoryImageHandler(e)}
                      style={{ display: "none" }}
                      name="image"
                      id="image"
                      ref={historyImagePreviewRef}
                    />
                  </Flex>
                  <Button bg="teal.300" mt="16px" type="submit">
                    追加
                  </Button>
                </Flex>
              </InputGroup>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      {window.location.href ===
        `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}users/${id}?tab=works` && (
        <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent bg="gray.100">
            <ModalCloseButton />
            <ModalBody my="40px">
              <Flex mb="16px" fontWeight="bold" fontSize="24px">
                作品追加
              </Flex>
              <InputGroup as="form" onSubmit={handleHistorySubmit}>
                <Flex direction="column" w="100%">
                  <Flex direction="column" mb="16px">
                    <Text fontWeight="bold" mb="8px">
                      タイトル
                    </Text>
                    <Input
                      type="text"
                      value={introductionTitle}
                      onChange={(e) => setIntroductionTitle(e.target.value)}
                      fontSize="24px"
                      fontWeight="bold"
                      placeholder="作品タイトル"
                    />
                  </Flex>
                  <Flex direction="column" mb="16px">
                    <Text fontWeight="bold" mb="8px">
                      リンク
                    </Text>
                    <Input
                      type="text"
                      value={historySubTitle}
                      onChange={(e) => setHistorySubTitle(e.target.value)}
                      fontSize="16px"
                      fontWeight="bold"
                      placeholder="https://google.com"
                    />
                  </Flex>
                  <Flex direction="column" mb="16px" w="100%">
                    <Text fontWeight="bold" mb="8px">
                      作品概要
                    </Text>
                    <Textarea
                      resize="none"
                      fontSize="16px"
                      fontWeight="bold"
                      placeholder="作品の簡単な概要を書いてみよう"
                      type="text"
                      value={introductionContent}
                      onChange={(e) => setIntroductionContent(e.target.value)}
                    />
                  </Flex>
                  <Flex direction="column" mb="16px" w="100%">
                    <Text fontWeight="bold" mb="8px">
                      作品目的
                    </Text>
                    <Textarea
                      resize="none"
                      fontSize="16px"
                      fontWeight="bold"
                      placeholder="作品の目的や背景を書いてみよう"
                      type="text"
                      value={introductionContent}
                      onChange={(e) => setIntroductionContent(e.target.value)}
                    />
                  </Flex>
                  <Flex direction="column" mb="16px" w="100%">
                    <Text fontWeight="bold" mb="8px">
                      サムネイル画像
                    </Text>
                    {introductionImagePreview ? (
                      <Image
                        objectFit="cover"
                        loading="lazy"
                        type="text"
                        borderRadius="xl"
                        h="140px"
                        w="200px"
                        src={introductionImagePreview}
                        onClick={onClickIntroductionImagePreview}
                        bg="gray.100"
                        alt="project-thumbnail"
                        cursor="pointer"
                        border="1px solid teal"
                      />
                    ) : (
                      <Center
                        cursor="pointer"
                        w="200px"
                        h="140px"
                        bg="gray.300"
                        borderRadius="lg"
                        onClick={onClickIntroductionImagePreview}
                      >
                        <Flex direction="column" alignItems="center">
                          <VStack spacing="16px">
                            <Icon as={FaFileUpload} fontSize="20px" />
                            <Text fontSize="16px" fontWeight="bold">
                              画像を追加
                            </Text>
                          </VStack>
                        </Flex>
                      </Center>
                    )}
                    <Input
                      type="file"
                      onChange={(e) => onChangeIntroductionImageHandler(e)}
                      style={{ display: "none" }}
                      name="image"
                      id="image"
                      ref={introductionImagePreviewRef}
                    />
                  </Flex>
                  <Button bg="teal.300" mt="16px" type="submit">
                    追加
                  </Button>
                </Flex>
              </InputGroup>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      {window.location.href ===
        `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}users/${id}?tab=introduction` && (
        <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent bg="gray.100">
            <ModalCloseButton />
            <ModalBody my="40px">
              <Flex mb="16px" fontWeight="bold" fontSize="24px">
                自己紹介追加
              </Flex>
              <InputGroup as="form" onSubmit={handleIntroductionSubmit}>
                <Flex direction="column" w="100%">
                  <Flex direction="column" mb="16px">
                    <Text fontWeight="bold" mb="8px">
                      タイトル
                    </Text>
                    <Input
                      type="text"
                      value={introductionTitle}
                      onChange={(e) => setIntroductionTitle(e.target.value)}
                      fontSize="24px"
                      fontWeight="bold"
                      placeholder="例）好きな食べ物"
                    />
                  </Flex>
                  <Flex direction="column" mb="16px" w="100%">
                    <Text fontWeight="bold" mb="8px">
                      内容
                    </Text>
                    <Textarea
                      resize="none"
                      fontSize="16px"
                      fontWeight="bold"
                      placeholder="テーマに沿って自分を表現してみましょう"
                      type="text"
                      value={introductionContent}
                      onChange={(e) => setIntroductionContent(e.target.value)}
                    />
                  </Flex>
                  <Flex direction="column" mb="16px" w="100%">
                    <Text fontWeight="bold" mb="8px">
                      画像
                    </Text>
                    {introductionImagePreview ? (
                      <Image
                        objectFit="cover"
                        loading="lazy"
                        type="text"
                        borderRadius="xl"
                        h="140px"
                        w="200px"
                        src={introductionImagePreview}
                        onClick={onClickIntroductionImagePreview}
                        bg="gray.100"
                        alt="project-thumbnail"
                        cursor="pointer"
                        border="1px solid teal"
                      />
                    ) : (
                      <Center
                        cursor="pointer"
                        w="200px"
                        h="140px"
                        bg="gray.300"
                        borderRadius="lg"
                        onClick={onClickIntroductionImagePreview}
                      >
                        <Flex direction="column" alignItems="center">
                          <VStack spacing="16px">
                            <Icon as={FaFileUpload} fontSize="20px" />
                            <Text fontSize="16px" fontWeight="bold">
                              画像を追加
                            </Text>
                          </VStack>
                        </Flex>
                      </Center>
                    )}
                    <Input
                      type="file"
                      onChange={(e) => onChangeIntroductionImageHandler(e)}
                      style={{ display: "none" }}
                      name="image"
                      id="image"
                      ref={introductionImagePreviewRef}
                    />
                  </Flex>
                  <Button bg="teal.300" mt="16px" type="submit">
                    追加
                  </Button>
                </Flex>
              </InputGroup>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default DetailUser;
