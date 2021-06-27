import React from "react";
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import PostApiWord from '../Api/PostApiWord';

export default function Guess(props) {
    const CHARACTER_LIMIT = 1;
    const [helpertextWordDuplicate, sethelpertextWordDuplicate] = React.useState("");
    const [values, setValues] = React.useState({
        userInput: ""
    });

    const handleChange = userInput => event => {
        setValues({ ...values, [userInput]: event.target.value });
    };

    const clickword = async () => {

        console.log(values.userInput);

    }
    return (
        <div >
            <h1>Guess</h1>
            <TextField
                label="Enter a word"
                inputProps={{
                    maxLength: CHARACTER_LIMIT
                }}
                value={values.userInput}
                helperText={helpertextWordDuplicate}
                onChange={handleChange("userInput")}
                margin="normal"
                variant="outlined"
            />
            <Button variant="contained" color="primary" onClick={clickword}>
                presss
            </Button>
        </div>
    );
}