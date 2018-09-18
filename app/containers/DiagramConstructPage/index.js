/**
 *
 * DiagramConstructPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Message } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDiagramConstructPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { fakeService } from 'utils/fakeService';
import {loadDiagram} from './actions';
import {Toolbar} from './Toolbar';
import {Canvas} from './Canvas';
import { SizeControl } from './SizeControl';

/* eslint-disable react/prefer-stateless-function */
const Rect = (props) => (
<svg viewBox="0 0 10 10" width="15px" height="15px">
  <rect x={0} y={0} width={8} height={8} fill="none" stroke="black" stroke-width="0.5px"/> 
</svg>
)

const Circle = (props) => (
<svg viewBox="0 0 10 10" width="15px" height="15px">
  <circle r={4} cx={5} cy={5} fill="none" stroke="black" stroke-width="0.5px"/> 
</svg>
)

const Cross = (props) => (
<svg viewBox="0 0 10 10" width="15px" height="15px">
  <line x1={1} y1={1} x2={9} y2={9} fill="none" stroke="black" stroke-width="0.5px"/> 
  <line x1={1} y1={9} x2={9} y2={1} fill="none" stroke="black" stroke-width="0.5px"/> 
</svg>
)

const Line = (props) => (
<svg viewBox="0 0 10 10" width="15px" height="15px">
  <line x1={1} y1={5} x2={9} y2={5} fill="none" stroke="black" stroke-width="0.5px"/> 
</svg>
)


export class DiagramConstructPage extends React.Component {
  componentDidMount(){
    const match = this.props.match;
    this.props.loadDiagram(match.params.id);
  }
  handleMouseMove = (e) =>{
    this.props.dispatch({type: "TRACKING_CHANGE", x: e.screenX, y: e.screenY});
  }
  handleMouseUp = (e) =>{
    this.props.dispatch({type: "STOP_TRACKING", x: e.screenX, y: e.screenY});
  }
  handleMouseDown = (e) =>{
    this.props.dispatch({type: "BEGIN_TRACKING", x: e.screenX, y: e.screenY});
  }
  render() {
    return (
      <div className="diagram-construct" onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}>
        <Helmet>
          <title>DiagramConstructPage</title>
          <meta
            name="description"
            content="Description of DiagramConstructPage"
          />
        </Helmet>
       <Toolbar>
         <div className="toolbar-group">
          <h4>Shapes</h4>
           <div className="btn-group btn-group-lg btn-group-no-corner">
            <button className="btn btn-default btn-md"><Rect/></button>
            <button className="btn btn-default"><Circle/></button>
            <button className="btn btn-default"><Cross/></button>
            <button className="btn btn-default"><Line/></button>
           </div>
         </div>
          <h4> Details </h4>
          <div className="toolbar-group">
              <div className="form-group">
                <label>Size: </label>
                <SizeControl onMouseDown={this.handleMouseDown}/>
              </div>
              <div className="form-group">
                <label>Poistion: </label>
              </div>
              <div className="form-group">
                <label>Fill: </label>
              </div>
              <div className="form-group">
                <label>Stroke: </label>
              </div>
          </div> 
        </Toolbar> 
        <Canvas />

      </div>
    );
  }
}

DiagramConstructPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  diagramconstructpage: makeSelectDiagramConstructPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadDiagram: (id) => dispatch(loadDiagram(id))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'diagramConstructPage', reducer });
const withSaga = injectSaga({ key: 'diagramConstructPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DiagramConstructPage);
