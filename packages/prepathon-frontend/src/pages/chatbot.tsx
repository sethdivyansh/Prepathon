import HistoryItem from '@/components/layout/historyitem';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function ChatbotPage() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    const [greeting, setGreeting] = useState('Good Morning');
    const navigate = useNavigate();
    const examplePrompts = [
        'Get me the data of all companies from India',
        'What companies had expenses below 80,000,000 in 2014',
        'What companies have a Diversity greater than 50%',
    ];

    const chatHistory = [
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
    ];

    const handleSendMessage = () => {
        if (input.trim()) {
            setMessages((prevMessages) => [...prevMessages, input]);
            setInput('');
        }
    };

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            setGreeting('Good Morning');
        } else if (currentHour < 18) {
            setGreeting('Good Afternoon');
        } else {
            setGreeting('Good Evening');
        }
    }, []);

    return (
        <div className="flex min-h-screen flex-col justify-between bg-gradient-to-r from-slate-600 to-slate-950 p-6 text-white">
            <header className="flex items-center justify-between py-4">
                <h1 className="text-3xl font-bold">{greeting}, User</h1>
                {/* History Button positioned to the right */}
                <Button
                    className="mt-2 bg-gray-800 text-white transition-colors duration-200 ease-in-out hover:bg-gray-700"
                    onClick={() => navigate('/history')} // Placeholder action
                >
                    History
                </Button>
            </header>

            <section className="mt-4 flex justify-center">
                <div className="w-full rounded-lg bg-gray-800 p-4 shadow-md sm:w-2/3 md:w-1/2">
                    <h2 className="mb-4 text-center text-xl font-semibold">
                        Enter your prompt here!
                    </h2>
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message here..."
                            className="mr-2 w-full rounded-lg bg-gray-700 p-2 text-white outline-none transition-shadow duration-200 ease-in-out focus:ring-2 focus:ring-indigo-500"
                        />
                        <Button
                            onClick={handleSendMessage}
                            className="rounded-r-md bg-indigo-500 px-6 py-2 text-white transition-colors duration-200 ease-in-out hover:bg-indigo-600"
                        >
                            Send
                        </Button>
                    </div>
                </div>
            </section>

            <section className="mt-6 text-center">
                <p className="text-lg text-gray-400">
                    How can I assist you today?
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-4">
                    {examplePrompts.map((prompt, index) => (
                        <Button
                            key={index}
                            className="rounded-lg bg-gray-800 px-6 py-2 text-white shadow transition-colors duration-200 ease-in-out hover:bg-gray-700"
                        >
                            {prompt}
                        </Button>
                    ))}
                </div>
            </section>

            {/* Recent Chats History */}
            <section className="mt-12">
                <h2 className="mb-4 text-center text-xl font-semibold">
                    Your recent chats
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
        </div>
    );
}
