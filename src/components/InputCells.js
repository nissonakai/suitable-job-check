import React from 'react';
import { TableCell } from '@material-ui/core';

export const InputCells = ({datas}) => {
    const cells = datas.map(data => {
        return (
        <TableCell><input name={data.name} placeholder={data.placeholder} value={data.value} onChange={data.handleChange} /></TableCell>
        )
    });
    return (
        <>
            {cells}
        </>
    );
};