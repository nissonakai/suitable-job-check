import React from 'react';

export const Current = ({answers}) => {
    const answerList = answers.map(answer => {
        return (
            <p key={answer.title}>{answer.title} :{answer.value}</p>
        );
    });
    return (
        <div>
            {answerList}
        </div>
    )
};