import React from "react";
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { AddInputPostApi } from '../Api/PostApi';

export default function Guess(props) {
    const CHARACTER_LIMIT = 1;
    const { setData, setGameStatus, misses, word } = props;
    const [helpertextWordDuplicate, sethelpertextWordDuplicate] = React.useState("Enter a Alphabet");
    const [errorShow, setErrorShow] = React.useState(false);
    const [values, setValues] = React.useState({
        userInput: ""
    });

    const handleChange = userInput => event => {
        setValues({ ...values, [userInput]: event.target.value.toLowerCase() });
    };

    const clickword = async () => {
        let sameWord = false;
        let isLetter = true;
        let letters = /^[A-Za-z]+$/;

        //When user enter the non-alphabet
        if (!values.userInput.match(letters)) {
            isLetter = false;
        } //When user enter the same alphabet from actual word
        else if (word.indexOf(values.userInput) > -1) {
            sameWord = true;
        } //When user enter the same alphabet from misses word
        else if (misses.length > 0) {
            sameWord = misses.some((ele) => ele === values.userInput);
        }

        //Error will show when user input same alphabet
        if (sameWord) {
            setErrorShow(true);
            sethelpertextWordDuplicate("You already tried this word");
        }

        //Error will show when user input non-alphabet
        if (!isLetter) {
            setErrorShow(true);
            sethelpertextWordDuplicate("Please only try a letter");
        }

        //When user input is not a same alphabet and non-alphabet, api will call using user input values
        if (!sameWord && isLetter) {
            sethelpertextWordDuplicate("");
            setErrorShow(false);
            const data = await AddInputPostApi(values);
            setData(await data);
            setGameStatus(await data.status);
        }

    }

    const ConfirmButton = () => (
        <Button variant="contained" color="primary" disabled={!values.userInput} onClick={clickword}>
            Try
        </Button>
    )

    return (
        <div >
            <TextField
                error={errorShow}
                label="Guess"
                inputProps={{
                    maxLength: CHARACTER_LIMIT
                }}
                value={values.userInput}
                helperText={helpertextWordDuplicate}
                onChange={handleChange("userInput")}
                margin="normal"
                variant="outlined"
                style={{ width: 150 }}
                InputProps={{ endAdornment: <ConfirmButton /> }}
            />
        </div>
    );
}