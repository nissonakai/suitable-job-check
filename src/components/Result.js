import React from 'react';
import { useHistory } from "react-router-dom";
import { Button, Typography, Container } from "@material-ui/core";
import Chart from "react-apexcharts";
import { ComputedAnswer } from './ComputedAnswer';
import { RecommendJobCards } from './RecommendJobCards';
import { PageHeader } from "./PageHeader";

export const Result = ({ answers, resetAnswers, calcResult, recommendJobs, resetRecommendJobs, userAreaName }) => {
    const calcResults = calcResult();
    const computedDataRader = calcResults[0];
    const dataKeys = computedDataRader.map(data => data.key);
    const dataValues = computedDataRader.map(data => data.value);
    const topScoreTitle = calcResults[1];

    const ogp = [
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '@717450NISSO' },
        { property: 'og:type', content: 'article' },
        { property: 'og:image', content: `${process.env.REACT_APP_PUBLIC_URL}/image1.png` },
        { property: 'og:title', content: `あなたは${topScoreTitle}タイプです | 適職診断テスト 工場求人ナビ` },
        { property: 'og:description', content: 'あなたに合ったお仕事を探せる！' },
        { property: 'og:url', content: 'https://www.717450.net/' }
    ];

    const radarOptions = {
        series: [{
            name: '診断結果チャート',
            data: dataValues,
        }],
        options: {
            chart: {
                toolbar: {
                    show: false
                },
                height: 350,
                type: 'radar',
                dropShadow: {
                    enabled: true,
                    blur: 1,
                    left: 1,
                    top: 1
                }
            },
            stroke: {
                width: 2
            },
            fill: {
                colors: ['#3f51b5'],
                opacity: 0.3
            },
            markers: {
                colors: ['#3f51b5'],
                size: 5
            },
            xaxis: {
                categories: dataKeys
            }
        }
    };

    const history = useHistory();

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
            <PageHeader title="診断結果" ogp={ogp} />
            <Typography variant="h4" component="h1">
                あなたは…
            </Typography>
            <ComputedAnswer
                topScoreTitle={topScoreTitle}
            />
            <Container id="chart">
                <Chart
                    options={radarOptions.options}
                    series={radarOptions.series}
                    height={350}
                    type="radar"
                />
            </Container>
            <RecommendJobCards
                userAreaName={userAreaName}
                recommendJobs={recommendJobs}
            />
            <Button variant="contained" onClick={() => resetAndBacktoHome()}>
                トップに戻る
            </Button>
        </>

    )
};