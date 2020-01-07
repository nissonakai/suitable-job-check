import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from "@material-ui/core";
import axios from "axios";
import { AddDialog } from "./AddDialog";
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

const useStyles = makeStyles({
    table: {
      maxWidth: "80%",
      margin: "0 auto 2em"
    },
  });

export const Index = ({ texts, setTexts }) => {
    const classes = useStyles();
    const switchArray = Array(texts.length);
    switchArray.fill(false);
    const [changeSwitch, setChangeSwitch] = useState(switchArray);
    const [newContent, setNewContent] = useState({
        title: "",
        red: "",
        blue: ""
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
    }

    const clickAddSwitch = () => {
        axios
            .post(process.env.REACT_APP_SJC_API, newContent)
            .then(res => {
                const newTexts = [...texts, newContent];
                setTexts(newTexts);
                alert(`${res.data.data.title}を追加しました。`);
                setOpen(false);
            })
            .catch(err => {
                alert("追加に失敗しました。");
                console.log(err);
            });
    }

    const handleChange_title = e => {
        setNewContent({...newContent, title: e.target.value})
    };
    const handleChange_red = e => {
        setNewContent({...newContent, red: e.target.value})
    };
    const handleChange_blue = e => {
        setNewContent({...newContent, blue: e.target.value})
    };

    const handleChangeModule = {
        handleChange_title: handleChange_title,
        handleChange_red: handleChange_red,
        handleChange_blue: handleChange_blue
    };

    
    const clickUpdateSwitch = (index, text) => {
        if (changeSwitch[index]) {
            const textId = text.id;
            const updateJSON = {"title": text.title, "red": text.red, "blue": text.blue};
            axios
                .patch(`${process.env.REACT_APP_SJC_API}/${textId}`, updateJSON)
                .then(res => {
                    alert(`${res.data.data.title}を更新しました。`);

                })
                .catch(err => {
                    alert("更新に失敗しました。");
                    console.log(err);
                });
        }
        const copyArray = changeSwitch.slice();
        copyArray[index] = !changeSwitch[index];
        setChangeSwitch(copyArray);
    };

    const clickDeleteSwitch = text => {
        const textId = text.id;
        const confirmWindow = window.confirm(`${text.title}を削除してもよろしいですか？`);
        if (confirmWindow) {
            axios
            .delete(`${process.env.REACT_APP_SJC_API}/${textId}`)
            .then(res => {
                const deletedTexts = texts.filter(text => {
                    return text.id !== textId;
                });
                setTexts(deletedTexts);
                alert(`${res.data.data.title}を削除しました。`)
            })
            .catch(err => {
                alert("削除に失敗しました。");
                console.log(err);
            });
        };
    };


    const textList = texts.map((text, index) => {
        const textsCopy = texts.slice();
        const handleChange = e => {
            switch(e.target.name) {
                case 'title':
                    textsCopy[index].title = e.target.value;
                    setTexts(textsCopy);
                    break;
                case 'red':
                    textsCopy[index].red = e.target.value;
                    setTexts(textsCopy);
                    break;
                case 'blue':
                    textsCopy[index].blue = e.target.value;
                    setTexts(textsCopy);
                    break;
                default:
                    break;
            };
        }
    
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
        <>
            <Typography variant="h2">設問編集画面</Typography>
            <TableContainer className={classes.table} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableCell>設問</TableCell>
                        <TableCell>選択肢１</TableCell>
                        <TableCell>選択肢２</TableCell>
                        <TableCell></TableCell>
                    </TableHead>
                    <TableBody>{textList}</TableBody>
                </Table>
            </TableContainer>
            <AddDialog
                clickAddSwitch={clickAddSwitch}
                newContent={newContent}
                modalModule={modalModule}
                handleChangeModule={handleChangeModule}
            />
        </>
    );
};