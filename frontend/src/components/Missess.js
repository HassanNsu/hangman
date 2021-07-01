import React from 'react'
import Typography from '@material-ui/core/Typography';

export default function Missess(props) {
    const { misses } = props;
    return (
        <div>
            {/* User inputted wrong alphabet */}
            <Typography variant="h5">Missess : {misses != null && misses.join(",")}</Typography>
        </div>
    )
}
