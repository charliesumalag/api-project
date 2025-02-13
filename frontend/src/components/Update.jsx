import React, { useState, useEffect } from "react";
import axios from "axios";

const Update = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [newQuantity, setNewQuantity] = useState("");

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/view");
      setStocks(response.data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const handleUpdateStock = async () => {
    if (!selectedStock || !newQuantity) {
      alert("Please select a stock and enter a new quantity.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/update/${selectedStock.id}`, {
        quantity: newQuantity,
      });
      alert("Stock updated successfully!");
      setNewQuantity("");
      fetchStocks();
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label className="text-[#999]">Select Stock</label>
          <select
            onChange={(e) => {
              const stock = stocks.find((item) => item.id === parseInt(e.target.value));
              setSelectedStock(stock);
            }}
            className="border border-[#555] bg-transparent rounded-md text-sm py-1 px-3 outline-none text-[#888]"
          >
            <option value="">Choose an item</option>
            {stocks.map((stock) => (
              <option key={stock.id} value={stock.id}>
                {stock.item_name} (Current: {stock.quantity})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[#999]">New Quantity</label>
          <input
            type="number"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
            className="border border-[#555] bg-transparent rounded-md text-sm py-1 px-3 outline-none text-[#888]"
          />
        </div>
<div className="text-right">
<button
          type="button"
          onClick={handleUpdateStock}
          className="text-[#999] border border-[#777] px-10 py-1 rounded-md hover:bg-white hover:text-[#0F172A] transition-all duration-300 ease-in-out"
        >
          Update
        </button>
</div>

      </form>
    </div>
  );
};

export default Update;
