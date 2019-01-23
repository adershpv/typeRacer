import React, { Component } from 'react';

import Timer from './timer';
import TypeText from './typeText';

class TypeRacer extends Component {
    state = {
        input: '',
        correctWordsCount: 0
    };

    handleChange = e => {
        this.setState({
            input: e.target.value
        });
    };

    resetTextBox = e => {
        this.setState({
            input: ''
        });
    };

    setCorrectWordsCount = count => {
        this.setState({
            correctWordsCount: count
        });
    };

    render() {
        const { input, correctWordsCount } = this.state;
        return (
            <div className="container">
                <Timer correctWordsCount={correctWordsCount} />
                <div className="row">
                    <div className="col-md-6">
                        <TypeText
                            input={input}
                            setCorrectWordsCount={this.setCorrectWordsCount}
                            resetTextBox={this.resetTextBox}
                        />
                        <div className="form-group mt-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter the text above"
                                value={input}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TypeRacer;
