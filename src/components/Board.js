import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
    Typography,
    Slider,
    Grid,
    Button,
    Container
} from "@material-ui/core";

const useStyles = makeStyles({
    sliderBox: {
        maxWidth: 400,
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

    const [ qValue, setQValue ] = useState("20");

    let answerObj = {
        title: texts[index].title,
        category: texts[index].category,
        value: qValue
    };

    const handleChange = e => {
        const targetValue = e.target.getAttribute('aria-valuenow');
        setQValue(targetValue);
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                {texts[index].title}
            </Typography>
            <Container className={classes.sliderBox}>
            <Grid container>
                <Grid item xs>
                    <PrettoSlider
                        valueLabelDisplay="auto"
                        aria-label="pretto slider"
                        aria-valuenow={qValue}
                        defaultValue={20}
                        onChange={e => handleChange(e)}
                    />
                </Grid>
            </Grid>
            <Grid container justify="space-between">
                <Grid item>
                <Typography
                        gutterBottom
                        component="p"
                    >当てはまらない
                    </Typography>
                </Grid>
                <Grid item>
                <Typography
                        gutterBottom
                        component="p"
                    >当てはまる
                    </Typography>
                </Grid>
            </Grid>
            </Container>
            <Button
                variant="contained" 
                onClick={() => doAnswer(answerObj)}>次へ</Button>
        </Container>

    )
};