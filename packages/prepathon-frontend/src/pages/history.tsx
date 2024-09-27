import { useState } from "react";
import HistoryItem from "@/components/layout/historyitem";
import { Button } from "../components/ui/button"; 
import { useNavigate } from "react-router-dom";

export default function HistoryPage() {
    const [chatHistory] = useState([
        { title: "Indian Companies", description: "Fetched all companies based in India.", time: "5 hours ago" },
        { title: "Low Expense Companies", description: "Found companies with expenses below 80M in 2014.", time: "12 hours ago" },
        { title: "High Diversity", description: "Identified companies with diversity above 50%.", time: "1 day ago" },
        { title: "Company Growth", description: "Analyzed growth trends of selected companies.", time: "2 days ago" },
        { title: "Market Analysis", description: "Provided insights on market performance.", time: "3 days ago" },
    ]);
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-gradient-to-r from-slate-600 to-slate-950 text-white p-6 flex flex-col">
            <header className="text-center py-4">
                <h1 className="text-3xl font-bold">Chat History</h1>
                <p className="text-lg text-gray-400">Review your previous interactions</p>
            </header>
            <section className="mt-12">
                <h2 className="text-xl font-semibold mb-4 text-center">Your Recent Chats</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {chatHistory.map((chat, index) => (
                        <HistoryItem key={index} title={chat.title} description={chat.description} time={chat.time} />
                    ))}
                </div>
            </section>
            <div className="mt-auto text-center">
                <Button 
                    className="mt-4 bg-indigo-500 hover:bg-indigo-600 transition-colors duration-200 ease-in-out text-white"
                    onClick={() => navigate('/chatbot')}
                >
                    Back to Chatbot
                </Button>
            </div>
        </div>
    );
}
