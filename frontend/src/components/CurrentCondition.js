import React from 'react'

export default function CurrentCondition(props) {
    return (
        <div>
            <h1>Current Condition</h1>
            <h1>{props.status === 0 ? "Running" : props.status === 1 ? "Win" : props.status === "2" ? "looser" : "Unknown"}</h1>
        </div>
    )
}
