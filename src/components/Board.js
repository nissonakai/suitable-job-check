import React from "react";
import { Button } from "@material-ui/core";

export const Board = ({ texts, doAnswer, index }) => {
    return (
        <div>
            <h1>{texts[index].title}</h1>
            <Button variant="contained" color="secondary" onClick={() => doAnswer(texts[index].red)} >
                {texts[index].red}
            </ Button>
            <Button variant="contained" color="primary" onClick={() => doAnswer(texts[index].blue)} >
                {texts[index].blue}
            </ Button>
        </div>

    )
};