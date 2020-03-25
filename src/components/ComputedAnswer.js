import React from 'react';
import { Container, Typography, Button } from '@material-ui/core';

export const ComputedAnswer = ({topScoreTitles}) => {
    const resultTitle = topScoreTitles.length === 4 
        ? "バランス"
        : topScoreTitles.reduce((accum, current) => `${accum}・${current}`);
    return (
        <Container>
            <Typography variant="h5" component="h2">
                {`${resultTitle}重視タイプ！`}
            </Typography>
            <Button variant="outlined">
                {`${resultTitle}重視タイプなあなたへのおススメ！`}
            </Button>
        </Container>
    );
};

