import React from 'react';
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";


export const Result = ({answers, resetAnswers}) => {
    const history = useHistory();

    const resetAndBacktoHome = () => {
        resetAnswers();
        history.push("/");
    }

    const answerList = answers.map(answer => {
        return <li key={answer}>{answer}</li>
    });
    if (answers.includes(undefined) || answers.length === 0) {
        resetAndBacktoHome();
        return false;
    };

    return (
        <>
            <h1>結果</h1>
            <ul>
                {answerList}
            </ul>
            <Button variant="contained" onClick={() => resetAndBacktoHome()}>トップに戻る</Button>
        </>
        
    )
};