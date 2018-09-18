import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const DiagramItem = ({title, description, img}) => {
    return <Link className="thumbnail" to="/diagram/1">
        <img src={img} />
        <h4>{title}</h4>
        <small>{description}</small>
    </Link>
}