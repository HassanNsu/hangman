import React from 'react'
import Figure from './Figure';
import Word from './Word';
import Missess from './Missess';
import Guess from './Guess';
import CurrentCondition from './CurrentCondition';
import { useEffect } from 'react';
import { GetApi } from '../Api/GetApi';
import Grid from '@material-ui/core/Grid';

export default function GameDetails(props) {
    const { data, setData } = props;

    useEffect(() => {
        async function fetch() {
            const singleGameData = await GetApi();
            setData(singleGameData);
        }
        fetch();
    }, [])

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6} md={6} style={{ minWidth: "200px" }}>
                    <Figure misses={data.missed_words} ></Figure>
                </Grid>
                <Grid item xs={6} md={6} container style={{ padding: "25px" }}>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Word word={data.player_word}></Word>
                            <Missess misses={data.missed_words}></Missess>
                            <Guess setData={setData}
                                setGameStatus={props.setGameStatus}
                                misses={data.missed_words}
                                word={data.player_word}>
                            </Guess>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <CurrentCondition status={data.status} ></CurrentCondition>
        </>
    )
}
