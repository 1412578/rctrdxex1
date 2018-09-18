import React from 'react';
import styled from 'styled-components';

const Gauge = (props) => (<div className="gauge" style={{right: `${100 - props.value}%`}}></div>);
export const SizeControl = (props) =>{
    return (
        <div className="size-control" onMouseDown={this.props.onMouseDown}>
            <Gauge value={this.state.value} onMouseDown={this.props.onMouseDown}/>
            <small className="status">{this.state.value}%</small>
        </div>
    )
}
