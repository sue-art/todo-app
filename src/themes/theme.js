import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    primary: {
      main: "#FC00FF",
    },
    secondary: {
      main: "#edf2ff",
    },
    white: {
      main: "#FFFFFF",
    },
    pink: {
      deep: "#FF1493",
      hot: "#FF69B4",
      medium: "#C71585",
      pale: "#DB7093",
      light: "#FFB6C1",
    },
    background: {
      white: "#ffffff",
      paper: "#f9f9f8",
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h2",
          h2: "h2",
          h3: "h2",
          h4: "h2",
          h5: "h2",
          h6: "h2",
          subtitle1: "h2",
          subtitle2: "h2",
          body1: "span",
          body2: "span",
        },
      },
    },
  },
});
