import { User } from './UserTypes';

export type Room = {
    users: Record<string, User>;
};
