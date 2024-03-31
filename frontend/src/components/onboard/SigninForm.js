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
  SkeletonText,
  SkeletonCircle,
  Spinner,
} from "@chakra-ui/react";
import { PasswordField } from "./PasswordField";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
// import { UserAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";


const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);



  const isValidEmail = (email) => {
    // should be a valid email with @ and .
    const regexp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email.toLowerCase());
  };

  const isValidPassword = (password) => {
    // should be at least 6 characters long
    return password.length >= 6;
  };

  const apiURL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_UTRADEU_URL_PROD
      : process.env.REACT_APP_UTRADEU_URL_DEV;

  const handleSignin = () => {
    if (email === "" || password === "") {
      toast({
        title: "Attention",
        description: "Email and password cannot be empty!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (!isValidEmail(email)) {
      toast({
        title: "Attention",
        description: "Your email is not valid!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (!isValidPassword(password)) {
      toast({
        title: "Attention",
        description: "Your password should be at least 6 characters long!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setLoading(true);
    const formData = {
        email: email,
        password: password,
    };
    axios
      .post(`${apiURL}/profile/login`, formData)
      .then((response) => {
        setLoading(false);
        setEmail("");
        setPassword("");
        localStorage.setItem("token", response.data.token);
        toast({
          title: "Success",
          description: "login successful",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        // window.location.reload();
        setUser(response.data.user);
        console.log("login user: ", response.data.user);
        navigate("/home");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          const responseData = error.response.data;
          toast({
            title: "Attention",
            description: `${responseData}`, // Display the server's error message
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      });
    }



    // fetch("/api/auth/login", {
    //   method: "POST",
    //   body: JSON.stringify({ email, password }),
    //   headers: {
    //     "content-type": "application/json",
    //   },
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //     //   router.push("/chat");
    //       return response.json();
    //     }
    //     toast({
    //       title: "Attention",
    //       description: "Incorrect email or password!",
    //       status: "error",
    //       duration: 3000,
    //       isClosable: true,
    //       position: "top",
    //     });
    //     setLoading(false);
    //     // throw new Error(message);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
//   };


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
              <Heading fontSize={{ base: "2xl", md: "3xl" }}>
                Log in to your account
              </Heading>
              <Text color='grey'>
                Dont have an account?{" "}
                <Link color='teal' href='/register'>
                  Sign up
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
          >
            <Stack spacing='6'>
              <Stack spacing='5'>
                <FormControl>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <Input
                    id='email'
                    type='email'
                    _focus={{
                      border: "1px solid #319795",
                      zIndex: "1",
                      boxShadow: "rgb(49, 151, 149) 0px 0px 0px 1px",
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <PasswordField
                  name='Password'
                  isSignup={false}
                  setPassword={setPassword}
                />
              </Stack>
              {/* <HStack justify='space-between'>
                <Checkbox defaultChecked colorScheme='teal'>
                  Remember me
                </Checkbox>
                <Button paddingRight={0} color='teal' variant='text' size='sm' onClick={() => router.push("/forgotPassword")}>
                  Forgot password?
                </Button>
              </HStack> */}
              <Stack spacing='6'>
                <Button colorScheme='teal' onClick={handleSignin}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Flex>
  );
};

export default Signin;
