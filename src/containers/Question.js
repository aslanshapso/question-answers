import React, { Component } from 'react'
import QuestionHeader from '../components/QuestionHeader';

class Question extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
            buttonText: 'Edit',
            editMode: false,
            imageURL: null,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.question) {
            this.setState({ inputValue: nextProps.question.text });
            this.setState({ imageURL: nextProps.question.imageURL });
        }
    }

    // handle the input change from the question
    handleInputChange = evt => {
        this.setState({ inputValue: evt.target.value });
    }

    // changing the text input value ( save or edit ), if save we are saving the new value
    // changing state in each click
    changeEditMode = () => {
        this.setState({ editMode: !this.state.editMode });

        if (this.state.buttonText === 'Save') {
            this.props.onSave(this.state.inputValue);
        }

        this.setState({ buttonText: this.state.buttonText === 'Edit' ? 'Save' : 'Edit' });
    }

    render() {
        return (
            <div className="wrapper">
                <QuestionHeader imageURL={this.state.imageURL}/>
                <div className="question-title">
                    <input type="custom"
                        value={this.state.inputValue}
                        onChange={evt => this.handleInputChange(evt)}
                        disabled={!this.state.editMode}
                        className={'question-input question-input ' + (this.state.editMode ? 'true' : 'false')} />
                    <button
                        className="question-button"
                        onClick={() => this.changeEditMode()}>
                        {this.state.buttonText}
                    </button>
                </div>
            </div>
        )
    }
}

export default Question;

