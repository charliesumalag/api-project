import React, { useEffect, useState } from "react";
import axios from "axios";

const View = () => {
  const apiKey = 'c7a3f8b5d2e47a16c9f301b7ea98dcb45f62e318adcb9e6fd748f0a6d3c5e412';
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/view", {
          headers: {
            "frontend-apikey": apiKey, // Match the backend
          }
        });
        setStocks(res.data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };
    fetchStocks();
  }, []);

  return (
    <div>
      <h2 className="mb-2 font-medium text-white">Stock List</h2>
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
