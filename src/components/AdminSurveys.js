import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Badge,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from "@material-ui/core";
import { AddDialog } from "./AddDialog";
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
    const [changeSwitch, setChangeSwitch] = useState(switchArray);
    const [newContent, setNewContent] = useState({
        name: ""
    });

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
                const newSurveys = [...surveys, newContent];
                setSurveys(newSurveys);
                alert(`${res.data.data.title}を追加しました。`);
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
    
    const clickUpdateSwitch = (index, survey) => {
        if (changeSwitch[index]) {
            const surveyId = survey.id;
            const updateJSON = { "name": survey.name };
            axios
                .patch(`${process.env.REACT_APP_SJC_SURVEYS}/${surveyId}`, updateJSON)
                .then(res => {
                    alert(`${res.data.data.name}を更新しました。`);

                })
                .catch(err => {
                    alert("更新に失敗しました。");
                    console.log(err);
                });
        };
        const copyArray = changeSwitch.slice();
        copyArray[index] = !changeSwitch[index];
        setChangeSwitch(copyArray);
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

    
    const surveyList = surveys.map((survey, index) => {
        const surveysCopy = surveys.slice();
        const handleChange = e => {
            surveysCopy[index].name = e.target.value;
            setSurveys(surveysCopy);
        }
    
        return (

            <TableRow key={survey.id}>
                {changeSwitch[index] ? (
                    <>
                        <TableCell><input name="title" placeholder="タイトル" value={survey.name} onChange={e => handleChange(e, index)} /></TableCell>
                    </>
                ) : (
                    <>
                        <TableCell onClick={() => history.push(`/admin/questions/${survey.id}`)}>
                            {survey.selected ? (
                                <Badge badgeContent="選択中" color="primary"><p>{survey.name}</p></Badge>
                            ): (
                                <p>{survey.name}</p>
                            )}
                        </TableCell>
                    </>
                )}
                <TableCell>
                            <p>{survey.created_at}</p>
                </TableCell>
                <TableCell>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => clickUpdateSwitch(index, survey)}
                    >{changeSwitch[index] ? "確定" : "編集"}</ Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => clickDeleteSwitch(survey)}
                    >削除</ Button>
                </TableCell>
            </TableRow>
        )
    });

    return (
        authenticated ? (
            <>
            <Typography variant="h3">調査編集画面</Typography>
            <TableContainer className={classes.table} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>タイトル</TableCell>
                            <TableCell>作成日時</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{surveyList}</TableBody>
                </Table>
            </TableContainer>
            <AddDialog
                clickAddSwitch={clickAddSwitch}
                newContent={newContent}
                modalModule={modalModule}
                handleChangeModule={handleChangeModule}
            />
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