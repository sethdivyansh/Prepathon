import Navbar from '@/components/layout/navbar';
import { SessionProvider } from '@hono/auth-js/react';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ChatbotPage from './pages/chatbot';
import ComputationsPage from './pages/computations';
import EmailVerificationPage from './pages/emailverification';
import FA2 from './pages/fa2';
import ForgotPasswordPage from './pages/forgotpass';
import HistoryPage from './pages/history';
import LandingPage from './pages/landing';
import LoginPage from './pages/login2';
import RegisterPage from './pages/register';
import ResetPassword from './pages/resetPassword';
import ResponsePage from './pages/response';

// import ClientExample from './client-example';

const AppContent: React.FC = () => {
    const theme = localStorage.getItem('theme') || 'light';
    const [isDarkMode, setIsDarkMode] = React.useState(theme === 'dark');

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
        localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    };

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-full`}>
            <div className="min-h-screen bg-white dark:bg-[#121212]">
                <Router>
                    <Navbar
                        isDarkMode={isDarkMode}
                        toggleDarkMode={toggleDarkMode}
                    />
                    <div className="mx-auto px-4">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <LandingPage isDarkMode={isDarkMode} />
                                }
                            />
                            <Route path="/chat" element={<ChatbotPage />} />
                            <Route
                                path="/computation"
                                element={<ComputationsPage />}
                            />
                            <Route path="/history" element={<HistoryPage />} />
                            <Route path="/auth" element={<RegisterPage />} />
                            <Route
                                path="/response"
                                element={<ResponsePage />}
                            />
                            <Route
                                path="/forgotpassword"
                                element={<ForgotPasswordPage />}
                            />
                            <Route
                                path="/resetPassword"
                                element={<ResetPassword />}
                            />
                            <Route
                                path="/emailverify"
                                element={<EmailVerificationPage />}
                            />
                            <Route path="/login" element={<LoginPage />} />
                            <Route
                                path="/register"
                                element={<RegisterPage />}
                            />
                            <Route path="/2fa-createKey" element={<FA2 />} />
                            <Route path="/2fa-verifyKey" element={<FA2 />} />
                        </Routes>
                    </div>
                </Router>
            </div>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <SessionProvider>
            <AppContent />
        </SessionProvider>
    );
};

export default App;
