import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Paper, Grid, TextField, MenuItem } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyle = makeStyles({
    loginOuter: {
        width: "85%",
        margin: "3rem auto"
    },
    loginInner: {
        width: "80%",
        margin: "2rem auto",
        paddingTop: ".5rem"
    },
    pb: {
        padding: "0 auto 3rem"
    },
    mb: {
        margin: "0 auto 3rem"
    }
});

export const UserForm = () => {
    const history = useHistory();
    const classes = useStyle();
    const [sendElements, setSendElements] = useState({
        email: "",
        age: "",
        sex: "",
        job: "",
        wage: ""
    });

    const sexs = [
        {
            value: 0,
            label: "男性"
        },
        {
            value: 1,
            label: "女性"
        },
        {
            value: 2,
            label: "答えない"
        }
    ];

    const wages = [
        "200万円以下", 
        "250万円以下", 
        "300万円以下", 
        "350万円以下", 
        "400万円以下", 
        "400万円以上"
    ];


    const handleChange = e => {
        setSendElements({...sendElements, [e.target.name]: e.target.value});
    };

    const sendData = datas => {
        axios.post(process.env.REACT_APP_SJC_SEND_RESULT, datas)
            .then(res => {
                console.log(res);
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
        const validEmail = emailRegexp.test(sendElements.email);
        return validAge && validSex && validEmail;
    };

    return (
        <>
            <Paper className={classes.loginOuter}>
                <div className={classes.loginInner}>
                    <h1>アンケート</h1>
                    <Grid container spacing={4} alignItems="flex-end">
                        <Grid item md={true} sm={true} xs={true}>
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
                        <Grid item md={true} sm={true} xs={true}>
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
                    <Grid container spacing={4} alignItems="flex-end">
                        <Grid item md={true} sm={true} xs={true}>
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
                        <Grid item md={true} sm={true} xs={true}>
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
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item md={true} sm={true} xs={true} className={classes.mb} >
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
                </div>

            </Paper>
        </>
        
    );
};