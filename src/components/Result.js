import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import imageTypeA from "../images/typeA.png";
import imageTypeB from "../images/typeB.png";
import imageTypeC from "../images/typeC.png";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from "recharts";

const useStyles = makeStyles({
    typeImage: {
        width: "10%",
        minWidth: 200,
        margin: "0 auto"
    },
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

    const answersCount = answers.filter(answer => {
        return answer.value > 50;
    });

    const computedElement = count => {
        if (count.length <= 1) {
            return {
                type: "A",
                img: imageTypeA
            }
        } else if (count.length <= 2) {
            return {
                type: "B",
                img: imageTypeB
            }
        } else {
            return {
                type: "C",
                img: imageTypeC
            };
        };
    };

    const computedData = num => {
        const obj = {};
        if (answers !== []) {
            const targetBase = answers.filter(answer => answer.category === num);

            const targetBaseValue = targetBase.length * 100;

            const targetValue =
                targetBase
                    .map(answer => answer.value)
                    .reduce(function (accm, current) {
                        return parseInt(accm, 10) + parseInt(current, 10);
                    });
            obj.key = computedCategory(num);
            obj.value = parseInt(targetValue, 10) / targetBaseValue * 100;
            obj.fullMark = 100;
        };
        return obj;
    };

    const computedDataRader =
        categories
            .filter(category => {
                return category.label !== "診断外";
            })
            .map(category => {
                console.log(computedData(category.value));
                return computedData(category.value);
            });


    const computedAnswer = count => {
        const type = computedElement(count);
        return (
            <>
                <h2>{`タイプ${type.type}！`}</h2>
                <img src={type.img} alt={`タイプ${type.type}のイメージ`} className={classes.typeImage} />
                <p>{`タイプ${type.type}なお仕事がおススメ！`}</p>
            </>
        )
    };


    if (answers.includes(undefined) || answers.length === 0) {
        resetAndBacktoHome();
        return false;
    };

    return (
        <>
            <h1>あなたは…</h1>
            {computedAnswer(answersCount)}
            <p>グラフ</p>
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
            <Button variant="contained" onClick={() => resetAndBacktoHome()}>トップに戻る</Button>
        </>

    )
};