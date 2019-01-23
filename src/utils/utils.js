export const getFormattedTime = time => {
    const str_pad_left = (string, pad, length) => {
        return (new Array(length + 1).join(pad) + string).slice(-length);
    };
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2);
};
