import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
    Typography,
    Slider,
    Grid,
    Button
} from "@material-ui/core";

const useStyles = makeStyles({
    card: {
        maxWidth: 600,
        margin: "0 auto"
    },
    cardBox: {
        maxWidth: 600,
        margin: "0 auto"
    },
});

const PrettoSlider = withStyles({
    root: {
      color: '#52af77',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus,&:hover,&$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

export const Board = ({ texts, doAnswer, index }) => {
    const classes = useStyles();

    const [ qValue, setQValue ] = useState(20);

    let answerObj = {
        title: texts[index].title,
        value: qValue
    };

    const handleChange = e => {
        const targetValue = e.target.getAttribute('aria-valuenow');
        setQValue(targetValue);
    };

    return (
        <div>
            <h1>{texts[index].title}</h1>
            <div className={classes.cardBox}>
            <Grid container>
                <Grid item xs>
                    <Typography
                        gutterBottom
                        component="p"
                    >当てはまらない
                    </Typography>
                </Grid>
                <Grid item xs>
                    <PrettoSlider
                        valueLabelDisplay="auto"
                        aria-label="pretto slider"
                        aria-valuenow={qValue}
                        defaultValue={20}
                        onChange={e => handleChange(e)}
                    />
                </Grid>
                <Grid item xs>
                    <Typography
                        gutterBottom
                        component="p"
                    >当てはまる
                    </Typography>
                </Grid>
            </Grid>
            </div>
            <Button onClick={() => doAnswer(answerObj)}>次へ</Button>
        </div>

    )
};