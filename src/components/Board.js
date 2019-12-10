import React from "react";
import { Button } from "./Button";

export const Board = ({texts, doAnswer, index}) => {
    return (
        <div>
            <h1>{texts[index].title}</h1>
            <Button text={texts[index].red} onClick={() => doAnswer(texts[index].red)} />
            <Button text={texts[index].blue} onClick={() => doAnswer(texts[index].blue)} />
        </div>

    )
};