import React from 'react'

// const AddQuestion = ({ onClick, completed, text }) => (
const AddQuestion = ({ onClick, onChange, onTextChange, onSave, mode }) => {

    // if we are not in edit more, we will display '+' image
    if (!mode) {
        return (
            <div className="add-question">
                <img className="plus-button"
                    alt="img"
                    onClick={onClick}
                    src="images/plus.svg" />
            </div>)
    } else {
        return (
            <div className="flex-container-question add-question-margin">
                <div className="grid">
                    <div className="box box1">
                        <div>
                            <input className="fileInput file-input"
                                type="file"
                                onChange={onChange} />
                        </div>
                    </div>
                    <div className="box box2">
                        <div>
                            <input type="text"
                                className="answer-field"
                                onChange={onTextChange}
                                placeholder="Answer text..." />
                        </div>
                    </div>
                    <div className="box box3">
                        <div className="button-save-padding">
                            <button className="button-save"
                                onClick={onSave}>Save
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


export default AddQuestion
