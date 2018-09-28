import React from 'react'
import Draggable from 'react-draggable';

function Marker(props) {
    const {data, className, ...otherProps} = props;
    return (
      <div 
        {...otherProps} 
        className={"marker " + className}>
          <img src={data}/> 
      </div>);
}

function MarkersPanel({markers = [], show = false, onStart, onStop}){
  if (show)
    return (
      <div className='markers-panel'>
        {markers.map((marker, index) => (
          <div className="marker-wrapper">
            <Marker data={marker.url} />
            <Draggable
              handle=".handle"
              defaultPosition={{ x: 0, y: 0 }}
              position={{ x: 0, y: 0 }}
              onStart={onStart}
              onStop={onStop} >
              <Marker data={marker.url} id={marker.id} className='handle drag-marker' />
            </Draggable>
          </div>
        ))}
      </div>
    );
  else return null;
}

export default MarkersPanel