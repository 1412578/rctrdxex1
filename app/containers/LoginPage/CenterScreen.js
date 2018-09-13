import styled from "styled-components";
import React from 'react';

const CenterScreen = (props) =>{
    const CenterScreenPrimitive = styled.section`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -${props.width / 2}px;
    margin-top: -${props.height / 2}px;
    width: ${props.width}px;
    height: ${props.height}px;
    ` 
    return <CenterScreenPrimitive>{props.children}</CenterScreenPrimitive>
}
export default CenterScreen;
