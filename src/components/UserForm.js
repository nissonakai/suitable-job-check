import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Paper, Grid, TextField, Checkbox, FormControlLabel, MenuItem, Typography, Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

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

export const UserForm = ({ answers, computedData, categories, calcResult, setRecommendJobs }) => {
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

    const sexs = [
        {
            value: 1,
            label: "男性"
        },
        {
            value: 2,
            label: "女性"
        },
        {
            value: 3,
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

    const prefectures = [
      {id: 1, name: '北海道'}, {id: 2, name: '青森県'}, {id: 3, name: '岩手県'},
      {id: 4, name: '宮城県'}, {id: 5, name: '秋田県'}, {id: 6, name: '山形県'},
      {id: 7, name: '福島県'}, {id: 8, name: '茨城県'}, {id: 9, name: '栃木県'},
      {id: 10, name: '群馬県'}, {id: 11, name: '埼玉県'}, {id: 12, name: '千葉県'},
      {id: 13, name: '東京都'}, {id: 14, name: '神奈川県'}, {id: 15, name: '新潟県'},
      {id: 16, name: '富山県'}, {id: 17, name: '石川県'}, {id: 18, name: '福井県'},
      {id: 19, name: '山梨県'}, {id: 20, name: '長野県'}, {id: 21, name: '岐阜県'},
      {id: 22, name: '静岡県'}, {id: 23, name: '愛知県'}, {id: 24, name: '三重県'},
      {id: 25, name: '滋賀県'}, {id: 26, name: '京都府'}, {id: 27, name: '大阪府'},
      {id: 28, name: '兵庫県'}, {id: 29, name: '奈良県'}, {id: 30, name: '和歌山県'},
      {id: 31, name: '鳥取県'}, {id: 32, name: '島根県'}, {id: 33, name: '岡山県'},
      {id: 34, name: '広島県'}, {id: 35, name: '山口県'}, {id: 36, name: '徳島県'},
      {id: 37, name: '香川県'}, {id: 38, name: '愛媛県'}, {id: 39, name: '高知県'},
      {id: 40, name: '福岡県'}, {id: 41, name: '佐賀県'}, {id: 42, name: '長崎県'},
      {id: 43, name: '熊本県'}, {id: 44, name: '大分県'}, {id: 45, name: '宮崎県'},
      {id: 46, name: '鹿児島県'}, {id: 47, name: '沖縄県'}
];


    const handleChange = e => {
        setSendElements({ ...sendElements, [e.target.name]: e.target.value });
    };

    const handleChecked = e => {
        setSendElements({ ...sendElements, dormitory: e.target.checked });
    };

    const sendData = data => {
        console.log(data);
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