import axios from "axios";
import React, { useState, useEffect, createContext } from "react";
import { Flex, Spinner } from "@chakra-ui/react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isloaded, setIsLoaded] = useState(false);
  const apiURL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_UTRADEU_URL_PROD
      : process.env.REACT_APP_UTRADEU_URL_DEV;
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!user && token) {
      axios
        .get(`${apiURL}/profile/userProfile`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token as a Bearer token in the header
          },
        })
        .then((response) => {
          setUser(response.data.user);
          // console.log(response.data.user);
          setIsLoaded(true);
        })
        .catch((error) => {
          setIsLoaded(true);
        });
    }
    else if (!user && !token) {
      setIsLoaded(true)
    }
  }, []);

  useEffect(() => {
    // This effect will run whenever 'user' changes
    console.log("User has been updated:", user);
  }, [user]);

  return (
    <div>
      {!isloaded ? (
        <Flex justifyContent='center' alignItems='center' height='100%'>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
          Loading
        </Flex>
      ) : (
        <UserContext.Provider value={{ user, setUser }}>
          {children}
        </UserContext.Provider>
      )}
    </div>
  );
}

// import React, { useState, createContext} from "react";

// export const PostsContext = createContext();

// export const PostsProvider = (props) => {
//     const [posts, setPosts] = useState(null);

//     return (
//         <PostsContext.Provider value={[posts, setPosts]}>
//             {props.children}
//         </PostsContext.Provider>
//     )
// }
