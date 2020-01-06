import React, { useState } from 'react';
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";

export const Edit = ({texts}) => {
    const [ tempTexts, setTempTexts ] = useState(texts);
    const history = useHistory();
    const { index } = useParams();
    const text = tempTexts[index];
    console.log(tempTexts);
    const textsCopy = texts.slice();

    const handleChange = e => {
        switch(e.target.name) {
            case 'title':
                textsCopy[index].title = e.target.value;
                setTempTexts(textsCopy);
                break;
            case 'selection1':
                textsCopy[index].red = e.target.value;
                setTempTexts(textsCopy);
                break;
            case 'selection2':
                textsCopy[index].blue = e.target.value;
                setTempTexts(textsCopy);
                break;
            default:
                break;
        };
    };
        
    const editQuestion = e => {
        e.preventDefault();
        const elements = e.target.elements;
        const params = {
            title: elements.title.value,
            red: elements.selection1.value,
            blue: elements.selection2.value
        };
        console.log(params);
        history.push("/admin/index");
    };

    return (
        <div>
        <p>{parseInt(index, 10) + 1}番目の問題</p>
        <form 
            onSubmit={e => editQuestion(e, index)}
        >
            <TextField value={text.title} label="タイトル" name="title" onChange={e => handleChange(e)} />
            <TextField value={text.red} label="選択肢１" name="selection1" onChange={e => handleChange(e)} />
            <TextField value={text.blue} label="選択肢２" name="selection2" onChange={e => handleChange(e)} />
            <div>
                <Button type="submit">変更</ Button>
            </div>
        </form>
        </div>
        )
};