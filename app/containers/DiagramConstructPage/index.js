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
import { CreateSizeControl } from './SizeControl';
import { CHANGE_WIDTH, CHANGE_HEIGHT, SELECT_SHAPE } from './constants';
import {ColorGroup} from './ColorGroup';
import TrackingContext from './TrackingContext';

/* eslint-disable react/prefer-stateless-function */
const Rect = (props) => (
<svg viewBox="0 0 10 10" width="15px" height="15px">
  <rect x={0} y={0} width={8} height={8} fill="none" stroke="black" strokeWidth="0.5px"/> 
</svg>
)

const Circle = (props) => (
<svg viewBox="0 0 10 10" width="15px" height="15px">
  <circle r={4} cx={5} cy={5} fill="none" stroke="black" strokeWidth="0.5px"/> 
</svg>
)

const Cross = (props) => (
<svg viewBox="0 0 10 10" width="15px" height="15px">
  <line x1={1} y1={1} x2={9} y2={9} fill="none" stroke="black" strokeWidth="0.5px"/> 
  <line x1={1} y1={9} x2={9} y2={1} fill="none" stroke="black" strokeWidth="0.5px"/> 
</svg>
)

const Line = (props) => (
<svg viewBox="0 0 10 10" width="15px" height="15px">
  <line x1={1} y1={5} x2={9} y2={5} fill="none" stroke="black" strokeWidth="0.5px"/> 
</svg>
)

const WidthControl = CreateSizeControl("width");
const HeightControl = CreateSizeControl("height");
export class DiagramConstructPage extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    const match = this.props.match;
    this.props.loadDiagram(match.params.id);
  }
  handleChangeWidth = (size) =>{
    this.props.dispatch({type: CHANGE_WIDTH, width: size});
  }
  handleChangeHeight = (size) =>{
    this.props.dispatch({type: CHANGE_HEIGHT, height: size});
  }
  handleSelectRect = (e) =>{
    this.props.dispatch({type: SELECT_SHAPE, shape: "rect"});
  }
  handleSelectCircle = (e) =>{
    this.props.dispatch({type: SELECT_SHAPE, shape: "circle"});
  }
  render() {
    return (
      <TrackingContext render={registerMouseMove =>(
        <div className="diagram-construct">
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
                <button className="btn-shape" onClick={this.handleSelectRect}><Rect /></button>
                <button className="btn-shape" onClick={this.handleSelectCircle}><Circle /></button>
                <button className="btn-shape"><Cross /></button>
                <button className="btn-shape"><Line /></button>
              </div>
            </div>
            <h4> Details </h4>
            <div className="toolbar-group">
              <div className="form-group">
                <label>Size: </label>
                <div className="row">
                  <div className="col-sm-6">
                    <WidthControl value={this.props.diagramconstructpage.width}
                      registerMouseMove={registerMouseMove}
                      onChange={this.handleChangeWidth} />
                  </div>
                  <div className="col-sm-6">
                    <HeightControl value={this.props.diagramconstructpage.height}
                      registerMouseMove={registerMouseMove}
                      onChange={this.handleChangeHeight} />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Position: </label>
              </div>
              <div className="form-group">
                <label>Fill: </label>
                <div className="row no-gutter">
                  <ColorGroup />
                </div>
              </div>
              <div className="form-group">
                <label>Stroke: </label>
                <div className="list-group stroke-list">
                  <button className="list-group-item">
                    <svg viewBox="0 0 10 10" preserveAspectRatio="none">
                      <line x1={0} y1={5} x2={10} y2={5} strokeWidth="5"/>
                    </svg>
                  </button>
                  <button className="list-group-item">
                    <svg viewBox="0 0 10 10" preserveAspectRatio="none">
                      <line x1={0} y1={5} x2={10} y2={5} strokeWidth="5" strokeDasharray="1"/>
                    </svg>
                  </button>
                  <button className="list-group-item">
                    <svg viewBox="0 0 10 10" preserveAspectRatio="none">
                      <line x1={0} y1={5} x2={10} y2={5} strokeWidth="5" strokeDasharray="0.5"/>
                    </svg>
                  </button>
                </div>
              </div>
          </div> 
        </Toolbar> 
        <Canvas />
        </div>
      )}/>
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
