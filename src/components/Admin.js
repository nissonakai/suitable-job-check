import React from 'react';
import { Button } from "@material-ui/core";

export const Admin = ({auth}) => {
    const authenticated = auth.isAuthenticated();
    if (!authenticated) {
        return (
            <div>
                <h1>ログイン画面</h1>
                <Button
                variant="contained"
                color="primary"
                onClick={() => auth.login()}>ログインする</Button>
            </div>
            
        )
    };
}