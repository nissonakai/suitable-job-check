import React from 'react';

export const Current = ({answers}) => {
    const answerList = answers.map(answer => {
        return <li key={answer.body}>{answer.body}</li>
    });
    return (
        <ul>
            {answerList}
        </ul>
    )
};