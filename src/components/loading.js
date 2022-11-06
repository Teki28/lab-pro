import { Box, Spinner } from "@chakra-ui/react";

export const Loading = () => {
  return (
    <Box>
      <Box
        width={"full"}
        height={"100vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Spinner thickness={"4px"} color={"blue.500"} size={"xl"} />
      </Box>
    </Box>
  );
};
