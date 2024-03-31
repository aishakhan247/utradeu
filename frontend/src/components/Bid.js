import React, { useContext, useState } from "react";
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
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberDecrementStepper,
    NumberIncrementStepper,
    Flex,
    Textarea,
    Box,
    Text,
    Heading,
    useDisclosure,
    Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { FaDollarSign } from "react-icons/fa";
import { PostsContext } from "./PostsContext";
import { UserContext } from "../context/userContext";

const apiURL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_UTRADEU_URL_PROD
      : process.env.REACT_APP_UTRADEU_URL_DEV;


const Bid = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [posts, setPosts] = useContext(PostsContext);
    const { user, setUser } = useContext(UserContext);
    const [bid, setBid] = useState({
        bidder: user.firstName + user.lastName,
    });

    const handleBid = (e) => {
        console.log(bid);
        axios
            .post(`${apiURL}/posts/placeBid`, bid)
            .then((response) => {
                axios
                    .get(`${apiURL}/posts/auctions`)
                    .then((response) => setPosts(response.data.reverse()))
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        setBid({ price: "" });
    };

    // {posts &&
    //     posts.map((post) => {

    return (
        <>
            <Button
                leftIcon={<FaDollarSign />}
                onClick={onOpen}
                bg={"#D4A373"}
                color='white'
                _hover={{ bg: "#FEFAE0", color: "#D4A373" }}
            >
                Place a Bid
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>

                    <ModalHeader>Current Bid: $6</ModalHeader>
                    <ModalHeader>Your Bid:</ModalHeader>
                    
                    <Stack paddingRight={'30px'} paddingLeft={'20px'}>
                        <NumberInput size={'sm'} min={6} defaultValue={6}
                            value={bid.price}
                            onChange={(e) =>
                                setBid({
                                    ...bid,
                                    price: e.target.value,
                                    // postID: post._id,
                                    // userID: post.user._id,
                                })
                            }>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </Stack>
                    <ModalCloseButton />

                    <ModalFooter>
                        {/* post.auctionParticipants  post.auctionBids  post.auctionEnd  post.price */}
                        <Button bg={'#D4A373'} mr={3} onClick={onClose} color={'white'}>
                            Place Bid
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
                    //     } )
                    // }
};

export default Bid;
