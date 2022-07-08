import { Flex } from "@chakra-ui/react";

const MainContainer = ({ children }) => {
  return (
    <Flex
      flex={1}
      // justifyContent="center"
      h="100vh"
      bg="white"
      alignItems="center"
      direction="column"
      position="relative"
    >
      {children}
    </Flex>
  );
};

export default MainContainer;
