/**
 * @author Nasser Mughrabi
 * @description This is the profile page component when looking at YOUR profile. It's responsible for the look and functionality of the page
 *
 * TODO:
 * Get the profile owner by thier ID
 * Get the profile owner's information and display them
 * On edit, send post request to the database
 *
 */

import React, { useEffect, useRef } from "react";
import "./../styles/profile.css";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Image,
  Input,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  Wrap,
  WrapItem,
  Avatar,
  Link,
  VStack,
  UnorderedList,
  ListItem,
  List,
  ListIcon,
  Icon,
  Flex,
  FormControl,
  IconButton,
  FormLabel,
  Container,
  Stack,
  Heading,
  SimpleGrid,
  StackDivider,
  Divider,
  Spacer,
  ButtonGroup,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import {
  FaComment,
  FaLaughWink,
  FaRegHeart,
  FaSave,
  FaCalendar,
  FaHandsHelping,
  FaBookmark,
  FaBoxOpen,
  FaEnvelope,
  FaShare,
  FaHandPointer,
  FaHeart,
} from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useToast } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import { TbHexagonLetterU, TbSquareRoundedLetterU } from "react-icons/tb";
import { IoTrashOutline } from "react-icons/io5";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import GridView from "./GridView";
import ListFeed from "./ListFeed";
import { PostsContext } from "./PostsContext";
import Chatbot from './chatbot/ChatBot';

const apiURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_UTRADEU_URL_PROD
    : process.env.REACT_APP_UTRADEU_URL_DEV;

const apiURL2 =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_UTRADEU_URL_PROD
    : "http://localhost:3000";


