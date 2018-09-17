import React from "react";
import {reduxForm, Field} from "redux-form/immutable";
import RenderField from "components/RenderField";
import {newDiagram} from "./actions";

const validate = (values) =>{
    const errors = {};
    if (!values.name)
        errors.name="Name is required";
    return errors;
}
const handleSubmit = (values, dispatch, props) =>{
    dispatch(newDiagram({title: values.name, description: values.description}));
}
const NewDiagramForm = ({error, submitting, pristine, handleSubmit}) => {
   return <form onSubmit={handleSubmit}>
        <Field component={RenderField} type="text" name="name" placeholder="untitled" label="Name of diagram"/>
        <div className="form-group">
            <label htmlFor="description">Description</label>
            <Field component="textarea" id="description" name="description" className="form-control" placeholder="...something"/>
        </div>
        <button className="btn btn-primary" type="submit" disabled={error || submitting || pristine}>Create</button>
   </form> 
}

export default reduxForm({
    form: "diagram-form",
    validate,
    onSubmit: handleSubmit
})(NewDiagramForm);