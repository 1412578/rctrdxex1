import React from 'react';
import PropTypes from 'prop-types';

export const Toolbar = (props)=>{
    return <section className="toolbar">
        {props.children}
    </section>
} 
Toolbar.propTypes = {
    children: PropTypes.element
}

