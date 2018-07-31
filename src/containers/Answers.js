
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteAnswerById } from '../actions'
import AnswersList from '../components/AnswersList';
import _ from 'lodash';

class Answers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
            answersList: [],
            searchAnswersList: [],
            buttonText: 'Edit',
            editMode: false,
            haveText: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.answers || (this.props.deleted !== nextProps.deleted)) {
            this.setState({ answersList: nextProps.answers });
        }
    }

    handleInputChange = evt => {
        let textValue = evt.target.value;
        this.setState({ inputValue: textValue });
    }

    // we ave two types , save or edit.
    // if save, we will save the current answer (image and text)
    // with onSave callback.
    changeEditMode = () => {
        this.setState({ editMode: !this.state.editMode });

        if (this.state.buttonText === 'Save') {
            this.props.onSave(this.state.inputValue);
        }

        this.setState({ buttonText: this.state.buttonText === 'Edit' ? 'Save' : 'Edit' });
    }

    searchAnswers = () => {
        if (this.state.inputValue === "") {
            this.setState({ haveText: false });
        } else {
            this.setState({ haveText: true });
        }
        let textToSearch = this.state.inputValue;

        // filtered list with the text input, if found we will return the new list
        let newAnswersList = _.filter(this.props.answers, answer => {
            if (answer.text.toLowerCase() === textToSearch.toLowerCase()) {
                return true;
            }
            return false;
        });

        // updating the current state of search list
        this.setState({ searchAnswersList: newAnswersList });
    }

    // 
    sendAnswerList = () => {
        if (this.state.haveText) {
            return this.state.searchAnswersList;
        }
        return this.props.answers;
    }

    // dispatch with id to delete an answer
    onDeleteAnswer = id => {
        this.props.dispatch(deleteAnswerById(id));
    }

    // if the list is filtered, we will return the filtered one
    // if not, the orginal list
    displayAnswersList = () => {
        let answers = this.sendAnswerList();
        return (
           <AnswersList answers={answers} onDelete={this.onDeleteAnswer}/>
        )
    }
    render() {
        // <AnswersList answers={this.sendAnswerList()}
        // onDelete={this.onDeleteAnswer} />
        return (
            <div className="wrapper">
                <div className="answers-title answers-title-margin answers-style">
                    <div className="text-line-wrap">Answers</div>
                </div>
            <div className="answers-title">
                    <input type="custom" className="answers-input"
                        value={this.state.inputValue}
                        placeholder="search answers"
                        onChange={evt => this.handleInputChange(evt)}
                    />

                    <button className="answers-button"
                        onClick={() => this.searchAnswers()}>Search</button>
                </div>
                <div>
                    {this.displayAnswersList()}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        answers: state.items && state.items.data && state.items.data.answers || [],
        deleted: state.items && state.items.deleted || false,
    }
};

export default connect(mapStateToProps)(Answers);



