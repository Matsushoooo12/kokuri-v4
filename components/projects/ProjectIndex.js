import {
  Avatar,
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { collection, orderBy, query } from "firebase/firestore";
import React from "react";
import { IoMdBuild } from "react-icons/io";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { RiShieldUserLine } from "react-icons/ri";
import { db } from "../../firebase/config";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { convertFromRaw, EditorState } from "draft-js";
import dynamic from "next/dynamic";

const Editor = dynamic(import("../../components/Editor/index"), { ssr: false });

const ProjectIndex = () => {
  // const projectQuery = query(collection(db, "projects"), orderBy("timestamp"));
  // const [projects] = useCollectionData(projectQuery);
  // console.log("projects", projects);

  const [snapshot, loading, error] = useCollection(collection(db, "projects"));
  const projects = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  console.log("projects", projects);

  const router = useRouter();
  return (
    <Flex w="100%" h="100%" justifyContent="center">
      <Flex w="800px" h="100%" direction="column" px="24px">
        {/* Projectカード一覧 */}
        {projects?.map((project) => (
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
                      2
                    </Text>
                    <Icon fontSize="20px" as={RiShieldUserLine} />
                  </Flex>
                  <Flex alignItems="center" ml="20px">
                    <Text mr="8px" fontSize="12px">
                      2
                    </Text>
                    <Icon fontSize="20px" as={MdOutlineBookmarkBorder} />
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
              <Flex alignItems="center" mb="16px">
                <Avatar src={project.user.avatar} w="36px" h="36px" mr="8px" />
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
  );
};

export default ProjectIndex;
