import React, { useState, useEffect } from "react";
import axios from "axios";

const Remove = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState("");

  // Fetch stock items when the component loads
  const fetchStocks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/view");
      setStocks(response.data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  // Handle stock removal
  const handleRemoveStock = async () => {
    if (!selectedStock) {
      alert("Please select an item to remove.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/remove/${selectedStock}`);
      alert("Stock removed successfully!");
      setSelectedStock(""); // Reset selection
      fetchStocks(); // Refetch updated stocks from the database
    } catch (error) {
      console.error("Error removing stock:", error);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label className="text-[#999]">Select Item to Remove</label>
          <select
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            className="border border-[#555] bg-transparent rounded-md text-sm py-1 px-3 outline-none text-[#888]"
          >
            <option value="">-- Select an item --</option>
            {stocks.map((stock) => (
              <option key={stock.id} value={stock.id}>
                {stock.item_name} (Qty: {stock.quantity})
              </option>
            ))}
          </select>
        </div>
        <div className="text-right">
          <button type="button" onClick={handleRemoveStock} className='text-[#999] border border-[#777] px-10 py-1 rounded-md hover:bg-white hover:text-[#0F172A] transition-all duration-300 ease-in-out'> Remove </button>
        </div>
      </form>
    </div>
  );
};

export default Remove;
