import React from 'react';
import { Board } from "./components/Board";
import { Current } from "./components/Current";
import { useHistory, useParams } from "react-router-dom";


export const Questions = ({ texts, answers, setAnswers }) => {
    const history = useHistory();
    const { index } = useParams();
    let questionIndex = index - 1;

    const doAnswer = answer => {
        const answerArr = answers.slice();
        answerArr.push(answer);
        setAnswers(answerArr);
        const questionsParams = texts.length <= index ? "/result" : `${parseInt(index, 10) + 1}`;
        history.push(questionsParams);
    };

    return (
        <div className="App">
            <h1>Hello React app!</h1>
            <Board texts={texts} doAnswer={doAnswer} index={questionIndex} />
            <Current answers={answers} />
        </div>
    );
}

