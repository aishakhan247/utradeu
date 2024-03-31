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
} from "@chakra-ui/react";
import { PasswordField } from "./PasswordField";
import { useToast } from "@chakra-ui/react";

const Signup = (props) => {
  const { formData, setFormData, step, setStep } = props;
  const toast = useToast();

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

  const handleSignup = (e) => {
    if (formData.email === "" || formData.password === "") {
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
    if (!isValidEmail(formData.email)) {
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
    if (!isValidPassword(formData.password)) {
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

    setStep(1);
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
          >
            <Stack spacing='6'>
              <Stack spacing='5'>
                <FormControl>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <Input
                    id='email'
                    type='email'
                    value={formData?.email}
                    _focus={{
                      border: "1px solid #319795",
                      zIndex: "1",
                      boxShadow: "rgb(49, 151, 149) 0px 0px 0px 1px",
                    }}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </FormControl>
                <PasswordField
                  name='Password'
                  formData={formData}
                  setFormData={setFormData}
                  isSignup={true}
                />
              </Stack>
              <Stack spacing='6'>
                <Button colorScheme='teal' onClick={handleSignup}>
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Flex>
  );
};

export default Signup;
