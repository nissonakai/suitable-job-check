import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Paper, Grid, TextField, Checkbox, FormControlLabel, MenuItem, Typography, Container } from "@material-ui/core";
import { PageHeader } from "./PageHeader";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Consts from "../Consts";

const useStyle = makeStyles({
    loginOuter: {
        width: "85%",
        margin: "3rem auto"
    },
    loginInner: {
        width: "95%",
        paddingTop: "1.5rem"
    },
    pb: {
        padding: "0 auto 3rem"
    },
    mb: {
        margin: "0 auto 3rem"
    }
});

export const UserForm = ({ answers, computedData, categories, calcResult, setRecommendJobs, auth }) => {
    const { sexs, prefectures, wages } = Consts;
    const history = useHistory();
    const classes = useStyle();

    const answers_text =
        answers
            .map(answer => `設問: ${answer.title}, カテゴリ: ${answer.category}, 値: ${answer.value}`)
            .reduce((accum, current) => `${accum}/${current}`);

    const calcResults = calcResult();
    const resultIds = calcResults[2];
    const resultId = resultIds.length === 4 ? 0 : resultIds[Math.floor(Math.random() * resultIds.length)];

    const resultTitle = calcResults[1];

    const [sendElements, setSendElements] = useState({
        email: "",
        age: "",
        sex: "",
        job: "",
        wage: "",
        prefecture_id: "",
        dormitory: false,
        answers: answers_text,
        result_id: resultId,
        result_title: resultTitle
    });

    const handleChange = e => {
        setSendElements({ ...sendElements, [e.target.name]: e.target.value });
    };

    const handleChecked = e => {
        setSendElements({ ...sendElements, dormitory: e.target.checked });
    };

    const sendData = data => {
        axios.post(process.env.REACT_APP_SJC_SEND_RESULT, data)
            .then(res => {
                setRecommendJobs(res.data.data);
                history.push('/result');
            })
            .catch(err => {
                alert("送信に失敗しました。");
                console.log(err);
            });
    };

    const canSubmit = () => {
        const emailRegexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
        const validAge = sendElements.age !== "";
        const validSex = sendElements.sex !== "";
        const validPlace = sendElements.prefecture_id !== "";
        const validEmail = emailRegexp.test(sendElements.email);
        return validAge && validSex && validEmail && validPlace;
    };

    return (
        <>
            <PageHeader title="アンケート" />
            <Paper className={classes.loginOuter}>
                <Container className={classes.loginInner}>
                    <Typography variant="h4" component="h1" gutterBottom>アンケート</Typography>
                    <Grid container spacing={4} >
                        <Grid item sm={6} xs={12}>
                            <TextField
                                name="age"
                                label="年齢"
                                type="number"
                                value={sendElements.age}
                                onChange={e => handleChange(e)}
                                fullWidth
                                autoFocus
                                required
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                name="sex"
                                select
                                label="性別"
                                type="number"
                                value={sendElements.sex}
                                onChange={e => handleChange(e)}
                                fullWidth
                                required
                            >
                                {sexs.map(sex => (
                                    <MenuItem key={sex.value} value={sex.value}>
                                        {sex.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4} >
                        <Grid item sm={6} xs={12}>
                            <TextField
                                name="prefecture_id"
                                select
                                label="居住地"
                                type="text"
                                value={sendElements.prefecture_id}
                                fullWidth
                                onChange={e => handleChange(e)}
                                helperText="現在の居住地をお答えください"
                                required
                            >
                                {prefectures.map(prefecture => (
                                    <MenuItem key={prefecture.id} value={prefecture.id}>
                                        {prefecture.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                        <FormControlLabel
                            control={
                            <Checkbox
                                name="dormitory"
                                checked={sendElements.dormitory}
                                onChange={e => handleChecked(e)}
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                            }
                            label="寮付きのお仕事を希望"
                            labelPlacement="bottom"
                        />
                        </Grid>
                    </Grid>

                    <Grid container spacing={4} >
                        <Grid item sm={6} xs={12}>
                            <TextField
                                name="job"
                                label="職業（任意）"
                                type="text"
                                value={sendElements.job}
                                onChange={e => handleChange(e)}
                                fullWidth
                                helperText="現職または直近のご職業をお答えください"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                name="wage"
                                select
                                label="年収（任意）"
                                type="text"
                                value={sendElements.wage}
                                onChange={e => handleChange(e)}
                                fullWidth
                                helperText="現職または直近の年収をお答え下さい"
                            >
                                {wages.map(wage => (
                                    <MenuItem key={wage} value={wage}>
                                        {wage}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    
                    <Grid container spacing={8} >
                        <Grid item sm={6} xs={12} className={classes.mb} >
                            <TextField
                                name="email"
                                label="メールアドレス"
                                type="email"
                                value={sendElements.email}
                                onChange={e => handleChange(e)}
                                fullWidth
                                helperText="今回の結果を基に厳選したお仕事をメールにてご紹介いたします。"
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Button
                            variant="outlined"
                            color="primary"
                            disabled={!canSubmit()}
                            className={classes.mb} onClick={() => sendData(sendElements)}
                        >結果を見る！</Button>
                    </Grid>
                </Container>

            </Paper>
        </>

    );
};