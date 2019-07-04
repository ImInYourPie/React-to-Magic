import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#63ccff',
      main: '#FF0B00',
      dark: '#CC0A00',
      contrastText: '#fff',
    },
  },
});

export default theme;