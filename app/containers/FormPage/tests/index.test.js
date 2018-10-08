import React from 'react';
import { shallow, mount } from 'enzyme';
import { FormPage } from '../index';
import FormAContainner, { FormA } from '../FormA';
import {Field} from 'redux-form/immutable';

describe('<FormPage />', () => {
  it('Should render FormA', () => {
    const wrapper = shallow(<FormPage/>);
    expect(wrapper.containsMatchingElement(<FormAContainner/>)).toBe(true);
  });
});

describe('<FormA />', () => {
  it('should render all Field', () => {
    const wrapper = shallow(<FormA/>);
    expect(wrapper.containsMatchingElement(<Field 
        name="name" 
        type="text" 
        label="Name" />)).toBe(true);
    expect(wrapper.containsMatchingElement(<Field 
        name="address" 
        type="text" 
        label="Address" />)).toBe(true);
    expect(wrapper.containsMatchingElement(<Field 
        name="phone" 
        type="tel" 
        label="Phone" />)).toBe(true);
    expect(wrapper.containsMatchingElement(
      <button type="submit">Submit</button>
    )).toBe(true);
  }); 

  it('should disable submit button when is pristine', () => {
    const wrapper = shallow(<FormA pristine/>);
    expect(wrapper.find("button").props().disabled).toBe(true);
  });

  it('should disable submit button when is submitting', () => {
    const wrapper = shallow(<FormA submitting/>);
    expect(wrapper.find("button").props().disabled).toBe(true);
  });

  it('should call handleSubmit when press submit button', () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(<FormA 
      handleSubmit={handleSubmit} 
      submitting={false} 
      pristine={false}/>);
    wrapper.find("form").simulate("submit");
    expect(wrapper.find("button").props().disabled).toBe(false);
    expect(handleSubmit.mock.calls.length).toEqual(1);
  });

});
