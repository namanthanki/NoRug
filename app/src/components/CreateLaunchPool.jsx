import React, { useState } from 'react';
import gridBackground from '../assets/gridBackground.svg';
import Navbar from './Navbar';
const LaunchPoolForm = () => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [websiteLink, setWebsiteLink] = useState('');
    const [contactLink, setContactLink] = useState('');
    const [description, setDescription] = useState('');
    const [logo, setLogo] = useState('');
    const [totalSupply, setTotalSupply] = useState(0);
    const [creatorSupply, setCreatorSupply] = useState(10);
    const [whitelist, setWhitelist] = useState([{ address: '', amount: 0 }]);
    const [publicTokens, setPublicTokens] = useState(0);
    const [assetRatios, setAssetRatios] = useState(Array(5).fill(0));
    const [saleStartTime, setSaleStartTime] = useState('');
    const [saleDuration, setSaleDuration] = useState(5);

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);
    const handleAddWhitelist = () => setWhitelist([...whitelist, { address: '', amount: 0 }]);
    const handleRemoveWhitelist = index => setWhitelist(whitelist.filter((_, i) => i !== index));
    const handleWhitelistChange = (index, key, value) => {
        setWhitelist(whitelist.map((entry, i) =>
            i === index ? { ...entry, [key]: value } : entry
        ));
        setPublicTokens((totalSupply - creatorSupply - whitelist.reduce((sum, entry) => sum + entry.amount, 0)) / 2);
    };

    const formStyle = "w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 text-gray-500";
    const labelStyle = "block text-sm font-medium text-gray-400";
    const steps = ["DETAILS", "SUPPLY", "TIMING", "ASSETS", "ACK"];
    const stepSize = "w-12 h-12";

    return (
        <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-black font-fut" style={{ backgroundImage: `url(${gridBackground})` }}>
            <div className="w-full max-w-md">
                <div className="flex justify-between mb-6">
                    {steps.map((label, index) => (
                        <div key={index} className="text-center">
                            <div className={`border-2 ${stepSize} flex items-center justify-center ${index < step ? 'bg-[#2a2a2a] border-green-500 text-green-500' : 'bg-[#1a1a1a] border-gray-700'}`}>
                                <span className="text-white font-bold">{index + 1}</span>
                            </div>
                            <p className="text-gray-400 text-sm mt-2">{label}</p>
                        </div>
                    ))}
                </div>
                <div className="relative w-full">
                    <div className="absolute inset-0 grid grid-cols-2 gap-4 opacity-20">
                        <div className="h-full bg-gradient-to-r from-gray-900 to-black" />
                        <div className="h-full bg-gradient-to-r from-black to-gray-900" />
                        <div className="h-full bg-gradient-to-r from-black to-gray-900" />
                        <div className="h-full bg-gradient-to-r from-gray-900 to-black" />
                    </div>
                    <form className="relative bg-[#1a1a1a] p-6 shadow-lg w-full min-h-[300px]">
                        {step === 1 && (
                            <>
                                <div className="mb-4">
                                    <label className={labelStyle}>NAME</label>
                                    <input type="text" value={name} onChange={e => setName(e.target.value)} className={formStyle} />
                                </div>
                                <div className="mb-4">
                                    <label className={labelStyle}>SYMBOL</label>
                                    <input type="text" value={symbol} onChange={e => setSymbol(e.target.value.toUpperCase())} className={formStyle} />
                                </div>
                                <div className="mb-4">
                                    <label className={labelStyle}>WEBSITE LINK</label>
                                    <input type="url" value={websiteLink} onChange={e => setWebsiteLink(e.target.value)} className={formStyle} />
                                </div>
                                <div className="mb-4">
                                    <label className={labelStyle}>LOGO LINK</label>
                                    <input type="url" value={logo} onChange={e => setLogo(e.target.value)} className={formStyle} />
                                </div>
                                <div className="mb-4">
                                    <label className={labelStyle}>CONTACT LINK (DISCORD/TELEGRAM)</label>
                                    <input type="url" value={contactLink} onChange={e => setContactLink(e.target.value)} className={formStyle} />
                                </div>
                                <div className="mb-4">
                                    <label className={labelStyle}>PROJECT DESCRIPTION</label>
                                    <textarea value={description} onChange={e => setDescription(e.target.value)} className={formStyle} />
                                </div>
                                <button type="button" onClick={handleNext} className="py-2 px-4 w-full text-[#2a2a2a] bg-white">NEXT</button>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <div className="mb-4">
                                    <label className={labelStyle}>MAX SUPPLY</label>
                                    <input type="number" value={totalSupply} onChange={e => setTotalSupply(Number(e.target.value))} className={formStyle} />
                                </div>
                                <div className="mb-4">
                                    <label className={labelStyle}>CREATOR'S SUPPLY</label>
                                    <input type="range" min="10" max="50" value={creatorSupply} onChange={e => setCreatorSupply(Number(e.target.value))} className="w-full" />
                                    <span className="text-gray-400 mt-8">{creatorSupply}% TOKENS</span>
                                </div>

                                <div className="mb-4">
                                    <label className={labelStyle}>WHITELIST</label>
                                    {whitelist.map((entry, index) => (
                                        <div key={index} className="flex items-center mb-2 gap-1">
                                            <input type="text" placeholder="Address" value={entry.address} onChange={e => handleWhitelistChange(index, 'address', e.target.value)} className={formStyle} />
                                            <input type="number" placeholder="Amount" value={entry.amount} onChange={e => handleWhitelistChange(index, 'amount', Number(e.target.value))} className={formStyle} />
                                            <button type="button" onClick={() => handleRemoveWhitelist(index)} className="py-2 px-4 bg-red-500  text-[#2a2a2a]">-</button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={handleAddWhitelist} className="py-2 px-4 w-full text-[#2a2a2a] bg-green-500 ">ADD</button>
                                </div>
                                <div className="mb-4">
                                    <label className={labelStyle}>PUBLIC TOKENS (%)</label>
                                    <input type="number" value={publicTokens} readOnly className={formStyle} />
                                </div>
                                <div className="w-full flex">
                                <button type="button" onClick={handleBack} className="py-2 px-4 w-1/2 text-[#2a2a2a] bg-gray-500  mr-2">BACK</button>
                                <button type="button" onClick={handleNext} className="py-2 px-4 w-1/2 text-[#2a2a2a] bg-white ">NEXT</button>
                                </div>
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <div className="mb-4">
                                    <label className={labelStyle}>SALE START TIME</label>
                                    <input type="datetime-local" value={saleStartTime} onChange={e => setSaleStartTime(e.target.value)} className={formStyle} />
                                </div>
                                <div className="mb-4">
                                    <label className={labelStyle}>SALE DURATION</label>
                                    <input type="range" min="5" max="7" value={saleDuration} onChange={e => setSaleDuration(Number(e.target.value))} className="w-full" />
                                    <span className="text-gray-400">{saleDuration} days</span>
                                </div>
                                <div className="w-full flex">
                                <button type="button" onClick={handleBack} className="py-2 px-4 w-1/2 text-[#2a2a2a] bg-gray-500  mr-2">BACK</button>
                                <button type="button" onClick={handleNext} className="py-2 px-4 w-1/2 text-[#2a2a2a] bg-white transform hover:scale-105 transition duration-300 ease-in-out">NEXT</button>

                                </div>
                            </>
                        )}
                        {step === 4 && (
                            <>
                                {['NOTE', 'USDC', 'USDT', 'ETH', 'ATOM'].map((label, index) => (
                                    <div className="mb-4" key={label}>
                                        <label className={labelStyle}>{label} RATIO</label>
                                        <input type="number" value={assetRatios[index]} onChange={e => {
                                            const newRatios = [...assetRatios];
                                            newRatios[index] = Number(e.target.value);
                                            setAssetRatios(newRatios);
                                        }} className={formStyle} />
                                    </div>
                                ))}
                                <div className="w-full flex">
                                <button type="button" onClick={handleBack} className="py-2 px-4 w-1/2 text-[#2a2a2a] bg-gray-500  mr-2">BACK</button>
                                <button type="button" onClick={handleNext} className="py-2 px-4 w-1/2 text-[#2a2a2a] bg-white ">NEXT</button>
                                </div>
                            </>
                        )}
                        {step === 5 && (
                            <div className="flex flex-col items-center justify-center text-center text-white min-h-[300px]">
                                <p>LAUNCH POOL CREATED SUCCESSFULLY!</p>
                                <button type="button" onClick={() => setStep(
1)} className="py-2 px-4 text-[#2a2a2a] bg-white w-full mt-4">CREATE NEW</button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
        </>
    );
};

export default LaunchPoolForm;
