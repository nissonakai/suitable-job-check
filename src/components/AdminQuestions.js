import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Typography,
} from "@material-ui/core";
import { AddDialog } from "./AddDialog";
import { SurveySwitch } from "./SurveySwitch";
import { TableHeads } from "./TableHeads";
import { useHistory, useParams, Redirect } from "react-router-dom";
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

export const AdminQuestions = ({texts, surveys, getQuestions, auth}) => {

    const authenticated = auth.isAuthenticated();
    const classes = useStyles();
    const history = useHistory();
    const { questionIndex } = useParams();
    const [targetTexts, setTargetTexts] = useState([]);
    
    const getTarget = () => {
        const targetArr = texts.filter(text => {
            return text.survey_id === Number(questionIndex);
        });
        setTargetTexts(targetArr);
    };

    const [selected, setSelected] = useState(false);
    const [targetSurveyName, setTargetSurveyName] = useState(false);

    const getSelected = () => {
        const selectedSurvey = surveys.find(survey => {
            return survey.selected === true;
        });
        const selectedId = selectedSurvey.id;
        if (selectedId === Number(questionIndex)) {
            setSelected(true);
        };
    };

    const getCurrentSurvey = (async () => {
        const targetSurvey = await surveys.find(survey => {
            return survey.id === Number(questionIndex); 
         });
         const currentSurvey = await targetSurvey.name;
         return await setTargetSurveyName(currentSurvey);
    });

    useEffect(() => {
        getTarget();
        getSelected();
        getCurrentSurvey();
    }, [texts]);
    

    const switchArray = Array(targetTexts.length);
    switchArray.fill(false);
    const [changeSwitch, setChangeSwitch] = useState(switchArray);
    const [newContent, setNewContent] = useState({
        title: "",
        red: "",
        blue: "",
        survey_id: questionIndex
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
            .post(process.env.REACT_APP_SJC_QUESTIONS, newContent)
            .then(res => {
                if (res.data.status === 'SUCCESS') {
                    const newTexts = [...targetTexts, newContent];
                    setTargetTexts(newTexts);
                    alert(`${res.data.data.title}を追加しました。`);
                    setOpen(false);
                    setNewContent({
                        title: "",
                        red: "",
                        blue: "",
                        survey_id: questionIndex
                    });
                } else {
                    alert(res.data.data.title);
                };
            })
            .catch(err => {
                alert("追加に失敗しました。");
                console.log(err);
            });
    }

    const handleChange_title = e => {
        setNewContent({...newContent, title: e.target.value});
    };
    const handleChange_red = e => {
        setNewContent({...newContent, red: e.target.value});
    };
    const handleChange_blue = e => {
        setNewContent({...newContent, blue: e.target.value});
    };

    const handleChangeModule = {
        handleChange_title: handleChange_title,
        handleChange_red: handleChange_red,
        handleChange_blue: handleChange_blue
    };

    
    const clickUpdateSwitch = (index, text) => {
        if (changeSwitch[index]) {
            const textId = text.id;
            const updateJSON = {"title": text.title, "red": text.red, "blue": text.blue, "survey_id": questionIndex };
            axios
                .patch(`${process.env.REACT_APP_SJC_QUESTIONS}/${textId}`, updateJSON)
                .then(res => {
                    alert(`${res.data.data.title}を更新しました。`);

                })
                .catch(err => {
                    alert("更新に失敗しました。");
                    getQuestions();
                });
        };
        const copyArray = changeSwitch.slice();
        copyArray[index] = !changeSwitch[index];
        setChangeSwitch(copyArray);
    };

    const clickDeleteSwitch = text => {
        const textId = text.id;
        const confirmWindow = window.confirm(`${text.title}を削除してもよろしいですか？`);
        if (confirmWindow && textId) {
            axios
            .delete(`${process.env.REACT_APP_SJC_QUESTIONS}/${textId}`)
            .then(res => {
                const deletedTexts = targetTexts.filter(text => {
                    return text.id !== textId;
                });
                setTargetTexts(deletedTexts);
                alert(`${res.data.data.title}を削除しました。`);
            })
            .catch(err => {
                alert("削除に失敗しました。");
                console.log(err);
            });
        } else if (confirmWindow) {
            const deletedTexts = targetTexts.filter(data => {
                return data.title !== text.title;
            });
            setTargetTexts(deletedTexts);
            alert(`${text.title}を削除しました。`);
        };
    };

    
    const textList = targetTexts.map((text, index) => {
        const textsCopy = targetTexts.slice();
        const handleChange = e => {
            textsCopy[index][e.target.name] = e.target.value;
            setTargetTexts(textsCopy);
        };
    
        return (

            <TableRow key={text.id}>
                {changeSwitch[index] ? (
                    <>
                        <TableCell><input name="title" placeholder="設問" value={text.title} onChange={e => handleChange(e, index)} /></TableCell>
                        <TableCell><input name="red" placeholder="選択肢１" value={text.red} onChange={e => handleChange(e, index)} /></TableCell>
                        <TableCell><input name="blue" placeholder="選択肢２" value={text.blue} onChange={e => handleChange(e, index)} /></TableCell>
                    </>
                ) : (
                    <>
                        <TableCell><p>{text.title}</p></TableCell>
                        <TableCell><p>{text.red}</p></TableCell>
                        <TableCell><p>{text.blue}</p></TableCell>
                    </>
                )}
                <TableCell>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => clickUpdateSwitch(index, text)}
                >{changeSwitch[index] ? "確定" : "編集"}</ Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => clickDeleteSwitch(text)}
                    >削除</ Button>
                </TableCell>
            </TableRow>
        )
    });

    return (
        authenticated ? (
        <>
            <Typography variant="h3">{`${targetSurveyName}編集画面`}</Typography>
            <SurveySwitch selected={selected} setSelected={setSelected} />
            <TableContainer className={classes.table} component={Paper}>
                <Table aria-label="simple table">
                    <TableHeads cells={["設問", "選択肢1", "選択肢2", ""]} />
                    <TableBody>{textList}</TableBody>
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
            <Button
                variant="contained"
                color="secondary"
                onClick={() => history.push('/admin/surveys')}>
                    調査一覧
            </Button>
            </div>
        </>
        ) : (
            <Redirect to={'/admin'} />
        )
    );
};