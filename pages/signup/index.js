import React from "react";
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
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth, db, googleProvider } from "../../firebase/config";

const Signup = () => {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");

  const EmailSignup = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password).then(
      async (res) => {
        await updateProfile(res.user, { displayName: name, photoURL: "" });
        const querySnapshot = await getDocs(collection(db, "users"));
        const user = [];
        querySnapshot.forEach((doc) => {
          user.push(doc.id);
        });
        if (!user.includes(res.user.uid)) {
          await setDoc(doc(db, "users", res.user.uid), {
            name: name,
            email: res.user.email,
            photoURL: "",
            timestamp: serverTimestamp(),
          });
        }
        router.push("/");
      }
    );
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
          Welcom to
        </Heading>
        <Box
          cursor="pointer"
          onClick={onClickHome}
          w="200px"
          h="40px"
          bg="teal.100"
        />
      </Flex>
      <Flex direction="column" w="392px" boxShadow="2xl" p="24px">
        <InputGroup onSubmit={EmailSignup} as="form" w="100%">
          <Box w="100%">
            <Flex direction="column" mb="16px">
              <Text fontWeight="500" mb="8px">
                name
              </Text>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Please type your name."
                borderRadius="md"
              />
            </Flex>
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
            <Flex direction="column" mb="16px">
              <Text fontWeight="500" mb="8px">
                password confirmation
              </Text>
              <Input
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="Please confirm password."
                borderRadius="md"
              />
            </Flex>
            <Button
              w="100%"
              bg="teal.500"
              color="white"
              mb="24px"
              _hover={{ bg: "teal.400" }}
              type="submit"
            >
              アカウントを作成
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
              <Text color="black">Have an account?</Text>
              <Link href="/login">
                <a style={{ fontWeight: "bold" }}>Login</a>
              </Link>
            </Flex>
          </Box>
        </InputGroup>
      </Flex>
    </Flex>
  );
};

export default Signup;
