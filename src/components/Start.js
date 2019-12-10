import React from 'react';
import { useHistory } from "react-router-dom";

export const Start = () => {
    const history = useHistory();
    return (
        <div>
            <h1>Hello, React App!</h1>
            <button
                onClick={() => history.push('/questions/1')}
            >始める</button>
        </div>
    );
};