import HistoryItem from '@/components/layout/historyitem';
import Sidebar from '@/components/layout/responsesidebar';
import SendIcon from '/public/SendIcon.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

export interface ChatHistoryItem {
    title: string;
    description: string;
    time: string;
}

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
    ]);

    const handleSendMessage = () => {
        if (input.trim()) {
            setMessages((prevMessages) => [...prevMessages, input]);
            setInput('');
        }
        navigate('/response');
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
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-col">
                <header className="flex justify-center py-4">
                    <h1 className="gemini-gradient text-4xl font-bold">
                        {greeting}, User
                    </h1>
                    {/* <Button
                        className="mt-2 bg-gray-800 text-white transition-colors duration-200 ease-in-out hover:bg-gray-700"
                        onClick={() => navigate('/history')}
                    >
                        History
                    </Button> */}
                    {/* <Button
                        className="mt-2 bg-gray-800 text-white transition-colors duration-200 ease-in-out hover:bg-gray-700"
                        onClick={() => {
                            signOut();
                            navigate('/');
                        }}
                    >
                        Logout
                    </Button> */}
                </header>

                <section className="mt-4 flex w-full justify-center">
                    <div className="w-full rounded-xl p-4 text-[#404040] shadow-box_shadow dark:bg-[#1F1F1F] dark:text-[#CCCCCC] sm:w-2/3 md:w-2/3">
                        <h2 className="my-1 text-center text-2xl font-semibold">
                            Enter your prompt here!
                        </h2>
                        <div className="relative flex items-center p-4">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message here..."
                                className="mx-auto w-full rounded-xl bg-[#F8F8F8] p-4 pr-12 shadow-box_shadow outline-none transition-shadow duration-200 ease-in-out placeholder:text-[#828282] focus:ring-1 focus:ring-indigo-500 focus:placeholder:text-[#CCCCCC] dark:bg-[#292929]"
                            />
                            {input && (
                                <button
                                    onClick={handleSendMessage}
                                    className="absolute right-4 flex items-center justify-center rounded-full p-2"
                                >
                                    <img
                                        src={SendIcon}
                                        alt="Send"
                                        className="h-8 w-8"
                                    />
                                </button>
                            )}
                            {/* <Button
                                onClick={handleSendMessage}
                                className="rounded-r-md bg-indigo-500 px-6 py-2 text-white transition-colors duration-200 ease-in-out hover:bg-indigo-600"
                            >
                                Send
                            </Button> */}
                        </div>
                    </div>
                </section>

                <section className="mt-10 text-center">
                    <p className="text-4xl font-semibold text-secondary">
                        How can I assist you today?
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        {examplePrompts.map((prompt, index) => (
                            <Button
                                key={index}
                                className="shadow rounded-lg bg-[#F8F8F8] px-6 py-2 font-light text-[#404040] shadow-box_shadow transition-colors duration-200 ease-in-out hover:bg-[#FFFFFF] dark:bg-[#292929] dark:text-primary dark:hover:bg-[#303030]"
                            >
                                {prompt}
                            </Button>
                        ))}
                    </div>
                </section>

                {/* <section className="mt-12">
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
                </section> */}
            </div>
        </div>
    );
}
