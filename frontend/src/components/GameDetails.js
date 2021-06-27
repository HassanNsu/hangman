import React from 'react'
import Figure from './Figure';
import Word from './Word';
import Missess from './Missess';
import Guess from './Guess';
import CurrentCondition from './CurrentCondition';
import { useEffect, useState } from 'react';
import GetApi from '../Api/GetApi';

export default function GameDetails(props) {
    const [data, setData] = useState("");

    useEffect(async() => {
        const apidata = await GetApi();
        console.log(await apidata);
        setData(apidata);

    }, [])

    return (
        <div>
            <Figure></Figure>
            <Word word = {data.player_word}></Word>
            <Missess misses = {data.missed_words}></Missess>
            <Guess setData={setData} data={data} setGameStatus={props.setGameStatus} misses = {data.missed_words} word = {data.player_word} ></Guess>
            <CurrentCondition status ={data.status} ></CurrentCondition>
        </div>
    )
}
