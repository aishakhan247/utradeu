// import storeChat from "./storeChat";

export default async function promptAnalyzer(
  setIsLoading,
  responseMessage,
  setMessages,
  items,
  services,
  events,
) {


  const prompt = `
  Find the title in the previous response from the chatbot, the title is in the quotation marks only, then from the below info return its id. Give me ONLY one id and the title respectively seperated by space with no extra info. If the item/service/event doesn't exist, say NONE with no extra info.


  Items: \n
    ${items.map((item) => {
      return `Item info -> title: ${item.postTitle}, description: ${item.description} \n, id: ${item._id}`;
    })}

    \n

    Services: \n
    ${services.map((service) => {
      return `service info -> title: ${service.postTitle}, description: ${service.description}, id: ${service._id}\n`;
    })}

    \n

    Events: \n
    ${events.map((event) => {
      return `event info -> title: ${event.postTitle}, description: ${event.description}, id: ${event._id} \n`;
    })}
    \n


  
  `;

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
        messages: [{ role: "user", content: `${prompt}${responseMessage.text}` }],
        temperature: 0.0,
        max_tokens: 120,
        n: 1,
        model: "gpt-4",
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
      }),
    }
  );
  setIsLoading(response.loading);

  const result = await response.json();
  const text = result.choices[0].message.content.trim();
  console.log(text)
  if (text === "NONE") {
    return;
  } 
  const [postId, postTitle] = text.split(" ");
  
  const apiURL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_UTRADEU_URL_PROD
      : "http://localhost:3000";
  const message = {
    text: `Here is the link: ${`<li><a href='${apiURL}/posts/post/${postId}' style="text-decoration: underline">${postTitle}</a></li>`}`,
    uId: null,
    isUser: false,
    canRefresh: false,
  };

  setMessages((prevMessages) => [...prevMessages, message]);
  // Store chatbot's response in database
  // await storeChat(
  //   message.text,
  //   message.uId,
  //   message.timestamp,
  //   message.isUser,
  //   message.canRefresh,
  //   promptMode
  // );
}
