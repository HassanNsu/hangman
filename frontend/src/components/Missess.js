import React from 'react'

export default function Missess(props) {
    console.log(props.misses);
    return (
        <div>
            <h1>Missess</h1>
            <h1>{props.misses}</h1>
        </div>
    )
}
