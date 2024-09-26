import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function LandingPage() {
    const navigate = useNavigate();
  
    return (
        <div className="bg-gradient-to-r from-orange-400 via-yellow-300 to-red-400 min-h-screen">
            {/* Header Section */}
            <div className="py-6 px-2">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white text-3xl font-bold">INTER IIT TECH MEET 13.0</div>
                    <div>
                        <ul className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 justify-center">
                            <li><a href="#services" className="text-white hover:underline">Services</a></li>
                            <li><a href="#about" className="text-white hover:underline">About Us</a></li>
                            <li><a href="#contact" className="text-white hover:underline">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center text-center py-20">
                <div className="text-4xl font-bold text-white mb-4">Unlock Insights with AI-Powered Data Querying</div>
                <div className="text-lg text-white mb-8">
                    Our machine learning solutions empower you to gain actionable insights from vast amounts of data.
                </div>
                <Button className="bg-white text-orange-600 hover:bg-gray-200" onClick={() => navigate('/auth')}>
                    Start Querying Now
                </Button>
            </div>

            {/* Services Overview */}
            <div id="services" className="py-20 bg-white">
                <div className="container mx-auto px-3">
                    <div className="text-3xl font-bold text-center mb-12">Our Services</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Service 1 */}
                        <div className="p-6 border rounded-lg shadow-md">
                            <div className="text-xl font-semibold mb-4">Data Analytics</div>
                            <div>
                                Utilize advanced analytics to extract insights from complex datasets with ease.
                            </div>
                        </div>
                        {/* Service 2 */}
                        <div className="p-6 border rounded-lg shadow-md">
                            <div className="text-xl font-semibold mb-4">Predictive Modeling</div>
                            <div>
                                Leverage machine learning algorithms to predict trends and make data-driven decisions.
                            </div>
                        </div>
                        {/* Service 3 */}
                        <div className="p-6 border rounded-lg shadow-md">
                            <div className="text-xl font-semibold mb-4">Custom Solutions</div>
                            <div>
                                Get tailored solutions to meet your unique business challenges and data needs.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div id="contact" className="py-20 bg-gradient-to-r from-orange-400 via-yellow-300 to-red-400 text-white text-center">
                <div className="text-3xl font-bold mb-4">Ready to Get Started?</div>
                <div className="mb-8">Contact us today to learn more about our services and how we can help you.</div>
                <Button className="bg-white text-orange-600 hover:bg-gray-200">
                    Contact Us
                </Button>
            </div>
        </div>
    );
}
