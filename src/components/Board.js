import React from "react";
import { Button } from "./Button";

export const Board = ({texts, doAnswer, index}) => {
    return (
        <div>
            <h2>{texts[index].title}</h2>
            <Button text={texts[index].red} onClick={() => doAnswer(texts[index].red)} />
            <Button text={texts[index].blue} onClick={() => doAnswer(texts[index].blue)} />
        </div>

    )
};