const MyProfile = () => {
  // use a profileData object to store the json object recieved from the server/DB
  const [profileData, setProfileData] = useState(null);
  const [edit, setEdit] = useState(false);
  const toast = useToast();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { user, setUser } = useContext(UserContext);
  const [posts, setPosts] = useContext(PostsContext);
  const [image, setImage] = useState(null);

  

  // Get all posts from backend/express.js
  useEffect(() => {
    axios
      .get(`${apiURL}/posts`)
      .then((response) => setPosts(response.data.reverse()))
      .catch((error) => console.log(error));
  }, []);

  // HTTP Get request: asks backend for profile data of person with first name = firstName
  useEffect(() => {
    axios
      .get(`${apiURL}/profile/myprofile/${user._id}`)
      .then((response) => {
        setProfileData(response.data);
        if (response.data.profilePictureURL != null) {
          setImage(
            `${apiURL}/profile/profileImage/${response.data.profilePictureURL}`
          );
        }
      })
      .catch((error) => console.log(error));
  }, [user]);

  // change profile image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setProfileData({
        ...profileData,
        demo_image: file,
        pictureURL: file.filename,
      });
    }
  };

  const handleEditClick = () => {
    if (edit) {
      // In edit mode and user clicked save (on save do the following)
      setEdit(false);
      if (!profileData.firstName) {
        toast({
          title: "Save Failed",
          description: "Name cannot be empty, refresh page and try again!",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        return;
      }

      const temp = new FormData();
      // profilePictureURL
      console.log(profileData.demo_image);
      temp.append("demo_image", profileData.demo_image);
      temp.append("profileData", JSON.stringify(profileData));

      // Send post request to backend to save data to db
      axios
        .post(`${apiURL}/profile/userData`, temp)
        .then((response) => {
          setProfileData(response);
          setImage(profileData.profilePictureURL);
        })
        .catch((error) => console.log(error));

      toast({
        title: "Saved",
        description: "Your information have been successfully saved",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      // Not in edit mode and user clicked edit (on edit do the following)
      setEdit(true);
    }
  };

  const handleRemoveService = (serviceIndex) => {
    const updatedServices = [...profileData.services];
    updatedServices.splice(serviceIndex, 1);
    setProfileData({ ...profileData, services: updatedServices });
  };

  return (
    <Box className='container emp-profile' bg={"#FEFAE0"}>
      <form method='post'>
        <Box display={{ base: "block", md: "flex" }} flexDirection='row'>
          <Box flex='1.4'>
            {isMobile || (
              <Wrap>
                <WrapItem>
                  <Avatar
                    size='2xl'
                    name='Segun Adebayo'
                    src={
                      image
                        ? image
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    }
                  />{" "}
                </WrapItem>
              </Wrap>
            )}
            {isMobile && (
              <Box display={"flex"} justifyContent={"space-between"} py={4}>
                <Wrap>
                  <WrapItem>
                    <Avatar
                      size='2xl'
                      name='Segun Adebayo'
                      src={
                        image
                          ? image
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      }
                    />{" "}
                  </WrapItem>
                </Wrap>
                <Box>
                  <VStack align={"flex-start"} spacing={2} py={4}>
                    {/* {edit ? (
                      <EditName
                        profileData={profileData}
                        setProfileData={setProfileData}
                      />
                    ) : (
                      <Flex>
                        <Text as='h5' pr={1}>
                          {profileData?.firstName}
                        </Text>
                        <Icon
                          as={TbSquareRoundedLetterU}
                          width={5}
                          height={5}
                          color='red'
                        />
                      </Flex>
                    )} */}
                    <Flex>
                      <Text as='h5' pr={1}>
                        {profileData?.firstName} {profileData?.lastName}
                      </Text>
                      <Icon
                        as={TbSquareRoundedLetterU}
                        width={5}
                        height={5}
                        color='red'
                      />
                    </Flex>

                    {/* <Flex alignItems={"center"}>
                      <Icon boxSize={5} as={AiFillStar} color='yellow.400' />
                      <Icon boxSize={5} as={AiFillStar} color='yellow.400' />
                      <Icon boxSize={5} as={AiFillStar} color='yellow.400' />
                      <Icon boxSize={5} as={AiFillStar} color='yellow.400' />
                      <Icon mr={1} boxSize={5} as={AiOutlineStar} />
                      <Link href='' color={"#D4A373"}>
                        Reviews
                      </Link>
                    </Flex> */}
                  </VStack>

                  <VStack align={"flex-start"} spacing={2}>
                    <Box width={"100%"}>
                      <Button
                        width={"100%"}
                        // colorScheme={edit ? "red" : "blue"}
                        bg={edit ? "#D4A373" : "#848c74"}
                        onClick={handleEditClick}
                      >
                        {edit ? "Save" : "Edit Profile"}
                      </Button>
                    </Box>
                  </VStack>
                </Box>
              </Box>
            )}
            {edit && (
              <Box cursor={"pointer"} position='relative'>
                <Button
                  as='label'
                  htmlFor='fileInput'
                  size='sm'
                  // colorScheme='blue'
                  bg='#D4A373'
                  color={"white"}
                  cursor='pointer'
                >
                  Change Photo
                </Button>
                <Input
                  type='file'
                  id='fileInput'
                  name='file'
                  opacity='0'
                  position='absolute'
                  top='0'
                  left='0'
                  width='100%'
                  height='100%'
                  cursor='pointer'
                  onChange={handleImageChange}
                />
              </Box>
            )}
            <VStack align={"flex-start"} paddingTop={2} spacing={4}>
              <Box
                width={"80%"}
                borderWidth='1px'
                borderColor={"#848c74"}
                p={4}
                bg={"#E9EDC9"}
              >
                {edit ? (
                  <EditBio
                    profileData={profileData}
                    setProfileData={setProfileData}
                  />
                ) : (
                  <Box>
                    <Box as='p' fontWeight='bold'>
                      Bio
                    </Box>
                    <Box>{profileData?.bio}</Box>
                  </Box>
                )}
              </Box>
              <Box
                width={"80%"}
                borderWidth='1px'
                borderColor={"#848c74"}
                p={4}
                bg={"#E9EDC9"}
              >
                <Box as='p' fontWeight='bold'>
                  Service(s)
                </Box>
                <List spacing={3} p={0}>
                  {profileData &&
                    profileData.services.map((service, index) => (
                      <ListItem key={index}>
                        <ListIcon as={MdCheckCircle} color='green.500' />
                        {service}
                        {edit && (
                          <IconButton
                            bg={"white"}
                            ml={2}
                            aria-label='Remove file'
                            icon={<IoTrashOutline color={"red"} />}
                            onClick={() => handleRemoveService(index)}
                          />
                        )}
                      </ListItem>
                    ))}
                </List>
                {edit && (
                  <EditServices
                    profileData={profileData}
                    setProfileData={setProfileData}
                  />
                )}
              </Box>
            </VStack>
          </Box>

          <Box flex='6'>
            <Box className='profile-head'>
              {isMobile || (
                <Box display={"flex"} justifyContent={"space-between"} py={4}>
                  <VStack align={"flex-start"} spacing={2}>
                    {/* {edit ? (
                      <EditName
                        profileData={profileData}
                        setProfileData={setProfileData}
                      />
                    ) : (
                      <Flex>
                        <Text as='h5' pr={1}>
                          {profileData?.firstName}
                        </Text>
                        <Icon
                          as={TbSquareRoundedLetterU}
                          width={5}
                          height={5}
                          color='red'
                        />
                      </Flex>
                    )} */}
                    <Flex>
                      <Text as='h5' pr={1}>
                        {profileData?.firstName} {profileData?.lastName}
                      </Text>
                      <Icon
                        as={TbSquareRoundedLetterU}
                        width={5}
                        height={5}
                        color='red'
                      />
                    </Flex>

                    {/* <Flex alignItems={"center"}>
                      <Icon boxSize={5} as={AiFillStar} color='yellow.400' />
                      <Icon boxSize={5} as={AiFillStar} color='yellow.400' />
                      <Icon boxSize={5} as={AiFillStar} color='yellow.400' />
                      <Icon boxSize={5} as={AiFillStar} color='yellow.400' />
                      <Icon mr={1} boxSize={5} as={AiOutlineStar} />
                      <Link href='' color={"#848c74"}>
                        Reviews
                      </Link>
                    </Flex> */}
                  </VStack>

                  <VStack align={"flex-start"} spacing={2}>
                    <Box width={"100%"}>
                      <Button
                        width={"100%"}
                        // colorScheme={edit ? "red" : "blue"}
                        // bg='#D4A373'
                        bg={edit ? "#D4A373" : "#848c74"}
                        color={"white"}
                        onClick={handleEditClick}
                      >
                        {edit ? "Save" : "Edit Profile"}
                      </Button>
                    </Box>
                  </VStack>
                </Box>
              )}

              <Tabs id='myTab' isFitted>
                <TabList>
                  <Tab
                    id='home-tab'
                    data-toggle='tab'
                    aria-controls='home'
                    aria-selected='true'
                    // color={'#D4A373'}
                  >
                    About
                  </Tab>
                  <Tab
                    id='profile-tab'
                    data-toggle='tab'
                    aria-controls='profile'
                    aria-selected='false'
                  >
                    Posts
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    {/* <Box borderWidth='1px' borderRadius='md' p={4} mb={2}>
                      <Text fontSize='md' fontWeight='bold' mb={2}>
                        Name
                      </Text>
                      <Text>
                        {profileData?.firstName} {profileData?.lastName}
                      </Text>
                    </Box> */}
                    <Box
                      borderWidth='1px'
                      borderColor={"#848c74"}
                      borderRadius='md'
                      p={4}
                      mb={2}
                      bg={"#E9EDC9"}
                    >
                      {/* {edit ? (
                        <EditEmail
                          profileData={profileData}
                          setProfileData={setProfileData}
                        />
                      ) : (
                        <Box>
                          <Text fontSize='md' fontWeight='bold' mb={2}>
                            Email
                          </Text>
                          <Text>{profileData?.email}</Text>
                        </Box>
                      )} */}
                      <Box>
                        <Text fontSize='md' fontWeight='bold' mb={2}>
                          Email
                        </Text>
                        <Text>{profileData?.email}</Text>
                      </Box>
                    </Box>
                    <Box
                      borderWidth='1px'
                      borderColor={"#848c74"}
                      borderRadius='md'
                      p={4}
                      mb={2}
                      bg={"#E9EDC9"}
                    >
                      {edit ? (
                        <EditPhone
                          profileData={profileData}
                          setProfileData={setProfileData}
                        />
                      ) : (
                        <Box>
                          <Text fontSize='md' fontWeight='bold' mb={2}>
                            Phone
                          </Text>
                          <Text>{profileData?.phoneNumber}</Text>
                        </Box>
                      )}
                    </Box>
                    <Box
                      borderWidth='1px'
                      borderColor={"#848c74"}
                      borderRadius='md'
                      p={4}
                      mb={2}
                      bg={"#E9EDC9"}
                    >
                      {edit ? (
                        <EditMajor
                          profileData={profileData}
                          setProfileData={setProfileData}
                        />
                      ) : (
                        <Box>
                          <Text fontSize='md' fontWeight='bold' mb={2}>
                            Major
                          </Text>
                          <Text>{profileData?.major}</Text>
                        </Box>
                      )}
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <UserPosts posts={posts} setPosts={setPosts} user={user} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Box>
        </Box>
        <Box display='flex' flexDirection='row'>
          <Box flex='4'>{/* Additional content */}</Box>
          <Box flex='8'>{/* Additional content */}</Box>
        </Box>
      </form>
      <Chatbot openChat={false} />
    </Box>
  );
};

const EditName = ({ profileData, setProfileData }) => {
  return (
    <FormControl>
      <Input
        id='name'
        type='name'
        // value={profileData?.firstName + " " + profileData?.lastName}
        value={profileData?.firstName}
        borderColor={"#cf2730"}
        _focus={{
          border: "1px solid #319795",
          zIndex: "1",
          boxShadow: "rgb(49, 151, 149) 0px 0px 0px 1px",
        }}
        onChange={(e) => {
          //   const fullName = e.target.value;
          //   const [first, last] = fullName.split(" ");
          //   setProfileData({ ...profileData, firstName: first, lastName: last });
          setProfileData({ ...profileData, firstName: e.target.value });
        }}
      />
    </FormControl>
  );
};

const EditEmail = ({ profileData, setProfileData }) => {
  return (
    <FormControl>
      <FormLabel htmlFor='email'>Email</FormLabel>
      <Input
        id='email'
        type='email'
        value={profileData?.email}
        borderColor={"#cf2730"}
        _focus={{
          border: "1px solid #319795",
          zIndex: "1",
          boxShadow: "rgb(49, 151, 149) 0px 0px 0px 1px",
        }}
        onChange={(e) =>
          setProfileData({ ...profileData, email: e.target.value })
        }
      />
    </FormControl>
  );
};

const EditPhone = ({ profileData, setProfileData }) => {
  return (
    <FormControl>
      <FormLabel htmlFor='email'>Phone</FormLabel>
      <Input
        id='email'
        type='email'
        value={profileData?.phoneNumber}
        borderColor={"#cf2730"}
        _focus={{
          border: "1px solid #319795",
          zIndex: "1",
          boxShadow: "rgb(49, 151, 149) 0px 0px 0px 1px",
        }}
        onChange={(e) =>
          setProfileData({ ...profileData, phoneNumber: e.target.value })
        }
      />
    </FormControl>
  );
};

const EditMajor = ({ profileData, setProfileData }) => {
  return (
    <FormControl>
      <FormLabel htmlFor='email'>Major</FormLabel>
      <Input
        id='email'
        type='email'
        value={profileData?.major}
        borderColor={"#cf2730"}
        _focus={{
          border: "1px solid #319795",
          zIndex: "1",
          boxShadow: "rgb(49, 151, 149) 0px 0px 0px 1px",
        }}
        onChange={(e) =>
          setProfileData({ ...profileData, major: e.target.value })
        }
      />
    </FormControl>
  );
};

const EditBio = ({ profileData, setProfileData }) => {
  return (
    <FormControl>
      <FormLabel htmlFor='bio'>Bio</FormLabel>
      <Input
        id='bio'
        type='bio'
        value={profileData?.bio}
        borderColor={"#cf2730"}
        _focus={{
          border: "1px solid #319795",
          zIndex: "1",
          boxShadow: "rgb(49, 151, 149) 0px 0px 0px 1px",
        }}
        onChange={(e) =>
          setProfileData({ ...profileData, bio: e.target.value })
        }
      />
    </FormControl>
  );
};

const EditServices = ({ profileData, setProfileData }) => {
  const serviceRef = useRef(null);

  const handleServiceClick = (e) => {
    if (serviceRef.current.value.length === 0) return;
    console.log(serviceRef.current.value.length);
    setProfileData({
      ...profileData,
      services: [...profileData.services, serviceRef.current.value],
    });

    serviceRef.current.value = "";
  };

  return (
    <FormControl>
      <Input
        id='email'
        type='email'
        borderColor={"#cf2730"}
        mb={2}
        ref={serviceRef}
        _focus={{
          border: "1px solid #319795",
          zIndex: "1",
          boxShadow: "rgb(49, 151, 149) 0px 0px 0px 1px",
        }}
      />
      <Button onClick={handleServiceClick} bg='#CCD5AE'>
        Add Service
      </Button>
    </FormControl>
  );
};

const UserPosts = ({ posts, setPosts, user }) => {
  // console.log("posts", posts, "user", user._id )
  const [pictures, setPictures] = useState([]);
  // const [posts, setPosts] = useContext(PostsContext);
  const [UserLikedPosts, setUserLikedPosts] = useState([]);
  // const { user, setUser } = useContext(UserContext);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPost, setSelectedPost] = useState(null);

  const [comment, setComment] = useState({
    commenter: user.firstName + " " + user.lastName,
    commenterPic: user.profilePictureURL,
  });

  // const [slider, setSlider] = useState<Slider | null>(null);
  const [slider, setSlider] = useState("");

  const [pageNumber, setPageNumber] = useState(0);

  //reporting stuff
  const [isOther, setIsOther] = useState(false);
  const [inputVal, setInputVal] = useState({
    //description: ""
  });
  const [report, setReport] = useState({
    // bidder: user.firstName + user.lastName,
  });

  //const ref = useRef(null);
  const apiURL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_UTRADEU_URL_PROD
      : process.env.REACT_APP_UTRADEU_URL_DEV;

  // Get all posts from backend/express.js
  useEffect(() => {
    axios
      .get(`${apiURL}/posts/page/${pageNumber}`)
      .then((response) => {
        setPosts(response.data.reverse());
      })
      .catch((error) => console.log(error));
  }, []);

  const fetchData = () => {
    setPageNumber(pageNumber + 1);
    axios
      .get(`${apiURL}/posts/page/${pageNumber}`)
      .then((response) => setPosts(posts.concat(response.data.reverse())))
      .catch((error) => console.log(error));
  };

  const sendReport = (e) => {
    onClose();
    if (e.target.value == "other") {
      setIsOther(true);
    } else {
      setIsOther(false);
    }

    axios
      .post(`${apiURL}/posts/report`, report)
      .then((response) => {})
      .catch((error) => console.log(error));
  };

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
    setComment({ ...comment, commentMessage: "" });
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
          .get(`${apiURL}/posts`)
          .then((response) => setPosts(response.data.reverse()))
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

  const handleOther = (e) => {
    if (e.target.value == "other") {
      setInputVal({
        reason: e.target.value,
      });
      setIsOther(true);
    } else {
      setIsOther(false);
    }
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
          .get(`${apiURL}/posts`)
          .then((response) => setPosts(response.data.reverse()))
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
          .get(`${apiURL}/posts`)
          .then((response) => setPosts(response.data.reverse()))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
  if (user === null || posts === null) {
    return <></>;
  }
  const filteredPosts = posts.filter((post) => post.user._id === user._id);
  return (
    <>
      {filteredPosts &&
        filteredPosts.map((post, index) => {
          const type = post.postType;
          const eventDate = new Date(post?.date);
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
              }
              boxShadow={"2xl"}
            >
              <Box
                // lineHeight={1.1}
                fontWeight={400}
                fontSize={"2xl"}
                //onClick={() => handleUserClick(post)}
              >
                <Flex>
                  <Link href={`/profile/${post?.user?._id}`} variant='profile'>
                    <Avatar
                      size={"sm"}
                      src={
                        post?.user &&
                        `${apiURL}/uploads/${post?.user?.profilePictureURL}`
                      }
                      marginTop={"4px"}
                      marginRight={"5px"}
                    />
                    {post?.user?.firstName + " "}
                    {post?.user?.lastName}
                  </Link>
                  <Spacer />

                  {post?.user?._id === user?._id && (
                    <Box>
                      <Button
                        colorScheme='red'
                        variant='outline'
                        p={3}
                        mt={"3px"}
                        mr={1}
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
                            Are you sure you want to delete this post? This
                            action cannot be undone.
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
                    }
                    color={
                      type === "event"
                        ? "#D4A373"
                        : type === "service"
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
                to={`/profile/${post?.user?._id}`}
                variant='profile'
              >
                {post?.user?.firstName}
              </Link> */}

              <SimpleGrid
                spacing={{ base: 5, md: 5 }}
                py={{ base: 18, md: 24 }}
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
                    marginTop={"-20"}
                  />
                </Flex>

                {/* icons */}
                <Flex marginBottom={"5px"}>
                  <ButtonGroup>
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
                  </ButtonGroup>
                  <Spacer />
                  {/* <Button
                    leftIcon={<FaEnvelope />}
                    onClick={() => sendDM(post?.user, post?.postTitle)}
                    bg={"#D4A373"}
                    color='white'
                    _hover={{ bg: "#FEFAE0", color: "#D4A373" }}
                  >
                    Message the Seller
                  </Button> */}
                </Flex>
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
                          eventDate.getMinutes()}
                      </Button>
                    )}
                  <Box>
                    {type === "auction" && "Auction Participants: "}
                    {post.auctionParticipants.map(d => (<li key={d.id}>{<Link href={`/profile/${d._id}`} variant='profile'>
                    {d.firstName + " "}
                    {d.lastName}
                    </Link>}</li>))} 
                  </Box>


                    {/* {type === "event" && eventDate.getMonth() + 1 + "-" + eventDate.getDate() + "-" + eventDate.getUTCFullYear() + " at " + eventDate.getHours() + ":" + eventDate.getMinutes()} */}
                    {/* </Button> */}
                  </Box>

                  {/* <Stack
                    spacing={{ base: 4, sm: 4 }}
                    direction={"column"}
                    divider={<StackDivider borderColor={"gray"} />}
                  >
                    direction={"column"}
                    divider={<StackDivider borderColor={"gray"} />}
                  >
                    <VStack spacing={{ base: 2, sm: 1 }}>
                      <Text fontSize={"lg"}>{post?.description}</Text>
                      <Text fontSize={"lg"}>{post?.description}</Text>
                    </VStack>
                  </Stack> */}

                  {/* comment begin */}
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
                            // src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                            src={
                              user &&
                              `${apiURL}/uploads/${comment.commenterPic}`
                            }
                            alt='Profile Picture'
                            size='sm'
                            mr={3}
                          />
                          <Box>
                            <Text fontWeight='semibold'>
                              {comment.commenter}
                            </Text>
                            <Text color='gray.500' fontSize='sm'>
                              {comment?.commentMessage}
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    ))}

                  <>
                    <Box
                      className='comment'
                      bg={"white"}
                      borderRadius={"xl"}
                      my={2}
                      p={3}
                      boxShadow={"sm"}
                      marginBottom={"-20"}
                    >
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
                          {window.screen.width < 960 && (
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
                          )}

                          {/* <InfiniteScroll
                            dataLength={posts.length} //This is important field to render the next data
                            next={fetchData}
                            hasMore={true}
                            // loader={<h4>Loading...</h4>}
                          ></InfiniteScroll> */}
                        </Box>
                      </Flex>
                    </Box>
                  </>
                </Stack>
              </SimpleGrid>
            </Container>
          );
        })}
    </>
  );
};

export default MyProfile;
