import React from 'react';
import { connect } from 'react-redux';
import { makeSelectTracking} from 'containers/App/selectors';

class TrackingContext extends React.Component {
    constructor(props){
        super(props);
    }
    registerMouseMove = (fn) => {
        this.fn = fn;
    }
    handleMouseMove = (e) => {
        if (this.fn)
            this.fn(e);
    }
    handleMouseUp = (e) => {
        if (this.props.tracking.tracking){
            this.props.dispatch({ type: "STOP_TRACKING", x: e.screenX, y: e.screenY });
            this.fn = null;
        }
    }
    render(){
       return <div onMouseUp={this.handleMouseUp} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.registerMouseMove)}
       </div> 
    }
}

const mapStateToProps = (state) =>({
    tracking: makeSelectTracking(state),
});
export default connect(mapStateToProps)(TrackingContext);