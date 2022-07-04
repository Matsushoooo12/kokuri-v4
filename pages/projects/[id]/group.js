import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
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
      <TabList>
        <Tab>プロジェクト詳細</Tab>
        <Tab>グループチャット</Tab>
        <Tab>進捗状況</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>one!</p>
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

export default Group;
