import React from 'react';
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

export const Start = ({ getQuestions, getSurveys }) => {
    const history = useHistory();

    const startQuestions = (async () => {
        await getQuestions();
        await getSurveys();
        await history.push('/questions/1');
    })

    return (
        <div>
            <h1>診断テスト</h1>
            <Button
                variant="contained"
                onClick={() => startQuestions()}
            >始める</Button>
        </div>
    );
};