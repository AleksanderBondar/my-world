import React from 'react';
import SignTable from '../../components/SignTable';
import YunkRobot from '../../models/YunkRobot';

const YunkRobotScene = () => {
    return (
        <>
            <YunkRobot position={[-5, 10.4, -8]} />
            {['idle', 'snap', 'skate', 'shoot', 'rocketBoot', 'groundPound', 'dance'].map((animation, index) => (
                <SignTable
                    actionType="yunkAnimationSwap"
                    key={index}
                    text={animation}
                    index={index}
                    position={[-18 + index * 2, 0.5, -2]}
                />
            ))}
        </>
    );
};

export default YunkRobotScene;
