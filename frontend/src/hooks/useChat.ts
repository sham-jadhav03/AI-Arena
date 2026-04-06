import { useContext, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { ChatContext, type ChatContextType } from "../context/chat.context";
import { invokeArena, type ArenaResponse } from "../services/api.service";

/**
 * The core logic for the chat, separated for cleaner state management.
 * This is used ONLY inside the ChatProvider.
 */
export const useChatLogic = (): ChatContextType => {
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

    return {
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
};

/**
 * The consumer hook for interacting with the global chat state.
 * Use this in your components to access history, send messages, etc.
 */
export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};
