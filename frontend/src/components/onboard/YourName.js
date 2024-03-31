import React from "react";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  Flex,
  Spinner
} from "@chakra-ui/react";
// import router from "next/router";
import { useToast } from "@chakra-ui/react";
// import { UserAuth } from "@/context/AuthContext";
import { useState } from "react";
import axios from "axios";  
import { useNavigate } from "react-router-dom";


const YourName = (props) => {
  const { formData, setFormData, step, setStep } = props;
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiURL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_UTRADEU_URL_PROD
      : process.env.REACT_APP_UTRADEU_URL_DEV;

  const handleCreate = () => {

    if (formData.firstName === "" || formData.lastName === "") {
      toast({
        title: "Attention",
        description: "First Name and Last Name cannot be empty!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setLoading(true);
    axios
      .post(`${apiURL}/profile/register`, formData)
      .then((response) => {
        setLoading(false);
        setFormData(null);
        const responseData = response.data;
        toast({
          title: "Success",
          description: `${responseData}`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate("/emailverification");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          // The request was made, and the server responded with a status code
          const responseData = error.response.data;

          toast({
            title: "Attention",
            description: `${responseData}`, // Display the server's error message
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        } else if (error.request) {
          // The request was made but no response was received (e.g., network error)
          toast({
            title: "Attention",
            description: "Network error. Please try again later.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        } else {
          // Something happened in setting up the request or handling the response
          toast({
            title: "Attention",
            description: "An error occurred. Please try again later.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      });
    }

  if (loading) {
    return (
      <Flex justifyContent='center' alignItems='center' height='100%'>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Flex>
    );
  }

  return (
    <Flex justifyContent='center' alignItems='center' height='100%'>
      <Container
        justifyContent='center'
        alignItems='center'
        fontFamily={"Spline Sans Variable,-apple-system,system-ui,sans-serif"}
        maxW='lg'
        py={{ base: "12", md: "2" }}
        px={{ base: "0", sm: "8" }}
      >
        <Stack spacing='8'>
          <Stack spacing='6'>
            <Stack spacing={{ base: "2", md: "3" }} textAlign='center'>
              <Heading fontSize={{ base: "2xl", md: "3xl" }}>Sign Up</Heading>
              <Text color='grey'>
                Have an account?{" "}
                <Link color='teal' href='/login'>
                  Sign in
                </Link>
              </Text>
            </Stack>
          </Stack>
          <Box
            py={{ base: "0", sm: "12" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg.surface" }}
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "xl" }}
            transition='transform 0.6s'
          >
            <Stack spacing='6'>
              <Stack spacing='5'>
                <FormControl>
                  <FormLabel htmlFor='firstName'>First Name</FormLabel>
                  <Input
                    id='firstName'
                    value={formData?.firstName}
                    type='text'
                    _focus={{
                      border: "1px solid #319795",
                      zIndex: "1",
                      boxShadow: "rgb(49, 151, 149) 0px 0px 0px 1px",
                    }}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='lastName'>Last Name</FormLabel>
                  <Input
                    id='lastName'
                    value={formData?.lastName}
                    type='text'
                    _focus={{
                      border: "1px solid #319795",
                      zIndex: "1",
                      boxShadow: "rgb(49, 151, 149) 0px 0px 0px 1px",
                    }}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </FormControl>
              </Stack>
              <HStack>
                <Button colorScheme='teal' flex={1} onClick={() => setStep(0)}>
                  Back
                </Button>
                <Button colorScheme='teal' flex={1} onClick={handleCreate}>
                  Create
                </Button>
              </HStack>
              <Stack spacing='6'>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Flex>
  );
};

export default YourName;
