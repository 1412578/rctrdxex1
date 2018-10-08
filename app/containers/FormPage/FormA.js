import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form/immutable';
import RenderField from '../../components/RenderField/Loadable';

export function FormA({touched, pristine, submitting, handleSubmit, error}){
   return <form onSubmit={handleSubmit}>
      <Field 
           type="text"
           name="name"
           label="Name"
           component={RenderField}
           autoComplete="fname" />
       <Field
           type="text"
           name="address"
           component={RenderField}
           label="Address" />
       <Field
           type="tel"
           name="phone"
           component={RenderField}
           label="Phone" />
       <button 
           type="submit"
           disabled={pristine || submitting}
           className="btn-shape">
           Submit
        </button>
   </form> 
}

function validate(values){
    const errors = {};
    return errors;
}

export default reduxForm({
    form: "form-a",
    validate
})(FormA);

