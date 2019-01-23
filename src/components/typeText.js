import React, { Component } from 'react';
import striptags from 'striptags';
import isEqual from 'lodash/isEqual';

class TypeText extends Component {
    state = {
        fullString: '',
        remainingString: '',
        completedWords: []
    };

    componentDidMount() {
        fetch('http://www.randomtext.me/api/')
            .then(response => response.json())
            .then(data => {
                let fullString = striptags(data.text_out).trim();
                this.setState({
                    fullString,
                    remainingString: fullString
                });
            });
    }

    componentDidUpdate(prevProps, prevState) {
        const { input, setCorrectWordsCount, resetTextBox } = this.props;
        const { fullString, completedWords, remainingString } = this.state;

        if (
            !isEqual(input, prevProps.input) ||
            !isEqual(fullString, prevState.fullString)
        ) {
            let remainingWords = remainingString.split(' ');
            if (input.trim() === remainingWords[0]) {
                const completed = [...completedWords, input];
                this.setState(
                    {
                        completedWords: completed,
                        remainingString: remainingWords.slice(1).join(' ')
                    },
                    () => {
                        resetTextBox();
                        setCorrectWordsCount(completed.length);
                    }
                );
            }
        }
    }

    getFormattedRemainingString = (remainingString, input) => {
        let correctString = '';
        let errorString = '';
        let typedChars = input.split('');
        typedChars.forEach(char => {
            if (remainingString.startsWith(char)) {
                correctString = correctString + char;
                remainingString = remainingString.replace(char, '');
            } else {
                errorString = errorString + remainingString.charAt(0);
                remainingString = remainingString.substring(1);
            }
        });

        return (
            <React.Fragment>
                <span className="correctString">{correctString}</span>
                <span className="errorString">{errorString}</span>{' '}
                {remainingString}
            </React.Fragment>
        );
    };

    render() {
        const { completedWords, remainingString } = this.state;
        const { input } = this.props;
        return (
            <React.Fragment>
                <span className="completed">{completedWords.join(' ')}</span>{' '}
                {this.getFormattedRemainingString(remainingString, input)}
            </React.Fragment>
        );
    }
}

export default TypeText;
