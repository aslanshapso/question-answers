import React from 'react'

import AnswersHeader from './AnswersHeader';
import Answer from './Answer';

const AnswersList = ({ answers, onDelete }) => (
    <div className="wrapper">
        <AnswersHeader />
        <div className="answers-overflow-y">
            {answers.map(answer =>
               <Answer key={answer.id} answer={answer} onClick={onDelete}/>
            )}
        </div>
    </div>
)

export default AnswersList;
