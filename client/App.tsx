import React, { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { KeyboardControls, PointerLockControls, Sky } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { Canvas } from '@react-three/fiber';

import { useSocketStore } from './stores/SocketStore';
import { useChatStore } from './stores/ChatStore';
import { useUsersStore } from './stores/UsersStore';
import BaseCharacter from './ui/BaseCharacter';
import EnemyCharacter from './ui/EnemyCharacter';
import Floor from './components/Floor';
import Lights from './components/Lights';
import ThreeModel from './models/ThreeModel';
import VoxelCars from './models/VoxelCars';
import BaseBox from './ui/BaseBox';
import { ChatBox } from './ui/Chat/ChatBox';

import './App.css';
import FoxModel from './models/FoxModel';
import IndustrialArm from './models/IndustrialArm';
import YunkRobotScene from './ui/YunkRobot/YunkRobotScene';
import { useServerStore } from './stores/ServerStore';
import Person from './models/Person';

function App() {
    const { socket, setSocket } = useSocketStore(state => ({
        socket: state.socket,
        setSocket: state.setSocket,
    }));

    const { users, setUsers, user, setUser } = useUsersStore(state => ({
        users: state.users,
        setUsers: state.setUsers,
        user: state.user,
        setUser: state.setUser,
    }));

    const { setMessages, setMessage } = useChatStore(state => ({
        setMessages: state.setMessages,
        setMessage: state.setMessage,
    }));

    const { setYunkAnimationData } = useServerStore(state => ({
        setYunkAnimationData: state.setYunkAnimationData,
    }));

    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        setSocket(io());
        return () => {
            if (socket) socket.disconnect();
        };
    }, []);
    const handleLogin = e => {
        if (!socket) return;
        e.preventDefault();
        socket.emit('playerJoin', e.target[0].value);
    };

    useEffect(() => {
        if (!socket) return;
        socket.on('playerJoin', ({ users, messages, animationsData: { yunkAnimationData } }) => {
            setUser(users[socket.id]);
            setUsers(users);
            setMessages(messages);
            setYunkAnimationData(yunkAnimationData);
            setIsLogged(true);
        });
        socket.on('playerMove', data => {
            setUsers(data);
        });
        socket.on('newMessage', data => {
            setMessage(data);
        });
        socket.on('message', data => {
            setMessages(data);
        });
        socket.on('yunkAnimationSwap', data => {
            setYunkAnimationData(data);
        });
    }, [socket]);

    const Player = useMemo(() => {
        if (!socket || !user) return null;
        return (
            <KeyboardControls
                map={[
                    { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
                    { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
                    { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
                    { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
                    { name: 'jump', keys: ['Space'] },
                    { name: 'chat', keys: ['Enter'] },
                ]}
            >
                <BaseCharacter playerID={socket.id} user={user} />
            </KeyboardControls>
        );
    }, [socket, user]);

    const Players = useMemo(() => {
        if (!socket || !users) return null;
        return (
            <>
                {Object.keys(users).map(key => {
                    if (key === socket.id) return null;
                    return <EnemyCharacter key={key} id={key} users={users} />;
                })}
            </>
        );
    }, [socket, users]);

    return !isLogged ? (
        <div className="flex h-full w-full items-center justify-center">
            <div className="flex flex-col items-center gap-[16px] ">
                <h1>Make little step, to have big adventure 🚀</h1>
                <form onSubmit={handleLogin} className="flex flex-col gap-[16px]">
                    <input
                        type="text"
                        placeholder="Username"
                        className="rounded-[8px] bg-[#13131C] p-[16px] text-white"
                    />
                    <button type="submit">Log in</button>
                </form>
            </div>
        </div>
    ) : (
        <>
            <Canvas shadows camera={{ fov: 75 }}>
                <Lights />
                <Physics gravity={[0, -9.8, 0]}>
                    <BaseBox text={false} position={[0, 0.5, 0]} args={[2, 1, 2]} color="red" />
                    <BaseBox text={false} position={[5, 1, 0]} args={[1.5, 2, 1.3]} color="orange" />
                    <BaseBox text={false} position={[0, 0.5, 5]} args={[3, 1, 1.3]} color="green" />

                    {Player}
                    {Players}
                    <FoxModel args={[0.5, 2, 0.5]} />
                    <VoxelCars />
                    <IndustrialArm />
                    {/* <Person /> */}
                    <YunkRobotScene />

                    <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[0, 0, 10]} />
                    <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[-10, 0, 5]} />
                    <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[-5, 0, -5]} />
                    <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[0, 0, -10]} />
                    <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[10, 0, 5]} />
                    <Sky />
                    <Floor rotation={[Math.PI / -2, 0, 0]} color="white" />
                </Physics>
                <PointerLockControls />
            </Canvas>
            <span className="absolute left-1/2 top-1/2 h-[16px] w-[16px] rounded-full border-[1px] border-black" />
            <div className="absolute bottom-0 right-0">
                <ChatBox />
            </div>
        </>
    );
}

export default App;
