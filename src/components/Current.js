import React from 'react';

export const Current = ({texts, index}) => {
    return (
        <div>
            <p>{texts.length}問中{index}問目</p>
        </div>
    )
};