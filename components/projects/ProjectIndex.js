import {
  Avatar,
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IoMdBuild } from "react-icons/io";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { RiShieldUserLine } from "react-icons/ri";

const ProjectIndex = () => {
  return (
    <Flex w="100%" h="100%" justifyContent="center">
      <Flex w="768px" h="100%" direction="column">
        {/* Projectカード一覧 */}
        <Flex
          w="100%"
          h="100%"
          pb="32px"
          mb="32px"
          borderBottom="1px solid #ddd"
          cursor="pointer"
        >
          <Flex mr="24px">
            <Image w="180px" h="140px" bg="purple.100" alt="" />
          </Flex>
          <Flex flex={1} h="100%" direction="column">
            <Flex
              h="32px"
              alignItems="center"
              mb="20px"
              justifyContent="space-between"
            >
              <Flex>
                <Flex
                  border="1px solid black"
                  fontSize="12px"
                  p="4px 8px"
                  borderRadius="full"
                  mr="8px"
                >
                  エンジニア
                </Flex>
                <Flex
                  border="1px solid black"
                  fontSize="12px"
                  p="4px 8px"
                  borderRadius="full"
                >
                  デザイナー
                </Flex>
              </Flex>
              <Flex>
                <Flex alignItems="center">
                  <Text mr="8px" fontSize="12px">
                    2
                  </Text>
                  <Icon fontSize="20px" as={RiShieldUserLine} />
                </Flex>
                <Flex alignItems="center" ml="20px">
                  <Text mr="8px" fontSize="12px">
                    2
                  </Text>
                  <Icon fontSize="20px" as={MdOutlineBookmarkBorder} />
                </Flex>
              </Flex>
            </Flex>
            <Heading fontSize="20px" mb="8px">
              お散歩が楽しくなるネイティブアプリをつくりたい！
            </Heading>
            <Box fontSize="14px" mb="16px">
              弊社の提供する「RETRIP」は、今や旅行・おでかけ領域において最大級のメディアとなりました。テキストテキストテキストテキスト
            </Box>
            <Flex mb="16px">
              <Flex alignItems="center">
                <Avatar w="36px" h="36px" mr="8px" />
                <Flex direction="column">
                  <Text fontSize="12px">山田たろう</Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex justifyContent="space-between">
              <Flex>
                <Flex alignItems="center" mr="16px">
                  <Icon as={IoMdBuild} mr="4px" />
                  <Text fontSize="12px">進行中</Text>
                </Flex>
                <Flex alignItems="center">
                  <Text fontSize="12px">募集中 ~2022.07.30</Text>
                </Flex>
              </Flex>
              <Flex>
                <Text fontSize="12px">作成日 2022.06.21</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex w="100%" h="240px" mb="48px" borderBottom="1px solid black">
          <Flex mr="60px">
            <Image w="180px" h="140px" bg="purple.100" alt="" />
          </Flex>
          <Flex flex={1} h="100%" direction="column">
            <Flex
              h="32px"
              alignItems="center"
              mb="20px"
              justifyContent="space-between"
            >
              <Flex>
                <Flex
                  border="1px solid black"
                  fontSize="12px"
                  p="4px 8px"
                  borderRadius="full"
                  mr="8px"
                >
                  エンジニア
                </Flex>
                <Flex
                  border="1px solid black"
                  fontSize="12px"
                  p="4px 8px"
                  borderRadius="full"
                >
                  デザイナー
                </Flex>
              </Flex>
              <Flex>
                <Flex alignItems="center">
                  <Text mr="8px" fontSize="12px">
                    2
                  </Text>
                  <Icon fontSize="20px" as={RiShieldUserLine} />
                </Flex>
                <Flex alignItems="center" ml="20px">
                  <Text mr="8px" fontSize="12px">
                    2
                  </Text>
                  <Icon fontSize="20px" as={MdOutlineBookmarkBorder} />
                </Flex>
              </Flex>
            </Flex>
            <Heading fontSize="20px" mb="8px">
              お散歩が楽しくなるネイティブアプリをつくりたい！
            </Heading>
            <Box fontSize="14px" mb="16px">
              弊社の提供する「RETRIP」は、今や旅行・おでかけ領域において最大級のメディアとなりました。テキストテキストテキストテキスト
            </Box>
            <Flex mb="16px">
              <Flex alignItems="center">
                <Avatar w="36px" h="36px" mr="8px" />
                <Flex direction="column">
                  <Text fontSize="12px">山田たろう</Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex justifyContent="space-between">
              <Flex>
                <Flex alignItems="center" mr="16px">
                  <Icon as={IoMdBuild} mr="4px" />
                  <Text fontSize="12px">進行中</Text>
                </Flex>
                <Flex alignItems="center">
                  <Text fontSize="12px">募集中 ~2022.07.30</Text>
                </Flex>
              </Flex>
              <Flex>
                <Text fontSize="12px">作成日 2022.06.21</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex w="100%" h="240px" mb="48px" borderBottom="1px solid black">
          <Flex mr="60px">
            <Image w="180px" h="140px" bg="purple.100" alt="" />
          </Flex>
          <Flex flex={1} h="100%" direction="column">
            <Flex
              h="32px"
              alignItems="center"
              mb="20px"
              justifyContent="space-between"
            >
              <Flex>
                <Flex
                  border="1px solid black"
                  fontSize="12px"
                  p="4px 8px"
                  borderRadius="full"
                  mr="8px"
                >
                  エンジニア
                </Flex>
                <Flex
                  border="1px solid black"
                  fontSize="12px"
                  p="4px 8px"
                  borderRadius="full"
                >
                  デザイナー
                </Flex>
              </Flex>
              <Flex>
                <Flex alignItems="center">
                  <Text mr="8px" fontSize="12px">
                    2
                  </Text>
                  <Icon fontSize="20px" as={RiShieldUserLine} />
                </Flex>
                <Flex alignItems="center" ml="20px">
                  <Text mr="8px" fontSize="12px">
                    2
                  </Text>
                  <Icon fontSize="20px" as={MdOutlineBookmarkBorder} />
                </Flex>
              </Flex>
            </Flex>
            <Heading fontSize="20px" mb="8px">
              お散歩が楽しくなるネイティブアプリをつくりたい！
            </Heading>
            <Box fontSize="14px" mb="16px">
              弊社の提供する「RETRIP」は、今や旅行・おでかけ領域において最大級のメディアとなりました。テキストテキストテキストテキスト
            </Box>
            <Flex mb="16px">
              <Flex alignItems="center">
                <Avatar w="36px" h="36px" mr="8px" />
                <Flex direction="column">
                  <Text fontSize="12px">山田たろう</Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex justifyContent="space-between">
              <Flex>
                <Flex alignItems="center" mr="16px">
                  <Icon as={IoMdBuild} mr="4px" />
                  <Text fontSize="12px">進行中</Text>
                </Flex>
                <Flex alignItems="center">
                  <Text fontSize="12px">募集中 ~2022.07.30</Text>
                </Flex>
              </Flex>
              <Flex>
                <Text fontSize="12px">作成日 2022.06.21</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex w="100%" h="240px" mb="48px" borderBottom="1px solid black">
          <Flex mr="60px">
            <Image w="180px" h="140px" bg="purple.100" alt="" />
          </Flex>
          <Flex flex={1} h="100%" direction="column">
            <Flex
              h="32px"
              alignItems="center"
              mb="20px"
              justifyContent="space-between"
            >
              <Flex>
                <Flex
                  border="1px solid black"
                  fontSize="12px"
                  p="4px 8px"
                  borderRadius="full"
                  mr="8px"
                >
                  エンジニア
                </Flex>
                <Flex
                  border="1px solid black"
                  fontSize="12px"
                  p="4px 8px"
                  borderRadius="full"
                >
                  デザイナー
                </Flex>
              </Flex>
              <Flex>
                <Flex alignItems="center">
                  <Text mr="8px" fontSize="12px">
                    2
                  </Text>
                  <Icon fontSize="20px" as={RiShieldUserLine} />
                </Flex>
                <Flex alignItems="center" ml="20px">
                  <Text mr="8px" fontSize="12px">
                    2
                  </Text>
                  <Icon fontSize="20px" as={MdOutlineBookmarkBorder} />
                </Flex>
              </Flex>
            </Flex>
            <Heading fontSize="20px" mb="8px">
              お散歩が楽しくなるネイティブアプリをつくりたい！
            </Heading>
            <Box fontSize="14px" mb="16px">
              弊社の提供する「RETRIP」は、今や旅行・おでかけ領域において最大級のメディアとなりました。テキストテキストテキストテキスト
            </Box>
            <Flex mb="16px">
              <Flex alignItems="center">
                <Avatar w="36px" h="36px" mr="8px" />
                <Flex direction="column">
                  <Text fontSize="12px">山田たろう</Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex justifyContent="space-between">
              <Flex>
                <Flex alignItems="center" mr="16px">
                  <Icon as={IoMdBuild} mr="4px" />
                  <Text fontSize="12px">進行中</Text>
                </Flex>
                <Flex alignItems="center">
                  <Text fontSize="12px">募集中 ~2022.07.30</Text>
                </Flex>
              </Flex>
              <Flex>
                <Text fontSize="12px">作成日 2022.06.21</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex w="100%" h="240px" mb="48px" borderBottom="1px solid black">
          <Flex mr="60px">
            <Image w="180px" h="140px" bg="purple.100" alt="" />
          </Flex>
          <Flex flex={1} h="100%" direction="column">
            <Flex
              h="32px"
              alignItems="center"
              mb="20px"
              justifyContent="space-between"
            >
              <Flex>
                <Flex
                  border="1px solid black"
                  fontSize="12px"
                  p="4px 8px"
                  borderRadius="full"
                  mr="8px"
                >
                  エンジニア
                </Flex>
                <Flex
                  border="1px solid black"
                  fontSize="12px"
                  p="4px 8px"
                  borderRadius="full"
                >
                  デザイナー
                </Flex>
              </Flex>
              <Flex>
                <Flex alignItems="center">
                  <Text mr="8px" fontSize="12px">
                    2
                  </Text>
                  <Icon fontSize="20px" as={RiShieldUserLine} />
                </Flex>
                <Flex alignItems="center" ml="20px">
                  <Text mr="8px" fontSize="12px">
                    2
                  </Text>
                  <Icon fontSize="20px" as={MdOutlineBookmarkBorder} />
                </Flex>
              </Flex>
            </Flex>
            <Heading fontSize="20px" mb="8px">
              お散歩が楽しくなるネイティブアプリをつくりたい！
            </Heading>
            <Box fontSize="14px" mb="16px">
              弊社の提供する「RETRIP」は、今や旅行・おでかけ領域において最大級のメディアとなりました。テキストテキストテキストテキスト
            </Box>
            <Flex mb="16px">
              <Flex alignItems="center">
                <Avatar w="36px" h="36px" mr="8px" />
                <Flex direction="column">
                  <Text fontSize="12px">山田たろう</Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex justifyContent="space-between">
              <Flex>
                <Flex alignItems="center" mr="16px">
                  <Icon as={IoMdBuild} mr="4px" />
                  <Text fontSize="12px">進行中</Text>
                </Flex>
                <Flex alignItems="center">
                  <Text fontSize="12px">募集中 ~2022.07.30</Text>
                </Flex>
              </Flex>
              <Flex>
                <Text fontSize="12px">作成日 2022.06.21</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex w="100%" h="240px" mb="48px" borderBottom="1px solid black">
          <Flex mr="60px">
            <Image w="180px" h="140px" bg="purple.100" alt="" />
          </Flex>
          <Flex flex={1} h="100%" direction="column">
            <Flex
              h="32px"
              alignItems="center"
              mb="20px"
              justifyContent="space-between"
            >
              <Flex>
                <Flex
                  border="1px solid black"
                  fontSize="12px"
                  p="4px 8px"
                  borderRadius="full"
                  mr="8px"
                >
                  エンジニア
                </Flex>
                <Flex
                  border="1px solid black"
                  fontSize="12px"
                  p="4px 8px"
                  borderRadius="full"
                >
                  デザイナー
                </Flex>
              </Flex>
              <Flex>
                <Flex alignItems="center">
                  <Text mr="8px" fontSize="12px">
                    2
                  </Text>
                  <Icon fontSize="20px" as={RiShieldUserLine} />
                </Flex>
                <Flex alignItems="center" ml="20px">
                  <Text mr="8px" fontSize="12px">
                    2
                  </Text>
                  <Icon fontSize="20px" as={MdOutlineBookmarkBorder} />
                </Flex>
              </Flex>
            </Flex>
            <Heading fontSize="20px" mb="8px">
              お散歩が楽しくなるネイティブアプリをつくりたい！
            </Heading>
            <Box fontSize="14px" mb="16px">
              弊社の提供する「RETRIP」は、今や旅行・おでかけ領域において最大級のメディアとなりました。テキストテキストテキストテキスト
            </Box>
            <Flex mb="16px">
              <Flex alignItems="center">
                <Avatar w="36px" h="36px" mr="8px" />
                <Flex direction="column">
                  <Text fontSize="12px">山田たろう</Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex justifyContent="space-between">
              <Flex>
                <Flex alignItems="center" mr="16px">
                  <Icon as={IoMdBuild} mr="4px" />
                  <Text fontSize="12px">進行中</Text>
                </Flex>
                <Flex alignItems="center">
                  <Text fontSize="12px">募集中 ~2022.07.30</Text>
                </Flex>
              </Flex>
              <Flex>
                <Text fontSize="12px">作成日 2022.06.21</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex w="100%" h="240px" mb="48px" borderBottom="1px solid black">
          <Flex mr="60px">
            <Image w="180px" h="140px" bg="purple.100" alt="" />
          </Flex>
          <Flex flex={1} h="100%" direction="column">
            <Flex
              h="32px"
              alignItems="center"
              mb="20px"
              justifyContent="space-between"
            >
              <Flex>
                <Flex
                  border="1px solid black"
                  fontSize="12px"
                  p="4px 8px"
                  borderRadius="full"
                  mr="8px"
                >
                  エンジニア
                </Flex>
                <Flex
                  border="1px solid black"
                  fontSize="12px"
                  p="4px 8px"
                  borderRadius="full"
                >
                  デザイナー
                </Flex>
              </Flex>
              <Flex>
                <Flex alignItems="center">
                  <Text mr="8px" fontSize="12px">
                    2
                  </Text>
                  <Icon fontSize="20px" as={RiShieldUserLine} />
                </Flex>
                <Flex alignItems="center" ml="20px">
                  <Text mr="8px" fontSize="12px">
                    2
                  </Text>
                  <Icon fontSize="20px" as={MdOutlineBookmarkBorder} />
                </Flex>
              </Flex>
            </Flex>
            <Heading fontSize="20px" mb="8px">
              お散歩が楽しくなるネイティブアプリをつくりたい！
            </Heading>
            <Box fontSize="14px" mb="16px">
              弊社の提供する「RETRIP」は、今や旅行・おでかけ領域において最大級のメディアとなりました。テキストテキストテキストテキスト
            </Box>
            <Flex mb="16px">
              <Flex alignItems="center">
                <Avatar w="36px" h="36px" mr="8px" />
                <Flex direction="column">
                  <Text fontSize="12px">山田たろう</Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex justifyContent="space-between">
              <Flex>
                <Flex alignItems="center" mr="16px">
                  <Icon as={IoMdBuild} mr="4px" />
                  <Text fontSize="12px">進行中</Text>
                </Flex>
                <Flex alignItems="center">
                  <Text fontSize="12px">募集中 ~2022.07.30</Text>
                </Flex>
              </Flex>
              <Flex>
                <Text fontSize="12px">作成日 2022.06.21</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex w="100%" h="240px" mb="48px" borderBottom="1px solid black">
          <Flex mr="60px">
            <Image w="180px" h="140px" bg="purple.100" alt="" />
          </Flex>
          <Flex flex={1} h="100%" direction="column">
            <Flex
              h="32px"
              alignItems="center"
              mb="20px"
              justifyContent="space-between"
            >
              <Flex>
                <Flex
                  border="1px solid black"
                  fontSize="12px"
                  p="4px 8px"
                  borderRadius="full"
                  mr="8px"
                >
                  エンジニア
                </Flex>
                <Flex
                  border="1px solid black"
                  fontSize="12px"
                  p="4px 8px"
                  borderRadius="full"
                >
                  デザイナー
                </Flex>
              </Flex>
              <Flex>
                <Flex alignItems="center">
                  <Text mr="8px" fontSize="12px">
                    2
                  </Text>
                  <Icon fontSize="20px" as={RiShieldUserLine} />
                </Flex>
                <Flex alignItems="center" ml="20px">
                  <Text mr="8px" fontSize="12px">
                    2
                  </Text>
                  <Icon fontSize="20px" as={MdOutlineBookmarkBorder} />
                </Flex>
              </Flex>
            </Flex>
            <Heading fontSize="20px" mb="8px">
              お散歩が楽しくなるネイティブアプリをつくりたい！
            </Heading>
            <Box fontSize="14px" mb="16px">
              弊社の提供する「RETRIP」は、今や旅行・おでかけ領域において最大級のメディアとなりました。テキストテキストテキストテキスト
            </Box>
            <Flex mb="16px">
              <Flex alignItems="center">
                <Avatar w="36px" h="36px" mr="8px" />
                <Flex direction="column">
                  <Text fontSize="12px">山田たろう</Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex justifyContent="space-between">
              <Flex>
                <Flex alignItems="center" mr="16px">
                  <Icon as={IoMdBuild} mr="4px" />
                  <Text fontSize="12px">進行中</Text>
                </Flex>
                <Flex alignItems="center">
                  <Text fontSize="12px">募集中 ~2022.07.30</Text>
                </Flex>
              </Flex>
              <Flex>
                <Text fontSize="12px">作成日 2022.06.21</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex w="100%" h="240px" mb="48px" borderBottom="1px solid black">
          <Flex mr="60px">
            <Image w="180px" h="140px" bg="purple.100" alt="" />
          </Flex>
          <Flex flex={1} h="100%" direction="column">
            <Flex
              h="32px"
              alignItems="center"
              mb="20px"
              justifyContent="space-between"
            >
              <Flex>
                <Flex
                  border="1px solid black"
                  fontSize="12px"
                  p="4px 8px"
                  borderRadius="full"
                  mr="8px"
                >
                  エンジニア
                </Flex>
                <Flex
                  border="1px solid black"
                  fontSize="12px"
                  p="4px 8px"
                  borderRadius="full"
                >
                  デザイナー
                </Flex>
              </Flex>
              <Flex>
                <Flex alignItems="center">
                  <Text mr="8px" fontSize="12px">
                    2
                  </Text>
                  <Icon fontSize="20px" as={RiShieldUserLine} />
                </Flex>
                <Flex alignItems="center" ml="20px">
                  <Text mr="8px" fontSize="12px">
                    2
                  </Text>
                  <Icon fontSize="20px" as={MdOutlineBookmarkBorder} />
                </Flex>
              </Flex>
            </Flex>
            <Heading fontSize="20px" mb="8px">
              お散歩が楽しくなるネイティブアプリをつくりたい！
            </Heading>
            <Box fontSize="14px" mb="16px">
              弊社の提供する「RETRIP」は、今や旅行・おでかけ領域において最大級のメディアとなりました。テキストテキストテキストテキスト
            </Box>
            <Flex mb="16px">
              <Flex alignItems="center">
                <Avatar w="36px" h="36px" mr="8px" />
                <Flex direction="column">
                  <Text fontSize="12px">山田たろう</Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex justifyContent="space-between">
              <Flex>
                <Flex alignItems="center" mr="16px">
                  <Icon as={IoMdBuild} mr="4px" />
                  <Text fontSize="12px">進行中</Text>
                </Flex>
                <Flex alignItems="center">
                  <Text fontSize="12px">募集中 ~2022.07.30</Text>
                </Flex>
              </Flex>
              <Flex>
                <Text fontSize="12px">作成日 2022.06.21</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProjectIndex;
