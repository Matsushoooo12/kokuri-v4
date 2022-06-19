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

const Sidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  console.log(isOpen);
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
        <Tooltip label="Home">
          <Flex
            p="20px"
            w="100%"
            _hover={{ bg: "gray.100", cursor: "pointer" }}
            alignItems="center"
            onClick={() => router.push("/")}
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
        <Tooltip label="Notification">
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
        <Tooltip label="Project">
          <Flex
            p="20px"
            _hover={{ bg: "gray.100", cursor: "pointer" }}
            w="100%"
            onClick={() => router.push("/projects")}
          >
            <Icon
              as={MdOutlineStickyNote2}
              fontSize="24px"
              alignSelf="center"
            />
            <Text
              ml="16px"
              fontSize="20px"
              fontWeight="bold"
              display={isOpen ? "block" : "none"}
            >
              Project
            </Text>
          </Flex>
        </Tooltip>
        <Tooltip label="matching">
          <Flex
            p="20px"
            _hover={{ bg: "gray.100", cursor: "pointer" }}
            w="100%"
          >
            <Icon as={BiUser} fontSize="24px" alignSelf="center" />
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
        <Tooltip label="Message">
          <Flex
            p="20px"
            _hover={{ bg: "gray.100", cursor: "pointer" }}
            w="100%"
          >
            <Icon as={FiMail} fontSize="24px" alignSelf="center" />
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
        <Tooltip label="Bookmark">
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
        <Tooltip label="Setting">
          <Flex
            p="20px"
            _hover={{ bg: "gray.100", cursor: "pointer" }}
            w="100%"
          >
            <Icon as={ImPencil} fontSize="28px" />
            <Text
              ml="16px"
              fontSize="20px"
              fontWeight="bold"
              display={isOpen ? "block" : "none"}
            >
              Setting
            </Text>
          </Flex>
        </Tooltip>
        <Tooltip label="Profile">
          <Flex
            p="18px"
            _hover={{ bg: "gray.100", cursor: "pointer" }}
            w="100%"
          >
            <Avatar src="" w="32px" h="32px" />
            <Text
              ml="16px"
              fontSize="20px"
              fontWeight="bold"
              display={isOpen ? "block" : "none"}
            >
              Profile
            </Text>
          </Flex>
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
