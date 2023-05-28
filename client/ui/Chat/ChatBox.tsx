import React, { useMemo } from 'react';
import { useChatStore } from '../../stores/ChatStore';
import { useSocketStore } from '../../stores/SocketStore';
import { useUsersStore } from '../../stores/UsersStore';

export const ChatBox = () => {
    const { socket } = useSocketStore(state => ({
        socket: state.socket,
    }));

    const { users } = useUsersStore(state => ({
        users: state.users,
    }));

    const { messages, setChatFocused } = useChatStore(state => ({
        messages: state.messages,
        setChatFocused: state.setChatFocused,
    }));

    const handleFormSubmit = e => {
        if (!socket || !users) return;
        e.preventDefault();
        socket.emit('message', {
            message: e.target[0].value,
            room: users[socket.id].room,
        });
        e.target[0].value = '';
    };

    const memoMessages = useMemo(() => {
        if (messages && Object.keys(messages).length === 0) return {};
        return messages;
    }, [messages, socket]);

    return (
        <div className="mb-[24px] mr-[24px]">
            <div className={`h-[300px] w-[400px] rounded-[8px] bg-[#000000AA]`}>
                <div className={`h-full w-full p-[8px]`}>
                    <div className="h-full max-h-[10%] min-h-[10%] select-none">
                        <p className="text-[14px] font-bold uppercase text-[#FFF]">
                            Chat messages: {Object.keys(messages || {}).length}
                        </p>
                    </div>
                    <div className="h-full max-h-[80%] min-h-[80%] w-full overflow-y-auto pb-[8px] scrollbar-thin scrollbar-thumb-[#FFF]">
                        {messages &&
                            Object.values(memoMessages || {}).map((message, index) => {
                                return (
                                    <div key={index} className="my-[8px] flex w-full break-all">
                                        <p className="text-[14px] text-[#FFF]">
                                            {message.username}:&nbsp;{message.message}
                                        </p>
                                    </div>
                                );
                            })}
                    </div>
                    <form
                        onSubmit={handleFormSubmit}
                        className="flex h-full max-h-[10%] min-h-[10%] w-full select-none items-center justify-between gap-[8px]"
                    >
                        <input
                            onFocus={() => setChatFocused(true)}
                            onBlur={() => setChatFocused(false)}
                            className="flex h-full flex-1 appearance-none bg-[#FFFB] pl-[8px] font-[600] text-[#13131C] outline-none"
                            type="text"
                            placeholder="Message"
                        />
                        <button type="submit" className="h-full rounded-[2px] bg-[#FFFB] px-[16px]">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
