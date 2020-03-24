import React from 'react';
import { Container, Typography, Button } from '@material-ui/core';

export const ComputedAnswer = ({topScoreTitles}) => {
    let title = "";
    if (topScoreTitles.length === 4) {
        title = "バランス";
    } else {
        title = topScoreTitles.reduce((accum, current) => `${accum}・${current}`);
    }
    return (
        <Container>
            <Typography variant="h5" component="h2">
                {`${title}重視タイプ！`}
            </Typography>
            <Button variant="outlined">
                {`${title}重視タイプなあなたへのおススメ！`}
            </Button>
        </Container>
    );
};

