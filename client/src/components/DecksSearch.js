import React from 'react';
import { Grid, Typography, TextField } from "@material-ui/core/"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
        color: "red"
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
}));

export default function DecksSearch() {
    const classes = useStyles;
    return (
        <Grid container spacing={2}
        alignItems="center"
        direction="row">
            <Grid item xs={4} md={2}>
                <Typography variant="h5">My Decks</Typography>
            </Grid>
            <Grid item xs={8} md={10}>
                <form>
                    <TextField
                        id="standard-name"
                        label="Search"
                        fullWidth
                        variant="outlined"
                        className={classes.textField}
                        margin="dense"
                    />
                </form>
            </Grid>
            <br/>
        </Grid>

    )
}
