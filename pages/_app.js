import React from "react";
import { Center, ChakraProvider, Flex, Spinner } from "@chakra-ui/react";
import MainContainer from "../components/MainContainer";
import SearchContainer from "../components/SearchContainer";
import "../styles/globals.css";
import Sidebar from "../components/Sidebar";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = React.createContext({});

const MyApp = ({ Component, pageProps }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const authUrl = (url) => {
    if (
      url.indexOf(`${process.env.NEXT_PUBLIC_ROOT_DOMAIN}login`) != -1 ||
      url.indexOf(`${process.env.NEXT_PUBLIC_ROOT_DOMAIN}signup`) != -1
    ) {
      return true;
    } else {
      return false;
    }
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user", user);
        setCurrentUser({
          username: user.displayName,
          email: user.email,
          avatar: user.photoURL,
          uid: user.uid,
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
        {!authUrl(window.location.href) ? (
          <Flex>
            <Sidebar />
            <MainContainer>
              <Component {...pageProps} />
            </MainContainer>
            <SearchContainer />
          </Flex>
        ) : (
          <Component {...pageProps} />
        )}
      </AuthContext.Provider>
    </ChakraProvider>
  );
};

export default MyApp;
