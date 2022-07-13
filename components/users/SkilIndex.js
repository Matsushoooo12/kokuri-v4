import { Center, Flex, Icon, Image, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { AiOutlinePlus } from "react-icons/ai";

const SkilIndex = (props) => {
  const { currentUser, id, onOpen, skils } = props;
  // doughnut chart
  const backgroundColor = "#319795";

  const percentage1 = 25;

  const data1 = {
    datasets: [
      {
        label: "My First Dataset",
        data: [percentage1, 100 - percentage1],
        backgroundColor: [backgroundColor, "white"],
        borderColor: "white",
        hoverOffset: 0,
        cutout: "80%",
      },
    ],
    labels: ["Ruby"],
  };

  const percentage2 = 50;

  const data2 = {
    datasets: [
      {
        label: "My First Dataset",
        data: [percentage2, 100 - percentage2],
        backgroundColor: [backgroundColor, "white"],
        borderColor: "white",
        hoverOffset: 0,
        cutout: "80%",
      },
    ],
  };

  const percentage3 = 75;
  const data3 = {
    datasets: [
      {
        label: "My First Dataset",
        data: [percentage3, 100 - percentage3],
        backgroundColor: [backgroundColor, "white"],
        borderColor: "white",
        hoverOffset: 0,
        cutout: "80%",
      },
    ],
  };

  const percentage4 = 100;
  const data4 = {
    datasets: [
      {
        label: "My First Dataset",
        data: [percentage4, 100 - percentage4],
        backgroundColor: [backgroundColor, "white"],
        borderColor: "white",
        hoverOffset: 0,
        cutout: "80%",
      },
    ],
  };

  const skilChartDisplay = (level) => {
    if (level === "1") {
      return {
        data: data1,
        lavel: "初心者",
      };
    } else if (level === "2") {
      return {
        data: data2,
        lavel: "中級者",
      };
    } else if (level === "3") {
      return {
        data: data3,
        lavel: "上級者",
      };
    } else if (level === "4") {
      return {
        data: data4,
        lavel: "達人",
      };
    }
  };

  const omittedContent = (string) => {
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
  return (
    <>
      {/* plus */}
      {currentUser?.uid === id && (
        <Center
          mr="16px"
          mb="16px"
          w="140px"
          h="176px"
          // h="100%"
          // bg="gray.300"
          bg="white"
          p="8px"
        >
          <Center
            onClick={onOpen}
            w="100px"
            h="100px"
            bg="gray.100"
            borderRadius="full"
            cursor="pointer"
          >
            <Icon fontSize="40px" as={AiOutlinePlus} />
          </Center>
        </Center>
      )}
      {currentUser?.uid !== id && (
        <>
          {!skils && <Flex alignSelf="flex-start">まだスキルはありません</Flex>}
        </>
      )}
      {skils?.map((s) => (
        <Flex
          key={Math.random()}
          mr="16px"
          mb="16px"
          w="140px"
          h="176px"
          bg="white"
          p="8px"
          direction="column"
          alignItems="center"
        >
          <Tooltip
            hasArrow
            label={skilChartDisplay(s.level).lavel}
            placement="right"
            bg="teal.500"
          >
            <Flex w="100%" position="relative" mb="4px">
              <Image
                position="absolute"
                top="0"
                bottom="0"
                left="0"
                right="0"
                margin="auto"
                src={s.image}
                alt=""
                w="56px"
              />
              <Doughnut
                width="120px"
                height="120px"
                data={skilChartDisplay(s.level).data}
              />
            </Flex>
          </Tooltip>
          {s.title.length > 10 ? (
            <Tooltip hasArrow label={s.title} placement="bottom" bg="teal.500">
              <Text
                color="teal.500"
                fontWeight="bold"
                fontSize="20px"
                wordBreak="break-all"
                overflowX="scroll"
                className="scroll-off"
                w="100%"
                textAlign="center"
              >
                {omittedContent(s.title)}
              </Text>
            </Tooltip>
          ) : (
            <Text
              color="teal.500"
              fontWeight="bold"
              fontSize="20px"
              wordBreak="break-all"
              overflowX="scroll"
              className="scroll-off"
              w="100%"
              textAlign="center"
            >
              {s.title}
            </Text>
          )}
        </Flex>
      ))}
    </>
  );
};

export default SkilIndex;
