import React, { useEffect, useState, useContext } from "react";
import { Flex, Avatar } from "@chakra-ui/react";
// import { useAuth } from "../../lib/hooks/auth";
// import fetcher from "../../lib/fetcher";
import AiAvatar from "./AiAvatar";
// import definePrompt from "./definePrompt";
import ChatWindow from "./ChatWindow";
import CloseBtn from "./CloseBtn";
// import storeChat from "./storeChat";
import promptAnalyzer from "./promptAnalyzer";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import definePrompt from "./definePrompt";
// import { withProtected } from "../../lib/hooks/route";

// // This is the field of the document in the chat_histories collection
// export type Message = {
//   id?: string; // used in api/chat, this is the document id
//   text: string; // text content of the message
//   uId: string | null;
//   timestamp: number;
//   isUser: boolean; // true if the message is from the user, false if from the bot
//   canRefresh: boolean; // true if the message can be refreshed
//   promptMode: string; // use cases from the menu
// };

// type UserData = {
//   goals?: string[];
//   problems?: string[];
//   focus?: string[];
//   role?: string;
// };

const Chatbot = ({openChat}) => {
  // const [userData, setUserData] = useState();
  // const [promptMode, setPromptMode] = useState<string>("coach");
  const { user, setUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(openChat);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [items, setItems] = useState([]);
  const [services, setServices] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiURL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_UTRADEU_URL_PROD
      : process.env.REACT_APP_UTRADEU_URL_DEV;

  // Get all posts from backend/express.js
  useEffect(() => {
    axios
      .get(`${apiURL}/posts`)
      .then((response) => {
        const allPosts = response.data;
        setItems(allPosts.filter((post) => post.postType === "item"));
        setServices(allPosts.filter((post) => post.postType === "service"));
        setEvents(allPosts.filter((post) => post.postType === "event"));
      })
      .catch((error) => console.log(error));
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    // setIsOpen((prevIsOpen) => {
    //   const newIsOpen = !prevIsOpen;
    //   localStorage.setItem("isOpen", JSON.stringify(newIsOpen));
    //   return newIsOpen;
    // });
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSend = async () => {
    // the number of chat are less than 20 or has a premium then only user can chat
    if (input) {
      const inputMessage = {
        text: input,
        uId: user._id,
        isUser: true,
        canRefresh: false,
      };

      setMessages((prevMessages) => [...prevMessages, inputMessage]);
      // // Store user's input in database
      // await storeChat(
      //   inputMessage.text,
      //   inputMessage.uId,
      //   inputMessage.timestamp,
      //   inputMessage.isUser,
      //   inputMessage.canRefresh,
      //   promptMode
      // );

      // Clear input
      setInput("");

      try {
        const prompt = definePrompt(input, messages, items, services, events);
        const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
        
        setIsLoading(true);
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              messages: [{ role: "user", content: prompt }],
              temperature: 0.4,
              max_tokens: 120,
              n: 1,
              model: "gpt-4",
              frequency_penalty: 0.5,
              presence_penalty: 0.5,
            }),
          }
        );

        const result = await response.json();
        const text = result.choices[0].message.content.trim();

        setIsLoading(response.loading);
        const responseMessage = {
          text: text,
          uId: user._id,
          isUser: false,
          canRefresh: true,
        };

        setMessages((prevMessages) => [
          ...prevMessages,
          responseMessage,
        ]);


        // , URL: <li><a href="${apiURL}/${item._id}" style="text-decoration: underline">${item.postTitle}</a></li> 

        // Store chatbot's response in database
        // await storeChat(
        //   responseMessage.text,
        //   responseMessage.uId,
        //   responseMessage.timestamp,
        //   responseMessage.isUser,
        //   responseMessage.canRefresh,
        //   promptMode
        // );

        // analyze the response from the chatbot to provide the follow-up information
        await promptAnalyzer(
          setIsLoading,
          responseMessage,
          setMessages,
          items,
          services,
          events,
        );
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        // Handle error
        throw error;
      }
    }
  };

  // Get chat history on initial load or preload questions
  useEffect(() => {
    const getMessages = async () => {
      if (messages.length === 0) {
        // Check if messages are already present
        const preloadQuestions = [
          {
            text: `Hi ${user.firstName}! I am Nasser, powered by AI. 🙂`,
            uId: user._id,
            isUser: false,
            canRefresh: false,
          },
          {
            text: "What can I help you find today?",
            uId: user._id,
            isUser: false,
            canRefresh: false,
          },
        ];
        // update messages state
        setMessages(preloadQuestions);
        // store messages in database
        // for (const preloadQuestion of preloadQuestions) {
        //   await storeChat(
        //     preloadQuestion.text,
        //     preloadQuestion.uId,
        //     preloadQuestion.timestamp,
        //     preloadQuestion.isUser,
        //     preloadQuestion.canRefresh,
        //     promptMode
        //   );
        // }
      }
    };
    getMessages();
  });


  return (
    <>
      {/* Icon for coach Amo */}
      <Flex bottom='6' position='fixed' right='6' zIndex='1'>
        {isOpen ? (
          <CloseBtn handleToggle={handleToggle} />
        ) : (
          <Avatar
            size={"md"}
            name='Utes AI'
            src={
              "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1699753382~exp=1699753982~hmac=86952dabe3561536fc643a7c69a5485722cc8a4bab858f1b8701ea93fdef82e2"
            }
            cursor={"pointer"}
            zIndex='1'
            onClick={handleToggle}
          />
        )}
      </Flex>

      {/* <CloseBtn handleToggle={handleToggle} /> */}
      {/* Chat window */}
      {isOpen && (
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          input={input}
          setInput={setInput}
          handleInputChange={handleInputChange}
          handleSend={handleSend}
        />
      )}
    </>
  );
};

export default Chatbot;
