import React from 'react';
import { Container, Typography } from '@material-ui/core';

export const ComputedAnswer = ({topScoreTitle}) => {
    return (
        <Container>
            <Typography variant="h5" component="h2">
                {`${topScoreTitle}重視タイプ！`}
            </Typography>
        </Container>
    );
};

