import React from 'react';
import PropTypes from 'prop-types';

export const Toolbar = (props)=>{
    return <section className="toolbar">
        {props.children.map === undefined ? props.children : props.children.map(c => c)}
    </section>
} 

