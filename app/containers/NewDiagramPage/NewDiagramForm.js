import React from "react";
import {reduxForm, Field} from "redux-form/immutable";
import RenderField from "components/RenderField";

const validate = (values) =>{
    const errors = {};
    if (values.name)
        errors.name="Name is required";
    return errors;
}
const NewDiagramForm = ({error, submitting, pristine, handleSubmit}) => {
   return <form onSubmit={handleSubmit}>
        <Field component={RenderField} type="text" name="name" placeholder="untitled" label="Name of diagram"/>
        <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea name="description" className="form-control" placeholder="...something"></textarea>
        </div>
        <button className="btn btn-primary" type="submit">Create</button>
   </form> 
}

export default reduxForm({
    form: "diagram-form",
    validate
})(NewDiagramForm);