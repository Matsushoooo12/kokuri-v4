import { Flex } from "@chakra-ui/react";

const MainContainer = ({ children }) => {
  return (
    <Flex flex={1} bg="blue.100">
      {children}
    </Flex>
  );
};

export default MainContainer;
