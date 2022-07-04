import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  Image,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { collection } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { IoMdBuild } from "react-icons/io";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { RiShieldUserLine } from "react-icons/ri";
import { db } from "../../../firebase/config";
import { AuthContext } from "../../_app";

const Projects = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const { currentUser } = React.useContext(AuthContext);
  const [snapshot] = useCollection(collection(db, "projects"));
  const projects = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log("projects", projects);

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
    <Tabs
      position="relative"
      h="100vh"
      w="100%"
      variant="soft-rounded"
      colorScheme="teal"
    >
      <Flex direction="column" w="100%" alignItems="center">
        <TabList
          bg="white"
          position="absolute"
          zIndex="10"
          w="800px"
          pt="32px"
          justifyContent="space-between"
        >
          <Tab>作成したプロジェクト一覧</Tab>
          <Tab>参加プロジェクト一覧</Tab>
          <Tab>参加申請ユーザー</Tab>
        </TabList>
      </Flex>
      <TabPanels
        h="100%"
        overflowX="scroll"
        pt="100px"
        w="100%"
        className="scrollbar-off"
      >
        <TabPanel>
          <Flex w="100%" h="100%" justifyContent="center">
            <Flex w="800px" h="100%" direction="column" px="24px">
              {projects
                ?.filter((project) => project.user.uid === currentUser.uid)
                .map((project) => (
                  <Flex
                    key={project.id}
                    w="100%"
                    h="100%"
                    pb="32px"
                    mb="32px"
                    borderBottom="1px solid #ddd"
                    cursor="pointer"
                  >
                    <Flex mr="40px">
                      <Image
                        src={project.thumbnail}
                        w="180px"
                        h="140px"
                        // bg="purple.100"
                        alt=""
                        objectFit="cover"
                      />
                    </Flex>
                    <Flex flex={1} h="100%" direction="column">
                      <Flex
                        h="32px"
                        alignItems="center"
                        mb="20px"
                        justifyContent="space-between"
                      >
                        <Flex>
                          {project?.roles?.map((role) => (
                            <Flex
                              key={Math.random()}
                              border="1px solid black"
                              fontSize="12px"
                              p="4px 8px"
                              borderRadius="md"
                              mr="8px"
                            >
                              {role.text}
                            </Flex>
                          ))}
                        </Flex>
                        <Flex>
                          <Flex alignItems="center">
                            <Text mr="8px" fontSize="12px">
                              {project?.members ? (
                                <>{project?.members.length}</>
                              ) : (
                                0
                              )}
                            </Text>
                            <Icon fontSize="20px" as={RiShieldUserLine} />
                          </Flex>
                          <Flex alignItems="center" ml="20px">
                            <Text mr="8px" fontSize="12px">
                              {project?.likeUsers ? (
                                <>{project.likeUsers?.length}</>
                              ) : (
                                0
                              )}
                            </Text>
                            <Icon
                              fontSize="20px"
                              color="red.300"
                              as={MdOutlineBookmarkBorder}
                            />
                          </Flex>
                        </Flex>
                      </Flex>
                      <Heading
                        fontSize="20px"
                        mb="8px"
                        onClick={() => router.push(`/projects/${project.id}`)}
                      >
                        {project.title}
                      </Heading>
                      <Box fontSize="14px" mb="16px">
                        {project.summary}
                      </Box>
                      <Flex
                        alignItems="center"
                        mb="16px"
                        onClick={() =>
                          router.push(`/users/${project.user?.uid}`)
                        }
                      >
                        <Avatar
                          src={project.user.avatar}
                          w="36px"
                          h="36px"
                          mr="8px"
                        />
                        <Flex direction="column">
                          <Text fontSize="12px" fontWeight="bold">
                            {project.user.name}
                          </Text>
                        </Flex>
                      </Flex>
                      <Flex justifyContent="space-between">
                        <Flex>
                          <Flex alignItems="center" mr="16px">
                            <Icon as={IoMdBuild} mr="4px" />
                            <Text fontSize="12px">進行中</Text>
                          </Flex>
                          <Flex alignItems="center">
                            <Text fontSize="12px">募集中 ~2022.07.30</Text>
                          </Flex>
                        </Flex>
                        <Flex>
                          <Text fontSize="12px">作成日 2022.06.21</Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                ))}
            </Flex>
          </Flex>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Projects;
