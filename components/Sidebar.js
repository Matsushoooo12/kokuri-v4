import {
  Avatar,
  Flex,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { FiMail } from "react-icons/fi";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { Tooltip } from "@chakra-ui/react";
import { ImPencil } from "react-icons/im";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";
import { useRouter } from "next/router";
import { AuthContext } from "../pages/_app";
import { FiLogIn } from "react-icons/fi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { GiHammerNails } from "react-icons/gi";
import { signOut } from "firebase/auth";

const Sidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const { currentUser } = React.useContext(AuthContext);
  const [user] = useAuthState(auth);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  let uri = window.location.href;
  uri = decodeURI(uri);

  const homeUrl = (url) => {
    if (url === process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
      return true;
    } else if (url === `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}?tab=projects`) {
      return true;
    } else if (url === `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}?tab=users`) {
      return true;
    }
  };

  const messageUrl = (url) => {
    if (url.indexOf(`${process.env.NEXT_PUBLIC_ROOT_DOMAIN}messages`) != -1) {
      return true;
    } else {
      return false;
    }
  };

  const myUserUrl = (url) => {
    if (url === `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}users/${user?.uid}`) {
      return true;
    } else if (
      url ===
      `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}users/${user?.uid}?tab=skils`
    ) {
      return true;
    } else if (
      url ===
      `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}users/${user?.uid}?tab=history`
    ) {
      return true;
    } else if (
      url ===
      `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}users/${user?.uid}?tab=works`
    ) {
      return true;
    } else if (
      url ===
      `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}users/${user?.uid}?tab=introduction`
    ) {
      return true;
    }
  };

  const handleSignOut = async () => {
    await signOut(auth).then(() => {
      router.push("/");
    });
  };

  return (
    <Flex
      w={isOpen ? "230px" : "70px"}
      h="100vh"
      bg="white"
      borderRight="1px solid black"
      alignItems="flex-start"
      direction="column"
      transition="all 0.3s ease-in-out"
    >
      <Flex
        mt="20px"
        mb="56px"
        p="20px"
        w="100%"
        _hover={{ bg: "gray.100", cursor: "pointer" }}
        alignItems="center"
        onClick={() => router.push("/")}
      >
        <Icon
          color="teal.500"
          as={GiHammerNails}
          fontSize="28px"
          alignSelf="center"
        />
        <Text
          className="logo"
          color="teal.500"
          ml="16px"
          fontSize="20px"
          fontWeight="bold"
          display={isOpen ? "block" : "none"}
          minW="160px"
          borderBottom="1px solid black"
          borderColor="teal.500"
          pb="4px"
        >
          The Creators
        </Text>
      </Flex>
      <Flex direction="column" alignItems="flex-start" mb="72px" w="100%">
        <Tooltip
          label="Home"
          display={isOpen ? "none" : "block"}
          placement="right"
        >
          <Flex
            p="20px"
            w="100%"
            _hover={
              homeUrl(window.location.href)
                ? { bg: "teal.100", cursor: "default" }
                : { bg: "gray.100", cursor: "pointer" }
            }
            alignItems="center"
            onClick={() => router.push("/")}
            bg={homeUrl(window.location.href) && "teal.100"}
          >
            <Icon as={AiOutlineHome} fontSize="28px" alignSelf="center" />
            <Text
              ml="16px"
              fontSize="20px"
              fontWeight="bold"
              display={isOpen ? "block" : "none"}
            >
              Home
            </Text>
          </Flex>
        </Tooltip>
        <Tooltip
          label="Notification"
          display={isOpen ? "none" : "block"}
          placement="right"
        >
          <Flex
            p="20px"
            _hover={{ bg: "gray.100", cursor: "pointer" }}
            w="100%"
          >
            <Icon
              as={IoMdNotificationsOutline}
              fontSize="28px"
              alignSelf="center"
            />
            <Text
              ml="16px"
              fontSize="20px"
              fontWeight="bold"
              display={isOpen ? "block" : "none"}
            >
              Notification
            </Text>
          </Flex>
        </Tooltip>
        <Tooltip
          label="Projects"
          display={isOpen ? "none" : "block"}
          placement="right"
        >
          <Flex
            p="20px"
            _hover={
              uri ===
              `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}users/${user?.uid}/projects`
                ? { bg: "teal.100", cursor: "default" }
                : { bg: "gray.100", cursor: "pointer" }
            }
            w="100%"
            onClick={() => router.push(`/users/${user.uid}/projects`)}
            bg={
              uri ===
                `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}users/${user?.uid}/projects` &&
              "teal.100"
            }
          >
            <Icon
              as={MdOutlineStickyNote2}
              fontSize="24px"
              alignSelf="center"
              ml="2px"
            />
            <Text
              ml="16px"
              fontSize="20px"
              fontWeight="bold"
              display={isOpen ? "block" : "none"}
            >
              Projects
            </Text>
          </Flex>
        </Tooltip>
        <Tooltip
          label="matching"
          display={isOpen ? "none" : "block"}
          placement="right"
        >
          <Flex
            p="20px"
            _hover={
              uri ===
              `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}users/${user?.uid}/matching`
                ? { bg: "teal.100", cursor: "default" }
                : { bg: "gray.100", cursor: "pointer" }
            }
            w="100%"
            onClick={() => router.push(`/users/${user.uid}/matching`)}
            bg={
              uri ===
                `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}users/${user?.uid}/matching` &&
              "teal.100"
            }
          >
            <Icon ml="2px" as={BiUser} fontSize="24px" alignSelf="center" />
            <Text
              ml="16px"
              fontSize="20px"
              fontWeight="bold"
              display={isOpen ? "block" : "none"}
            >
              Matching
            </Text>
          </Flex>
        </Tooltip>
        <Tooltip
          label="Message"
          display={isOpen ? "none" : "block"}
          placement="right"
        >
          <Flex
            p="20px"
            _hover={
              messageUrl(window.location.href)
                ? { bg: "teal.100", cursor: "default" }
                : { bg: "gray.100", cursor: "pointer" }
            }
            w="100%"
            onClick={() => router.push("/messages")}
            bg={messageUrl(window.location.href) && "teal.100"}
          >
            <Icon ml="2px" as={FiMail} fontSize="24px" alignSelf="center" />
            <Text
              ml="16px"
              fontSize="20px"
              fontWeight="bold"
              display={isOpen ? "block" : "none"}
            >
              Message
            </Text>
          </Flex>
        </Tooltip>
        <Tooltip
          label="Bookmark"
          display={isOpen ? "none" : "block"}
          placement="right"
        >
          <Flex
            p="20px"
            _hover={{ bg: "gray.100", cursor: "pointer" }}
            w="100%"
          >
            <Icon
              as={MdOutlineBookmarkBorder}
              fontSize="28px"
              alignSelf="center"
            />
            <Text
              ml="16px"
              fontSize="20px"
              fontWeight="bold"
              display={isOpen ? "block" : "none"}
            >
              Bookmark
            </Text>
          </Flex>
        </Tooltip>
      </Flex>
      <Flex direction="column" alignItems="center" onClick={toggleNavbar}>
        <Flex p="20px" _hover={{ cursor: "pointer" }}>
          <Icon
            ml={isOpen ? "6px" : 0}
            as={isOpen ? MdArrowBackIos : MdArrowForwardIos}
            fontSize="24px"
          />
        </Flex>
      </Flex>
      <Flex direction="column" alignItems="flex-start" w="100%">
        <Tooltip
          label="Create a project"
          display={isOpen ? "none" : "block"}
          placement="right"
        >
          <Flex
            p="20px"
            _hover={
              uri === `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}projects/new`
                ? { bg: "teal.100", cursor: "default" }
                : { bg: "gray.100", cursor: "pointer" }
            }
            w="100%"
            onClick={() => {
              router.replace("/projects/new");
            }}
            bg={
              uri === `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}projects/new` &&
              "teal.100"
            }
          >
            <Icon as={ImPencil} fontSize="28px" />
            <Text
              ml="16px"
              fontSize="20px"
              fontWeight="bold"
              display={isOpen ? "block" : "none"}
            >
              Create
            </Text>
          </Flex>
        </Tooltip>
        {currentUser ? (
          <>
            <Tooltip
              label="Edit profile"
              display={isOpen ? "none" : "block"}
              placement="right"
            >
              <Popover placement="right">
                <PopoverTrigger>
                  <Flex
                    p="18px"
                    _hover={
                      myUserUrl(window.location.href)
                        ? { bg: "teal.100", cursor: "default" }
                        : { bg: "gray.100", cursor: "pointer" }
                    }
                    w="100%"
                    bg={myUserUrl(window.location.href) && "teal.100"}
                    // onClick={() => router.push(`/users/${user?.uid}`)}
                  >
                    <Avatar src={user.photoURL} w="32px" h="32px" />
                    <Text
                      ml="16px"
                      fontSize="20px"
                      fontWeight="bold"
                      display={isOpen ? "block" : "none"}
                      minW="160px"
                    >
                      {user.displayName}
                    </Text>
                  </Flex>
                </PopoverTrigger>
                <PopoverContent w="200px" h="100%" bg="white">
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Flex
                      w="100%"
                      h="100%"
                      p="4px 8px"
                      // bg="red.100"
                      borderBottom="1px solid black"
                      borderColor="gray.300"
                      mb="8px"
                    >
                      <Text fontWeight="bold">{currentUser.username}</Text>
                    </Flex>
                    <VStack
                      spacing="4px"
                      alignItems="flex-start"
                      p="4px 8px"
                      fontSize="14px"
                    >
                      <Text
                        cursor="pointer"
                        onClick={() => router.push(`/users/${user?.uid}`)}
                      >
                        プロフィール詳細
                      </Text>
                      <Text
                        cursor="pointer"
                        onClick={() =>
                          router.push(`/users/${user?.uid}/new-works`)
                        }
                      >
                        作品投稿
                      </Text>
                      <Text cursor="pointer">設定</Text>
                      <Text cursor="pointer">ヘルプ</Text>
                      <Text cursor="pointer" onClick={handleSignOut}>
                        ログアウト
                      </Text>
                    </VStack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip
              label="登録"
              display={isOpen ? "none" : "block"}
              placement="right"
            >
              <Flex
                p="20px"
                _hover={
                  uri === `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}login`
                    ? { bg: "teal.100", cursor: "default" }
                    : { bg: "gray.100", cursor: "pointer" }
                }
                w="100%"
                onClick={() => router.push("/login")}
                bg={
                  uri === `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}login` &&
                  "teal.100"
                }
              >
                <Icon as={FiLogIn} fontSize="28px" />
                <Text
                  ml="16px"
                  fontSize="20px"
                  fontWeight="bold"
                  display={isOpen ? "block" : "none"}
                >
                  登録
                </Text>
              </Flex>
            </Tooltip>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Sidebar;
