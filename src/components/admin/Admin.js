import React from 'react';
import { Button, Typography, Container } from "@material-ui/core";
import { PageHeader } from "../PageHeader";

export const Admin = ({auth}) => {
    const authenticated = auth.isAuthenticated();
    if (!authenticated) {
        return (
            <Container>
                <PageHeader title="ログイン" />
                <Typography variant="h4" component="h1" gutterBottom>
                    ログイン画面
                </Typography>
                <Button
                variant="contained"
                color="primary"
                onClick={() => auth.login()}>ログインする</Button>
            </Container>
            
        )
    };
}