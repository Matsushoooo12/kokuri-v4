import { Button, Flex, Heading } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { auth } from "../../firebase/config";
import { AuthContext } from "../_app";

const DetailUser = () => {
  const router = useRouter();
  const { currentUser } = React.useContext(AuthContext);

  const handleSignOut = async () => {
    await signOut(auth).then(() => {
      router.push("/login");
    });
  };
  return (
    <Flex direction="column">
      <Heading>{currentUser?.username}</Heading>
      <Button onClick={handleSignOut}>ログアウト</Button>
    </Flex>
  );
};

export default DetailUser;
