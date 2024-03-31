/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Box, Heading, HStack, VStack, Image } from "@chakra-ui/react";
import Logo from "../main/Logo";

const LeftSide = () => {
  return (
    <Box paddingLeft='4rem' paddingRight='2rem'>
      <Box h='20vh'>
        <Logo />
      </Box>

      <Box h='85vh'>
        <Heading size='3xl' color={"white"}>
          Chat with a
        </Heading>

        <VStack paddingTop={"2rem"}>
          <Heading fontSize='2rem' color={"white"}>
            Youtube Video
          </Heading>
          <Box textAlign={"center"} color={"white"}>
            Type in a Youtube video URL and ask any question about it like "What
            are the most important points in the video?" "At what time does the
            video mention watermelon?"
          </Box>
        </VStack>

        <VStack paddingTop={"2rem"}>
          <Heading fontSize='2rem' color={"white"}>
            Class Curriculum
          </Heading>
          <Box textAlign={"center"} color={"white"}>
            Upload your class syllabus, book, tests, quizes, etc. Then ask your
            AI tutor for help with your class.
          </Box>
        </VStack>

        <VStack paddingTop={"2rem"}>
          <Heading fontSize='2rem' color={"white"}>
            Trained Debater
          </Heading>
          <Box textAlign={"center"} color={"white"}>
            Choose a topic and speak to a debater that can speak back and
            disagree. You can also choose where your debater from.
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default LeftSide;
