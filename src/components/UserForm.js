import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Paper, Grid, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Email, LockOpen } from '@material-ui/icons';
import axios from 'axios';

const useStyle = makeStyles({
    loginOuter: {
        width: "70%",
        margin: "0 auto 3rem"
    },
    loginInner: {
        width: "80%",
        margin: "0 auto"
    },
    pb: {
        padding: "0 auto 3rem"
    },
    mb: {
        margin: "0 auto 3rem"
    }
})

export const UserForm = () => {
    const history = useHistory();
    const classes = useStyle();
    const [loginElements, setLoginElements] = useState({
        email: "",
        password: ""
    });

    const handleChangeEmail = e => {
        setLoginElements({...loginElements, email: e.target.value});
    };
    const handleChangePassword = e => {
        setLoginElements({...loginElements, password: e.target.value});
    };

    const signIn = loginElements => {
        axios.post(process.env.REACT_APP_SJC_SIGNIN, loginElements)
            .then(res => {
                alert("ログインに成功しました");
                console.log(res);
                history.push('/admin/questions');
            })
            .catch(err => {
                alert("ログインに失敗しました。");
                console.log(err);
            });
    }


    return (
        <>
            <h1 className={classes.mb}>ログイン</h1>
            <Paper className={classes.loginOuter}>
                <div className={classes.loginInner}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Email />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField
                                id="email"
                                label="メールアドレス"
                                type="email"
                                value={loginElements.email}
                                onChange={e => handleChangeEmail(e)}
                                fullWidth
                                autoFocus
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <LockOpen />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true} className={classes.mb} >
                            <TextField
                                id="password"
                                label="パスワード"
                                type="password"
                                value={loginElements.password}
                                onChange={e => handleChangePassword(e)}
                                fullWidth
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Button variant="outlined" color="primary" style={{ textTransform: "none" }} className={classes.mb} onClick={() => signIn(loginElements)}>ログイン</Button>
                    </Grid>
                </div>

            </Paper>
        </>
        
    );
};