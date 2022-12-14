import { Box } from "@chakra-ui/react";
import { auth } from "../lib/firebase";
import { Loading } from "./loading";
import { Signin } from "./signin";
import { useAuthUser } from "@react-query-firebase/auth";

export const AuthGuard = ({ children }) => {
  const user = useAuthUser(["user"], auth);
  console.log(user)
  if (user.isLoading) {
    return <Loading />;
  }
  if (user.data) {
    return <>{children}</>;
  }
  return (
    <Box>
      <Signin />
    </Box>
  );
};
