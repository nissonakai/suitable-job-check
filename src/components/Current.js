import React from 'react';
import { Typography } from "@material-ui/core";

export const Current = ({texts, index}) => {
    return (
        <div>
            <Typography variant="p">
                {texts.length}問中{index}問目
            </Typography>
        </div>
    )
};