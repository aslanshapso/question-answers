import React from 'react'

// Answers Header statless component - display only hardcoded text
// calback onClick - answerId
const Answer = ({ answer ,onClick}) => (
    <div className="flex-grid left" key={answer.id}>
        <div className="col">
            <div className="col display-inline">
                <img className="answer-image" alt="img" height="93" width="93" src={answer.imageURL} />
                <div className="col center-text">
                    {answer.text}
                </div>
            </div>
        </div>
        <div className="col align-right">
            <img className="minus-button" alt="img" onClick={() => onClick(answer.id)} src="images/minus.svg" />
        </div>
    </div>
)

export default Answer;
