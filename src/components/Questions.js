import React from 'react';
import { Board } from "./Board";
import { Current } from "./Current";
import { useHistory, useParams } from "react-router-dom";


export const Questions = ({ texts, answers, setAnswers }) => {
    const history = useHistory();
    const { index } = useParams();
    let questionIndex = index - 1;

    const doAnswer = answer => {
        const answerArr = answers.slice();
        answerArr[questionIndex] = answer;
        setAnswers(answerArr);
        const questionsParams = texts.length <= index ?
            "/form" : `${parseInt(index, 10) + 1}`;
        history.push(questionsParams);
    };

    return (
        <div className="App">
            <Board texts={texts} doAnswer={doAnswer} index={questionIndex} />
            <Current answers={answers} />
        </div>
    );
}

