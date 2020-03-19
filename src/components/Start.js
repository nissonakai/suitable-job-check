import React from 'react';
import { useHistory } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";

export const Start = ({ getQuestions, getSurveys }) => {
    const history = useHistory();

    const startQuestions = (async () => {
        await getQuestions();
        await getSurveys();
        await history.push('/questions/1');
    })

    return (
        <div>
            <Typography variant="h4" component="h1" gutterBottom>適職診断テスト</Typography>
            <Button
                variant="contained"
                onClick={() => startQuestions()}
            >始める</Button>
        </div>
    );
};