import React from 'react'

export default function Missess(props) {
    console.log(props.misses);
    const {misses} = props;
    return (
        <div>
            <h1>Missess</h1>
            <h1>{misses != null && misses.join(",")}</h1>
        </div>
    )
}
