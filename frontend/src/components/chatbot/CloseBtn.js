import { Flex } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";

const CloseBtn = ({ handleToggle }) => (
  <Flex
    // bg={"#5484E2"}
    bg={"#D4A373"}
    color={"#fff"}
    borderRadius={"full"}
    bottom="6"
    p="4"
    position="fixed"
    right="6"
    zIndex="1"
  >
    <AiOutlineClose
      onClick={handleToggle}
      size="20px"
      style={{
        cursor: "pointer"
      }}
    />
  </Flex>
);

export default CloseBtn;
