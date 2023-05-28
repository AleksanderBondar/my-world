import React from 'react';
import { useBox } from '@react-three/cannon';

const BaseBox = ({ ...props }) => {
    const [ref] = useBox(index => ({
        type: 'Static',
        mass: 1,
        ...props,
    }));
    return (
        <mesh castShadow position={props.position} ref={ref as any}>
            <boxGeometry args={props.args} />
            <meshStandardMaterial color={props.color} />
        </mesh>
    );
};

export default BaseBox;
