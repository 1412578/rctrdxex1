import React from 'react';
import {reduxForm, Field} from 'redux-form/immutable';
import RenderField from 'components/RenderField';

const isRequired = (value) => value;
const validate = (values) => {
    const errors = {};
    if (!isRequired(values.username))
        errors.username = "Username is required";
    if (!isRequired(values.password))
        errors.password = "Password is required";
    return errors;
}
const LoginForm = ({handleSubmit, error, pristine, submitting}) =>{
    return <form onSubmit={handleSubmit} className="mb-5">
        <Field 
            component={RenderField}
            type="text"
            name="username"
            label="Username"
            autoComplete="username" />
        <Field 
            component={RenderField}
            type="password"
            name="password"
            label="Password"
            autoComplete="password" />
        <div className="form-group">
            <button
                className="btn btn-primary"
                disabled={error || submitting || pristine}>
                Login
            </button>
        </div>
        <small className="help-text text-danger">{error}</small>
    </form>
}

export default reduxForm({
    form: "login-form",
    validate
})(LoginForm);