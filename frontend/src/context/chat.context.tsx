import { createContext, useState, type ReactNode, type ChangeEvent, type KeyboardEvent } from "react";
import type { ArenaResponse } from '../services/api.service';
import { invokeArena } from '../services/api.service';

interface ChatContextType {
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
    const [history, setHistory] = useState<ArenaResponse[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
    };

    const handleSend = async () => {
        const trimmed = input.trim();
        if (!trimmed || loading) return;

        setLoading(true);
        setError(null);
        setActiveIndex(null);
        setInput('');

        try {
            const result = await invokeArena(trimmed);
            setHistory((prev) => [...prev, result]);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Something went wrong';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleNewChat = () => {
        setActiveIndex(null);
        setError(null);
    };

    const value: ChatContextType = {
        history,
        setHistory,
        input,
        setInput,
        loading,
        setLoading,
        error,
        setError,
        activeIndex,
        setActiveIndex,
        handleSend,
        handleInput,
        handleKeyDown,
        handleNewChat,
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};