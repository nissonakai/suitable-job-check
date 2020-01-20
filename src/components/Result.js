import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import imageTypeA from "../images/typeA.png";
import imageTypeB from "../images/typeB.png";
import imageTypeC from "../images/typeC.png";

const useStyles = makeStyles({
    typeImage: {
        width: "10%",
        minWidth: 200,
        margin: "0 auto"
    }
});

export const Result = ({answers, resetAnswers}) => {
    const history = useHistory();
    const classes = useStyles();
    const resetAndBacktoHome = () => {
        resetAnswers();
        history.push("/");
    }

    const answerList = answers.map(answer => {
        return <li key={answer.body}>{answer.body}</li>
    });

    const answersCount = answers.filter(answer => {
        return answer.index === 0;
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
            }
        }
    }

    const computedAnswer = count => {
        const type = computedElement(count);
            return (
                <>
                <h2>{`タイプ${type.type}！`}</h2>
                <img src={type.img} alt={`タイプ${type.type}のイメージ`} className={classes.typeImage}/>
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
            <p>回答一覧</p>
            <ul>
                {answerList}
            </ul>
            <Button variant="contained" onClick={() => resetAndBacktoHome()}>トップに戻る</Button>
        </>
        
    )
};