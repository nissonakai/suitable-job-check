import React from 'react';
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

export const Start = () => {
    const history = useHistory();
    return (
        <div>
            <h1>診断テスト</h1>
            <Button
                variant="contained"
                onClick={() => history.push('/questions/1')}
            >始める</Button>
        </div>
    );
};