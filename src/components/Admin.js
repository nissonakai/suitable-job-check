import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

export const Admin = () => {
    const history = useHistory();
    return (
        <>
            <h1>ログイン</h1>
            <Button
                variant="contained"
                color="primary"
                onClick={() => history.push('/admin/questions')}
            >管理画面へ</Button>
        </>
        
    );
};