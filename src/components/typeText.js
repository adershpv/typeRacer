import React, { Component } from 'react';
import striptags from 'striptags';
import isEqual from 'lodash/isEqual';

class TypeText extends Component {
    state = {
        randomText: '',
        completed: '',
        error: '',
        remaining: ''
    };

    componentDidMount() {
        fetch('http://www.randomtext.me/api/')
            .then(response => response.json())
            .then(data => {
                this.setState({ randomText: data.text_out });
            });
    }

    componentDidUpdate(prevProps, prevState) {
        const { typedWords = [], setCorrectWords } = this.props;
        const { randomText } = this.state;

        if (
            !isEqual(typedWords, prevProps.typedWords) ||
            !isEqual(randomText, prevState.randomText)
        ) {
            let fullString = striptags(randomText).trim();
            const correcWords = [];
            typedWords.forEach(word => {
                if (fullString.startsWith(word)) {
                    fullString = fullString.replace(word, '').trim();
                    correcWords.push(word);
                }
            });
            setCorrectWords(correcWords);
            this.setState({
                completed: correcWords.join(' '),
                remaining: fullString
            });
        }
    }

    render() {
        const { completed, error, nextWord, remaining } = this.state;
        return (
            <React.Fragment>
                <span className="highlighted">{completed}</span>{' '}
                <span className="error">{error}</span>{' '}
                <span className="nextWord">{nextWord}</span>{' '}
                <span>{remaining}</span>
            </React.Fragment>
        );
    }
}

export default TypeText;
