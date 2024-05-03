import React, { useState } from 'react';

const CreateLaunchPoolForm = () => {
  // State for form fields
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [link, setLink] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [creatorSupply, setCreatorSupply] = useState(30); // Initial value set to 30
  const [whitelistEntries, setWhitelistEntries] = useState([{ address: '', amount: '' }]);
  const [assetEntries, setAssetEntries] = useState([{ asset: '', ratio: '' }]);
  const [saleStartTime, setSaleStartTime] = useState('');
  const [saleDuration, setSaleDuration] = useState(5); // Initial value set to 5
  const [publicTokenAmount, setPublicTokenAmount] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Your form submission logic goes here
    console.log('Name:', name);
    console.log('Symbol:', symbol);
    console.log('Link:', link);
    console.log('Total Supply:', totalSupply);
    console.log('Creator Supply:', creatorSupply);
    console.log('Whitelist Entries:', whitelistEntries);
    console.log('Asset Entries:', assetEntries);
    console.log('Sale Start Time:', saleStartTime);
    console.log('Sale Duration:', saleDuration);
    console.log('Public Token Amount:', publicTokenAmount);
  };

  // Function to handle adding new whitelist entry
  const addWhitelistEntry = () => {
    setWhitelistEntries([...whitelistEntries, { address: '', amount: '' }]);
  };

  // Function to handle removing a whitelist entry
  const removeWhitelistEntry = (index) => {
    const updatedWhitelistEntries = [...whitelistEntries];
    updatedWhitelistEntries.splice(index, 1);
    setWhitelistEntries(updatedWhitelistEntries);
  };

  // Function to handle updating whitelist entry
  const updateWhitelistEntry = (index, field, value) => {
    const updatedWhitelistEntries = [...whitelistEntries];
    updatedWhitelistEntries[index][field] = value;
    setWhitelistEntries(updatedWhitelistEntries);
  };

  // Function to handle adding new asset entry
  const addAssetEntry = () => {
    setAssetEntries([...assetEntries, { asset: '', ratio: '' }]);
  };

  // Function to handle removing an asset entry
  const removeAssetEntry = (index) => {
    const updatedAssetEntries = [...assetEntries];
    updatedAssetEntries.splice(index, 1);
    setAssetEntries(updatedAssetEntries);
  };

  // Function to handle updating asset entry
  const updateAssetEntry = (index, field, value) => {
    const updatedAssetEntries = [...assetEntries];
    updatedAssetEntries[index][field] = value;
    setAssetEntries(updatedAssetEntries);
  };

  // Function to calculate public token amount
  const calculatePublicTokenAmount = () => {
    const whitelistSupply = whitelistEntries.reduce((total, entry) => total + parseInt(entry.amount), 0);
    const availableSupply = totalSupply - creatorSupply - whitelistSupply;
    const publicAmount = availableSupply / 2;
    setPublicTokenAmount(publicAmount);
  };

  // Function to handle sale duration change
  const handleSaleDurationChange = (e) => {
    setSaleDuration(parseInt(e.target.value));
  };

  return (
    <div className=" w-full h-full flex justify-center items-center bg-black z-50">
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
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4">
              <div className="grid gap-4 grid-cols-2">
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
              </div>
              <div>
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
              {whitelistEntries.map((entry, index) => (
                <div key={index} className="grid gap-4 grid-cols-3">
                  <div>
                    <label htmlFor={`whitelistAddress${index}`} className="block mb-2 text-lg font-medium text-white">Whitelist Address</label>
                    <input
                      type="text"
                      id={`whitelistAddress${index}`}
                      className="bg-[#2a2a2a] text-gray-100 text-md rounded-lg block w-full p-2.5"
                      placeholder="Enter whitelist address"
                      value={entry.address}
                      onChange={(e) => updateWhitelistEntry(index, 'address', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor={`whitelistAmount${index}`} className="block mb-2 text-lg font-medium text-white">Whitelist Amount</label>
                    <input
                      type="number"
                      id={`whitelistAmount${index}`}
                      className="bg-[#2a2a2a] text-gray-100 text-md rounded-lg block w-full p-2.5"
                      placeholder="Enter whitelist amount"
                      value={entry.amount}
                      onChange={(e) => updateWhitelistEntry(index, 'amount', e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col justify-end mt-8">
                    <button
                      type="button"
                      onClick={() => removeWhitelistEntry(index)}
                      className="text-white bg-red-600 hover:bg-red-700 px-3 py-2.5 rounded-lg mb-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-1">
                <button
                  type="button"
                  onClick={addWhitelistEntry}
                  className="text-white bg-[#3a3a3a] hover:bg-[#2a2a2a] px-3 py-2.5 rounded-lg col-span-3"
                >
                  Add Whitelist Entry
                </button>
              </div>
              {assetEntries.map((entry, index) => (
                <div key={index} className="grid gap-4 grid-cols-3">
                  <div>
                    <label htmlFor={`asset${index}`} className="block mb-2 text-lg font-medium text-white">Asset</label>
                    <select
                      id={`asset${index}`}
                      className="bg-[#2a2a2a] text-gray-100 text-md rounded-lg block w-full p-2.5"
                      value={entry.asset}
                      onChange={(e) => updateAssetEntry(index, 'asset', e.target.value)}
                      required
                    >
                      {/* Options for asset selection */}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`ratio${index}`} className="block mb-2 text-lg font-medium text-white">Ratio</label>
                    <input
                      type="number"
                      id={`ratio${index}`}
                      className="bg-[#2a2a2a] text-gray-100 text-md rounded-lg block w-full p-2.5"
                      placeholder="Enter ratio"
                      value={entry.ratio}
                      onChange={(e) => updateAssetEntry(index, 'ratio', e.target.value)}
                      required
                    />
                    <div className="text-gray-400 text-sm">Helper text</div>
                  </div>
                  <div className="flex flex-col justify-end">
                    <button
                      type="button"
                      onClick={() => removeAssetEntry(index)}
                      className="text-white bg-red-600 hover:bg-red-700 px-3 py-2.5 rounded-lg mb-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-1">
                <button
                  type="button"
                  onClick={addAssetEntry}
                  className="text-white bg-[#3a3a3a] hover:bg-[#2a2a2a] px-3 py-2.5 rounded-lg col-span-3"
                >
                  Add Asset Entry
                </button>
              </div>
              <div className="grid gap-4 grid-cols-2">
                <div>
                  <label htmlFor="saleStartTime" className="block mb-2 text-lg font-medium text-white">Sale Start Time (UTC)</label>
                  <input
                    type="datetime-local"
                    id="saleStartTime"
                    className="bg-[#2a2a2a] text-gray-100 text-md rounded-lg block w-full p-2.5"
                    value={saleStartTime}
                    onChange={(e) => setSaleStartTime(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="saleDuration" className="block mb-2 text-lg font-medium text-white">Sale Duration (days)</label>
                  <input
                    type="range"
                    id="saleDuration"
                    min="5"
                    max="7"
                    step="1"
                    className="block w-full p-2.5"
                    value={saleDuration}
                    onChange={handleSaleDurationChange}
                    style={{ background: 'linear-gradient(to right, #d1d5db, #d1d5db ' + ((saleDuration - 5) / 2) * 100 + '%, #374151 ' + ((saleDuration - 5) / 2) * 100 + '%, #374151)' }}
                  />
                  <div className="text-white text-sm text-center">{saleDuration}</div>
                </div>
              </div>
              <div>
                <label htmlFor="publicTokenAmount" className="block mb-2 text-lg font-medium text-white">Public Token Amount</label>
                <input
                  type="number"
                  id="publicTokenAmount"
                  className="bg-[#2a2a2a] text-gray-100 text-md rounded-lg block w-full p-2.5"
                  value={publicTokenAmount}
                  onChange={(e) => setPublicTokenAmount(e.target.value)}
                  required
                  readOnly
                />
              </div>
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
