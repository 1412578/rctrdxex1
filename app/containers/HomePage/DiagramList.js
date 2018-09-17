import React from 'react';
import { DiagramItem } from './DiagramItem';

export const DiagramList = ({diagrams}) => {
    return diagrams.map(diagram => (
        <div className="col-xs-6 col-sm-4 col-md-3">
            <DiagramItem title={diagram.title} description={diagram.description} img={diagram.img}/>
        </div>
    ));
}