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

export const UserForm = ({ answers, computedData, categories, calcResult }) => {
    const history = useHistory();
    const classes = useStyle();

    const answers_text =
        answers
            .map(answer => `設問: ${answer.title}, カテゴリ: ${answer.category}, 値: ${answer.value}`)
            .reduce((accum, current) => `${accum}/${current}`);

    const resultTitle = calcResult()[1];

    const [sendElements, setSendElements] = useState({
        email: "",
        age: "",
        sex: "",
        job: "",
        wage: "",
        place: "",
        dormitory: false,
        answers: answers_text,
        result_title: resultTitle
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

    const places = ["北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県",
    "茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
    "新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県",
    "静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県",
    "奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県",
    "徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県",
    "熊本県","大分県","宮崎県","鹿児島県","沖縄県"
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
        const validPlace = sendElements.place !== "";
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
                                name="place"
                                select
                                label="居住地"
                                type="text"
                                value={sendElements.place}
                                fullWidth
                                onChange={e => handleChange(e)}
                                helperText="現在の居住地をお答えください"
                                required
                            >
                                {places.map(place => (
                                    <MenuItem key={place} value={place}>
                                        {place}
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