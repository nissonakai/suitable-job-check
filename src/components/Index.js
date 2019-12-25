import React from 'react';
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
} from "@material-ui/core";
import {
    Add
} from '@material-ui/icons';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    table: {
      maxWidth: "80%",
      margin: "0 auto 2em"
    },
  });

export const Index = ({ texts }) => {
    const classes = useStyles();

    const history = useHistory();
    const textList = texts.map((text, index) => {

        return (

            <TableRow key={text.title}>
                <TableCell><p>{text.title}</p></TableCell>
                <TableCell><p>{text.red}</p></TableCell>
                <TableCell><p>{text.blue}</p></TableCell>
                <TableCell>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => history.push(`edit/${index}`)}
                    >編集</ Button>
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
        <h1>設問管理画面</h1>
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