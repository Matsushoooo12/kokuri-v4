import React from "react";
import { Center, ChakraProvider, Flex, Spinner } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import MainContainer from "../components/MainContainer";
import SearchContainer from "../components/SearchContainer";
import Sidebar from "../components/Sidebar";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

export const AuthContext = React.createContext({});

const MyApp = ({ Component, pageProps }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          username: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <ChakraProvider>
        <Center h="100vh">
          <Spinner />
        </Center>
      </ChakraProvider>
    );
  }
  return (
    <ChakraProvider>
      <AuthContext.Provider
        value={{ currentUser, setCurrentUser, loading, setLoading }}
      >
        <Flex>
          <Sidebar />
          <MainContainer>
            <Component {...pageProps} />
          </MainContainer>
          <SearchContainer />
        </Flex>
      </AuthContext.Provider>
    </ChakraProvider>
  );
};

export default MyApp;
