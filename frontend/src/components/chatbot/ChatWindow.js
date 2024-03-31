import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Skeleton,
  Text,
  Tooltip,
  Avatar,
} from "@chakra-ui/react";
// import Avatar from "./Avatar";
import { Message } from "./ChatBot";
// import parse from "html-react-parser";
import { MdSend } from "react-icons/md";
import { VscSync } from "react-icons/vsc";
import { FiBox, FiInfo, FiMoreVertical, FiTrash2 } from "react-icons/fi";
import React, { useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
// import timestampConverter from "../../utils/timestampConverter";
// import { ChevronDownIcon } from "@chakra-ui/icons";
// import Microphone from "./Microphone";



export const ChatWindow = ({
  messages,
  isLoading,
  input,
  setInput,
  handleInputChange,
  handleSend,
}) => {
  const messagesEndRef = useRef(null);
  // const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  // sort the messages by timestamp
  const sortedMessages = messages.sort((a, b) => {
    return a - b;
  });

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [sortedMessages]);

  return (
    <Box
      boxShadow='0px 4px 16px rgba(0, 0, 0, 0.25)'
      borderRadius={8}
      flexDirection='column'
      position='fixed'
      bottom='100px'
      right='30px'
      width='325px'
      height='500px'
      zIndex='1'
      bg={"#CCD5AE"}
    >

      <Flex
        p={2}
        align={"center"}
        justify={"space-between"}
        borderBottom={"1px solid #E2E8F0"}
      >
        <Flex align={"center"} justify={"start"}>
          <Avatar
            size={"md"}
            name='Utes AI'
            src={
              "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1699753382~exp=1699753982~hmac=86952dabe3561536fc643a7c69a5485722cc8a4bab858f1b8701ea93fdef82e2"
            }
            cursor={"pointer"}
            zIndex='1'
          />{" "}
          <Flex flexDir={"column"}>
            <Box mx={2} fontSize={"sm"}>
              Nasser
            </Box>
            <Box fontSize='xs' color={"#848c74"} mx={2} fontWeight={"bold"}>
              Powered by AI
            </Box>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        flexDir={"column"}
        h='24rem'
        px={2}
        overflowY='scroll'
        w={"full"}
        bg={"#F3F6FD"}
      >
        {sortedMessages.map((message, index) => (
          <Flex
            key={index}
            flexDir={"column"}
            m='2'
            maxW={"70%"}
            alignSelf={message.isUser ? "flex-end" : "flex-start"}
          >
            <Box
              fontSize='xs'
              fontWeight='bold'
              textAlign={message.isUser ? "right" : "left"}
              color={message.isUser ? "blue.500" : "gray.600"}
            >
              {message.isUser ? "You" : "Nasser"}
            </Box>
            <Box
              bg={message.isUser ? "#5484E2" : "rgba(84, 132, 226, 0.12)"}
              color={message.isUser ? "white" : "black"}
              p='2'
              borderRadius='lg'
              width={"fit-content"}
              maxW={"100%"}
              alignSelf={message.isUser ? "flex-end" : "flex-start"}
              fontSize={"sm"}
            >
              {parse(message.text)}
              {/* show the refresh button if it's latest message and canRefresh = true */}
              {index === sortedMessages.length - 1 && message.canRefresh && (
                <Flex align='center' justify='flex-end'>
                  <VscSync
                    // onClick={handleRefresh}
                    size='20px'
                    style={{ cursor: "pointer" }}
                  />
                </Flex>
              )}
            </Box>
            {/* <Text
              fontSize="xs"
              color="gray.500"
              mt="1"
              textAlign={message.isUser ? "right" : "left"}
            >
              {timestampConverter(message.timestamp!)}
            </Text> */}
          </Flex>
        ))}
        <div ref={messagesEndRef} />
        {isLoading && (
          <Flex flexDir={"column"} m='2' maxW='70%'>
            <Skeleton height='20px' mb='3' />
          </Flex>
        )}
      </Flex>

      <Flex
        align='center'
        w='full'
        h={"60px"}
        mt='2'
        bg={"#FFF"}
        p='2'
        borderRadius='lg'
        position='absolute'
        bottom='0'
      >
        {/* <Microphone setInput={setInput} /> */}
        <Input
          placeholder='Ask me anything'
          bg={"#F3F6FD"}
          size='sm'
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />
        <MdSend
          onClick={handleSend}
          size='20px'
          // color={"#5484E2"}
          color="#D4A373"
          style={{
            cursor: "pointer",
            marginLeft: "10px",
          }}
        />
      </Flex>
    </Box>
  );
};

export default ChatWindow;
