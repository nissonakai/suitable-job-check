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
        maxWidth: 600,
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

    const computedAnswer = count => {
        if (count.length <= 1) {
            return (
                <>
                <h2>タイプA!</h2>
                <img src={imageTypeA} alt="タイプAのイメージ" className={classes.typeImage}/>
                <p>タイプAなお仕事がおススメ！</p>
                </>
            )
        } else if (count.length <= 2){
            return (
                <>
                <h2>タイプB!</h2>
                <img src={imageTypeB} alt="タイプBのイメージ" className={classes.typeImage}/>
                <p>タイプBなお仕事がおススメ！</p>
                </>
            )
        } else {
            return (
                <>
                <h2>タイプC!</h2>
                <img src={imageTypeC} alt="タイプCのイメージ" className={classes.typeImage}/>
                <p>タイプCなお仕事がおススメ！</p>
                </>
            )
        }
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