import React from 'react';
import {
    TableContainer,
    Table,
    TableBody,
    Paper
} from '@material-ui/core';
import { TableHeads } from "./TableHeads";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    table: {
        maxWidth: "80%",
        margin: "0 auto 2em"
    }
});


export const AdminTable = ({dataList, headList}) => {
    const classes = useStyles();
    return (
        <TableContainer className={classes.table} component={Paper}>
            <Table aria-label="simple table">
                <TableHeads cells={headList} />
                <TableBody>{dataList}</TableBody>
            </Table>
        </TableContainer>
    )
};