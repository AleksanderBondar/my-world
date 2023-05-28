import React, { useEffect, useRef } from 'react';
import { useBox } from '@react-three/cannon';
import { Text, RoundedBox } from '@react-three/drei';
import { useChatStore } from '../stores/ChatStore';

const EnemyCharacter = ({ users, id }) => {
    const group = useRef();

    const [ref, api] = useBox(() => ({
        mass: 1,
        type: 'Dynamic',
        args: [0.75, 1],
    }));

    const { message, setMessage } = useChatStore(state => ({
        message: state.message,
        setMessage: state.setMessage,
    }));

    useEffect(() => {
        let timer;
        if (message?.socketOwnerID === id) {
            timer = setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [message, id]);

    return (
        <group
            rotation={[users[id].rotation._x, users[id].rotation._y, users[id].rotation._z]}
            position={[users[id].position.x, users[id].position.y, users[id].position.z]}
            ref={group}
        >
            <mesh ref={ref} castShadow>
                <sphereGeometry args={[0.5]} />
                <meshStandardMaterial color="#FFFF00" />
            </mesh>
            <group position={[0, 0, -0.2]}>
                <Text
                    rotation={[0, 3, 0]}
                    position={[0, 1, 0]}
                    color="black"
                    fontSize={0.6}
                    maxWidth={2}
                    textAlign="center"
                    outlineColor="black"
                    outlineWidth={0.05}
                >
                    {users[id].username}
                </Text>
                {message?.socketOwnerID === id && (
                    <mesh rotation={[0, 3, 0]} position={[0, 2, 0]}>
                        <RoundedBox args={[2, 0.8, 0.1]} radius={0.1} smoothness={4} />
                        <meshStandardMaterial color="white" />
                        <Text position={[0, 0, 0.06]} color="black" fontSize={0.15}>
                            {message.message}
                        </Text>
                    </mesh>
                )}
            </group>
        </group>
    );
};

export default EnemyCharacter;
