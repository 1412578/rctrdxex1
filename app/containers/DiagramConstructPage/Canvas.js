import React from 'react';

export const Canvas = (props) =>{
    return <svg viewBox="0 0 10 10" width={200} height={200} className="canvas">
        <circle r={10} cx={5} cy={5} strokeWidth={2}/>
    </svg>
}
