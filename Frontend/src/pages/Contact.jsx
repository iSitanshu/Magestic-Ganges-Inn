import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Mail, Phone, Instagram } from 'lucide-react'

const Contact = () => {
    return (
        <div className="flex flex-col min-h-screen bg-yellow-50">
            <Navbar />
            <div className="flex-grow flex items-center justify-center px-4 py-20">
                <div className="max-w-xl w-full bg-white shadow-2xl rounded-2xl p-8 text-gray-800 border-4 border-yellow-500">
                    <h2 className="text-3xl font-bold mb-6 text-center text-yellow-600">Contact Us</h2>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Phone className="text-yellow-500" />
                            <span className="text-lg font-medium">
                                Phone: <span className="text-yellow-700">8318067377</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Mail className="text-yellow-500" />
                            <span className="text-lg font-medium">
                                Email: <span className="text-yellow-700">Majesticganges.inn@gmail.com</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Instagram className="text-yellow-500" />
                            <span className="text-lg font-medium">
                                Instagram: <span className="text-yellow-700">@Majesticganges</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact
