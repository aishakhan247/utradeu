import axios from "axios";
import { useEffect, useState, useContext, ChangeEvent, FormEvent } from "react";
import { PostsContext } from "./PostsContext";
import {
  FaFilter,
  FaGripHorizontal,
  FaListAlt,
  FaPlusSquare,
  FaSearch,
} from "react-icons/fa";
import {
  Stack,
  HStack,
  VStack,
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
  Link,
  Divider,
  Collapse,
} from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

const peopleData = [
  {
    name: "Aisha Khan",
    imageSrc: "/images/aisha.jpg",
    bio: "Hi! My name is Aisha Khan, I am an undergraduate student at the University of Utah getting my Bachelor’s degree in Computer Science, with a minor in Animation. Throughout my college experience, I became interested in web development which sparked my desire to work as a frontend developer for UtradeU.  I am currently a student developer at ServiceNow, working for the University's campus IT department. We utilize scripting to automate processes and improve efficiency for the University's service management software. In my future career, I would love to incorporate my passion for design and animation into computer programming. I want to develop my skills to become a better engineer, leveraging my technical and artistic talents to build products people love using. Other than beep bopping, I enjoy puzzling, crocheting, hiking, and spending time with my foster cats.",
    email: "aisha047@gmail.com",
    linkedin: "https://www.linkedin.com/in/aishakhan047/",
    website: "",
  },
  {
    name: "Cameron Hanney",
    imageSrc: "/images/cameron1.png",
    bio: "Hello! My name is Cameron Hanney, I am an Honor’s Computer Science undergraduate student. I worked as a backend developer for UtradeU, an online marketplace for University of Utah students aimed to reduce wastes and costs. I worked as a Software Development Intern for Amazon Web Services during both summers of 2022 and 2023. The team I was placed on both years focused on computer networking. I led two different projects to help collect information to analyze network efficiency. AI, data structures, and algorithms have always interested me from the start of my undergraduate career. In my free time, I enjoy hiking and cooking, preferably at the same time.",
    email: "cameronkhanney@gmail.com",
    linkedin: "",
    website: "",
  },
  {
    name: "Jacob Day",
    imageSrc: "/images/jacob.jpg",
    bio: "Hey everyone! I’m Jacob Day, and I’m an undergrad at the University of Utah studying computer science! I am a backend developer for the UtradeU project, which is an online, on-campus marketplace with the goal of reducing waste by promoting the selling of used goods. Some other projects I’ve done are a Rubik’s Cube Tutorial built with QtCreator, and a fitness tracker for android devices. In my free time I like to hang out with my friends and family, or play games online with friends. I’ve always been interested in how computers work, I love learning new technologies and how to make technologies easier to use for other people! ",
    email: "day.jacob@live.com",
    linkedin: "https://www.linkedin.com/in/jacob-m-day/",
    website: "",
  },
  {
    name: "Nasser Mughrabi",
    imageSrc: "/images/nasser.jpg",
    bio: "Hello there! My name is Nasser Mughrabi and I am a Computer Science undergraduate student. I worked as a frontend developer for UtradeU. I completed an internship as a software engineer at Amotions Inc. during the summer of 2023. In addition to being certified as an AWS Cloud Practitioner, I enjoy learning and utilizing modern technologies in AI, full-stack development, and cloud engineering. Check out my portfolio where you can learn more about both my professional work and personal projects.",
    email: "mughrabi.nasser@gmail.com",
    linkedin: "https://www.linkedin.com/in/nasser258/",
    website: "https://www.nassermughrabi.com/",
  },
];

