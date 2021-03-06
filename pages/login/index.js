import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { auth, db, googleProvider } from "../../firebase/config";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const EmailLogin = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onClickHome = () => {
    router.push("/");
  };
  const googleLogin = async () => {
    await signInWithPopup(auth, googleProvider).then(async (res) => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const user = [];
      querySnapshot.forEach((doc) => {
        user.push(doc.id);
      });
      if (!user.includes(res.user.uid)) {
        await setDoc(doc(db, "users", res.user.uid), {
          name: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
          timestamp: serverTimestamp(),
        });
      }
      router.push("/");
    });
  };
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      h="100vh"
    >
      <Flex mb="30px">
        <Heading fontSize="40px" color="teal.500" mr="8px">
          Welcom Back
        </Heading>
        <Box
          onClick={onClickHome}
          cursor="pointer"
          w="200px"
          h="40px"
          bg="teal.100"
        />
      </Flex>
      <Flex
        direction="column"
        w="392px"
        boxShadow="2xl"
        p="24px"
        borderRadius="md"
      >
        <InputGroup as="form" w="100%" onSubmit={EmailLogin}>
          <Box w="100%">
            <Flex direction="column" mb="16px">
              <Text fontWeight="500" mb="8px">
                Email
              </Text>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Please type your email."
                borderRadius="md"
              />
            </Flex>
            <Flex direction="column" mb="16px">
              <Text fontWeight="500" mb="8px">
                password
              </Text>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Please type your password."
                borderRadius="md"
              />
            </Flex>
            <Button
              _hover={{ bg: "teal.400" }}
              w="100%"
              bg="teal.500"
              color="white"
              mb="24px"
              type="submit"
            >
              ????????????
            </Button>
            <Flex justifyContent="space-around" mb="48px">
              <Text>or sign up with</Text>
              <HStack spacing="16px">
                <Image
                  onClick={googleLogin}
                  src="/google-icon.svg"
                  w="24px"
                  h="24px"
                  alt="google"
                  cursor="pointer"
                />
                <Image
                  src="/twitter-icon.svg"
                  w="24px"
                  h="24px"
                  alt="twitter"
                />
                <Image
                  src="/facebook-icon.svg"
                  w="24px"
                  h="24px"
                  alt="facebook"
                />
                <Image src="/github-icon.svg" w="24px" h="24px" alt="github" />
              </HStack>
            </Flex>
            <Flex justifyContent="space-around" color="teal.500">
              <Text color="black">Dont`t have an account?</Text>
              <Link href="/signup">
                <a style={{ fontWeight: "bold" }}>Sign up</a>
              </Link>
            </Flex>
          </Box>
        </InputGroup>
      </Flex>
    </Flex>
  );
};

export default Login;
