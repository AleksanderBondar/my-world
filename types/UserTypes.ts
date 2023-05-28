export type Position = {
    x: number;
    y: number;
    z: number;
};

export type Rotation = {
    isEuler: boolean;
    _x: number;
    _y: number;
    _z: number;
    _order: string;
};

export type User = {
    username: string;
    room: string;
    position: Position;
    rotation: Rotation;
};
