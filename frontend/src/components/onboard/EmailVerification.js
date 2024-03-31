import React from "react";
import { Box, Heading, Text, Link, Flex } from "@chakra-ui/react";

const EmailVerification = () => {
  return (
    <Flex align='center' justify='center' minH='100vh' bg='gray.100'>
      <Box
        p='4'
        borderWidth='1px'
        borderRadius='md'
        bg='white'
        boxShadow='md'
        maxW='md'
        w='100%'
        textAlign='center'
      >
        <Heading size='lg' mb='4'>
          Email Verification
        </Heading>
        <Text fontSize='lg' color='gray.600' mb='4'>
          Please verify your email by visiting the link sent to your email.
        </Text>
        {/* <Link color='blue.500' href='#'>
          Resend verification email
        </Link> */}
      </Box>
    </Flex>
  );
};

export default EmailVerification;
