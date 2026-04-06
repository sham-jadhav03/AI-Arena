import { createContext, type ReactNode, type ChangeEvent, type KeyboardEvent } from "react";
import type { ArenaResponse } from '../services/api.service';
import { useChatLogic } from "../hooks/useChat";

export interface ChatContextType {
    history: ArenaResponse[];
    setHistory: React.Dispatch<React.SetStateAction<ArenaResponse[]>>;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    activeIndex: number | null;
    setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
    handleSend: () => Promise<void>;
    handleInput: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    handleKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
    handleNewChat: () => void;
}

export const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    // The logic is now housed in the useChatLogic hook in useChat.ts
    const value = useChatLogic();

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};