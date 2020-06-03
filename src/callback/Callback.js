import React from 'react';
import { CircularProgress } from '@material-ui/core';

export const Callback = props => {
    props.auth.handleAuthentication().then(() => props.history.push('/admin/surveys'));

    return <CircularProgress />;
};