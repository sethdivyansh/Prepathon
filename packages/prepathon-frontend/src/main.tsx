import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ChatbotPage from './pages/chatbot.tsx';
import HistoryPage from './pages/history.tsx';
import LandingPage from './pages/landing.tsx';
import AuthPage from './pages/auth.tsx';
import ResponsePage from './pages/response.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/chat",
    element: <ChatbotPage/>,
  },
  {
    path: "/history",
    element: <HistoryPage/>,
  },
  {
    path: "/landing",
    element: <LandingPage/>,
  },
  {
    path: "/auth",
    element: <AuthPage/>,
  },
  {
    path: "/response",
    element: <ResponsePage/>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