const About = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  // if (isMobile) {
  //   return <Mobile />;
  // }
  return (
    <>
      <Box pt={"75px"} px={{ base: 6, md: "75px", lg: "75px" }} bg={"#FEFAE0"}>
        <Box textAlign='center' pb={6}>
          <Heading size='xl'>
            Welcome to UtradeU! We’re stoked you’re here.
          </Heading>
          <Divider mt={2} />
          <Text>
            UtradeU provides University of Utah students a marketplace to sell
            their unwanted items and buy supplies they will need for their
            college careers. Initially, we only considered the sale of textbook
            school suppiles: stationery, electronics, and well … textbooks. As
            our project developed, we saw even more potential with UtradeU
            through tutoring, event promotion, and community building. Reducing
            waste on campus was also a goal from the start. The number of items
            thrown in the trash at the end of the semester is bonkers to say the
            least. Most of these items could still be used, but many students
            don’t have a place to put them. UtradeU aims to reduce this
            unnecessary waste.
          </Text>
        </Box>
        <Box mb={8}>
          <Heading size='xl'>Technologies</Heading>
          <Divider mt={2} />
          <Text>
            We used the MERN stack alongside other third party services such as
            Nodemailer, chatEngine.io, and openai to build UtradeU with all its
            features.
          </Text>
          <Flex align={"center"} justify={"center"}>
            <Image
              src={process.env.PUBLIC_URL + "/images/diagram.png"}
              w={{ base: "100%", md: "70%", lg: "70%" }}
              h={"auto"}
              maxW={"500px"}
              objectFit={"scale-down"}
              p={4}
            />
            {isMobile || (
              <Image
                src={process.env.PUBLIC_URL + "/images/mern.png"}
                w={"70%"}
                h={"auto"}
                maxW={"500px"}
                objectFit={"scale-down"}
                p={4}
              />
            )}
          </Flex>
        </Box>

        {isMobile ? (
          <Mobile />
        ) : (
          <Box mb={8}>
            <Heading size='lg'>Team</Heading>
            <Divider mt={2} />
            <Stack>
              {peopleData.map((person, index) => (
                <Flex>
                  <Image
                    src={process.env.PUBLIC_URL + person.imageSrc}
                    w={"70%"}
                    h={"auto"}
                    maxW={"250px"}
                    objectFit={"scale-down"}
                    p={4}
                  />

                  <Box maxW={"600px"} p={4}>
                    <Text fontSize='xl' fontWeight='bold' mb={2}>
                      {person.name}
                    </Text>
                    <Text fontSize='md' color='gray.600'>
                      {person.bio}
                    </Text>
                  </Box>
                  <Box p={4}>
                    <Text fontSize='xl' fontWeight='bold' mb={2}>
                      Contact
                    </Text>
                    <Text>{person.email}</Text>
                    <VStack align={"start"}>
                      <Link href={person.linkedin} color='blue.500' isExternal>
                        {person.linkedin && `Linkedin`}
                      </Link>
                      <Link href={person.website} color='blue.500' isExternal>
                        {person.website && `Portfolio`}
                      </Link>
                    </VStack>
                  </Box>
                </Flex>
              ))}
            </Stack>
          </Box>
        )}

        <Box mb={8}>
          <Heading size='lg'>Tutorials</Heading>
          <Divider mt={2} />
          <Text>
            Please visit our{" "}
            <Link href={`/help`} color='blue.500'>
              Help
            </Link>{" "}
            page for UtradeU tutorials!
          </Text>
        </Box>
      </Box>
    </>
  );
};

const Mobile = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <Box mb={8}>
      <Heading size='lg'>Team</Heading>
      <Divider mt={2} />
      <Stack>
        {peopleData.map((person, index) => (
          <Stack>
            <Image
              src={process.env.PUBLIC_URL + person.imageSrc}
              w={"70%"}
              h={"auto"}
              maxW={"250px"}
              objectFit={"scale-down"}
              p={2}
            />

            <Box maxW={"600px"} px={2}>
              <Text fontSize='xl' fontWeight='bold' mb={2}>
                {person.name}
              </Text>
              <Collapse startingHeight={52} in={isExpanded}>
                <Text fontSize='md' color='gray.600'>
                  {person.bio}
                </Text>
              </Collapse>
              {!isExpanded && (
                <Button
                  variant='link'
                  color='blue.500'
                  onClick={toggleExpansion}
                >
                  See More
                </Button>
              )}
              {isExpanded && (
                <Button
                  variant='link'
                  color='blue.500'
                  onClick={toggleExpansion}
                >
                  See Less
                </Button>
              )}
            </Box>
            <Box p={2}>
              <Text>{person.email}</Text>
              <VStack align={"start"}>
                <Link href={person.linkedin} color='blue.500' isExternal>
                  {person.linkedin && `Linkedin`}
                </Link>
                <Link href={person.website} color='blue.500' isExternal>
                  {person.website && `Portfolio`}
                </Link>
              </VStack>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default About;
