import { create } from 'zustand';
import { Message } from '../../types/ChatTypes';

export interface ChatState {
    isOpen: boolean;
    messages: Record<string, Message> | null;
    setMessages: (messages: Record<string, Message>) => void;
    message: Message | null;
    setMessage: (message: Message) => void;
    openChat: () => void;
    closeChat: () => void;
    toggleChat: () => void;
    isChatFocused: boolean;
    setChatFocused: (isChatFocused: boolean) => void;
}

export const useChatStore = create<ChatState>(set => ({
    messages: null,
    setMessages: (messages: Record<string, Message>) => set({ messages }),
    message: null,
    setMessage: (message: Message) => set({ message }),
    isOpen: false,
    openChat: () => set(_ => ({ isOpen: true })),
    closeChat: () => set(_ => ({ isOpen: false })),
    toggleChat: () => set(state => ({ isOpen: !state.isOpen })),
    isChatFocused: false,
    setChatFocused: (isChatFocused: boolean) => set({ isChatFocused }),
}));
