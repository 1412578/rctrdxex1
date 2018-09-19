import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {makeSelectTracking} from 'containers/App/selectors';
import {beginTracking, trackingChange} from 'containers/App/actions';

    
const Gauge = (props) => (<div className="gauge" style={{right: `${100 - props.value}%`}}></div>);
function minmax(min, value, max){
    return Math.min(Math.max(min, value), max);
}
function percentage(value, max){
    return value / max * 100;
}
export function CreateSizeControl(name){
    class _SizeControl extends React.Component{
        handleMouseDown = (e) =>{
            const progress = this.props.value;
            const MAX_WIDTH = 280; //temp
            this.props.registerMouseMove((e)=>{
                this.props.dispatch(trackingChange(e.screenX, e.screenY));
                const { tracking } = this.props;
                let _progress = progress;
                if (tracking.tracking && tracking.name === name){
                    const delta = percentage(tracking.x - tracking._x, MAX_WIDTH/2);
                    _progress += delta;
                    _progress = minmax(0, _progress, 200);
                    this.props.onChange(_progress);
                }
                e.preventDefault();
                return false;
            });
            this.props.dispatch(beginTracking(e.screenX, e.screenY, name));
        }
        render() {
            return (
                <div className="size-control" onMouseDown={this.handleMouseDown}>
                    <Gauge value={this.props.value/2} />
                    <small className="status">{this.props.template}{Math.ceil(this.props.value)}%</small>
                </div>
            )
        }
    }
    const mapStateToProps = (state) => ({
        tracking: makeSelectTracking(state)
    });

    const mapDispatchToProps = (dispatch) => ({
        dispatch,
    });

    return connect(mapStateToProps)(_SizeControl);
}

