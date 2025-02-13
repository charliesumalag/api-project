import React, { useEffect, useState } from "react";
import axios from "axios";

const View = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/view");
        setStocks(res.data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };
    fetchStocks();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold text-[#999]">Stock List</h2>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.id} className="flex rounded-md text-[#888]">
            <p className="p-1 w-[50%] border border-[#555] ">{stock.item_name}</p>
            <p className="p-1 w-[50%] border border-[#555] ">{stock.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default View;
