import styled from 'styled-components';
import React from 'react';

const Icon = ({w = 45, h = 45}) =>{
    const IconPrimitive = styled.img`
        width: ${w}px;
        height: ${h}px;
        background-color: #eae9e9;
        border: none;
    `
    return <IconPrimitive />
}

export default Icon;
