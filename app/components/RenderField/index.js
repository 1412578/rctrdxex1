/**
 *
 * RenderField
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const RenderField = ({input, type, label, placeholder, meta: {error, warn, touched}})=>{
    const hasError = touched && error;
    const formGroupClass = "form-group " + (hasError ? "has-error" : "");
    
    return <div className={formGroupClass}>
        <label htmlFor={input.name}>{label}</label>
        <input {...input} type={type} className="form-control" placeholder={placeholder}/>
        {touched && error && <small className="help-text">{error}</small> }
    </div>
}

RenderField.propTypes = {};

export default RenderField;
