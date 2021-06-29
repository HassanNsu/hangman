import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GameDetails from './GameDetails';
import PostApi from '../Api/PostApi';
import useStyle from '../Style/useStyle';
import uuid from 'react-uuid';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import indigo from '@material-ui/core/colors/teal';
import ButtonBase from '@material-ui/core/ButtonBase';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 600,
        backgroundColor: indigo[200],
    },
}));

export default function Header() {


    const classes = useStyles();
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
        // localStorage.removeItem("gameUid");
        localStorage.setItem("gameUid", uuid());
        const data = await PostApi(localStorage.getItem("gameUid"));
        setGameStatus(0);
        setShowGameDetails(true);


    }


    return (

        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                    <h3 align={"center"}>HangMan </h3>

                </Typography>
                {
                    gameStatus === 0 && showPlayButton && !gameUID &&
                    <Box textAlign='center'>
                        <Button variant="contained" color="primary" onClick={click}>
                            Lsts Play
                        </Button>
                    </Box>

                }
                {
                    gameStatus === 0 && showGameDetails && gameUID && <GameDetails setGameStatus={setGameStatus}></GameDetails>
                }
                {
                    (gameStatus === 1 || gameStatus === 2) &&
                    <>
                        {localStorage.removeItem("gameUid")}
                        <Typography variant="h3" component="h2" gutterBottom align={"center"}>
                            {gameStatus === 1 ? "You win the game" : gameStatus === 2 ? "You lose the game" : ""}
                        </Typography>
                        <Box textAlign='center'>
                            <Button variant="contained" color="primary" onClick={clickPlayAgain}>
                                Play Again
                            </Button>
                        </Box>
                    </>
                }
            </Paper>
        </div>
    );
}
