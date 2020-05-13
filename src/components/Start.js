import React from 'react';
import { useHistory } from "react-router-dom";
import { Button, Typography, Container, Chip } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { PageHeader } from "./PageHeader";

const useStyles = makeStyles({
    title: {
        margin: "2em auto 1em"
    },
    stepbox: {
        margin: "6em auto 2em"
    },
    stepchip: {
        marginBottom: "1em" 
    }
});

export const Start = ({ getQuestions, getSurveys }) => {
    const classes = useStyles();
    const history = useHistory();

    const startQuestions = (async () => {
        await getQuestions();
        return history.push('/questions/1');
    });

    return (
        <Container>
            <PageHeader />
            <Typography
                variant="h4"
                component="h1"
                className={classes.title}
            >適職診断テスト</Typography>
            <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => startQuestions()}
            >始める</Button>
            <Container className={classes.stepbox}>
            <Chip color="primary" label="STEP1" className={classes.stepchip} />
            <Typography variant="h5" component="h2" gutterBottom>診断テストを受けます</Typography>
            <Chip color="primary" label="STEP2" className={classes.stepchip} />
            <Typography variant="h5" component="h2" gutterBottom>年齢、性別、メールアドレス等の基本の情報を入力します</Typography>
            <Chip color="primary" label="STEP3" className={classes.stepchip} />
            <Typography variant="h5" component="h2" gutterBottom>診断結果が表示、メール送信されます</Typography>
            </Container>
            
        </Container>
    );
};