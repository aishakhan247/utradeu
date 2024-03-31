// import { useState } from "react";
// import { Button, Modal, Box, Grid, Tooltip, Popover } from "@mui/material";
// import { BottomNavigation, BottomNavigationAction } from "@mui/material";
// import { FormControl, InputLabel, Input, Alert } from "@mui/material";
// import { FormControlLabel, Checkbox, Typography , TextField } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import Paper from "@mui/material/Paper";
// import ".././styles/CreatePost.css";
import PostModal from "./PostModal";
import React from "react";

// import EventIcon from "@mui/icons-material/Event";
// import LocalMallIcon from "@mui/icons-material/LocalMall";
// import BuildIcon from "@mui/icons-material/Build";
// import CloseIcon from "@mui/icons-material/Close";
// import { IconButton } from "@mui/material";

// Emoji Picker
// import EmojiPicker from "emoji-picker-react";


// this style is used for Modal/popup
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// Item component wraps the navigation bar to give it a nice background
// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

const CreatePost = () => {
  // const [open, setOpen] = useState(false);
  // const [open1, setOpen1] = useState(false);
  // const [value, setValue] = useState(0);

  // const handleOpen = () => {setOpen(true)};
  // const handleClose = () => {setOpen(false);setOpen1(false);};

  // const handleAlert = () => {
  //   document.getElementById("alert-grid").style.display = "grid"; // use state hook instead
  // };

  // const handleEmojiPicker = () => {
  //   setOpen1(true);
  // }

  // const [descVal, setDescVal] = useState("");
  // function handleEmojiClick(event, emojiObject) {
  //   setDescVal(descVal + event.emoji);
  // }

  return (
    <>
      <PostModal />
    </>    
  );
};

export default CreatePost;




// import { useState } from "react";
// import {
//   Button,
//   Modal,
//   Box,
//   Grid,
//   Tooltip,
//   Popover,
//   FormControl,
//   FormLabel,
//   Input,
//   Checkbox,
//   Textarea,
//   IconButton,
//   Text,
// } from "@chakra-ui/react";
// import EmojiPicker from "emoji-picker-react";
// import { MdAdd, MdClose, MdLocalMall, MdBuild, MdEvent } from "react-icons/md"; // Import React Icons
// import { useRef } from "react";

// // this style is used for Modal/popup
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   bgColor: "white",
//   borderWidth: "2px",
//   boxShadow: "lg",
//   p: 4,
// };

// // Item component wraps the navigation bar to give it a nice background
// const Item = (props) => (
//   <Box bgColor={props.colorMode === "dark" ? "#1A2027" : "#fff"} {...props} />
// );

// const CreatePost = () => {
//   const [open, setOpen] = useState(false);
//   const [open1, setOpen1] = useState(false);
//   const [value, setValue] = useState(0);

//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//     setOpen1(false);
//   };

//   const handleAlert = () => {
//     alert("Please upload a photo to enable GPT-4 Autofill.");
//   };

//   const handleEmojiPicker = () => {
//     setOpen1(true);
//   };

//   const descValRef = useRef("");
//   const handleEmojiClick = (event, emojiObject) => {
//     descValRef.current += emojiObject.emoji;
//   };

//   return (
//     <div>
//       <Button onClick={handleOpen} colorScheme='blue' variant='solid'>
//         Open modal
//       </Button>
//       <Modal isOpen={open} onClose={handleClose} isCentered size='lg'>
//         <Box className='modal__box' {...style}>
//           {/* close Icon/Btn */}
//           <Box display='flex' justifyContent='flex-end'>
//             <IconButton onClick={handleClose}>
//               <MdClose />
//             </IconButton>
//           </Box>

//           {/* Heading */}
//           <Text variant='h5' textAlign='center'>
//             Create Post
//           </Text>

//           {/* Post Form */}
//           <form className='box__form' action='' style={{ padding: "32px" }}>
//             <Grid
//               container
//               spacing={2}
//               justifyContent='center'
//               alignItems='center'
//             >
//               {/* Row1 - Navbar */}
//               <Grid item xs={12}>
//                 <Item>
//                   <Box display='flex' justifyContent='center'>
//                     <Tooltip label='Item' placement='top'>
//                       <IconButton
//                         icon={<MdLocalMall />}
//                         aria-label='Item'
//                         onClick={() => setValue(0)}
//                         color={value === 0 ? "blue.500" : "gray.500"}
//                       />
//                     </Tooltip>
//                     <Tooltip label='Service' placement='top'>
//                       <IconButton
//                         icon={<MdBuild />}
//                         aria-label='Service'
//                         onClick={() => setValue(1)}
//                         color={value === 1 ? "blue.500" : "gray.500"}
//                       />
//                     </Tooltip>
//                     <Tooltip label='Event' placement='top'>
//                       <IconButton
//                         icon={<MdEvent />}
//                         aria-label='Event'
//                         onClick={() => setValue(2)}
//                         color={value === 2 ? "blue.500" : "gray.500"}
//                       />
//                     </Tooltip>
//                   </Box>
//                 </Item>
//               </Grid>

