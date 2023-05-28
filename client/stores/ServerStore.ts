import { create } from 'zustand';

export interface ServerState {
    animationsData: {
        yunkAnimationData: {
            animationIndex: number;
        };
    };
    setYunkAnimationData: (yunkAnimationData: ServerState['animationsData']['yunkAnimationData']) => void;
}

export const useServerStore = create<ServerState>(set => ({
    animationsData: {
        yunkAnimationData: {
            animationIndex: 0,
        },
    },
    setYunkAnimationData: (yunkAnimationData: ServerState['animationsData']['yunkAnimationData']) =>
        set({ animationsData: { yunkAnimationData } }),
}));
