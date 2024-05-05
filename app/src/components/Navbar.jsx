import React from 'react';

const Navbar = () => {
    const handleConnectWallet = () => {
        // Functionality to connect wallet
    };

    return (
        <nav className="flex items-center justify-between bg-[#1a1a1a] text-white py-4 px-24 font-fut">
            <div className="flex items-center">
                <h1 className="text-4xl font-medium">NoRug</h1>
            </div>
            <div>
                <button 
                    onClick={handleConnectWallet} 
                    className="py-2 px-4 bg-white text-[#2a2a2a] hover:scale-105 transition duration-300 ease-in-out"
                >
                    Connect Wallet
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
