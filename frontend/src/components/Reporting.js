import React, { useContext, useState } from "react";
import axios from "axios";

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
    useDisclosure,
    Icon
} from "@chakra-ui/react";
import { FaFlag } from "react-icons/fa";

const apiURL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_UTRADEU_URL_PROD
      : process.env.REACT_APP_UTRADEU_URL_DEV;


const Reporting = ({postId}) => {
    // const { children } = props;
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedPost, setSelectedPost] = useState(null);
    const [isOther, setIsOther] = useState(false);
    const [inputVal, setInputVal] = useState({
        //description: ""
    });
    const [report, setReport] = useState({
        // bidder: user.firstName + user.lastName,
    });

    const handleReport = (post) => {
        console.log(post);
        setSelectedPost(post);
        onOpen();
    }
    

    const handleOther = (e) => {
        setInputVal({
            reason: e.target.value,
        });
        // if (e.target.value == "other") {
            
        //     setIsOther(true);
        // } else {
        //     setIsOther(false);
        // }
    };

    const sendReport = (e) => {
        onClose()
        if (e.target.value == "other") {
            setIsOther(true);
        } else {
            setIsOther(false);
        }
        const reason = inputVal.reason;

        console.log("postId " + postId);
        console.log("reason " + inputVal.reason);

        axios
            .post(`${apiURL}/posts/report`, {postId, reason})
            .then((response) => {
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <Button onClick={onOpen} bg={"#CCD5AE"} color={"#838870"} w={'10px'}>
                <Icon
                    as={FaFlag}
                    _hover={{ bg: "#FEFAE0" }}
                // onClick={onOpen}
                />

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Why are you reporting this post?</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <RadioGroup defaultValue="item">
                                <Stack pl={6} spacing={1}>
                                    <Radio value="Spam" onChange={handleOther}>Spam</Radio>
                                    <Radio value="Sale of Illegal Goods" onChange={handleOther}>Sale of Illegal Goods</Radio>
                                    {/* <Radio value="Sale of Illegal Goods" onChange={handleOther}>Sale of Illegal Goods</Radio> */}
                                    <Radio value="Fraud" onChange={handleOther}>Fraud</Radio>
                                    <Radio value="False Information" onChange={handleOther}>False Information</Radio>
                                    <Radio value="Bullying or Harassment" onChange={handleOther}>Bullying or Harassment</Radio>
                                    <Radio value="Inappropriate Content" onChange={handleOther}>Inappropriate Content</Radio>
                                    <Radio value="This User is Impersonating Me" onChange={handleOther}>This User is Impersonating Me</Radio>
                                    <Radio value="Other" onChange={handleOther}>Other</Radio>
                                    <FormControl hidden={isOther ? false : true}>
                                        <Text pl={'15px'}>Please Specify:</Text>
                                        <Input pl={'15px'} />
                                    </FormControl>
                                </Stack>
                            </RadioGroup>

                        </ModalBody>

                        <ModalFooter>
                            <Button bg={"#D4A373"} mr={3} color={"white"} onClick={sendReport}>
                                Report
                            </Button>
                            <Button variant='ghost' onClick={onClose}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Button>
            {/* </Icon> */}

        </>
    )
}

export default Reporting;