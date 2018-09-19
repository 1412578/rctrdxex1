import React from 'react';
import {connect} from 'react-redux';
import {selectShape} from './selectors';

export class Canvas extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            shapes: []
        }
    }
    rect = () =>{
        return {
            type: "rect",
            x: 100, y: 100, width: 300, height: 300,
        }
    }
    circle = () => {
        return {
            type: "circle",
            r: 100,
            cx: 200,
            cy: 300,
        }
    }
    handleMouseUp = (e)=>{
        console.log(e.s);
        
       this.setState(prevState => ({
           shapes: [...prevState.shapes, this[this.props.shape]()] // FIX
        })); 
    }
    renderRect(options){
        return <rect {...options}/> 
    }
    renderCircle(options){
        return <circle {...options}/> 
    }
    render(){
        return <svg className="canvas" onMouseUp={this.handleMouseUp} viewBox="0 0 1000 1000" width={200} height={200} className="canvas">
            {this.state.shapes.map(shape => {
                const {type, ...options} = shape;
                switch (type){
                    case "rect":
                        return this.renderRect(options);
                    case "circle":
                        return this.renderCircle(options);
                    default:
                        return undefined;
                }
            })}
        </svg>
    }
}
const mapStateToProps = (state) => ({
    shape: selectShape,
});
export default connect(mapStateToProps)(Canvas);
