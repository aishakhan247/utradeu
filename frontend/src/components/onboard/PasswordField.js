import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  color,
  useDisclosure,
  useMergeRefs,
} from "@chakra-ui/react";
import { forwardRef, useRef } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

export const PasswordField = forwardRef((props, ref) => {
  const { name, formData, setFormData, isSignup, setPassword } = props;

  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef(null);

  const mergeRef = useMergeRefs(inputRef, ref);
  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  };

  let passwordVal;
  if (isSignup) {
    if (name.toLowerCase() === "password") {
      passwordVal = formData?.password;
    } else {
      passwordVal = formData?.confirmPassword;
    }
  }

  return (
    <FormControl>
      <FormLabel htmlFor='password'>{name}</FormLabel>
      <InputGroup>
        <InputRightElement>
          <IconButton
            variant='text'
            aria-label={isOpen ? "Mask password" : "Reveal password"}
            icon={isOpen ? <HiEye /> : <HiEyeOff />}
            color={"teal.600"}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <Input
          id={name}
          value={passwordVal}
          ref={mergeRef}
          name={name}
          type={isOpen ? "text" : "password"}
          autoComplete='current-password'
          required
          {...props}
          _focus={{
            border: "1px solid #319795",
            zIndex: "1",
            boxShadow: "rgb(49, 151, 149) 0px 0px 0px 1px",
          }}
          onChange={(e) => {
            // if setFormData is passed as prop then it's signing up which means we need to save to formData otherwise it's signin and we want to compare against database on click
            if (isSignup) {
              if (name.toLowerCase() === "password") {
                setFormData({ ...formData, password: e.target.value });
              } else {
                setFormData({ ...formData, confirmPassword: e.target.value });
              }
            } else {
              setPassword(e.target.value);
            }
          }}
        />
      </InputGroup>
    </FormControl>
  );
});

PasswordField.displayName = "PasswordField";
