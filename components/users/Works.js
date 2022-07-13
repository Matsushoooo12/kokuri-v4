import {
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { collection } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { AiOutlinePlus } from "react-icons/ai";
import { db } from "../../firebase/config";
import dayjs from "dayjs";

const Works = (props) => {
  const router = useRouter();
  const { currentUser, id } = props;

  //   const q = query(collection(db, `users/${id}/works`), orderBy("timestamp"));
  //   const [works] = useCollectionData(q);
  const [snapshot] = useCollection(collection(db, "works"));
  const works = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  const omittedTitle = (string) => {
    // 定数で宣言
    const MAX_LENGTH = 10;

    // もしstringの文字数がMAX_LENGTH（今回は10）より大きかったら末尾に...を付け足して返す。
    if (string.length > MAX_LENGTH) {
      // substr(何文字目からスタートするか, 最大値);
      return string.substr(0, MAX_LENGTH) + "...";
    }
    //　文字数がオーバーしていなければそのまま返す
    return string;
  };

  const dayjsFormat = (d) => {
    const day = dayjs(d);
    return day.format("YYYY/MM/DD");
  };
  console.log(
    "works",
    works?.filter((w) => w.user.uid === id)
  );
  return (
    <>
      {/* plus */}
      {currentUser?.uid === id && (
        <Center
          onClick={() => router.push(`/users/${currentUser?.uid}/new-works`)}
          //   onClick={onOpen}
          mr="16px"
          mb="16px"
          w="250px"
          h="210px"
          bg="gray.300"
          borderRadius="lg"
          cursor="pointer"
        >
          <Icon as={AiOutlinePlus} fontSize="40px" />
        </Center>
      )}
      {currentUser?.uid !== id && (
        <>
          {!works?.filter((w) => w.user.uid === id).length && (
            <Flex>まだ作品はありません</Flex>
          )}
        </>
      )}
      {works
        ?.filter((w) => w.user.uid === id)
        .map((w) => (
          <Flex
            key={Math.random()}
            mr="16px"
            mb="16px"
            w="250px"
            h="210px"
            bg="gray.300"
            p="8px"
            direction="column"
            alignItems="center"
            borderRadius="lg"
          >
            <Image
              src={w.thumbnail}
              w="100%"
              h="96px"
              bg="red.100"
              borderTopRadius="lg"
              alt=""
              objectFit="cover"
            />
            <Flex
              direction="column"
              w="100%"
              h="50%"
              // bg="green.100"
              borderBottomRadius="lg"
            >
              <Heading
                my="8px"
                fontSize="20px"
                cursor="pointer"
                onClick={() => router.push(`/works/${w.id}`)}
              >
                {omittedTitle(w.title)}
              </Heading>
              <HStack spacing="8px" mb="4px">
                {w.tags?.map((t) => (
                  <Text
                    key={Math.random()}
                    fontSize="12px"
                    border="1px solid black"
                    p="4px 8px"
                    borderRadius="full"
                    bg="white"
                  >
                    {t.text}
                  </Text>
                ))}
              </HStack>
              <Text fontSize="12px">作成日 {dayjsFormat(w.date)}</Text>
            </Flex>
          </Flex>
        ))}
    </>
  );
};

export default Works;
