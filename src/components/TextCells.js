import React from 'react';
import { TableCell } from '@material-ui/core';

export const TextCells = ({datas}) => {
    const cells = datas.map(data => {
        return (
            <TableCell key={data}><p>{data}</p></TableCell>
        );
    });
    return (
        <>
        {cells}
        </>
    )
}