import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function ExampleFunctionComponent() {
    return (
        <Typography variant="body2">
            {'Feito como meio de aprendizagem de React. '}
            <Link color="inherit" href="https://github.com/ImInYourPie">
                Github
      </Link>
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '50vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(2),
        marginTop: "auto",
        color: "white",
        background: "linear-gradient(to left top, #03FFE1, #0B98FF)"
    },
}));

export default function StickyFooter() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <br></br>
            <br></br>
            <CssBaseline />
            <footer className={classes.footer} >
                <Container maxWidth="sm">
                    <Typography variant="body1">Hydradev</Typography>
                    <ExampleFunctionComponent />
                </Container>
            </footer>
        </div>
    );
}