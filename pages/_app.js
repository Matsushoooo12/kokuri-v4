import { ChakraProvider, Flex } from "@chakra-ui/react";
import MainContainer from "../components/MainContainer";
import SearchContainer from "../components/SearchContainer";
import Sidebar from "../components/Sidebar";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Flex>
        <Sidebar />
        <MainContainer>
          <Component {...pageProps} />
        </MainContainer>
        <SearchContainer />
      </Flex>
    </ChakraProvider>
  );
}

export default MyApp;
