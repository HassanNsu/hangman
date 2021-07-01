import React from 'react'
import Typography from '@material-ui/core/Typography';

export default function Missess(props) {
    console.log(props.misses);
    const {misses} = props;
    return (
        <div>
            <Typography variant="h5">Missess : {misses != null && misses.join(",")}</Typography>
        </div>
    )
}
