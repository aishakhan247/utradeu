import {
  HStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  Flex,
  Stack,
  Container,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { auth } from "../../../firebaseConfig";
import { router } from "next/router";
import { useRef } from "react";
import { useToast } from "@chakra-ui/react";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const emailRef = useRef(null);
  const toast = useToast();

  const isValidEmail = (email) => {
    // should be a valid email with @ and .
    const regexp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email.toLowerCase());
  };

  const handleSubmit = async () => {
    const email = emailRef.current.value;
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

    const baseUrl = process.env.APP_BASE_URL || "http://localhost:3000";
    const actionCodeSettings = {
      url: `${baseUrl}/login`,
      handleCodeInApp: false,
    };

    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      alert("Check your email for password reset info.");
      router.push("/login");
    } catch (e) {
      if (e.code === "auth/user-not-found") {
        toast({
          title: "Invalid Email",
          description:
            "Email not found. Please check the email address and try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Sorry",
          description:
            "An error occurred while sending the password reset email.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        console.log(e);
      }
    }
  };


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
                    ref={emailRef}
                    type='email'
                    _focus={{
                      border: "1px solid #319795",
                      zIndex: "1",
                      boxShadow: "rgb(49, 151, 149) 0px 0px 0px 1px",
                    }}
                  />
                </FormControl>
                <Button colorScheme='teal' onClick={handleSubmit}>
                  Reset Password
                </Button>
                <Button colorScheme='teal' onClick={() => router.push("/login")}>
                  Go Back
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Flex>
  );
};

export default ForgotPassword;
