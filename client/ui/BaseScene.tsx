import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import { Physics } from '@react-three/cannon';

import Lights from '../components/Lights';
import Floor from '../components/Floor';

const BaseScene = ({ children }) => {
    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
            }}
        >
            <Canvas shadows camera={{ fov: 50 }}>
                <Lights />
                <Physics gravity={[0, -9.8, 0]}>
                    {children}
                    <Floor rotation={[Math.PI / -2, 0, 0]} color="white" />
                </Physics>
            </Canvas>
            <Loader />
        </div>
    );
};

export default BaseScene;
