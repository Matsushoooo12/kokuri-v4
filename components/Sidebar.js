import { Avatar, Flex, Heading, Icon, Text, VStack } from "@chakra-ui/react";
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

  return (
    <Flex
      w={isOpen ? "200px" : "70px"}
      h="100vh"
      bg="white"
      borderRight="1px solid black"
      alignItems="flex-start"
      direction="column"
      transition="all 0.3s ease-in-out"
    >
      <Heading
        fontSize="16px"
        p="14px"
        mt="20px"
        mb="56px"
        _hover={{ bg: "gray.100", cursor: "pointer" }}
        w="100%"
        onClick={() => router.push("/")}
      >
        Logo
      </Heading>
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
              window.location.href === process.env.NEXT_PUBLIC_ROOT_DOMAIN
                ? { bg: "teal.100", cursor: "default" }
                : { bg: "gray.100", cursor: "pointer" }
            }
            alignItems="center"
            onClick={() => router.push("/")}
            bg={
              window.location.href === process.env.NEXT_PUBLIC_ROOT_DOMAIN &&
              "teal.100"
            }
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
              uri === `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}projects`
                ? { bg: "teal.100", cursor: "default" }
                : { bg: "gray.100", cursor: "pointer" }
            }
            w="100%"
            onClick={() => router.push("/projects")}
            bg={
              uri === `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}projects` &&
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
          label="users"
          display={isOpen ? "none" : "block"}
          placement="right"
        >
          <Flex
            p="20px"
            _hover={{ bg: "gray.100", cursor: "pointer" }}
            w="100%"
          >
            <Icon ml="2px" as={BiUser} fontSize="24px" alignSelf="center" />
            <Text
              ml="16px"
              fontSize="20px"
              fontWeight="bold"
              display={isOpen ? "block" : "none"}
            >
              users
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
            _hover={{ bg: "gray.100", cursor: "pointer" }}
            w="100%"
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
            onClick={() => router.push("/projects/new")}
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
          <Tooltip
            label="Edit profile"
            display={isOpen ? "none" : "block"}
            placement="right"
          >
            <Flex
              p="18px"
              _hover={
                uri ===
                `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}users/${user.displayName}`
                  ? { bg: "teal.100", cursor: "default" }
                  : { bg: "gray.100", cursor: "pointer" }
              }
              w="100%"
              bg={
                uri ===
                  `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}users/${user.displayName}` &&
                "teal.100"
              }
              onClick={() => router.push(`/users/${user.uid}`)}
            >
              <Avatar src={user.photoURL} w="32px" h="32px" />
              <Text
                ml="16px"
                fontSize="20px"
                fontWeight="bold"
                display={isOpen ? "block" : "none"}
              >
                {user.displayName}
              </Text>
            </Flex>
          </Tooltip>
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
