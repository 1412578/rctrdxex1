import React from 'react';
import styled from 'styled-components';

const randomColor = () => {
    const colors = [250,250,250, 250];
    const h =  colors[Math.ceil(Math.random() * 3)];
    const s =  Math.ceil(Math.random() * 80);
    const l =  Math.ceil(Math.random() * 100);
    return `hsl(${h}, ${s}%, ${l}%)`;
}
export const Color = () => styled.button`
    background-color: ${randomColor()};
    height: 50px;
    width: 100%;
    padding: 0;
`