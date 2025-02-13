import React, { useState } from 'react'
import Add from "./components/Add";
import Remove from "./components/Remove";
import Update from "./components/Update";
import View from "./components/View";

const App = () => {
  const [activePage, setActivePage] = useState('Add')

  return (
    <div className='min-h-[28rem] border rounded-lg border-white p-8 mt-28'>
      <header>
        <h1 className='text-2xl text-center p-6 font-bold'>Simple Stock Counting Web App</h1>
      </header>

      {/* Navigation */}
      <nav>
        <ul className='flex gap-5'>
          {["Add", "Remove", "View", "Update"].map((page) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`border border-white px-4 py-1 rounded-lg transition-all
              ${activePage === page ? "bg-white text-[#0F172A]" : "hover:bg-white hover:text-[#0F172A]"}`}
            >
              {page} Stocks
            </button>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className='mt-6'>
        {activePage === 'Add' && <Add />}
        {activePage === 'Remove' && <Remove />}
        {activePage === 'View' && <View />}
        {activePage === 'Update' && <Update />}
      </main>
    </div>
  )
}

export default App;
