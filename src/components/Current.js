import React from 'react';

export const Current = ({answers}) => {
    const answerList = answers.map(answer => {
        return <li key={answer}>{answer}</li>
    });
    return (
        <ul>
            {answerList}
        </ul>
    )
};