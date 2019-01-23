import React, { Component } from 'react';

import Timer from './timer';
import TypeText from './typeText';

class TypeRacer extends Component {
    state = {
        input: '',
        typedWords: [],
        correctWords: []
    };

    handleChange = e => {
        this.setState({
            input: e.target.value
        });
    };

    addNewWord = e => {
        if (e.keyCode === 32) {
            const { typedWords, input } = this.state;
            this.setState({
                typedWords: [...typedWords, input]
            });
        }
    };

    resetTextBox = e => {
        if (e.keyCode === 32) {
            this.setState({
                input: ''
            });
        }
    };

    setCorrectWords = correctWords => {
        this.setState({
            correctWords
        });
    };

    render() {
        const { input, typedWords, correctWords } = this.state;
        return (
            <div className="container">
                <Timer correctWords={correctWords} />
                <div className="row">
                    <div className="col-md-6">
                        <TypeText
                            typedWords={typedWords}
                            setCorrectWords={this.setCorrectWords}
                        />
                        <div className="form-group mt-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter the text above"
                                value={input}
                                onChange={this.handleChange}
                                onKeyDown={this.addNewWord}
                                onKeyUp={this.resetTextBox}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TypeRacer;
