import React, { useState } from 'react';

const CreateLaunchPoolForm = () => {
  // State for form fields
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [link, setLink] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [creatorSupply, setCreatorSupply] = useState(30); // Initial value set to 30

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Your form submission logic goes here
    console.log('Name:', name);
    console.log('Symbol:', symbol);
    console.log('Link:', link);
    console.log('Total Supply:', totalSupply);
    console.log('Creator Supply:', creatorSupply);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black z-50">
      <div className="relative p-4 w-full max-w-2xl">
        {/* Modal content */}
        <div className="relative p-4 bg-[#1a1a1a] rounded-lg shadow sm:p-5">
          {/* Modal header */}
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b border-gray-600 sm:mb-5">
            <h3 className="text-xl font-semibold text-white">
              Create Launch Pool
            </h3>
          </div>
          {/* Modal body */}
          <form onSubmit={handleSubmit} className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block mb-2 text-lg font-medium text-white">Name</label>
              <input
                type="text"
                id="name"
                className="bg-[#2a2a2a] text-gray-100 text-md rounded-lg block w-full p-2.5"
                placeholder="Type launch pool name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="symbol" className="block mb-2 text-lg font-medium text-white">Symbol</label>
              <input
                type="text"
                id="symbol"
                className="bg-[#2a2a2a] text-gray-100 text-md rounded-lg block w-full p-2.5"
                placeholder="Type launch pool symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="link" className="block mb-2 text-lg font-medium text-white">Project Description</label>
              <input
                type="text"
                id="link"
                className="bg-[#2a2a2a] text-gray-100 text-md rounded-lg block w-full p-2.5"
                placeholder="IPFS"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="totalSupply" className="block mb-2 text-lg font-medium text-white">Total Supply</label>
              <input
                type="number"
                id="totalSupply"
                className="bg-[#2a2a2a] text-gray-100 text-md rounded-lg block w-full p-2.5"
                placeholder="Enter total supply"
                value={totalSupply}
                onChange={(e) => setTotalSupply(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="creatorSupply" className="block mb-2 text-lg font-medium text-white">Creator's Supply</label>
              <input
                type="range"
                id="creatorSupply"
                min="10"
                max="50"
                step="1"
                className="block w-full p-2.5"
                value={creatorSupply}
                onChange={(e) => setCreatorSupply(Number(e.target.value))}
                style={{ background: 'linear-gradient(to right, #d1d5db, #d1d5db ' + ((creatorSupply - 10) / 40) * 100 + '%, #374151 ' + ((creatorSupply - 10) / 40) * 100 + '%, #374151)' }}
              />
              <div className="text-white text-sm text-center">{creatorSupply}</div>
            </div>
            <button type="submit" className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
              Create Launch Pool
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateLaunchPoolForm;
