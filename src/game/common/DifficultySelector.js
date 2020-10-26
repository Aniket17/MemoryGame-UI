import React, { useEffect, useState } from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    },
}));


export function DifficultySelector(props) {
    const classes = useStyles();
    var [helpMessage, setHelpMessage] = useState('Please select level to proceed with game.');
    useEffect(() => {
        //get difficulty levels and description from server..
    })
    let handleChange = (event) => {
        props.handleChange(event.target.value);
        switch (event.target.value) {
            case "0":
                setHelpMessage('Easy difficulty level has less number of cards to remember.');
                break;
            case "1":
                setHelpMessage('Medium difficulty level has moderate number of cards to remember and it gets challenging.');
                break;
            case "2":
                setHelpMessage('Hard difficulty level has maximum cards to remember and it gets really hard to solve the game.')
                break;
            default:
                setHelpMessage('Please select level to proceed with game.');
                break;
        }
    }
    return (
        <FormControl className={classes.formControl} >
            <label id="difficulty-level-label">Difficulty Level</label>
            <select className="form-control"
                value={props.difficulty}
                onChange={handleChange}>
                <option value=''>Select Difficulty</option>
                <option value={0}>Easy</option>
                <option value={1}>Medium</option>
                <option value={2}>Difficult</option>
            </select>
            <FormHelperText>{helpMessage}</FormHelperText>
        </FormControl>

    )
}