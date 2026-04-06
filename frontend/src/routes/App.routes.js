import {createBrowserRouter} from "react-router"
import ChatInterface from '../pages/ChatInterface'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <ChatInterface />
    }
])