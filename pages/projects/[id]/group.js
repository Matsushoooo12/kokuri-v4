import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";

const Group = () => {
  return (
    <Tabs
      position="relative"
      colorScheme="teal"
      variant="soft-rounded"
      h="100vh"
      w="100%"
    >
      <Flex direction="column" w="100%" alignItems="center">
        <TabList
          bg="white"
          position="absolute"
          zIndex="10"
          w="800px"
          pt="32px"
          justifyContent="flex-start"
        >
          <Tab>プロジェクト詳細</Tab>
          <Tab>グループチャット</Tab>
          <Tab>進捗状況</Tab>
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
              <Flex
                w="100%"
                h="100%"
                pb="32px"
                mb="32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
              >
                <p>one!</p>
              </Flex>
            </Flex>
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex w="100%" h="100%" justifyContent="center">
            <Flex w="800px" h="100%" direction="column" px="24px">
              <Flex
                w="100%"
                h="100%"
                pb="32px"
                mb="32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
              >
                <p>two!</p>
              </Flex>
            </Flex>
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex w="100%" h="100%" justifyContent="center">
            <Flex w="800px" h="100%" direction="column" px="24px">
              <Flex
                w="100%"
                h="100%"
                pb="32px"
                mb="32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
              >
                <p>three!</p>
              </Flex>
            </Flex>
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Group;
