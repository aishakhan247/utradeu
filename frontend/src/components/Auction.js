import "./../styles/listfeed.css";
import { useEffect, useState, useContext, useRef, React } from "react";
import axios from "axios";
import { PostsContext } from "./PostsContext";
import { getOrCreateChat } from "react-chat-engine";

//icons
import {
  FaComment,
  FaLaughWink,
  FaRegHeart,
  FaSave,
  FaCalendar,
  FaHandsHelping,
  FaBookmark,
  FaBoxOpen,
  FaHandPointer,
  FaDollarSign,
  FaHourglassHalf,
} from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import LeftPane from "./LeftPane";
import SearchBar from "./Search";
import Filter from "./Filter";
import { UserContext } from "../context/userContext";
import { FaHeart } from "react-icons/fa";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Textarea,
  Input,
  Divider,
  ButtonGroup,
  IconButton,
  Spacer,
  Link,
  AspectRatio,
  border,
  Icon,
  Avatar,
  Grid,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  Card,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { color } from "framer-motion";
import Bid from "./Bid";

const apiURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_UTRADEU_URL_PROD
    : process.env.REACT_APP_UTRADEU_URL_DEV;

const Auction = () => {
  //const [posts, setPosts] = useState(null);
  const [pictures, setPictures] = useState([]);
  const [posts, setPosts] = useContext(PostsContext);
  const { user, setUser } = useContext(UserContext);
  const [comment, setComment] = useState({
    commenter: user.firstName + user.lastName,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [auction, setBid] = useState({
    // bidder: user.firstName + user.lastName,
  });
  const [selectedPost, setSelectedPost] = useState(null);

  const handleFirstBid = (post) => {
    console.log(post);
    setSelectedPost(post);
    setUser(user);
    onOpen();
  };

  const handleBid = (postId) => {
    onClose();
    window.location.reload(false);
    // console.log("auction iD: " + auction.postID);

    console.log("auction price: " + auction.price);
    console.log("auction postid: " + auction.postID);
    console.log("auction userid: " + auction.userID);

    // console.log("auction: " + auction);
    axios
      .post(`${apiURL}/posts/placeBid`, auction)
      .then((response) => {
        axios
          .get(`${apiURL}/posts/auctions`)
          .then((response) => setPosts(response.data.reverse()))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
    setBid({ ...auction, price: 0 });
    // {onClose};
  };

  //const ref = useRef(null);

  // Get all posts from backend/express.js
  useEffect(() => {
    axios
      .get(`${apiURL}/posts/auctions`)
      .then((response) => setPosts(response.data.reverse()))
      .catch((error) => console.log(error));
  }, []);

  const handleComment = (e) => {
    axios
      .post(`${apiURL}/posts/leaveComment`, comment)
      .then((response) => {
        axios
          .get(`${apiURL}/posts`)
          .then((response) => setPosts(response.data.reverse()))
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

  return (
    <Stack
      bg={"#FEFAE0"}
      align='center'
      justify='center'
      px={{base: "2", md: "none"}}
    >
      <SearchBar></SearchBar>
      {posts &&
        posts.map((post) => {
          const type = post.postType;
          const endDate = new Date(post.auctionEnd);
          return (
            //new auction
            <Card>
              <Stack
                direction={{ base: "column", sm: "row" }}
                //   overflow='hidden'
                variant='outline'
                //   maxH={"300px"}
                maxW={{ base: "373px", md: "950px" }}
                boxShadow={"xl"}
                bg={"#FAEDCD"}
                border='2px solid #ACBED8'
                justify={{ base: "center", md: "none" }}
                align={{ base: "center", md: "none" }}
              >
                <Image
                  // objectFit='cover'
                  // maxW={{ base: '100%', sm: '300px' }}
                  // maxH={{ base: '100%', sm: '400px' }}
                  height={300}
                  width={300}
                  p={"6px"}
                  objectFit={"scale-down"}
                  src={
                    post.pictureURL[0]
                      ? `${apiURL}/uploads/${post.pictureURL[0]}`
                      : "/utradeulogo.svg"
                  }
                  alt='product image'
                />

                <Stack>
                  <CardBody>
                    <Box fontWeight={400} fontSize={"20px"} mt={"-10px"}>
                      <Flex
                        // minWidth='max-content'
                        alignItems='center'
                        gap='2'
                        w={{ base: "100vw", md: "600px" }}
                        px={{ base: "2", md: "none" }}
                      >
                        <Box>
                          <Link
                            href={`/profile/${post.user._id}`}
                            variant='profile'
                          >
                            <Avatar
                              size={"xs"}
                              src={
                                post.user &&
                                `${apiURL}/uploads/${post.user.profilePictureURL}`
                              }
                              marginTop={"4px"}
                              marginRight={"5px"}
                            />
                            {post.user.firstName + " "}
                            {post.user.lastName}
                          </Link>
                        </Box>

                        <Spacer />
                        {/* <Flex> */}
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
                          at {endDate.getHours() + ":" + endDate.getMinutes()}{" "}
                        </Button>
                        {/* </Flex> */}
                      </Flex>
                    </Box>
                    <Heading
                      size='md'
                      mt={"10px"}
                      px={{ base: "2", md: "none" }}
                    >
                      {post.postTitle}
                    </Heading>

                    <Text px={{ base: "2", md: "none" }}>
                      {post.description}
                    </Text>
                    <Text px={{ base: "2", md: "none" }}>
                      Highest Bid: ${post.price}
                    </Text>
                    <Text px={{ base: "2", md: "none" }}>
                      Highest Bidder:{" "}
                      {post.auctionParticipants.length != 0
                        ? post.auctionParticipants[
                            post.auctionParticipants.length - 1
                          ].firstName +
                          " " +
                          post.auctionParticipants[
                            post.auctionParticipants.length - 1
                          ].lastName
                        : "none"}
                    </Text>
                  </CardBody>

                  <CardFooter>
                    {/* Bid Modal */}
                    <>
                      {/* <Box minWidth='max-content' alignItems='center' gap='2'> */}
                      <Flex
                        minWidth='max-content'
                        alignItems='center'
                        gap='2'
                        mt={"-15px"}
                      >
                        <Button
                          leftIcon={<FaDollarSign />}
                          onClick={() => {
                            handleFirstBid(post);
                          }}
                          bg={"#D4A373"}
                          color='white'
                          _hover={{ bg: "#FEFAE0", color: "#D4A373" }}
                        >
                          Place a Bid
                        </Button>
                        <Spacer />
                        <Button
                          leftIcon={<FaEnvelope />}
                          onClick={() => sendDM(post.user, post.postTitle)}
                          bg={"#D4A373"}
                          color='white'
                          _hover={{ bg: "#FEFAE0", color: "#D4A373" }}
                        >
                          Message the Seller
                        </Button>
                      </Flex>
                      <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay
                          bg='none'
                          backdropFilter='auto'
                          backdropBlur='1px'
                        />
                        <ModalContent>
                          <ModalHeader>
                            Current Bid: ${selectedPost?.price}
                          </ModalHeader>
                          <ModalHeader>Your Bid:</ModalHeader>

                          <Stack paddingRight={"30px"} paddingLeft={"20px"}>
                            <NumberInput
                              size={"sm"}
                              min={selectedPost?.price}
                              value={auction.price}
                              onChange={(e) => {
                                // console.log(e);
                                setBid({
                                  ...auction,
                                  price: e,
                                  postID: selectedPost?._id,
                                  userID: user._id,
                                });
                              }}
                            >
                              {/* <NumberInput>
                                                        {/* <input type="number"
                                                            value={auction.price}
                                                            inputmode="numeric"
                                                            pattern="[0-9]*"
                                                            onChange={(e) => {
                                                                setBid({
                                                                    ...auction,
                                                                    price: e.target.value,
                                                                    postID: selectedPost?._id,
                                                                    userID: user._id,
                                                                })
                                                            }
                                                            }
                                                        /> */}
                              {/* go for <input type="text" "> instead */}
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                              {/* </input> */}
                            </NumberInput>
                          </Stack>
                          <ModalCloseButton />

                          <ModalFooter>
                            {/* post.auctionParticipants  post.auctionBids  post.auctionEnd  post.price */}
                            <Button
                              bg={"#D4A373"}
                              mr={3}
                              onClick={() => {
                                handleBid(selectedPost?._id);
                                // console.log("selected Post: " + selectedPost?._id);
                              }}
                              color={"white"}
                              onClose={onClose}
                            >
                              Place Bid
                            </Button>
                            <Button variant='ghost' onClick={onClose}>
                              Cancel
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                      {/* </Box> */}
                    </>
                  </CardFooter>
                </Stack>
              </Stack>
            </Card>
          );
        })}
    </Stack>
  );
};

export default Auction;
