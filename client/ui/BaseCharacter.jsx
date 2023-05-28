import React, { useState } from 'react';
import { useSphere } from '@react-three/cannon';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useSocketStore } from '../stores/SocketStore';
import { useChatStore } from '../stores/ChatStore';

const BaseCharacter = ({ playerID, user }) => {
    const { socket } = useSocketStore(state => ({
        socket: state.socket,
    }));

    const { isOpen, openChat, closeChat, isChatFocused } = useChatStore(state => ({
        isOpen: state.isOpen,
        openChat: state.openChat,
        closeChat: state.closeChat,
        isChatFocused: state.isChatFocused,
    }));

    const direction = new THREE.Vector3();
    const frontVector = new THREE.Vector3();
    const sideVector = new THREE.Vector3();
    const speed = new THREE.Vector3();
    const SPEED = 5;

    const { camera } = useThree();

    const [ref, api] = useSphere(index => ({
        mass: 1,
        type: 'Dynamic',
        position: [user.position.x, user.position.y, user.position.z],
    }));

    const velocity = useRef([0, 0, 0]);
    useEffect(() => api.velocity.subscribe(v => (velocity.current = v)), []);

    const [isChatOpen, setIsChatOpen] = useState(false);

    const [, get] = useKeyboardControls();
    useFrame(state => {
        const { forward, backward, left, right, jump, chat } = get();
        if (!ref.current || isChatFocused) return;
        ref.current.getWorldPosition(camera.position);
        frontVector.set(0, 0, Number(backward) - Number(forward));
        sideVector.set(Number(left) - Number(right), 0, 0);
        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation);
        speed.fromArray(velocity.current);

        api.velocity.set(direction.x, velocity.current[1], direction.z);
        if (jump && Math.abs(Number(velocity.current[1].toFixed(2))) < 0.05)
            api.velocity.set(velocity.current[0], 5, velocity.current[2]);

        socket.emit('playerMove', {
            id: socket.id,
            position: camera.position,
            rotation: camera.rotation,
        });
    });

    return (
        <group>
            <mesh castShadow ref={ref}>
                <sphereGeometry args={[0.5]} />
                <meshStandardMaterial color="#FFFF00" />
            </mesh>
        </group>
    );
};

export default BaseCharacter;
