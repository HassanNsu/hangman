import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GameDetails from './GameDetails';
import PostApi from '../Api/PostApi';
import uuid from 'react-uuid';

export default function Header() {

    const [showPlayButton, setShowPlayButton] = useState(true);
    const gameUID = localStorage.getItem("gameUid");
    const [showGameDetails, setShowGameDetails] = useState(gameUID ? true : false);
    const [gameStatus, setGameStatus] = useState(0);
    console.log(showGameDetails);
    console.log(gameUID);


    const click = async () => {

        console.log("Click" + uuid());
        localStorage.setItem("gameUid", uuid());
        setShowPlayButton(false);
        setShowGameDetails(true);

        const data = await PostApi(localStorage.getItem("gameUid"));
        console.log(await data);

    }

    const clickPlayAgain = async () => {

        console.log("Again Click");

    }


    return (
        <div >

            <Typography variant="h3" gutterBottom>
                HangMan
            </Typography>


            <Button variant="contained" color="primary" onClick={click}>
                Lsts Play
            </Button>

            <GameDetails setGameStatus={setGameStatus}></GameDetails>


            <Typography variant="h1" component="h2" gutterBottom>

            </Typography>
            <Button variant="contained" color="primary" onClick={clickPlayAgain}>
                Play Again
            </Button>


        </div>
    );
}
