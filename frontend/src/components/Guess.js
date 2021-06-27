import React from "react";
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import PostApiWord from '../Api/PostApiWord';

export default function Guess(props) {
    const CHARACTER_LIMIT = 1;
    const [helpertextWordDuplicate, sethelpertextWordDuplicate] = React.useState("");
    const [errorShow, setErrorShow] = React.useState(false);
    const [values, setValues] = React.useState({
        userInput: ""
    });

    const handleChange = userInput => event => {
        setValues({ ...values, [userInput]: event.target.value.toLowerCase() });
    };

    const clickword = async () => {

        console.log(values.userInput);

        console.log("MissesWord --" + props.misses);
        console.log("CorrectWord --" + props.word);
        console.log(props.word.indexOf(values.userInput));
        let sameWord = false;

        let isLetter = true;

        var letters = /^[A-Za-z]+$/;

        if (!values.userInput.match(letters)) {
            isLetter = false;
        }
        console.log("isLetter" + isLetter);
        if (props.word.indexOf(values.userInput) > -1) {
            sameWord = true;
        }
        else if (props.misses.length > 0) {
            sameWord = props.misses.some((ele) => ele === values.userInput);
            console.log("Match" + sameWord);
        }


        if (sameWord) {
            setErrorShow(true);
            sethelpertextWordDuplicate("You Already Tried This Word");
        }

        if (!isLetter) {
            setErrorShow(true);
            sethelpertextWordDuplicate("Please only try a letter");
        }
        if (!sameWord && isLetter) {
            sethelpertextWordDuplicate("");
            const data = await PostApiWord(values);
            props.setData(await data);
            props.setGameStatus(await data.status);
            console.log("Statusssss--" + await data.status);
            console.log("Misses--" + props.misses.length);
            console.log(await data);
        }

    }
    return (
        <div >
            <h1>Guess</h1>
            <TextField
                error={errorShow}
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