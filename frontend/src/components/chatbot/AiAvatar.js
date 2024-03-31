import {Avatar} from "@chakra-ui/react";


const AiAvatar = ({ size, onClick }) => {
  return (
    <>
      <Avatar
        size={"sm"}
        name='Utes AI'
        src={
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
      />{" "}
    </>
  );
};

export default AiAvatar;
