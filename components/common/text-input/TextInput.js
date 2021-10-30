import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@mui/styles';
import { styles } from './styles';

const Adornment = ({ align, content }) => {
    if (!content) return null;
    return (
        <span style={{ ['margin' + align]: 16 }}>
            {content}
        </span>
    )
};

const TextInput = (props) => {

    const {
        classes, style, className,
        inputRef, label, plh, value = '',
        isNumber, isRequired, isError,
        startAdornment, endAdornment,
        onEnter = () => null,
        onKeyDown = () => null,
        onChange = () => null,
        onChangeText = () => null,
        ...inputProps
    } = props;

    const handleKeyDown = (event) => {
        onKeyDown(event);
        if (event.key === 'Enter') onEnter();
    };
    
    const handleChangeValue = (event) => {
        let { target: { value: nextValue } } = event;
        onChange(event);
        onChangeText(isNumber ? nextValue.replace(/\D/g, '') : nextValue);
    };

    return (
        <div className={classNames(classes.wrapper, className)} style={style}>

            {!!label &&
                <div className={classNames(classes.label, { 'error': isError })}>
                    <span>{label}{isRequired && <span className={'required'}>*</span>}</span>
                </div>
            }

            <div className={classes.container}>
                <Adornment align={'Right'} content={startAdornment} />
                <input
                    {...{ value, ...inputProps }}
                    ref={inputRef}
                    placeholder={plh}
                    className={classes.input}
                    onKeyDown={handleKeyDown}
                    onChange={handleChangeValue}
                />
                <Adornment align={'Left'} content={endAdornment} />
            </div>

        </div>
    )
};

TextInput.prototype = {
    style: PropTypes.any,
    className: PropTypes.any,
    label: PropTypes.string,
    plh: PropTypes.string,
    value: PropTypes.string,
    isNumber: PropTypes.bool,
    isRequired: PropTypes.bool,
    isError: PropTypes.bool,
    startAdornment: PropTypes.any,
    endAdornment: PropTypes.any,
    onChange: PropTypes.func,
};

export default withStyles(styles)(TextInput);