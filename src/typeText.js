import React from 'react';
import striptags from 'striptags';

const TypeText = props => {
    const { text, typed = '', input } = props;

    const sentence = striptags(text);
    let completed = '';
    let remaining = sentence;
    let nextWord = '';
    if (sentence.startsWith(typed)) {
        completed = typed;
        remaining = sentence
            .substr(sentence.indexOf(completed) + completed.length)
            .trim();
        nextWord = remaining.split(' ')[0];
        console.log(remaining);
        console.log(nextWord);
        remaining = remaining.replace(nextWord, '');
    }

    return (
        <React.Fragment>
            <span className="highlighted">{completed}</span>{' '}
            <span className="nextWord">{nextWord}</span>
            <span>{remaining}</span>
        </React.Fragment>
    );
};

export default TypeText;
