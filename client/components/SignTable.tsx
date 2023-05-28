import { useBox } from '@react-three/cannon';
import { Text, RoundedBox } from '@react-three/drei';
import React, { useState } from 'react';
import * as THREE from 'three';
import { useSocketStore } from '../stores/SocketStore';

const woodTexture = new THREE.TextureLoader().load('./wood.jpg');

export function SignTable(props) {
    const { socket } = useSocketStore(state => ({
        socket: state.socket,
    }));

    const [ref] = useBox(index => ({
        type: 'Static',
        mass: 1,
        args: [1, 1, 0.01],
        ...props,
    }));

    const [hovered, setHovered] = useState(false);

    return (
        <mesh ref={ref as any}>
            <mesh
                onPointerEnter={e => {
                    setHovered(true);
                }}
                onPointerLeave={e => {
                    setHovered(false);
                }}
                onClick={() => {
                    if (socket && props.actionType) {
                        socket.emit(props.actionType, {
                            animationIndex: props.index,
                        });
                    }
                }}
                position={[0, 0.2, 0]}
            >
                <RoundedBox args={[1.5, 0.5, 0.35]} radius={0.1} smoothness={4} />
                <meshStandardMaterial color="white" />
            </mesh>
            <Text
                position={[0, 0.18, 0.178]}
                color="black"
                fontSize={0.2}
                maxWidth={2}
                textAlign={'center'}
                outlineColor={hovered ? 'red' : 'black'}
                outlineWidth={0.01}
            >
                {props.text || 'Sign Table'}
            </Text>
            <mesh position={[0, -0.3, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.5, 16]} />
                <meshStandardMaterial map={woodTexture} />
            </mesh>
        </mesh>
    );
}

export default SignTable;
