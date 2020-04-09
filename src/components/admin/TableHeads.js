import React from 'react';
import { TableHead, TableRow, TableCell } from "@material-ui/core";

export const TableHeads = ({cells}) => {

    const tableCells = cells.map(cell => {
        return (
            <TableCell key={cell}>{cell}</TableCell>
        )
    });

    return (
        <TableHead>
            <TableRow>
                {tableCells}
            </TableRow>
        </TableHead>
    )
}