import React, { Component } from 'react';

import './App.css';
import TypeText from './typeText';

class App extends Component {
    state = {
        typeText: '',
        input: '',
        typed: '',
        currentCount: 0
    };

    componentDidMount() {
        fetch('http://www.randomtext.me/api/')
            .then(response => response.json())
            .then(data => {
                this.setState({ typeText: data.text_out });
            });

        var intervalId = setInterval(this.timer, 1000);
        this.setState({ intervalId: intervalId });
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }

    timer = () => {
        // setState method is used to update the state
        this.setState({ currentCount: this.state.currentCount + 1 });
    };

    handleChange = e => {
        this.setState({
            input: e.target.value
        });
    };

    appendText = (text, newWord) => {
        return text ? `${text}${newWord}` : newWord;
    };

    detectSpacePresent = e => {
        if (e.keyCode === 32) {
            const { typed, input } = this.state;
            this.setState({
                typed: this.appendText(typed, input),
                input: ''
            });
        }
    };

    render() {
        const { typeText, input, typed, currentCount } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mt-3 mb-3">
                        <strong>{currentCount}</strong>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <form>
                            <TypeText
                                text={typeText}
                                typed={typed}
                                input={input}
                            />
                            <div className="form-group mt-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter the text above"
                                    value={input}
                                    onChange={this.handleChange}
                                    onKeyDown={this.detectSpacePresent}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
