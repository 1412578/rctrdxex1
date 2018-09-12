import React from 'react';
import {reduxForm, Field} from 'redux-form/immutable';

const isRequired = (value) => value;
const validate = (values) => {
    const errors = {};
    if (!isRequired(values.username))
        errors.username = "Username is required";
    if (!isRequired(values.password))
        errors.password = "Password is required";
    return errors;
}
const renderField = ({input, type, label, meta: {error, warn, touched}})=>{
    const hasError = touched && error;
    const formGroupClass = "form-group " + (hasError ? "has-error" : "");
    
    return <div className={formGroupClass}>
        <label htmlFor={input.name}>{label}</label>
        <input {...input} type={type} className="form-control" />
        {touched && error && <small className="help-text">{error}</small> }
    </div>
}
const LoginForm = ({handleSubmit, error, pristine, submitting}) =>{
    return <form onSubmit={handleSubmit} className="mb-5">
        <Field 
            component={renderField}
            type="text"
            name="username"
            label="Username"
            autoComplete="username" />
        <Field 
            component={renderField}
            type="password"
            name="password"
            label="Password"
            autoComplete="password" />
        <div className="form-group">
            <button
                type="submit"
                className="btn btn-primary"
                disabled={error || submitting || pristine}>
                Login
            </button>
        </div>
    </form>
}

export default reduxForm({
    form: "login-form",
    validate
})(LoginForm);