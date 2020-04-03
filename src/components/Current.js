import React from 'react';
import { Typography, Container } from "@material-ui/core";

export const Current = ({texts, index}) => {
    return (
        <Container>
            <Typography variant="caption">
                {texts.length}問中{index}問目
            </Typography>
        </Container>
    )
};