//               {/* Row 2 - Category and Price */}
//               <Grid item xs={12}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={6}>
//                     <FormControl isRequired>
//                       <FormLabel htmlFor='category-input'>Category</FormLabel>
//                       <Input
//                         id='category-input'
//                         aria-describedby='category-helper-text'
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <FormControl isRequired>
//                       <FormLabel htmlFor='price-input'>Price</FormLabel>
//                       <Input
//                         id='price-input'
//                         aria-describedby='price-helper-text'
//                       />
//                     </FormControl>
//                   </Grid>
//                 </Grid>
//               </Grid>

//               {/* Row3 - Title and Checkbox */}
//               <Grid item xs={12}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={6}>
//                     <FormControl isRequired>
//                       <FormLabel htmlFor='title-input'>Title</FormLabel>
//                       <Input
//                         id='title-input'
//                         aria-describedby='title-helper-text'
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <FormControl>
//                       <Checkbox defaultChecked>Price Is Negotiable</Checkbox>
//                     </FormControl>
//                   </Grid>
//                 </Grid>
//               </Grid>

//               {/* Row4 - Description */}
//               <Grid item xs={12}>
//                 <Textarea
//                   required
//                   label='Description'
//                   variant='outline'
//                   size='sm'
//                   value={descValRef.current}
//                   onChange={() => {}}
//                 />
//               </Grid>

//               {/* Row5 - Image Upload, Emoji, GPT, Button */}
//               <Grid item xs={12}>
//                 <Grid container justifyContent='flex-end' alignItems='flex-end'>
//                   <Grid item>
//                     <Tooltip label='Photo/Video' placement='top'>
//                       <label htmlFor='upload-photo'>
//                         <Box
//                           as='img'
//                           h='28px'
//                           w='28px'
//                           cursor='pointer'
//                           alt='Upload Image'
//                           src='https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png'
//                         />
//                       </label>
//                       <Box display='none'>
//                         <input type='file' accept='image/*' id='upload-photo' />
//                       </Box>
//                     </Tooltip>
//                   </Grid>

//                   {/* Emoji Child Modal */}
//                   <Grid item>
//                     <Tooltip label='Emoji' placement='top'>
//                       <Box onClick={handleEmojiPicker} cursor='pointer'>
//                         <Box
//                           as='img'
//                           h='28px'
//                           w='28px'
//                           cursor='pointer'
//                           alt='Emoji'
//                           src='https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png'
//                         />
//                         <Popover isOpen={open1}>
//                           <Box id='emoji-picker'>
//                             <Button variant='solid' onClick={handleClose}>
//                               Close
//                             </Button>
//                             <EmojiPicker onEmojiClick={handleEmojiClick} />
//                           </Box>
//                         </Popover>
//                       </Box>
//                     </Tooltip>
//                   </Grid>

//                   <Grid item>
//                     <Tooltip label='GPT-4 Autofill' placement='top'>
//                       <Box onClick={handleAlert} cursor='pointer'>
//                         <Box
//                           as='img'
//                           h='28px'
//                           w='28px'
//                           cursor='pointer'
//                           alt='GPT-4'
//                           src='https://chat.openai.com/favicon-32x32.png'
//                         />
//                       </Box>
//                     </Tooltip>
//                   </Grid>

//                   <Grid item xs={4}>
//                     <Button
//                       width='100%'
//                       colorScheme='blue'
//                       variant='solid'
//                       onClick={handleClose}
//                     >
//                       Post
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </Grid>

//               {/* Row6 - Alert */}
//               <Grid item xs={12}>
//                 <Box display='none' id='alert-grid'>
//                   <Box>
//                     <Text fontSize='sm' color='red.500'>
//                       Please upload a photo to enable GPT-4 Autofill.
//                     </Text>
//                   </Box>
//                 </Box>
//               </Grid>

//               {/* End of All Rows */}
//             </Grid>
//           </form>
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default CreatePost;

