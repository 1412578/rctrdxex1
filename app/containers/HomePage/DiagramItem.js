import React from 'react';
import styled from 'styled-components';

export const DiagramItem = ({title, description, img}) => {
    return <a className="thumbnail">
        <img src={img} />
        <h4>{title}</h4>
        <small>{description}</small>
    </a>
}