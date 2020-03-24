import React from 'react';
import { withRouter } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

const Callback = props => {
    props.auth.handleAuthentication().then(() => {
        props.history.push('/admin/surveys');
    });

    return <CircularProgress />;
};

export default withRouter(Callback);