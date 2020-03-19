import React from 'react';
import { TableCell, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export const LinkCells = ({datas}) => {
    const history = useHistory();
    const cells = datas.map(data => {
        return (
            <TableCell onClick={() => history.push(data.path)}>
                <Typography variant="p">
                    {data.text}
                </Typography>
            </TableCell>
        )
    });
    return (
        <>
        {cells}
        </>
    )
}