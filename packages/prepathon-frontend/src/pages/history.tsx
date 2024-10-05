import HistoryItem from '@/components/layout/historyitem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ChatHistoryItem } from './chatbot';

export default function HistoryPage() {
    const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([
        {
            title: 'Indian Companies',
            description: 'Fetched all companies based in India.',
            time: '5 hours ago',
        },
        {
            title: 'Low Expense Companies',
            description: 'Found companies with expenses below 80M in 2014.',
            time: '12 hours ago',
        },
        {
            title: 'High Diversity',
            description: 'Identified companies with diversity above 50%.',
            time: '1 day ago',
        },
        {
            title: 'Company Growth',
            description: 'Analyzed growth trends of selected companies.',
            time: '2 days ago',
        },
        {
            title: 'Market Analysis',
            description: 'Provided insights on market performance.',
            time: '3 days ago',
        },
    ]);

    const navigate = useNavigate();
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-r from-slate-600 to-slate-950 p-6 text-white">
            <header className="py-4 text-center">
                <h1 className="text-3xl font-bold">Chat History</h1>
                <p className="text-lg text-gray-400">
                    Review your previous interactions
                </p>
            </header>
            <section className="mt-12">
                <h2 className="mb-4 text-center text-xl font-semibold">
                    Your Recent Chats
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {chatHistory.map((chat, index) => (
                        <HistoryItem
                            key={index}
                            title={chat.title}
                            description={chat.description}
                            time={chat.time}
                        />
                    ))}
                </div>
            </section>
            <div className="mt-auto text-center">
                <Button
                    className="mt-4 bg-indigo-500 text-white transition-colors duration-200 ease-in-out hover:bg-indigo-600"
                    onClick={() => navigate('/chat')}
                >
                    Back to Chatbot
                </Button>
            </div>
        </div>
    );
}
