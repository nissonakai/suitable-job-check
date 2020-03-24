import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Button, Typography, Container } from "@material-ui/core";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from "recharts";

const useStyles = makeStyles({
    graphPosition: {
        margin: "0 auto"
    }
});

export const Result = ({ answers, resetAnswers, computedCategory, categories }) => {
    const history = useHistory();
    const classes = useStyles();
    const resetAndBacktoHome = () => {
        resetAnswers();
        history.push("/");
    };

    const computedData = num => {
        const obj = {};
        if (answers.length === 0) {
            history.push("/");
            return;
        };
        const targetBase = answers.filter(answer => answer.category === num);

        const targetBaseValue = targetBase.length * 100;

        const targetValue =
            targetBase
                .map(answer => answer.value)
                .reduce((accm, current) => {
                    return parseInt(accm, 10) + parseInt(current, 10);
                });
        obj.key = computedCategory(num);
        obj.value = parseInt(targetValue, 10) / targetBaseValue * 100;
        obj.fullMark = 100;
        return obj;
    };

    const computedDataRader =
        categories
            .filter(category => {
                return category.label !== "診断外";
            })
            .map(category => {
                return computedData(category.value);
            });

    const topScore =
        computedDataRader
            .map(data => data.value)
            .reduce((accum, current) => current >= accum ? current : accum);

    const topScoreTitles =
        computedDataRader
            .filter(data => data.value === topScore)
            .map(data => data.key);

    const computedAnswer = titles => {
        let title = ""
        if (titles.length === 4) {
            title = "バランス";
        } else {
            title = topScoreTitles.reduce((accum, current) => accum + current);
        }
        return (
            <Container>
                <Typography variant="h5" component="h2">
                    {`${title}重視タイプ！`}
                </Typography>
                <Button variant="outline">
                    {`${title}重視タイプなあなたへのおススメ！`}
                </Button>
            </Container>
        );
    };


    if (answers.includes(undefined) || answers.length === 0) {
        resetAndBacktoHome();
        return false;
    };

    return (
        <>
            <Typography variant="h4" component="h1">
                あなたは…
            </Typography>
            {computedAnswer(topScoreTitles)}
            <Typography variant="p">
                グラフ
            </Typography>
            <RadarChart
                height={200}
                width={250}
                cx="50%"
                cy="50%"
                data={computedDataRader}
                className={classes.graphPosition}
            >
                <PolarGrid />
                <PolarAngleAxis
                    dataKey="key"
                />
                <Radar
                    name="Mike"
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                />
                <Tooltip />
            </RadarChart>
            <Button variant="contained" onClick={() => resetAndBacktoHome()}>
                トップに戻る
            </Button>
        </>

    )
};