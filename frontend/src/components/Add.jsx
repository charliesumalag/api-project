import React, { useState } from "react";
import axios from "axios";

const Add = () => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleAddStock = async () => {
    if (!itemName || !quantity) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/add", { item_name: itemName, quantity });
      alert("Stock added successfully!");
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
            className="border border-[#555] bg-transparent rounded-md text-sm py-1 px-3 outline-none text-[#888]"
          />
        </div>
        <div className="text-right">
          <button type="button" onClick={handleAddStock} className='text-[#999] border border-[#777] px-10 py-1 rounded-md hover:bg-white hover:text-[#0F172A] transition-all duration-300 ease-in-out'> Add </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
