import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Bottom = () => {
    const handleExternalLink = (url) => {
        window.open(url, "_blank");
    };

    return (
        <div className="bg-black text-white p-8 h-90">
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">About Us</h2>
                <p className="text-sm leading-relaxed">
                    We are a new e-commerce website aiming to provide a platform 
                    for shopping all types of materials like electronics, watches, 
                    shoes, clothes for both men and women at very good prices.
                </p>
            </div>
            
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Follow Us:</h2>
                <div className="flex justify-center space-x-4">
                    <span className="cursor-pointer text-xl hover:text-blue-600" onClick={() => handleExternalLink('https://www.facebook.com/pradip.pokhrel.10')}>
                        <FaFacebook />
                    </span>
                    <span className="cursor-pointer text-xl hover:text-blue-400" onClick={() => handleExternalLink('https://x.com/PradipP60698292')}>
                        <FaTwitter />
                    </span>
                    <span className="cursor-pointer text-xl hover:text-pink-600" onClick={() => handleExternalLink('https://www.instagram.com/pradippokhrel2060/')}>
                        <FaInstagram />
                    </span>
                    <span className="cursor-pointer text-xl hover:text-blue-700" onClick={() => handleExternalLink('https://www.linkedin.com/in/pradip-pokhrel-84700325a/')}>
                        <FaLinkedin />
                    </span>
                </div>
            </div>
            
            <div className="text-center text-sm">
                &copy; Sayler 2024
            </div>
        </div>
    );
};

export default Bottom;
