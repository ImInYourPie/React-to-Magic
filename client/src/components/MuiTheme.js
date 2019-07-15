import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      light: "#63ccff",
      main: "#0B98FF",
      mainGradient: "linear-gradient(to right, tomato, cyan)",
      dark: "#0B98FF",
      error: "#ff0000",
      contrastText: "#fff"
    }
  }
});

export default theme;
