import React from 'react';

export const SwitchCells = ({cells, flag}) => {
    return (
        <>
        {flag ? (
            cells.trueComp
        ) : (
            cells.falseComp
        )}
        </>
    )
};