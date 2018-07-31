import React, { Component } from 'react'
import Question from '../containers/Question'
import Answers from '../containers/Answers'
import AddQuestion from './AddQuestion'
import { connect } from 'react-redux'

import { fetchData, saveQuestion, fetchDataFromLocalStorage, addNewAnswer } from '../actions'

class QuestionAnswer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            question: null,
            addButtonMode: false,
            file: null,
            text: '',
        }
    }

    componentDidMount() {
        // get all data from json.

        if (localStorage.getItem('data')) {
            this.props.dispatch(fetchDataFromLocalStorage());

        } else {
            this.props.dispatch(fetchData());
        }
    }
    saveQuestion = text => {
        this.props.dispatch(saveQuestion(text));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
            this.setState({ question: nextProps.data.question });
            this.setState({ answers: nextProps.data.answers });
        }

        if (nextProps.data && this.state.answers && (nextProps.data.answers.length !== this.state.answers.length)) {
            this.setState({ answers: nextProps.data.answers });
        }
    }
    changeAddButtonMode = () => {
        this.setState({ addButtonMode: !this.state.addButtonMode });
    }
    handleUploadImage = evt => {
        const file = evt.target.files[0];

        this.getBase64(file).then(base64 => {
            this.setState({ file: base64 });
        });

    }
    getBase64 = file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }
    handleTextQuestion = evt => {
        this.setState({ text: evt.target.value });
    }

    onSaveQuestion = () => {
        // TODO: Get the save question
        // action
        if (this.state.text !== '' && this.state.file !== null) {
            this.props.dispatch(addNewAnswer({
                text: this.state.text,
                imageURL: this.state.file
            }))


            // clear states data
            this.setState({ text: '' });
            this.setState({ file: null });
            this.setState({ addButtonMode: !this.state.addButtonMode });
        }
    }
    render() {
        return (
            <div>
                <Question question={this.state.question}
                    onSave={(text) => this.saveQuestion(text)} />
                <Answers />
                <AddQuestion mode={this.state.addButtonMode}
                    onSave={() => this.onSaveQuestion()}
                    onClick={() => this.changeAddButtonMode()}
                    onTextChange={(evt) => this.handleTextQuestion(evt)}
                    onChange={(evt) => this.handleUploadImage(evt)} />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: (state.items && state.items.data) || [],
    }
};

export default connect(mapStateToProps)(QuestionAnswer);
