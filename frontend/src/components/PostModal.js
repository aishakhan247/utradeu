import React, { useContext } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  FormControl,
  ModalBody,
  FormLabel,
  ModalFooter,
  Input,
  Flex,
  Textarea,
  Box,
  Text,
  Heading,
  RadioGroup,
  Stack,
  Radio,
  Grid,
  IconButton,
  Tooltip,
  Link,
  VStack,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Image,
  Select,
  Checkbox,
  Show,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { MdShoppingCart, MdBuild, MdEvent } from "react-icons/md";
import { useState, useRef } from "react";
import { IoTrashOutline } from "react-icons/io5";
import axios from "axios";
import { FaPlusSquare } from "react-icons/fa";
import { UserContext } from "../context/userContext";
import { PostsContext } from "./PostsContext";



const PostModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedNav, setSelectedNav] = useState("item");
  const { user, setUser } = useContext(UserContext);
  const [postData, setPostData] = useState({ user: user });
  const [posts, setPosts] = useContext(PostsContext);
  const apiURL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_UTRADEU_URL_PROD
      : process.env.REACT_APP_UTRADEU_URL_DEV;
  // postType: "item",
  // category: null,
  // price: null,
  // payRate: null,
  // quality: null,
  // year: null,
  // location: null,
  // postTitle: null,
  // description: null,
  // imageURLs: [],

  const handleFileChange = (event) => {
    const files = event.target.files;
    // setPostData({...postData, demo_image: files[0], pictureURL: files[0].filename});
    setPostData({ ...postData, demo_image: files });
    setSelectedFiles([...selectedFiles, ...files]);
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (event) => {
        urls.push(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = (fileIndex) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(fileIndex, 1);
    setSelectedFiles(updatedFiles);
  };

  const handlePostClick = () => {
    if (postData == null) {
      return;
    }

    const temp = new FormData();
    // temp.append('demo_image', postData.demo_image);


    if (postData.demo_image) {
      for (var i = 0; i < postData.demo_image.length; i++) {
        temp.append("demo_image", postData.demo_image[i])
      }
    }
    temp.append("postData", JSON.stringify(postData));
    axios
      .post(`${apiURL}/posts/createPost`, temp)
      .then((response) => {
        onClose();
        setPostData({ user: user });
        setSelectedFiles([]);
        // rerender when new post created
        axios
          .get(`${apiURL}/posts`)
          .then((response) => setPosts(response.data.reverse()))
          .catch((error) => console.log(error));
      }) // close modal and clear fields
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Box>
        <Button
          onClick={onOpen}
          leftIcon={<FaPlusSquare />}
          bg={"#D4A373"}
          colorScheme='blackAlpha'
        >
          Create Post
        </Button>
      </Box>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={"2xl"}
      >
        <ModalOverlay
          bg='none'
          backdropFilter='auto'
          backdropInvert='20%'
          backdropBlur='1px'
        />
        <ModalContent>
          <ModalHeader alignSelf={"center"}>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={2}>
            {/* Navbar */}
            <Flex
              as='nav'
              bg='white'
              p={4}
              px={{base: "none", md: "8rem"}}
              color='white'
              alignItems='center'
              justifyContent='space-between'
              boxShadow='md'
            >
              <Button
                variant='ghost'
                _hover={{ bg: "gray.300" }}
                bg={selectedNav === "item" ? "gray.300" : "white"}
                onClick={() => {
                  // clear fields and start new post
                  if (selectedNav !== "item") {
                    setPostData({ user: user });
                  }
                  if (selectedNav !== "item") {
                    setSelectedNav("item");
                  }
                  setPostData({ ...postData, postType: "item" });
                }}
              >
                <Flex align={"center"}>
                  <MdShoppingCart color='black' />
                  <Box ml={2}>Item</Box>
                </Flex>
              </Button>

              <Button
                variant='ghost'
                _hover={{ bg: "gray.300" }}
                bg={selectedNav === "service" ? "gray.300" : "white"}
                onClick={() => {
                  // clear fields and start new post
                  if (selectedNav !== "service") {
                    setPostData({ user: user });
                  }
                  if (selectedNav === "service") {
                    setSelectedNav("item");
                  } else {
                    setSelectedNav("service");
                  }
                  setPostData({ ...postData, postType: "service" });
                }}
              >
                <Flex align={"center"}>
                  <MdBuild />
                  <Box ml={2}>Service</Box>
                </Flex>
              </Button>

              <Button
                variant='ghost'
                _hover={{ bg: "gray.300" }}
                bg={selectedNav === "event" ? "gray.300" : "white"}
                onClick={() => {
                  // clear fields and start new post
                  if (selectedNav !== "event") {
                    setPostData({ user: user });
                  }
                  if (selectedNav === "event") {
                    setSelectedNav("item");
                  } else {
                    setSelectedNav("event");
                  }
                  setPostData({ ...postData, postType: "event" })
                }}
              >
                <Flex align={"center"}>
                  <MdEvent color='black' size={"1.3rem"} />
                  <Box ml={2}>Event</Box>
                </Flex>
              </Button>
            </Flex>

            {/* Form */}
            {selectedNav === "item" ? (
              <ItemForm
                initialRef={initialRef}
                postData={postData}
                setPostData={setPostData}
              />
            ) : selectedNav === "service" ? (
              <ServiceForm
                initialRef={initialRef}
                postData={postData}
                setPostData={setPostData}
              />
            ) : (
              <EventForm
                initialRef={initialRef}
                postData={postData}
                setPostData={setPostData}
              />
            )}
          </ModalBody>

          <ModalFooter>
            <VStack align={"flex-end"}>
              <Flex align={"center"}>
                <Tooltip label='Photo' placement='top'>
                  <Box mr={2}>
                    <label htmlFor='upload-photo'>
                      <Image
                        src='https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png'
                        alt='Upload Image'
                        cursor='pointer'
                        boxSize={6}
                      />
                    </label>
                    <Box display='none'>
                      <Input
                        type='file'
                        accept='image/*'
                        id='upload-photo'
                        multiple
                        onChange={handleFileChange} // Handle file input change
                      />
                    </Box>
                  </Box>
                </Tooltip>
                {/* <a href="/home">  */}
                <Button bg={"#D4A373"} color={"white"} onClick={handlePostClick}>
                  Post
                </Button>
                {/* </a> */}
              </Flex>

              <Flex flexWrap={"wrap"}>
                {selectedFiles.map((file, index) => (
                  <Flex key={index} alignItems='center'>
                    <Box>{file.name}</Box>
                    <IconButton
                      bg={"white"}
                      ml={2}
                      aria-label='Remove file'
                      icon={<IoTrashOutline color={"red"} />}
                      onClick={() => handleRemoveFile(index)}
                    />
                  </Flex>
                ))}
              </Flex>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const ItemForm = ({ initialRef, postData, setPostData }) => {
  const isAuction = false;
  const ref = useRef(null);
  const [isChecked, setIsChecked] = useState(false);
  // console.log(postData?.postType);
  const handleChecked = (e) => {
    const check = e.target.value;
    if(check === true) {
      setPostData({ ...postData, postType: 'item' });
      
    } else {
      
      setPostData({ ...postData, postType: 'auction' });
    } 
    setIsChecked(current => !current);
  }
  return (
    <Box mt={3}>
      <Flex mt={2}>
        <FormControl>
          <Checkbox
            ref={ref}
            value={isChecked}
            onChange={handleChecked}
            >This is an Auction Item</Checkbox>
        </FormControl>
      </Flex>

      <Flex mt={3}>
        <FormControl mr={2}>
          <FormLabel>Category</FormLabel>
          <Select
            ref={initialRef}
            placeholder='Select option'
            value={postData?.category}
            onChange={(e) =>
              setPostData({ ...postData, category: e.target.value })
            }
          >
            <option value='appliances'>Appliances</option>
            <option value='books'>Books</option>
            <option value='clothing'>Clothing</option>
            <option value='electronics'>Electronics</option>
            <option value='fitness'>Fitness</option>
            <option value='furniture'>Furniture</option>
            <option value='home'>Home</option>
            <option value='outdoors'>Outdoors</option>
            <option value='tickets'>Tickets</option>
            <option value='other'>Other</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>{isChecked ? 'Starting Bid' : 'Price'}</FormLabel>
          <Flex verticalAlign={'center'}>
            <Text fontSize={'23px'} marginRight={'4px'}>$</Text>
            <Input
              placeholder='10'
              value={postData?.price}
              onChange={(e) =>
                setPostData({ ...postData, price: e.target.value, startingBid: e.target.value })
              }
            />
          </Flex>
        </FormControl>
      </Flex>

      <Flex mt={2}>
        <FormControl mr={2}>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder='Title'
            value={postData?.postTitle}
            onChange={(e) =>
              setPostData({ ...postData, postTitle: e.target.value })
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Quality</FormLabel>
          <RadioGroup
            pt={"0.5rem"}
            value={postData?.quality}
            onChange={(e) => setPostData({ ...postData, quality: e })}
          >
            <Stack direction='row'>
              <Radio value='new'>New</Radio>
              <Radio value='fair'>Good</Radio>
              <Radio value='okay'>Fair</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      </Flex>

      <Flex mt={2}>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder='Description'
            size='md'
            resize={"none"}
            minHeight={"110px"}
            value={postData?.description}
            onChange={(e) =>
              setPostData({ ...postData, description: e.target.value })
            }
          />
        </FormControl>
      </Flex>

      <Flex mt={2}>
        <FormControl hidden={isChecked ? false : true}>
          <Show isChecked>
          <Text>End Date:</Text>
        <Input
            type="datetime-local"
            value={postData?.auctionEnd}
            onChange={(e) =>
              setPostData({ ...postData, auctionEnd: e.target.value })
            }
          />
          </Show>
        </FormControl>
      </Flex>
    </Box>
  );
};

const ServiceForm = ({ initialRef, postData, setPostData }) => {
  return (
    <Box>
      <Flex mt={3}>
        <FormControl mr={2}>
          <FormLabel>Category</FormLabel>
          {/* <Input
            ref={initialRef}
            placeholder='Tutoring'
            value={postData?.category}
            onChange={(e) =>
              setPostData({ ...postData, category: e.target.value })
            }
          /> */}
          <Select
            ref={initialRef}
            placeholder='Select option'
            value={postData?.category}
            onChange={(e) =>
              setPostData({ ...postData, category: e.target.value })
            }
          >
            <option value='health'>Health/Wellness</option>
            <option value='labor'>Labor</option>
            <option value='pets'>Pets</option>
            <option value='tech'>Tech</option>
            <option value='tutoring'>Tutoring/Lessons</option>
            <option value='other'>Other</option>

          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Pay Rate</FormLabel>
          <Input
            placeholder='$10 per session/hour'
            value={postData?.payRate}
            onChange={(e) =>
              setPostData({ ...postData, payRate: e.target.value })
            }
          />
        </FormControl>
      </Flex>

      <Flex mt={2}>
        <FormControl mr={2}>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder='Title'
            value={postData?.postTitle}
            onChange={(e) =>
              setPostData({ ...postData, postTitle: e.target.value })
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Year</FormLabel>
          <RadioGroup
            pt={"0.5rem"}
            value={postData?.year}
            onChange={(e) => setPostData({ ...postData, year: e })}
          >
            <Stack direction='row'>
              <Radio value='freshman'>Freshman</Radio>
              <Radio value='sophomore'>Sophomore</Radio>
              <Radio value='junior'>Junior</Radio>
              <Radio value='senior'>Senior</Radio>
              <Radio value='senior'>Alum</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      </Flex>

      <Flex mt={2}>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder='Description'
            size='md'
            resize={"none"}
            minHeight={"110px"}
            value={postData?.description}
            onChange={(e) =>
              setPostData({ ...postData, description: e.target.value })
            }
          />
        </FormControl>
      </Flex>
    </Box>
  );
};

const EventForm = ({ initialRef, postData, setPostData }) => {
  return (
    <Box>
      <Flex mt={3}>
        <FormControl mr={2}>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder='Title'
            value={postData?.postTitle}
            onChange={(e) =>
              setPostData({ ...postData, postTitle: e.target.value })
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Category</FormLabel>
          <Select
            ref={initialRef}
            placeholder='Select option'
            value={postData?.category}
            onChange={(e) =>
              setPostData({ ...postData, category: e.target.value })
            }
          >
            <option value='arts'>Arts/Music</option>
            <option value='athletics'>Athletics</option>
            <option value='cultural'>Cultural</option>
            <option value='fundraising'>Fundraising</option>
            <option value='business'>Group Business</option>
            <option value='learning'>Learning</option>
            <option value='service'>Service</option>
            <option value='social'>Social</option>
            <option value='spirituality'>Spirituality</option>

          </Select>
        </FormControl>
      </Flex>

      <Flex mt={2}>
        <FormControl mr={2}>
          <FormLabel>Date/Time</FormLabel>
          <Input
            type="datetime-local"
            value={postData?.date}
            onChange={(e) =>
              setPostData({ ...postData, date: e.target.value })
            }
          />

        </FormControl>

        <FormControl mr={2}>
          <FormLabel>Price</FormLabel>
          <Input
            placeholder='$0'
            value={postData?.price}
            onChange={(e) =>
              setPostData({ ...postData, price: e.target.value })
            }
          />

        </FormControl>


      </Flex>

      <Flex mt={2}>
        <FormControl>
          <FormLabel>Location</FormLabel>
          <Input
            placeholder='Union Ballroom'
            value={postData?.location}
            onChange={(e) =>
              setPostData({ ...postData, location: e.target.value })
            }
          />
        </FormControl>
      </Flex>

      <Flex mt={2}>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder='Description'
            size='md'
            resize={"none"}
            minHeight={"110px"}
            value={postData?.description}
            onChange={(e) =>
              setPostData({ ...postData, description: e.target.value })
            }
          />
        </FormControl>
      </Flex>
    </Box>
  );
};

export default PostModal;
