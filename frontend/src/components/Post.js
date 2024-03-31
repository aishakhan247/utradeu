/**
 * @author Nasser Mughrabi
 * @description This is the create post component. It's responsible for the look and functionality of creating a post
 *
 */

import React from "react";
import { useState, useRef, useContext, useEffect } from "react";
import "./../styles/post.css";
import axios from "axios";
import { FaFile } from "react-icons/fa";
import { PostsContext } from "./PostsContext";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { UserContext } from "../context/userContext";
import {
  FaComment,
  FaLaughWink,
  FaRegHeart,
  FaHeart,
  FaSave,
  FaCalendar,
  FaHandsHelping,
  FaBookmark,
  FaBoxOpen,
  FaShare,
  FaEnvelope,
  FaHourglassHalf,
  FaHandPointer,
} from "react-icons/fa";
import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  Button,
  Heading,
  SimpleGrid,
  Input,
  ButtonGroup,
  IconButton,
  Spacer,
  Link,
  Icon,
  Avatar,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  Divider,
} from "@chakra-ui/react";
import Chatbot from "./chatbot/ChatBot";
import Reporting from "./Reporting";

const Post = () => {
  const [posts, setPosts] = useContext(PostsContext);
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const apiURL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_UTRADEU_URL_PROD
      : process.env.REACT_APP_UTRADEU_URL_DEV;
  const apiURL2 =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_UTRADEU_URL_PROD
      : "http://localhost:3000";

  // get post with postId
  useEffect(() => {
    axios
      .get(`${apiURL}/posts/post/${postId}`) // url will be variable as we go to production env.
      .then((response) => setPost(response.data)) // rerender the component everytime he data fetched
      .catch((error) => console.log(error));
  }, []);

  //const [posts, setPosts] = useState(null);
  const [pictures, setPictures] = useState([]);
  const [UserLikedPosts, setUserLikedPosts] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [selectedPost, setSelectedPost] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [comment, setComment] = useState({
    commenter: user.firstName + user.lastName,
    commenterPic: user.profilePictureURL,
  });

  const handleComment = (e) => {
    axios
      .post(`${apiURL}/posts/leaveComment`, comment)
      .then((response) => {
        axios
          .get(`${apiURL}/posts/post/${postId}`) // url will be variable as we go to production env.
          .then((response) => setPost(response.data)) // rerender the component everytime he data fetched
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
    setComment({ commentMessage: "" });
  };

  const sendDM = (otherUser, postTitle) => {
    console.log(
      "Other User's name: ",
      otherUser.firstName + " " + otherUser.lastName
    );
    axios
      .put(
        "https://api.chatengine.io/chats/",
        {
          is_direct_chat: false,
          usernames: [`${otherUser.firstName} ${otherUser.lastName}`],
          title: `${postTitle}`,
        },
        {
          headers: {
            "Project-ID": "5e589b83-264c-4f5b-9b29-9856969fc2c9",
            "User-Name": `${user.firstName}` + " " + `${user.lastName}`,
            "User-Secret": `${user.firstName}` + " " + `${user.lastName}`,
          },
        }
      )
      .then((response) => (window.location = "/chat"))
      .catch((error) => console.log(error));
  };

  const handleFirstDelete = (post) => {
    // Open the confirmation modal and pass the current post
    setSelectedPost(post);
    onOpen();
  };
  const handleModalDelete = (postId) => {
    // Send a DELETE request to the backend
    onClose();
    axios
      .delete(`${apiURL}/posts/deletePost/${postId}`)
      .then(() => {
        // update UI
        axios
          .get(`${apiURL}/posts/post/${postId}`) // url will be variable as we go to production env.
          .then((response) => setPost(response.data)) // rerender the component everytime he data fetched
          .catch((error) => console.log(error));
        toast({
          title: "Deleted",
          description: "Post Deleted Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: `${error}`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
  };

  // Get all posts ids liked by logedin user
  useEffect(() => {
    axios
      .get(`${apiURL}/posts/userLikedPosts/${user._id}`)
      .then((response) => {
        setUserLikedPosts(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleLikesUpdate = (post, action) => {
    const postId = post._id;
    if (action === "liked") {
      UserLikedPosts.push(postId);
      setUserLikedPosts(UserLikedPosts);
    } else {
      const index = UserLikedPosts.indexOf(postId);
      if (index > -1) {
        UserLikedPosts.splice(index, 1);
        setUserLikedPosts(UserLikedPosts);
      }
    }

    // edit post likes
    var liked = true;
    if (action === "unliked") {
      liked = false;
    }
    axios
      .put(`${apiURL}/posts/editPostLikes/${postId}`, { liked })
      .then(() => {
        // update UI
        axios
          .get(`${apiURL}/posts/post/${postId}`) // url will be variable as we go to production env.
          .then((response) => setPost(response.data)) // rerender the component everytime he data fetched
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });

    // add/remove postId to user liked post ids
    const userId = user._id;
    axios
      .post(`${apiURL}/posts/Liked/${postId}`, { userId, liked })
      .then((response) => {
        // update UI
        axios
          .get(`${apiURL}/posts/post/${postId}`) // url will be variable as we go to production env.
          .then((response) => setPost(response.data)) // rerender the component everytime he data fetched
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const handleRedirect = () => {
    window.location = "/auction";
  };

  const type = post?.postType;
  const eventDate = new Date(post?.date);
  const endDate = new Date(post?.auctionEnd);
  const timestamp = new Date(post?.timestamp);

  return (
    //new attempt

    <Container
      maxW={"2xl"}
      bg={"#FAEDCD"}
      marginBottom={"50px"}
      rounded={"lg"}
      border={
        type === "event"
          ? "2px solid #D4A373"
          : type === "service"
          ? "2px solid #CCD5AE"
          : type === "auction"
          ? "2px solid #ACBED8"
          : "2px solid #848c74"
          ? "2px solid #CCD5AE"
          : type === "auction"
          ? "2px solid #ACBED8"
          : "2px solid #848c74"
      }
      boxShadow={"2xl"}
      // mt={{base: "8", md: "none"}}
    >
      <Box
        // lineHeight={1.1}
        fontWeight={400}
        fontSize={"2xl"}
        //onClick={() => handleUserClick(post)}
        //onClick={() => handleUserClick(post)}
      >
        <Flex>
          <Link href={`/profile/${post?.user?._id}`} variant='profile'>
            <Flex align={"center"} justify={"center"}>
              <Avatar
                size={"sm"}
                src={
                  post?.user &&
                  `${apiURL}/uploads/${post?.user?.profilePictureURL}`
                }
                marginTop={"4px"}
                marginRight={"5px"}
              />
              <Box fontSize={{ base: "md", md: "xl" }}>
                {post?.user?.firstName + " "}
                {post?.user?.lastName}
              </Box>
            </Flex>
          </Link>
          <Box fontSize={"18px"} color={"gray"} ml={"7px"} pt={"5px"}>
            {timestamp.getMonth() +
              1 +
              "-" +
              timestamp.getDate() +
              "-" +
              timestamp.getUTCFullYear()}{" "}
            at{" "}
            {timestamp.getHours() +
              ":" +
              (timestamp.getMinutes() < 10 ? "0" : "") +
              timestamp.getMinutes()}
          </Box>
          <Spacer />

          {post?.user?._id === user?._id && (
            <Box>
              <Button
                colorScheme='red'
                variant='outline'
                p={3}
                mt={"3px"}
                mr={1}
                size={{ base: "sm", md: "md" }}
                onClick={() => {
                  handleFirstDelete(post);
                }}
              >
                Delete
              </Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Delete Post</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    Are you sure you want to delete this post? This action
                    cannot be undone.
                  </ModalBody>

                  <ModalFooter>
                    <Button variant='ghost' onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme='red'
                      ml={3}
                      onClick={() => {
                        handleModalDelete(selectedPost?._id);
                      }}
                    >
                      Delete
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          )}
          <Icon
            as={
              type == "event"
                ? FaCalendar
                : type == "service"
                ? FaHandsHelping
                : type == "auction"
                ? FaHandPointer
                : FaBoxOpen
                ? FaHandsHelping
                : type == "auction"
                ? FaHandPointer
                : FaBoxOpen
            }
            color={
              type === "event"
                ? "#D4A373"
                : type === "service"
                ? "#CCD5AE"
                : type === "auction"
                ? "#ACBED8"
                : "#848c74"
                ? "#CCD5AE"
                : type === "auction"
                ? "#ACBED8"
                : "#848c74"
            }
            marginTop={"3px"}
            w={8}
            h={8}
          />
        </Flex>
      </Box>

      {/* <Link
              {/* <Link
                to={`/profile/${post?.user?._id}`}
                variant='profile'
              >
                {post?.user?.firstName}
              </Link> */}

      <SimpleGrid
        spacing={{ base: 5, md: 5 }}
        // py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={
              post?.pictureURL[0]
                ? `${apiURL}/uploads/${post?.pictureURL[0]}`
                : "/utradeulogo.svg"
            }
            w={"500"}
            h={"500"}
            fit={"cover"}
            align={"center"}
            pt={{ base: "2", md: "2" }}
          />
        </Flex>

        {/* icons */}
        <Stack
          direction={{ base: "column", md: "row" }}
          as={"form"}
          spacing={"0px"}
          align={"center"}
          justify={"center"}
        >
          <ButtonGroup pb={{ base: "2", md: "none" }}>
            <IconButton
              onClick={() => {
                if (UserLikedPosts.includes(post._id)) {
                  handleLikesUpdate(post, "unliked");
                } else {
                  handleLikesUpdate(post, "liked");
                }
              }}
              icon={
                UserLikedPosts.includes(post?._id) ? (
                  <FaHeart />
                ) : (
                  <FaRegHeart />
                )
              }
              bg={"#CCD5AE"}
              color={"#838870"}
              _hover={{ bg: "#FEFAE0" }}
            ></IconButton>
            <IconButton
              icon={<FaComment />}
              bg={"#CCD5AE"}
              color={"#838870"}
              _hover={{ bg: "#FEFAE0" }}
            ></IconButton>
            <Popover>
              <PopoverTrigger>
                <IconButton
                  icon={<FaShare />}
                  bg={"#CCD5AE"}
                  color={"#838870"}
                  _hover={{ bg: "#FEFAE0" }}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${apiURL2}/posts/post/${post?._id}`
                    );
                  }}
                ></IconButton>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Link Copied to Clipboard!</PopoverHeader>
              </PopoverContent>
            </Popover>

            {/* <IconButton
                      icon={<FaBookmark />}
                      bg={"#CCD5AE"}
                      color={"#838870"}
                      _hover={{ bg: "#FEFAE0" }}
                    ></IconButton> */}
            <Reporting postId={post?._id} />
          </ButtonGroup>
          <Spacer />
          {post?.user?._id !== user?._id && (
            <Button
              leftIcon={<FaEnvelope />}
              onClick={() => sendDM(post?.user, post?.postTitle)}
              bg={"#D4A373"}
              color='white'
              _hover={{ bg: "#FEFAE0", color: "#D4A373" }}
            >
              Message the Seller
            </Button>
          )}
        </Stack>
        <Box>{post?.likes ? post?.likes : 0} Likes</Box>
        <Stack>
          <Box as={"header"}>
            <Heading lineHeight={0.5} fontWeight={600} fontSize={"3xl"}>
              {post?.postTitle}
            </Heading>
            <Text fontSize={"lg"}>{post?.description}</Text>
            <Text lineHeight={0.5} color={"#38393d"} fontWeight={400}>
              ${post?.price}
              {post?.payRate}
            </Text>
            <Text lineHeight={0.5} color={"#38393d"} fontWeight={400}>
              category: {post?.category}
            </Text>
            <Text lineHeight={0.5} color={"#38393d"} fontWeight={400}>
              {type === "event" && "location: "}
              {type === "event" && post?.location}

              {type === "service" && "year: "}
              {type === "service" && post?.year}
            </Text>
            {/* <Text lineHeight={0.5} color={"#38393d"} fontWeight={400}>
                      {type === "event" && "date and time: "}
                      {type === "event" && eventDate.getMonth() + 1 + "-" + eventDate.getDate() + "-" + eventDate.getUTCFullYear() + " at " + eventDate.getHours() + ":" + eventDate.getMinutes()}
                    </Text> */}
            {/* <Button> */}
            {type === "event" && (
              <Button
                leftIcon={<FaCalendar />}
                bg={"white"}
                color={"#D4A373"}
                _active={"none"}
                _hover={"none"}
              >
                {eventDate.getMonth() +
                  1 +
                  "-" +
                  eventDate.getDate() +
                  "-" +
                  eventDate.getUTCFullYear() +
                  " at " +
                  eventDate.getHours() +
                  ":" +
                  (eventDate.getMinutes() < 10 ? "0" : "") +
                  eventDate.getMinutes()}
              </Button>
            )}
            {type === "auction" && (
              <Button
                leftIcon={<FaHourglassHalf />}
                bg={"#ACBED8"}
                color={"white"}
                justifyContent={"flex-end"}
                _hover={"none"}
                _active={"none"}
              >
                {endDate.getMonth() +
                  1 +
                  "-" +
                  endDate.getDate() +
                  "-" +
                  endDate.getUTCFullYear()}{" "}
                at{" "}
                {endDate.getHours() +
                  ":" +
                  (endDate.getMinutes() < 10 ? "0" : "") +
                  endDate.getMinutes()}{" "}
              </Button>
            )}
            {type === "auction" && (
              <Button
                leftIcon={<FaHandPointer />}
                bg={"#ACBED8"}
                color={"white"}
                onClick={handleRedirect}
                float={"right"}
              >
                View on Auction Page
              </Button>
            )}

            {/* {type === "event" && eventDate.getMonth() + 1 + "-" + eventDate.getDate() + "-" + eventDate.getUTCFullYear() + " at " + eventDate.getHours() + ":" + eventDate.getMinutes()} */}
            {/* </Button> */}
          </Box>
          <Divider orientation='horizontal' color={"#848c74"} />
          {post?.comments &&
            post?.comments.map((comment) => (
              <Box
                bg='white'
                p={4}
                rounded='lg'
                boxShadow='md'
                key={comment.id} // Assuming there's a unique identifier for each comment
              >
                <Box display='flex'>
                  <Avatar
                    src={user && `${apiURL}/uploads/${comment.commenterPic}`}
                    alt='Profile Picture'
                    size='sm'
                    mr={3}
                  />
                  <Box>
                    <Text fontWeight='semibold'>{comment.commenter}</Text>
                    <Text color='gray.500' fontSize='sm'>
                      {comment?.commentMessage}
                    </Text>
                  </Box>
                </Box>
              </Box>
            ))}

          <Box bg={"white"} borderRadius={"xl"} my={2} p={3} boxShadow={"sm"}>
            <Flex>
              <Box width={"100%"}>
                <Flex
                  alignItems={"center"}
                  justifyContent='space-between'
                  flex={1}
                >
                  <Input
                    resize={"none"}
                    display={"flex"}
                    size={"lg"}
                    width={"100%"}
                    flex={1}
                    mx={4}
                    color={"grayish_blue"}
                    fontWeight={"medium"}
                    value={comment.commentMessage}
                    onChange={(e) => {
                      setComment({
                        ...comment,
                        commentMessage: e.target.value,
                        postID: post?._id,
                      });
                    }}
                  />
                  <Button
                    bg={"#838870"}
                    color={"white"}
                    onClick={handleComment}
                    _hover={{
                      opacity: 0.6,
                    }}
                  >
                    Comment
                  </Button>
                </Flex>
                <Text
                  color={"grayish_blue"}
                  fontWeight={"normal"}
                  my={5}
                ></Text>

                {/* Actions - Mobile View */}
                {/* {window.screen.width < 960 && (
                          <Flex
                            alignItems={"center"}
                            justifyContent='space-between'
                          >
                            <Flex
                              className='score_counter_mobile'
                              alignItems={"center"}
                              justifyContent='space-between'
                              p={3}
                              bg={"very_light_gray"}
                              borderRadius={"xl"}
                            ></Flex>
                          </Flex>
                        )} */}
              </Box>
            </Flex>
          </Box>
        </Stack>
      </SimpleGrid>
      <Chatbot openChat={false} />
    </Container>
  );
};

export default Post;
