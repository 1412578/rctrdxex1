import React from 'react';
import { DiagramItem } from './DiagramItem';
import { Trail, Spring, Keyframes} from 'react-spring';

const Container = Keyframes.Trail(
    {
        show: [
           {to: {opacity: 1}}, {to: {scale: 0.5}}
        ]
    }
);
export const DiagramList = ({diagrams}) => {
    return <Container state="show" keys={diagrams.map((d, index) => index)}>
                {diagrams.map(diagram => ({ scale }) => (
                    <div
                        className="col-xs-6 col-sm-4 col-md-3"
                        style={{ transform: `scale(${scale})`}}
                    >
                        <DiagramItem
                            title={diagram.title}
                            description={diagram.description}
                            img={diagram.img}
                            key={diagram.id}
                        />
                    </div>
                ))}
    </Container>
}