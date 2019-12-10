import React from 'react';
import { useHistory } from "react-router-dom";


export const Result = ({answers}) => {
    const history = useHistory();
    const answerList = answers.map(answer => {
        return <li key={answer}>{answer}</li>
    });
    if (answers.length === 0) {
        history.push("/");
        return;
    };
    return (
        <>
            <h1>結果</h1>
            <ul>
                {answerList}
            </ul>
            <button onClick={() => history.push("/")}>トップに戻る</button>
        </>
        
    )
};