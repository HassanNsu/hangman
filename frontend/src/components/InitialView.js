import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GameDetails from './GameDetails';
import { CreatePostAPI } from '../Api/PostApi';
import uuid from 'react-uuid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import indigo from '@material-ui/core/colors/teal';
import Box from '@material-ui/core/Box';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

//Basic Style
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

//Font size will change according to screen size
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

export default function InitialView() {
    const classes = useStyles();
    const [showPlayButton, setShowPlayButton] = useState(true);
    const gameUID = localStorage.getItem("gameUid");
    const [showGameDetails, setShowGameDetails] = useState(gameUID ? true : false);
    const [gameStatus, setGameStatus] = useState(0);
    const [data, setData] = useState("");

    const clickPlay = async () => {
        localStorage.setItem("gameUid", uuid());
        const createGame = await CreatePostAPI(localStorage.getItem("gameUid"));
        setShowPlayButton(false);
        setShowGameDetails(true);
        setGameStatus(0);
    }

    const clickPlayAgain = async () => {
        localStorage.setItem("gameUid", uuid());
        const createGame = await CreatePostAPI(localStorage.getItem("gameUid"));
        setGameStatus(0);
        setShowGameDetails(true);
    }

    return (

        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <Paper className={classes.paper}>
                    <Typography variant="h2" gutterBottom align={"center"}>
                        HangMan
                    </Typography>
                    {
                        //if there is no uid in local storage
                        gameStatus === 0 && showPlayButton && !gameUID &&
                        <Box textAlign='center'>
                            <Button variant="contained" color="primary" onClick={clickPlay}>
                                Lsts Play
                            </Button>
                        </Box>
                    }
                    {
                        //When there is a uid in local storage
                        gameStatus === 0 && showGameDetails && gameUID && <GameDetails data={data} setData={setData} setGameStatus={setGameStatus}></GameDetails>
                    }
                    {
                        //When game is finished
                        (gameStatus === 1 || gameStatus === 2) &&
                        <>
                            {localStorage.removeItem("gameUid")}
                            <Typography variant="h3" gutterBottom align={"center"}>
                                {gameStatus === 1 ? "You win the game" : gameStatus === 2 ? "You have lost the game" : ""}
                            </Typography>
                            <Typography variant="h5" gutterBottom align={"center"}>
                                {gameStatus === 2 ? `Actual word - ${data.actual_word}` : ""}
                            </Typography>
                            <Box textAlign='center'>
                                <Button variant="contained" color="primary" onClick={clickPlayAgain}>
                                    Play Again
                                </Button>
                            </Box>
                        </>
                    }
                </Paper>
            </ThemeProvider>
        </div>
    );
}
