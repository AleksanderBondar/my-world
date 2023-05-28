import React from 'react';
import { useGLTF } from '@react-three/drei';

const VoxelCars = ({ ...props }) => {
    const { nodes, materials } = useGLTF('/assets/models/voxel_car.glb');
    return (
        <group {...props} position={[15, -2.5, -60]} dispose={null}>
            <group position={[-30.7, 3.25, 86.45]}>
                <mesh geometry={nodes.SM_VoxelCar01.geometry} material={materials.M_VoxelCar01_Mobile} />
                <mesh geometry={nodes.SM_VoxelCar01_1.geometry} material={materials.M_VoxelCar01Wheel} />
            </group>
            <group position={[-30.8, 3.8, 80.55]}>
                <mesh geometry={nodes.SM_VoxelCar02.geometry} material={materials.M_VoxelCar02_Mobile} />
                <mesh geometry={nodes.SM_VoxelCar02_1.geometry} material={materials.M_VoxelCar02Wheel} />
            </group>
            <group position={[-30.8, 3.6, 75.7]}>
                <mesh geometry={nodes.SM_VoxelCar03.geometry} material={materials.M_VoxelCar03_Mobile} />
                <mesh geometry={nodes.SM_VoxelCar03_1.geometry} material={materials.M_VoxelCar03Wheel} />
            </group>
            <group position={[-32.1, 4.15, 70.9]}>
                <mesh geometry={nodes.SM_VoxelCar04.geometry} material={materials.M_VoxelCar04_Mobile} />
                <mesh geometry={nodes.SM_VoxelCar04_1.geometry} material={materials.M_VoxelCar04WheelRear} />
                <mesh geometry={nodes.SM_VoxelCar04_2.geometry} material={materials.M_VoxelCar04WheelFront} />
            </group>
            <group position={[-31.05, 3.5, 65.9]}>
                <mesh geometry={nodes.SM_VoxelCar05.geometry} material={materials.M_VoxelCar05_Mobile} />
                <mesh geometry={nodes.SM_VoxelCar05_1.geometry} material={materials.M_VoxelCar05Wheel} />
            </group>
        </group>
    );
};

export default VoxelCars;

useGLTF.preload('/assets/models/voxel_car.glb');
