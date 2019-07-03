import React from 'react';
import MuiThemeProvider from "@material-ui/styles/ThemeProvider";
import Footer from "./components/Footer";
import CardsPanel from "./components/CardsPanel";
import Navbar from "./components/Navbar";
import muiTheme from './components/MuiTheme';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Main from "./components/Main"


// function App() {
//   return (
//     <MuiThemeProvider theme={muiTheme}>
//       <div>
//         <Navbar/>
//         <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
//         <Container>
//         <Grid container spacing={2}>
//           <CardsPanel />
//         </Grid>
//         </Container>
//         <Footer />
//       </div>
//     </MuiThemeProvider>
//   );
// }

function App() {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <div>
        <Navbar />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Container>
            <Main />
        </Container>
        <Footer />
      </div>
    </MuiThemeProvider>
  );
}


export default App;
