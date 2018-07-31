import React from 'react'

// Question Header statless component - display only hardcoded text
// getting imageUrl to display
const QuestionHeader = ({imageURL}) => (
    <div>
        <div className="logo">
            <img className="image-border-radius" alt="img" width="105" height="105" src={imageURL} />
        </div>
        <div className="question-style">
            <div className="text-line-wrap">Question</div>
        </div>
    </div>
)

export default QuestionHeader;
