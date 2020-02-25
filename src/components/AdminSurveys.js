import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    TableCell,
    TableRow,
    Typography,
} from "@material-ui/core";
import { AddDialog } from "./AddDialog";
import { AdminTable } from "./AdminTable";
import { TextCells } from "./TextCells";
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
    const [newContent, setNewContent] = useState({name: ""});

    const getSurveys = () => {
        axios.get(process.env.REACT_APP_SJC_SURVEYS)
          .then(results => {
            const datas = results.data.data;
            setSurveys(datas);
          }).catch(error => {
            console.log(error);
          })
      };
    
      useEffect(() => {
        getSurveys();
      }, [surveys]);
    
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
        axios
            .post(process.env.REACT_APP_SJC_SURVEYS, newContent)
            .then(res => {
                getSurveys();
                console.log(res);
                alert(`${res.data.data.name}を追加しました。`);
                setOpen(false);
            })
            .catch(err => {
                alert("追加に失敗しました。");
                console.log(err);
            });
    }

    const handleChange_name = e => {
        setNewContent({...newContent, name: e.target.value});
    };

    const handleChangeModule = {
        handleChange_name: handleChange_name,
    };
    
    const clickDeleteSwitch = survey => {
        const surveyId = survey.id;
        const confirmWindow = window.confirm(`${survey.name}を削除してもよろしいですか？`);
        if (confirmWindow) {
            axios
            .delete(`${process.env.REACT_APP_SJC_SURVEYS}/${surveyId}`)
            .then(res => {
                const deletedSurveys = surveys.filter(survey => {
                    return survey.id !== surveyId;
                });
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
        handleChangeModule: handleChangeModule
    };

    
    const surveyList = surveys.map((survey, index) => {

        const textData = [survey.name];
    
        return (

            <TableRow key={survey.id}>
                <TextCells datas={textData} />
                <TableCell>
                    <p>{survey.created_at}</p>
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
                    ): (
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
            <Typography variant="h3">調査編集画面</Typography>
            <AdminTable dataList={surveyList} headList={["タイトル", "作成日時", ""]} />
            <AddDialog {...dialogAtrr} />
            <div className={classes.mt}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => history.push('/')}>
                メイン画面へ
            </Button>
            </div>
        </>
        ):(
            <Redirect to={'/admin'} />
        )
        
    );
};