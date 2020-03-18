import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    TableCell,
    TableRow,
    Typography,
    TextField,
    MenuItem
} from "@material-ui/core";
import { AddDialog } from "./AddDialog";
import { SurveySwitch } from "./SurveySwitch";
import { AdminTable } from "./AdminTable";
import { TextCells } from "./TextCells";
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
    }, []);
    

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
                        category: 0,
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

    const handleChange = e => {
        setNewContent({...newContent, [e.target.name]: e.target.value});
    };
    
    const clickUpdateSwitch = (index, text) => {
        if (changeSwitch[index]) {
            const textId = text.id;
            const updateJSON = {"title": text.title, "category": text.category, "survey_id": questionIndex };
            axios
                .patch(`${process.env.REACT_APP_SJC_QUESTIONS}/${textId}`, updateJSON)
                .then(res => {
                    alert(`${res.data.data.title}を更新しました。`);

                })
                .catch(err => {
                    alert("更新に失敗しました。");
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

    const categories = [
        {
            value: 0,
            label: "収入"
        },
        {
            value: 1,
            label: "安定"
        },
        {
            value: 2,
            label: "ライフスタイル"
        },
        {
            value: 3,
            label: "環境"
        }
    ];

    const dialogAtrr = {
        clickAddSwitch: clickAddSwitch,
        newContent: newContent,
        modalModule: modalModule,
        handleChange: handleChange,
        categories: categories
    };

    const textList = targetTexts.map((text, index) => {
        const textsCopy = targetTexts.slice();
        const handleChangetext = e => {
            textsCopy[index][e.target.name] = e.target.value;
            setTargetTexts(textsCopy);
        };

        const computedCategory = num => {
            const targetCategory = categories.find(category => {
                return category.value === num;
            });
            return targetCategory.label;
        };


        const textData = [
            text.title,
            computedCategory(text.category)
        ];

        return (
            <TableRow key={text.id}>
                {changeSwitch[index] ? (
                    <>
                    <TableCell>
                        <TextField
                            name="title"
                            label="タイトル"
                            type="text"
                            value={text.title}
                            onChange={e => handleChangetext(e)}
                            fullWidth
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            name="category"
                            select
                            label="カテゴリ"
                            type="number"
                            value={text.category}
                            onChange={e => handleChangetext(e)}
                            fullWidth
                            required
                        >
                            {categories.map(category => (
                                <MenuItem key={category.value} value={category.value}>
                                    {category.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </TableCell>
                    </>
                ) : (
                    <TextCells datas={textData} />
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
            <AdminTable dataList={textList} headList={["設問", "カテゴリ", ""]} />
            <AddDialog {...dialogAtrr} />
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