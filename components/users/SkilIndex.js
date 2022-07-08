import { Flex, Image, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { Doughnut } from "react-chartjs-2";

const SkilIndex = () => {
  // doughnut chart
  const percentage1 = 75;
  const backgroundColor = "#319795";

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
    labels: ["React"],
  };

  const percentage3 = 25;

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
    labels: ["AWS"],
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
      <Flex
        mr="16px"
        mb="16px"
        w="140px"
        h="176px"
        // h="100%"
        // bg="gray.300"
        bg="white"
        p="8px"
        direction="column"
        alignItems="center"
      >
        <Tooltip hasArrow label="上級者" placement="right" bg="red.500">
          <Flex w="100%" position="relative" mb="4px">
            <Image
              position="absolute"
              top="0"
              bottom="0"
              left="0"
              right="0"
              margin="auto"
              src="/ruby.png"
              alt=""
              w="56px"
            />
            <Doughnut width="120px" height="120px" data={data1} />
          </Flex>
        </Tooltip>
        <Tooltip hasArrow label="Ruby on Rails" placement="bottom" bg="red.500">
          <Text
            color="teal.500"
            fontWeight="bold"
            fontSize="20px"
            wordBreak="break-all"
            overflowX="scroll"
            className="scroll-off"
            w="100%"
          >
            {omittedContent("Ruby on Rails")}
          </Text>
        </Tooltip>
      </Flex>
      <Flex
        mr="16px"
        mb="16px"
        w="140px"
        h="176px"
        // h="100%"
        // bg="gray.300"
        bg="white"
        p="8px"
        direction="column"
        alignItems="center"
      >
        <Tooltip hasArrow label="中級者" placement="right" bg="blue.200">
          <Flex w="100%" position="relative" mb="4px">
            <Image
              position="absolute"
              top="0"
              bottom="0"
              left="0"
              right="0"
              margin="auto"
              src="/react.png"
              alt=""
              w="56px"
            />
            <Doughnut width="120px" height="120px" data={data2} />
          </Flex>
        </Tooltip>
        <Text color="teal.500" fontWeight="bold" fontSize="20px">
          React
        </Text>
      </Flex>
      <Flex
        mr="16px"
        mb="16px"
        w="140px"
        h="176px"
        // h="100%"
        // bg="gray.300"
        bg="white"
        p="8px"
        direction="column"
        alignItems="center"
      >
        <Tooltip hasArrow label="初級者" placement="right" bg="#FF9900">
          <Flex w="100%" position="relative" mb="4px">
            <Image
              position="absolute"
              top="0"
              bottom="0"
              left="0"
              right="0"
              margin="auto"
              src="/aws.png"
              alt=""
              w="56px"
            />
            <Doughnut width="120px" height="120px" data={data3} />
          </Flex>
        </Tooltip>
        <Text color="teal.500" fontWeight="bold" fontSize="20px">
          AWS
        </Text>
      </Flex>
      <Flex
        mr="16px"
        mb="16px"
        w="140px"
        h="176px"
        // h="100%"
        // bg="gray.300"
        bg="white"
        p="8px"
        direction="column"
        alignItems="center"
      >
        <Tooltip hasArrow label="中級者" placement="right" bg="#008CCA">
          <Flex w="100%" position="relative" mb="4px">
            <Image
              position="absolute"
              top="0"
              bottom="0"
              left="0"
              right="0"
              margin="auto"
              src="/photoshop_gif.gif"
              alt=""
              w="56px"
            />
            <Doughnut width="120px" height="120px" data={data2} />
          </Flex>
        </Tooltip>
        <Text color="teal.500" fontWeight="bold" fontSize="20px">
          Photoshop
        </Text>
      </Flex>
      <Flex
        mr="16px"
        mb="16px"
        w="140px"
        h="176px"
        // h="100%"
        // bg="gray.300"
        bg="white"
        p="8px"
        direction="column"
        alignItems="center"
      >
        <Tooltip hasArrow label="上級者" placement="right" bg="#D43505">
          <Flex w="100%" position="relative" mb="4px">
            <Image
              position="absolute"
              top="0"
              bottom="0"
              left="0"
              right="0"
              margin="auto"
              src="/illustrator_gif.gif"
              alt=""
              w="56px"
            />
            <Doughnut width="120px" height="120px" data={data1} />
          </Flex>
        </Tooltip>
        <Text color="teal.500" fontWeight="bold" fontSize="20px">
          Illustrator
        </Text>
      </Flex>
      <Flex
        mr="16px"
        mb="16px"
        w="140px"
        h="176px"
        // h="100%"
        // bg="gray.300"
        bg="white"
        p="8px"
        direction="column"
        alignItems="center"
      >
        <Tooltip hasArrow label="上級者" placement="right" bg="red.500">
          <Flex w="100%" position="relative" mb="4px">
            <Image
              position="absolute"
              top="0"
              bottom="0"
              left="0"
              right="0"
              margin="auto"
              src="/ruby.png"
              alt=""
              w="56px"
            />
            <Doughnut width="120px" height="120px" data={data1} />
          </Flex>
        </Tooltip>
        <Tooltip hasArrow label="Ruby on Rails" placement="bottom" bg="red.500">
          <Text
            color="teal.500"
            fontWeight="bold"
            fontSize="20px"
            wordBreak="break-all"
            overflowX="scroll"
            w="100%"
          >
            {omittedContent("Ruby on Rails")}
          </Text>
        </Tooltip>
      </Flex>
      <Flex
        mr="16px"
        mb="16px"
        w="140px"
        h="176px"
        // h="100%"
        // bg="gray.300"
        bg="white"
        p="8px"
        direction="column"
        alignItems="center"
      >
        <Tooltip hasArrow label="中級者" placement="right" bg="blue.200">
          <Flex w="100%" position="relative" mb="4px">
            <Image
              position="absolute"
              top="0"
              bottom="0"
              left="0"
              right="0"
              margin="auto"
              src="/react.png"
              alt=""
              w="56px"
            />
            <Doughnut width="120px" height="120px" data={data2} />
          </Flex>
        </Tooltip>
        <Text color="teal.500" fontWeight="bold" fontSize="20px">
          React
        </Text>
      </Flex>
      <Flex
        mr="16px"
        mb="16px"
        w="140px"
        h="176px"
        // h="100%"
        // bg="gray.300"
        bg="white"
        p="8px"
        direction="column"
        alignItems="center"
      >
        <Tooltip hasArrow label="初級者" placement="right" bg="#FF9900">
          <Flex w="100%" position="relative" mb="4px">
            <Image
              position="absolute"
              top="0"
              bottom="0"
              left="0"
              right="0"
              margin="auto"
              src="/aws.png"
              alt=""
              w="56px"
            />
            <Doughnut width="120px" height="120px" data={data3} />
          </Flex>
        </Tooltip>
        <Text color="teal.500" fontWeight="bold" fontSize="20px">
          AWS
        </Text>
      </Flex>
      <Flex
        mr="16px"
        mb="16px"
        w="140px"
        h="176px"
        // h="100%"
        // bg="gray.300"
        bg="white"
        p="8px"
        direction="column"
        alignItems="center"
      >
        <Tooltip hasArrow label="中級者" placement="right" bg="#008CCA">
          <Flex w="100%" position="relative" mb="4px">
            <Image
              position="absolute"
              top="0"
              bottom="0"
              left="0"
              right="0"
              margin="auto"
              src="/photoshop_gif.gif"
              alt=""
              w="56px"
            />
            <Doughnut width="120px" height="120px" data={data2} />
          </Flex>
        </Tooltip>
        <Text color="teal.500" fontWeight="bold" fontSize="20px">
          Photoshop
        </Text>
      </Flex>
    </>
  );
};

export default SkilIndex;
