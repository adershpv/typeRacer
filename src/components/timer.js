import React, { Component } from 'react';
import { getFormattedTime } from '../utils/utils';

class Timer extends Component {
    state = {
        currentCount: 0
    };

    componentDidMount() {
        var intervalId = setInterval(this.timer, 1000);
        this.setState({ intervalId: intervalId });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    timer = () => {
        this.setState({ currentCount: this.state.currentCount + 1 });
    };

    getCorrectWordsPerMinute = words => {
        if (!words || words.length === 0) return 0;

        return Math.floor((words.length * 60) / this.state.currentCount);
    };

    render() {
        return (
            <div className="row mt-3 mb-3">
                <div className="col-md-3">
                    <strong>{getFormattedTime(this.state.currentCount)}</strong>
                </div>
                <div className="col-md-3 text-right">
                    <p>{`${this.getCorrectWordsPerMinute(
                        this.props.correctWords
                    )} words per minute`}</p>
                </div>
            </div>
        );
    }
}

export default Timer;
