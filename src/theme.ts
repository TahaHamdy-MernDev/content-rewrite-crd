import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      primary: "#0077cc",
      secondary: "#1f1f1f",
      danger: "red",
    },
  },
  styles: {
    global: {
      body: {
        bg: "#f0f0f0",
        color: "black",
      },
    },
  },
});

export default theme;
