import React from 'react';
import { Board } from "./Board";
import { Current } from "./Current";
import { useHistory, useParams } from "react-router-dom";
import { Container } from "@material-ui/core";
import { PageHeader } from "./PageHeader";

export const Questions = ({ texts, answers, setAnswers }) => {
    const history = useHistory();
    const { index } = useParams();
    let questionIndex = index - 1;

    const doAnswer = answer => {
        if (answer.value === null) {
            return
        };
        const answerArr = answers.slice();
        answerArr[questionIndex] = answer;
        setAnswers(answerArr);
        const questionsParams = texts.length <= index ?
            "/form" : `${parseInt(index, 10) + 1}`;
        history.push(questionsParams);
    };

    return (
        <Container>
            <PageHeader title={`設問${index}`} />
            <Board texts={texts} doAnswer={doAnswer} index={questionIndex} />
            <Current texts={texts} index={index} />
        </Container>
    );
}

