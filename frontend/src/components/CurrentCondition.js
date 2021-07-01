import React from 'react'

export default function CurrentCondition(props) {
    return (
        <div>
            {/* Status of the game */}
            <h1 align={"center"}>{props.status === 0 ? "Game is running" : props.status === 1 ? "Win" : props.status === "2" ? "looser" : "Unknown"}</h1>
        </div>
    )
}
