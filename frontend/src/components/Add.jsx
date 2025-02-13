import React, { useState, useEffect } from "react";
import axios from "axios";

const Add = () => {
  const apiKey = 'c7a3f8b5d2e47a16c9f301b7ea98dcb45f62e318adcb9e6fd748f0a6d3c5e412';
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 4000);
      return () => clearTimeout(timer);
    }
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);


  const handleAddStock = async () => {
    setMessage(""); // Reset messages
    setError("");
    if (!itemName || !quantity) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/add", { item_name: itemName, quantity },
        {
          headers: {
            "frontend-apikey": apiKey, // Match the backend
          }
        }
      );
      setMessage("Stock added successfully!");
      setItemName("");
      setQuantity("");
    } catch (error) {
      console.error("Error adding stock:", error);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label className="text-[#999]">Item Name</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="border border-[#555] bg-transparent rounded-md text-sm py-1 px-3 outline-none text-[#888]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[#999]">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-number-spin-box]:hidden  border border-[#555] bg-transparent rounded-md text-sm py-1 px-3 outline-none text-[#888]"
          />
        </div>
        <div className="text-right">
          <button type="button" onClick={handleAddStock} className='text-[#999] border border-[#777] px-10 py-1 rounded-md hover:bg-white hover:text-[#0F172A] transition-all duration-300 ease-in-out'> Add </button>
        </div>
      </form>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Add;
