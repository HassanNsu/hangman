import React from 'react'
import Figure from './Figure';
import Word from './Word';
import Missess from './Missess';
import Guess from './Guess';
import CurrentCondition from './CurrentCondition';
import { useEffect, useState } from 'react';
import GetApi from '../Api/GetApi';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

export default function GameDetails(props) {
    const [data, setData] = useState("");

    useEffect(async () => {
        const apidata = await GetApi();
        console.log(await apidata);
        setData(apidata);

    }, [])

    return (
        <>
            <Grid container spacing={2}>
                <Grid item>
                    <Figure misses={data.missed_words}></Figure>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Word word={data.player_word}></Word>
                            <Missess misses={data.missed_words}></Missess>
                            <Guess setData={setData} data={data} setGameStatus={props.setGameStatus} misses={data.missed_words} word={data.player_word} ></Guess>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <CurrentCondition status={data.status} ></CurrentCondition>
        </>
    )
}
