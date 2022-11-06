import { Box, Text } from "@chakra-ui/react";
import { GoogleAuthProvider } from "firebase/auth";
import { useCallback } from "react";
import GoogleButton from "react-google-button";
import { auth } from "../lib/firebase";
import { signInWithGooglePopup } from "../lib/firebase";
export function Signin () {
  const provider = new GoogleAuthProvider();
  const handleSingIn = () => {
    signInWithGooglePopup(auth, provider)
  }
  return (
    <Box>
      <GoogleButton onClick={handleSingIn}>google sign in</GoogleButton>
    </Box>
  );
}
