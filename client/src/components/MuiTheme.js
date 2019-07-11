import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      light: "#63ccff",
      main: "#0B98FF",
      dark: "#0873BF",
      error: "#ff0000",
      contrastText: "#fff"
    }
  }
});

export default theme;
