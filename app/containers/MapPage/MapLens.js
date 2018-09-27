import styled from 'styled-components';
import React from 'react';

const StyledDiv = styled.div`
    position: absolute;
    border-radius: 50%;
    box-shadow: 0 0 5px 5px white;
    mix-blend-mode: exclusion;
    background-color: white;
    transform: translate(-50%, -50%);
`;
const MapLens = (props) => {
    return <StyledDiv style={{...props}}>
       {props.children} 
    </StyledDiv>
};
export default MapLens;