import React, { useRef } from "react";
import {
  Center,
  Flex,
  HStack,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import ProjectIndex from "../components/projects/ProjectIndex";
import UserIndex from "../components/users/UserIndex";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const tabIndex = useRef(0);

  React.useEffect(() => {
    if (router.query.tab === "users") {
      tabIndex.current = 1;
    } else if (router.query.tab === "users") {
      tabIndex.current = 0;
    }
    setLoading(false);
  }, [router.query.tab]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    );
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Tabs
        position="relative"
        colorScheme="teal"
        h="100vh"
        w="100%"
        defaultIndex={tabIndex.current}
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
            <Flex>
              <Tab
                onClick={() =>
                  router.push("?tab=projects", undefined, { shallow: true })
                }
              >
                Projects
              </Tab>
              <Tab
                onClick={() =>
                  router.push("?tab=users", undefined, { shallow: true })
                }
              >
                Users
              </Tab>
            </Flex>
            <HStack fontSize="12px" spacing="16px" alignItems="center">
              <Text cursor="pointer">並び替え</Text>
              <Text cursor="pointer">絞り込み</Text>
            </HStack>
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
            <ProjectIndex />
          </TabPanel>
          <TabPanel>
            <UserIndex />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
