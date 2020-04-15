import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from "recharts";
import { ComputedAnswer } from './ComputedAnswer';
import { RecommendJobCards } from './RecommendJobCards';
import { PageHeader } from "./PageHeader";
import { image1 } from "../img/image1.png";

const useStyles = makeStyles({
    graphPosition: {
        margin: "0 auto"
    }
});

export const Result = ({ answers, resetAnswers, calcResult, recommendJobs, resetRecommendJobs }) => {
    const computedDataRader = calcResult()[0];
    const topScoreTitle = calcResult()[1];

    const meta = [
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '@717450NISSO' },
        { property: 'og:type', content: 'article'},
        { property: 'og:image', content: image1 },
        { property: 'og:title', content: `あなたは${topScoreTitle}タイプです | 適職診断テスト 工場求人ナビ` },
        { property: 'og:description', content: 'あなたに合ったお仕事を探せる！' },
        { property: 'og:url', content: 'https://www.717450.net/' }
      ]

    const history = useHistory();
    const classes = useStyles();
    const resetAndBacktoHome = () => {
        resetAnswers();
        resetRecommendJobs();
        history.push("/");
    };


    if (answers.includes(undefined) || answers.length === 0) {
        resetAndBacktoHome();
        return false;
    };

    return (
        <>
            <PageHeader title="診断結果" meta={meta} />
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