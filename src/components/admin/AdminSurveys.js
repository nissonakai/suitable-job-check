import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    TableCell,
    TableRow,
    Typography,
    Container
} from "@material-ui/core";
import { AddDialog } from "./AddDialog";
import { AdminTable } from "./AdminTable";
import { TextCells } from "./TextCells";
import { PageHeader } from "../PageHeader";
import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

const useStyles = makeStyles({
    table: {
        maxWidth: "80%",
        margin: "0 auto 2em"
    },
    mt: {
        marginTop: "2em"
    }
});

export const AdminSurveys = ({ surveys, setSurveys, auth }) => {

    const authenticated = auth.isAuthenticated();
    const classes = useStyles();
    const history = useHistory();
    const switchArray = Array(surveys.length);
    switchArray.fill(false);
    const [newContent, setNewContent] = useState({ name: "" });

    useEffect(() => {
        const getSurveys = () => {
            axios.get(process.env.REACT_APP_SJC_SURVEYS)
                .then(results => {
                    const datas = results.data.data;
                    setSurveys(datas);
                }).catch(error => {
                    console.log(error);
                });
        };
        getSurveys();
    }, [surveys, setSurveys]);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const modalModule = {
        open: open,
        handleClickOpen: handleClickOpen,
        handleClose: handleClose
    };

    const clickAddSwitch = () => {
        const auth_options = {
            headers: { 'Authorization': `Bearer ${auth.getIdToken()}` }
        };
        axios
            .post(process.env.REACT_APP_SJC_SURVEYS, newContent, auth_options)
            .then(res => {
                alert(`${res.data.data.name}を追加しました。`);
                setOpen(false);
            })
            .catch(err => {
                alert("追加に失敗しました。");
                console.log(err);
            });
    }

    const handleChange = e => {
        setNewContent({ ...newContent, [e.target.name]: e.target.value });
    };

    const editSurvey = true;

    const clickDeleteSwitch = survey => {
        const auth_options = {
            headers: { 'Authorization': `Bearer ${auth.getIdToken()}` }
        };
        const surveyId = survey.id;
        const confirmWindow = window.confirm(`${survey.name}を削除してもよろしいですか？`);
        if (confirmWindow) {
            axios
                .delete(`${process.env.REACT_APP_SJC_SURVEYS}/${surveyId}`, auth_options)
                .then(res => {
                    const deletedSurveys = surveys.filter(survey => survey.id !== surveyId);
                    setSurveys(deletedSurveys);
                    alert(`${res.data.data.name}を削除しました。`);
                })
                .catch(err => {
                    alert("削除に失敗しました。");
                    console.log(err);
                });
        };
    };

    const dialogAtrr = {
        clickAddSwitch: clickAddSwitch,
        newContent: newContent,
        modalModule: modalModule,
        editSurvey: editSurvey,
        handleChange: handleChange
    };


    const surveyList = surveys.map((survey, index) => {

        const textData = [survey.name];
        const createdDatetime = survey.created_at.slice(0, 16).replace("T", " ");
        return (

            <TableRow key={survey.id}>
                <TextCells datas={textData} />
                <TableCell>
                    <Typography variant="body1" gutterBottom>{createdDatetime}</Typography>
                </TableCell>
                <TableCell>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => history.push(`/admin/questions/${survey.id}`)}
                    >編集</ Button>
                    {survey.selected ? (
                        <Button
                            variant="contained"
                            disabled
                        >選択中</ Button>
                    ) : (
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => clickDeleteSwitch(survey)}
                            >削除</Button>
                        )}

                </TableCell>
            </TableRow>
        )
    });

    return (
        authenticated ? (
            <>
                <PageHeader title="調査編集画面" />
                <Typography variant="h4" component="h1" gutterBottom>調査編集画面</Typography>
                <AdminTable dataList={surveyList} headList={["タイトル", "作成日時", ""]} />
                <AddDialog {...dialogAtrr} />
                <Container className={classes.mt}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => history.push('/')}>
                        メイン画面へ
            </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => history.push('/admin/areas')}>
                        お仕事No.編集画面へ
            </Button>
                </Container>
            </>
        ) : <Redirect to={'/admin'} />);
};