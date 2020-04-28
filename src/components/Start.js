import React from 'react';
import { useHistory } from "react-router-dom";
import { Button, Typography, Container } from "@material-ui/core";
import { PageHeader } from "./PageHeader";

export const Start = ({ getQuestions, getSurveys }) => {
    const history = useHistory();

    const startQuestions = (async () => {
        await getQuestions();
        return history.push('/questions/1');
    });

    return (
        <Container>
            <PageHeader />
            <Typography variant="h4" component="h1" gutterBottom>適職診断テスト</Typography>
            <Button
                variant="contained"
                onClick={() => startQuestions()}
            >始める</Button>
        </Container>
    );
};