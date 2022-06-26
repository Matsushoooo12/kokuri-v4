import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IoMdBuild } from "react-icons/io";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { RiShieldUserLine } from "react-icons/ri";
import { ImFire } from "react-icons/im";

const UserIndex = () => {
  return (
    <Flex w="100%" h="100%" justifyContent="center">
      <Flex w="768px" h="100%" direction="column">
        {/* Projectカード一覧 */}
        <Flex
          w="100%"
          h="100%"
          mb="32px"
          borderBottom="1px solid #ddd"
          cursor="pointer"
          pb="32px"
        >
          <Flex mr="24px">
            <Avatar w="60px" h="60px" src="" alt="avatar" />
          </Flex>
          <Flex direction="column">
            <Flex mb="16px">
              <Flex alignItems="center" mr="24px">
                <Text fontSize="20px" fontWeight="bold" mr="8px">
                  松本省吾
                </Text>
                <Icon fontSize="20px" color="red.500" as={ImFire} />
              </Flex>
              <HStack alignItems="center" spacing="8px" fontSize="12px">
                <Text border="1px solid black" p="4px 8px" borderRadius="md">
                  エンジニア
                </Text>
                <Text border="1px solid black" p="4px 8px" borderRadius="md">
                  デザイナー
                </Text>
              </HStack>
            </Flex>
            <Text mb="16px">
              現在は就職活動のためにポートフォリオ作成をしています！チーム開発の経験を積むためにいろんな開発に携わりたいです！
            </Text>
            <HStack spacing="8px" fontSize="12px">
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                React
              </Text>
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                Rails
              </Text>
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                HTML
              </Text>
            </HStack>
          </Flex>
        </Flex>
        <Flex
          w="100%"
          h="100%"
          mb="48px"
          borderBottom="1px solid #ddd"
          cursor="pointer"
          pb="32px"
        >
          <Flex mr="21px">
            <Avatar w="60px" h="60px" src="" alt="avatar" />
          </Flex>
          <Flex direction="column">
            <Flex mb="16px">
              <Flex alignItems="center" mr="24px">
                <Text fontSize="20px" fontWeight="bold" mr="8px">
                  松本省吾
                </Text>
                <Icon fontSize="20px" color="red.500" as={ImFire} />
              </Flex>
              <HStack alignItems="center" spacing="8px" fontSize="12px">
                <Text border="1px solid black" p="4px 8px" borderRadius="md">
                  エンジニア
                </Text>
                <Text border="1px solid black" p="4px 8px" borderRadius="md">
                  デザイナー
                </Text>
              </HStack>
            </Flex>
            <Text mb="16px">
              現在は就職活動のためにポートフォリオ作成をしています！チーム開発の経験を積むためにいろんな開発に携わりたいです！
            </Text>
            <HStack spacing="8px" fontSize="12px">
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                React
              </Text>
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                Rails
              </Text>
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                HTML
              </Text>
            </HStack>
          </Flex>
        </Flex>
        <Flex
          w="100%"
          h="100%"
          mb="48px"
          borderBottom="1px solid #ddd"
          cursor="pointer"
          pb="32px"
        >
          <Flex mr="21px">
            <Avatar w="60px" h="60px" src="" alt="avatar" />
          </Flex>
          <Flex direction="column">
            <Flex mb="16px">
              <Flex alignItems="center" mr="24px">
                <Text fontSize="20px" fontWeight="bold" mr="8px">
                  松本省吾
                </Text>
                <Icon opacity="0" fontSize="20px" color="red.500" as={ImFire} />
              </Flex>
              <HStack alignItems="center" spacing="8px" fontSize="12px">
                <Text border="1px solid black" p="4px 8px" borderRadius="md">
                  エンジニア
                </Text>
                <Text border="1px solid black" p="4px 8px" borderRadius="md">
                  デザイナー
                </Text>
              </HStack>
            </Flex>
            <Text mb="16px">
              現在は就職活動のためにポートフォリオ作成をしています！チーム開発の経験を積むためにいろんな開発に携わりたいです！
            </Text>
            <HStack spacing="8px" fontSize="12px">
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                React
              </Text>
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                Rails
              </Text>
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                HTML
              </Text>
            </HStack>
          </Flex>
        </Flex>
        <Flex
          w="100%"
          h="100%"
          mb="48px"
          borderBottom="1px solid #ddd"
          cursor="pointer"
          pb="32px"
        >
          <Flex mr="21px">
            <Avatar w="60px" h="60px" src="" alt="avatar" />
          </Flex>
          <Flex direction="column">
            <Flex mb="16px">
              <Flex alignItems="center" mr="24px">
                <Text fontSize="20px" fontWeight="bold" mr="8px">
                  松本省吾
                </Text>
                <Icon fontSize="20px" color="red.500" as={ImFire} />
              </Flex>
              <HStack alignItems="center" spacing="8px" fontSize="12px">
                <Text border="1px solid black" p="4px 8px" borderRadius="md">
                  エンジニア
                </Text>
                <Text border="1px solid black" p="4px 8px" borderRadius="md">
                  デザイナー
                </Text>
              </HStack>
            </Flex>
            <Text mb="16px">
              現在は就職活動のためにポートフォリオ作成をしています！チーム開発の経験を積むためにいろんな開発に携わりたいです！
            </Text>
            <HStack spacing="8px" fontSize="12px">
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                React
              </Text>
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                Rails
              </Text>
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                HTML
              </Text>
            </HStack>
          </Flex>
        </Flex>
        <Flex
          w="100%"
          h="100%"
          mb="48px"
          borderBottom="1px solid #ddd"
          cursor="pointer"
          pb="32px"
        >
          <Flex mr="21px">
            <Avatar w="60px" h="60px" src="" alt="avatar" />
          </Flex>
          <Flex direction="column">
            <Flex mb="16px">
              <Flex alignItems="center" mr="24px">
                <Text fontSize="20px" fontWeight="bold" mr="8px">
                  松本省吾
                </Text>
                <Icon fontSize="20px" color="red.500" as={ImFire} />
              </Flex>
              <HStack alignItems="center" spacing="8px" fontSize="12px">
                <Text border="1px solid black" p="4px 8px" borderRadius="md">
                  エンジニア
                </Text>
                <Text border="1px solid black" p="4px 8px" borderRadius="md">
                  デザイナー
                </Text>
              </HStack>
            </Flex>
            <Text mb="16px">
              現在は就職活動のためにポートフォリオ作成をしています！チーム開発の経験を積むためにいろんな開発に携わりたいです！
            </Text>
            <HStack spacing="8px" fontSize="12px">
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                React
              </Text>
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                Rails
              </Text>
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                HTML
              </Text>
            </HStack>
          </Flex>
        </Flex>
        <Flex
          w="100%"
          h="100%"
          mb="48px"
          borderBottom="1px solid #ddd"
          cursor="pointer"
          pb="32px"
        >
          <Flex mr="21px">
            <Avatar w="60px" h="60px" src="" alt="avatar" />
          </Flex>
          <Flex direction="column">
            <Flex mb="16px">
              <Flex alignItems="center" mr="24px">
                <Text fontSize="20px" fontWeight="bold" mr="8px">
                  松本省吾
                </Text>
                <Icon fontSize="20px" color="red.500" as={ImFire} />
              </Flex>
              <HStack alignItems="center" spacing="8px" fontSize="12px">
                <Text border="1px solid black" p="4px 8px" borderRadius="md">
                  エンジニア
                </Text>
                <Text border="1px solid black" p="4px 8px" borderRadius="md">
                  デザイナー
                </Text>
              </HStack>
            </Flex>
            <Text mb="16px">
              現在は就職活動のためにポートフォリオ作成をしています！チーム開発の経験を積むためにいろんな開発に携わりたいです！
            </Text>
            <HStack spacing="8px" fontSize="12px">
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                React
              </Text>
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                Rails
              </Text>
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                HTML
              </Text>
            </HStack>
          </Flex>
        </Flex>
        <Flex
          w="100%"
          h="100%"
          mb="48px"
          borderBottom="1px solid #ddd"
          cursor="pointer"
          pb="32px"
        >
          <Flex mr="21px">
            <Avatar w="60px" h="60px" src="" alt="avatar" />
          </Flex>
          <Flex direction="column">
            <Flex mb="16px">
              <Flex alignItems="center" mr="24px">
                <Text fontSize="20px" fontWeight="bold" mr="8px">
                  松本省吾
                </Text>
                <Icon fontSize="20px" color="red.500" as={ImFire} />
              </Flex>
              <HStack alignItems="center" spacing="8px" fontSize="12px">
                <Text border="1px solid black" p="4px 8px" borderRadius="md">
                  エンジニア
                </Text>
                <Text border="1px solid black" p="4px 8px" borderRadius="md">
                  デザイナー
                </Text>
              </HStack>
            </Flex>
            <Text mb="16px">
              現在は就職活動のためにポートフォリオ作成をしています！チーム開発の経験を積むためにいろんな開発に携わりたいです！
            </Text>
            <HStack spacing="8px" fontSize="12px">
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                React
              </Text>
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                Rails
              </Text>
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                HTML
              </Text>
            </HStack>
          </Flex>
        </Flex>
        <Flex
          w="100%"
          h="100%"
          mb="48px"
          borderBottom="1px solid #ddd"
          cursor="pointer"
          pb="32px"
        >
          <Flex mr="21px">
            <Avatar w="60px" h="60px" src="" alt="avatar" />
          </Flex>
          <Flex direction="column">
            <Flex mb="16px">
              <Flex alignItems="center" mr="24px">
                <Text fontSize="20px" fontWeight="bold" mr="8px">
                  松本省吾
                </Text>
                <Icon fontSize="20px" color="red.500" as={ImFire} />
              </Flex>
              <HStack alignItems="center" spacing="8px" fontSize="12px">
                <Text border="1px solid black" p="4px 8px" borderRadius="md">
                  エンジニア
                </Text>
                <Text border="1px solid black" p="4px 8px" borderRadius="md">
                  デザイナー
                </Text>
              </HStack>
            </Flex>
            <Text mb="16px">
              現在は就職活動のためにポートフォリオ作成をしています！チーム開発の経験を積むためにいろんな開発に携わりたいです！
            </Text>
            <HStack spacing="8px" fontSize="12px">
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                React
              </Text>
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                Rails
              </Text>
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                HTML
              </Text>
            </HStack>
          </Flex>
        </Flex>
        <Flex
          w="100%"
          h="100%"
          mb="48px"
          borderBottom="1px solid #ddd"
          cursor="pointer"
          pb="32px"
        >
          <Flex mr="21px">
            <Avatar w="60px" h="60px" src="" alt="avatar" />
          </Flex>
          <Flex direction="column">
            <Flex mb="16px">
              <Flex alignItems="center" mr="24px">
                <Text fontSize="20px" fontWeight="bold" mr="8px">
                  松本省吾
                </Text>
                <Icon fontSize="20px" color="red.500" as={ImFire} />
              </Flex>
              <HStack alignItems="center" spacing="8px" fontSize="12px">
                <Text border="1px solid black" p="4px 8px" borderRadius="md">
                  エンジニア
                </Text>
                <Text border="1px solid black" p="4px 8px" borderRadius="md">
                  デザイナー
                </Text>
              </HStack>
            </Flex>
            <Text mb="16px">
              現在は就職活動のためにポートフォリオ作成をしています！チーム開発の経験を積むためにいろんな開発に携わりたいです！
            </Text>
            <HStack spacing="8px" fontSize="12px">
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                React
              </Text>
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                Rails
              </Text>
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                HTML
              </Text>
            </HStack>
          </Flex>
        </Flex>
        <Flex
          w="100%"
          h="100%"
          mb="48px"
          borderBottom="1px solid #ddd"
          cursor="pointer"
          pb="32px"
        >
          <Flex mr="21px">
            <Avatar w="60px" h="60px" src="" alt="avatar" />
          </Flex>
          <Flex direction="column">
            <Flex mb="16px">
              <Flex alignItems="center" mr="24px">
                <Text fontSize="20px" fontWeight="bold" mr="8px">
                  松本省吾
                </Text>
                <Icon fontSize="20px" color="red.500" as={ImFire} />
              </Flex>
              <HStack alignItems="center" spacing="8px" fontSize="12px">
                <Text border="1px solid black" p="4px 8px" borderRadius="md">
                  エンジニア
                </Text>
                <Text border="1px solid black" p="4px 8px" borderRadius="md">
                  デザイナー
                </Text>
              </HStack>
            </Flex>
            <Text mb="16px">
              現在は就職活動のためにポートフォリオ作成をしています！チーム開発の経験を積むためにいろんな開発に携わりたいです！
            </Text>
            <HStack spacing="8px" fontSize="12px">
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                React
              </Text>
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                Rails
              </Text>
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                HTML
              </Text>
            </HStack>
          </Flex>
        </Flex>
        <Flex
          w="100%"
          h="100%"
          mb="48px"
          borderBottom="1px solid #ddd"
          cursor="pointer"
          pb="32px"
        >
          <Flex mr="21px">
            <Avatar w="60px" h="60px" src="" alt="avatar" />
          </Flex>
          <Flex direction="column">
            <Flex mb="16px">
              <Flex alignItems="center" mr="24px">
                <Text fontSize="20px" fontWeight="bold" mr="8px">
                  松本省吾
                </Text>
                <Icon fontSize="20px" color="red.500" as={ImFire} />
              </Flex>
              <HStack alignItems="center" spacing="8px" fontSize="12px">
                <Text border="1px solid black" p="4px 8px" borderRadius="md">
                  エンジニア
                </Text>
                <Text border="1px solid black" p="4px 8px" borderRadius="md">
                  デザイナー
                </Text>
              </HStack>
            </Flex>
            <Text mb="16px">
              現在は就職活動のためにポートフォリオ作成をしています！チーム開発の経験を積むためにいろんな開発に携わりたいです！
            </Text>
            <HStack spacing="8px" fontSize="12px">
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                React
              </Text>
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                Rails
              </Text>
              <Text borderRadius="full" p="4px 8px" border="1px solid black">
                HTML
              </Text>
            </HStack>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UserIndex;
