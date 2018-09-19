import React from 'react';
import {Color} from './color';

function range(min, max){
  return Array.from(Array(max+1).keys()).slice(min, max+1);
}
// random generate colors
const colors = range(1, 30).map(id => {
    const C = Color();
    return (<div key={id}className="col-xs-2">
        <C className="color" />
    </div>)
})
export const ColorGroup = (props) => {
    return <div className="row no-gutter">
        {colors}
    </div>
}