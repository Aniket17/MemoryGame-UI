import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));
export function Home() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper elevation={3} className="padding-15">
                <h3>How it works:</h3>
                <div className="col-12">
                    <p>At each round the you will select the first card - the card will reveal itself.</p>
                    <p>And then you will the second card - the card will reveal itself for <b>3 seconds</b>.</p>
                    <p>If the cards match, they will disappear.</p>
                    <p>If the cards don’t match, the card’s content will hide, it will be available for pick</p>
                </div>
            </Paper>
        </div>
    )
}