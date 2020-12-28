import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const summaryStyles = makeStyles((theme)=> ({
    firstRow: {

    },
    secondRow: {
        
    }
}))

function Results(){
    const classes = summaryStyles();
    return(
        <React.Fragment>
            <div className={classes.firstRow}>
                Content about the candidate
            </div>
            <div className={classes.secondRow}>
                Comments and finalize button
            </div>
        </React.Fragment>
    )
}

export default Results;