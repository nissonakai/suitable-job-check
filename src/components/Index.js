import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Fab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography
} from "@material-ui/core";
import {
    Add
} from '@material-ui/icons';
// import { useHistory } from "react-router-dom";
import axios from "axios";
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

    const clickChangeSwitch = (index, text) => {
        if (changeSwitch[index]) {
            const textId = text.id;
            console.log(textId);
            const updateJSON = {"title": text.title, "red": text.red, "blue": text.blue};
            console.log(updateJSON);
            axios
                .patch(`${process.env.REACT_APP_SJC_API}/${textId}`, updateJSON)
                .then(res => {
                    alert(`更新しました。`);
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
                        onClick={() => clickChangeSwitch(index, text)}
                >{changeSwitch[index] ? "確定" : "編集"}</ Button>
                    <Button
                        variant="contained"
                        color="secondary"
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
            <Fab color="secondary" aria-label="edit">
                <Add />
            </Fab>
        </>
    );
};