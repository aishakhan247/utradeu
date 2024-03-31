import React from "react";
import Post from "./Post";
import Chat from "./Chat";
import ListFeed from "./ListFeed";
import "./../styles/home.css";
import Chatbot from "./chatbot/ChatBot";
import Filter from "./Filter";
import { Grid, GridItem, useMediaQuery } from "@chakra-ui/react";

const Home = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  return (
    // <main className='home'>
    //   <section className='column-1 left'>
    //     <Filter />
    //   </section>
    //   <section className='column-2 middle'>
    //     <ListFeed />
    //   </section>
    //   <section className='column-3 right'>
    //     <Chatbot />
    //   </section>
    // </main>
    <Grid
      bg={"#FEFAE0"}
      h='100vh'
      templateRows='repeat(12, 1fr)'
      templateColumns='repeat(12, 1fr)'
      gap={4}
    >
      <GridItem display={{ base: "none", md: "grid" }} rowSpan={12} colSpan={3}>
        <Filter />
      </GridItem>
      <GridItem
        rowSpan={12}
        colSpan={{ base: "12", md: "6", lg: "6" }}
        px={{ base: "2", md: "none" }}
      >
        <ListFeed />
        {isMobile ? <Chatbot openChat={false} /> : <Chatbot openChat={true} />}
      </GridItem>
      <GridItem
        display={{ base: "none", md: "grid" }}
        rowSpan={12}
        colSpan={3}
      ></GridItem>
    </Grid>
  );
};

export default Home;
