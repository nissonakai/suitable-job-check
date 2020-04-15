import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from "recharts";
import { ComputedAnswer } from './ComputedAnswer';
import { RecommendJobCards } from './RecommendJobCards';
import { PageHeader } from "./PageHeader";

const useStyles = makeStyles({
    graphPosition: {
        margin: "0 auto"
    }
});

export const Result = ({ answers, resetAnswers, calcResult, recommendJobs, resetRecommendJobs }) => {
    const history = useHistory();
    const classes = useStyles();
    const resetAndBacktoHome = () => {
        resetAnswers();
        resetRecommendJobs();
        history.push("/");
    };

    const computedDataRader = calcResult()[0];
    const topScoreTitle = calcResult()[1];

    if (answers.includes(undefined) || answers.length === 0) {
        resetAndBacktoHome();
        return false;
    };

    return (
        <>
            <PageHeader title="診断結果" />
            <Typography variant="h4" component="h1">
                あなたは…
            </Typography>
            <ComputedAnswer
                topScoreTitle={topScoreTitle}
            />
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
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                />
                <Tooltip />
            </RadarChart>
            <RecommendJobCards 
                recommendJobs={recommendJobs}
            />
            <Button variant="contained" onClick={() => resetAndBacktoHome()}>
                トップに戻る
            </Button>
        </>

    )
};