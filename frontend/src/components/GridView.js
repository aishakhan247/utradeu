//import React, { useState } from "react";
import Dropzone from "react-dropzone";
import "./../styles/grid.css";
import { useEffect, useState, useContext } from "react";
import {
  FaCalendar,
  FaHandsHelping,
  FaBoxOpen,
  FaHandPointer,
} from "react-icons/fa";
import axios from "axios";
import { PostsContext } from "./PostsContext";
import SearchBar from "./Search";
import {
  Grid,
  GridItem,
  Box,
  Text,
  SimpleGrid,
  Image,
  Center,
  useColorModeValue,
  Heading,
  Stack,
  Avatar,
  Link,
  Flex,
  Spacer,
  Icon,
} from "@chakra-ui/react";
import Filter from "./Filter";
import LeftPane from "./LeftPane";
import { UserContext } from "../context/userContext";
import Chatbot from "./chatbot/ChatBot";

const GridView = () => {
  return (
    <Grid
      bg={"#FEFAE0"}
      h='100vh'
      templateRows='repeat(12, 1fr)'
      templateColumns='repeat(12, 1fr)'
      gap={4}
    >
      <GridItem
        display={{ base: "none", md: "grid" }}
        rowSpan={12}
        colSpan={3}
      >
        <Filter />
      </GridItem>
      <GridItem
        rowSpan={12}
        colSpan={{ base: "12", md: "9", lg: "9" }}
        px={{ base: "2", md: "none" }}
      >
        <GridUI />
      </GridItem>
    </Grid>
  );
};

const GridUI = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [posts, setPosts] = useContext(PostsContext);
  const color = useColorModeValue("white", "gray.800");
  const { user, setUser } = useContext(UserContext);
  const apiURL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_UTRADEU_URL_PROD
      : process.env.REACT_APP_UTRADEU_URL_DEV;
  const apiURL2 =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_UTRADEU_URL_PROD
      : "http://localhost:3000";
  useEffect(() => {
    axios
      .get(`${apiURL}/posts?`)
      .then((response) => setPosts(response.data.reverse()))
      // .then((response) => console.log(response.data.reverse()[0]))
      .catch((error) => console.log(error));
  }, []);
  return (
    <Box>
      {/* <Filter></Filter> */}
      <SearchBar></SearchBar>
      <SimpleGrid columns={{ base: "1", md: "2", lg: "3" }} spacing={10}>
        {posts &&
          posts.map((post) => {
            const handleComment = (e) => {
              e.preventDefault();

              axios
                .post(`${apiURL}/posts/leaveComment`, post.comments)
                .then((response) => console.log(response))
                .catch((error) => console.log(error));
              // re-render the home component/page after creating a post
              setPosts([post, ...posts]);
            };

            const handleDrop = (files) => {
              // Set the selected file to the first file in the array
              setSelectedFile(files[0]);
            };
            const type = post.postType;

            return (
              <Link
                href={`${apiURL2}/posts/post/${post?._id}`}
                cursor={"pointer"}
                // ml={2}
              >
                {/* <Center py={12}> */}
                <Box
                  role={"group"}
                  p={6}
                  maxW={"350px"}
                  w={"full"}
                  bg={color}
                  boxShadow={"2xl"}
                  rounded={"lg"}
                  pos={"relative"}
                  zIndex={1}
                  // marginLeft={"50px"}
                  border={
                    type === "event"
                      ? "3px solid #D4A373"
                      : type === "service"
                      ? "3px solid #CCD5AE"
                      : "3px solid #848c74"
                  }
                >
                  <Box
                    // lineHeight={1.1}
                    fontWeight={300}
                    fontSize={"20px"}
                    //onClick={() => handleUserClick(post)}
                  >
                    <Flex>
                      <Link
                        href={`/profile/${post.user._id}`}
                        variant='profile'
                      >
                        <Avatar
                          size={"sm"}
                          src={
                            post.user.profilePictureURL &&
                            `${apiURL}/uploads/${post.user.profilePictureURL}`
                          }
                          marginTop={"4px"}
                          marginRight={"5px"}
                        />
                        {post.user.firstName + " "}
                        {post.user.lastName}
                      </Link>
                      <Spacer />
                      <Icon
                        as={
                          type == "event"
                            ? FaCalendar
                            : type == "service"
                            ? FaHandsHelping
                            : FaBoxOpen
                        }
                        color={
                          type === "event"
                            ? "#D4A373"
                            : type === "service"
                            ? "#CCD5AE"
                            : "#848c74"
                        }
                        marginTop={"3px"}
                        w={8}
                        h={8}
                      />
                    </Flex>
                  </Box>

                  <Box
                    rounded={"lg"}
                    mt={-12}
                    pos={"relative"}
                    height={"270px"}
                    paddingTop={"40px"}

                    // _after={{
                    //   transition: 'all .3s ease',
                    //   // objectFit: 'scale-down',
                    //   content: '""',
                    //   w: 'full',
                    //   h: 'full',
                    //   pos: 'absolute',
                    //   top: 8,
                    //   left: 0,
                    //   opacity: 0.25,
                    //   bg: '#CCD5AE',
                    //   // backgroundImage: `https://www.colorhexa.com/4f518c.png`,
                    //   filter: 'blur(25px)',
                    //   zIndex: -1,
                    // }}
                    // _groupHover={{
                    //   _after: {
                    //     filter: 'blur(30px)',
                    //     opacity: 0.5,
                    //   },
                    // }}
                  >
                    <Image
                      rounded={"lg"}
                      height={300}
                      width={300}
                      objectFit={"scale-down"}
                      src={
                        post.pictureURL[0]
                          ? `${apiURL}/uploads/${post.pictureURL[0]}`
                          : "/utradeulogo.svg"
                      }
                      alt='#'
                    />
                  </Box>
                  <Stack pt={10} align={"center"}>
                    <Text
                      color={"gray.500"}
                      fontSize={"sm"}
                      textTransform={"uppercase"}
                    >
                      {post.condition}
                    </Text>
                    <Heading
                      fontSize={"2xl"}
                      fontFamily={"body"}
                      fontWeight={500}
                    >
                      {post.postTitle}
                    </Heading>
                    <Stack direction={"row"} align={"center"}>
                      <Text fontWeight={800} fontSize={"xl"}>
                        ${post.price}
                        {post.payRate}
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
                {/* </Center> */}
              </Link>
            );
          })}
      </SimpleGrid>
      <Chatbot openChat={false} />
    </Box>
  );
};

export default GridView;
