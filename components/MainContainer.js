import { Flex } from "@chakra-ui/react";

const MainContainer = ({ children }) => {
  return (
    <Flex flex={1} justifyContent="center" h="100vh" bg="white" pt="32px">
      {children}
    </Flex>
  );
};

export default MainContainer;
