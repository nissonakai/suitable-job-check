import React from 'react';
import { withRouter } from 'react-router-dom';

const Callback = props => {
    props.auth.handleAuthentication().then(() => {
        props.history.push('/admin/surveys');
    });

    return (
        <div>
            Loading user profile.
        </div>
    );
};

export default withRouter(Callback);