import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import MainContainer from "../components/MainContainer";
import SearchContainer from "../components/SearchContainer";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <Flex>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <MainContainer />
      <SearchContainer />
      {/* <h1>Home</h1>
      <Link href="/login">
        <a>Login</a>
      </Link> */}
    </Flex>
  );
}
