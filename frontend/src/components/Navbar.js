import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Links = ["Home", "Chat", "Auction", "About"];

const NavLink = (props) => {
  const { children } = props;

  return (
    <Box
      as='a'
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        //bg: useColorModeValue('#ccd4ad', '#f6ebce'),
        // bg: '#FEFAE0',
        color: "#FEFAE0",
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { user, setUser } = useContext(UserContext);
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast({
      title: "Success",
      description: `Logged out successfully`, // Display the server's error message
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    // navigate("/login");
  };

  const apiURL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_UTRADEU_URL_PROD
      : process.env.REACT_APP_UTRADEU_URL_DEV;

  return (
    <>
      {/* bg={useColorModeValue("gray.100", "gray.900")} */}
      <Box
        bg={"#848c74"}
        pr={4}
        pl={2}
      >
        <Flex h={12} alignItems={"center"} justifyContent={"space-between"}>
          <Box display={{ md: "none" }}>
            <IconButton
              aria-label='Search database'
              icon={isOpen ? <FaTimes /> : <FaBars />}
              onClick={isOpen ? onClose : onOpen}
            />
          </Box>
          <HStack spacing={4} alignItems={"center"}>
            <Link to='/home'>
              <Image
                src='/utradeulogo.svg'
                alt='logo 2'
                w={{ base: "50px", md: "50px", lg: "50px" }}
                paddingLeft={"5px"}
                cursor={"pointer"}
              />
            </Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <Link
                  to={`/${link.toLowerCase()}`}
                  _hover={{
                    textDecoration: "underline",
                    color: "#FEFAE0",
                    //bg: "#FEFAE0", // Background color on hover
                  }}
                >
                  {link}
                </Link>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={user && `${apiURL}/uploads/${user.profilePictureURL}`}
                />
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Link
                    class='nav-link active'
                    to={`/myprofile/${user?.firstName}`}
                    variant='myprofile'
                  >
                    {user ? `${user.firstName} ${user.lastName}` : "Profile"}
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    class='nav-link active'
                    to='/login'
                    variant='access'
                    onClick={handleLogout}
                  >
                    Log Out
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <Link to={`/${link.toLowerCase()}`}>{link}</Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
