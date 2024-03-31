import React from 'react'
import {
  Stack,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Heading,
  Text,
  Container,
  Flex,
  Image,
  ButtonGroup,
  extendTheme,
  Icon,
  IconButton,
  Box,
  useDisclosure,
} from "@chakra-ui/react";

const Help = () => {
  return (
    <Box p={12} bg={'#FEFAE0'} pt={'60px'}>
      <Heading size='lg'>Your Profile</Heading>
      <Text>
        To create a UtradeU account, you must be a University of Utah student or
        alumni. This means possessing a valid email address that ends with
        “utah.edu.” We are restricting access to University of Utah affiliates
        for locality and safety. Since buyers / sellers will all be affiliated
        with the University of Utah, it is likely they’ll be located nearby Salt
        Lake City. Additionally, buyers and sellers can meet on campus for
        purchases for enhanced safety.
      </Text>
      
      <Text>
        Once you have signed in, you will have the ability to edit your profile
        information by clicking on your icon in the top right corner and
        clicking your name. From here, you will be taken to your profile page
        where you can view and fill out information about yourself.
      </Text>
      <Flex>
        <Image src="/images/tutorial1.jpg" w={'600px'} h={'auto'}></Image>
        <Image src="/images/tutorial2.jpg" w={'600px'} h={'auto'} pl={'20px'}></Image>
      </Flex>

      <Text>
        You can also view your own posts from here as well. If need be, you can
        remove your own posts to unlist an item by pushing the delete button.
      </Text>
      <Image src="/images/tutorial3.jpg" w={'600px'} h={'auto'}></Image>


      <Heading size='lg' pt={'15px'}>Creating a Post</Heading>

      <Text>
        From the home page, click on the “Create Post” button. A pop up will
        appear where you can fill in different information about the item,
        service, or event that you want to post. You are encouraged to provide
        an image as well, but it isn’t required. That simple!
      </Text>
      <Image src="/images/tutorial4.jpg" w={'600px'} h={'auto'}></Image>
      <Image src="/images/tutorial5.jpg" w={'900px'} h={'auto'}></Image>


      <Heading size='lg'>Browsing Items</Heading>

      <Text>
        There are multiple ways to go about finding something specific. You can
        start by using the search bar if there is something particular you have
        in mind. If you’re ideas are a bit more broad, use the filters on the
        left of the home page to select attributes you have in mind for your
        search.
      </Text>
      <Image src="/images/tutorial6.jpg" w={'600px'} h={'auto'}></Image>


      <Text pt={'10px'}>
        Once you’ve honed in on something you might be interested in purchasing,
        you can interact with the post further. Leave a comment to publicly
        inquire about the post or like to show support. You can also share the
        post to others via a link.
      </Text>
      <Image src="/images/tutorial7.jpg" w={'380px'} h={'auto'}></Image>


      <Heading size='lg'>Messaging Others</Heading>

      <Text>
        If you are interested in buying an item, message the seller to let them
        know! Clicking on the “Message Seller” button will take you to our chat
        page, where you can talk pick up logistics, inquire on the post, or even
        whip out your masterclass negotiation skills.
      </Text>
      <Flex>
      <Image src="/images/tutorial8.jpg" w={'350px'} h={'auto'}></Image>
      <Image src="/images/tutorial9.jpg" w={'750px'} h={'420px'} pl={'20px'}></Image>
      </Flex>


    </Box>
  );
}

export default Help