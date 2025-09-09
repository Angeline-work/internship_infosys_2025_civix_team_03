import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ReportsDashboard({ user }) { 
  const [exporting, setExporting] = useState(false);
  const navigate = useNavigate();

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      alert("Data exported successfully!");
      setExporting(false);
    }, 1000);
  };

  return (
    <section className="flex min-h-screen bg-gray-100">
     
      <aside className="w-64 bg-[#006a9a] text-white flex flex-col p-4 space-y-4">
        <h1 className="text-2xl font-bold mb-6">Civix</h1>
        <nav className="flex flex-col space-y-3">
          <Link to="/dashboard" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#0097cc]">
            <span>🏠</span><span>Dashboard</span>
          </Link>
          <Link to="/petitions" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#0097cc]">
            <span>📄</span><span>Petitions</span>
          </Link>
          <Link to="/polls" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#0097cc]">
            <span>📊</span><span>Polls</span>
          </Link>
          <Link to="/reports" className="flex items-center space-x-2 p-2 rounded-lg bg-white text-[#006a9a] font-semibold">
            <span>📑</span><span>Reports</span>
          </Link>
          <Link to="/settings" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#0097cc]">
            <span>⚙️</span><span>Settings</span>
          </Link>
          <Link to="/help" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#0097cc]">
            <span>❓</span><span>Help & Support</span>
          </Link>
          <Link to="/logout" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#0097cc]">
            <span>🚪</span><span>Sign Out</span>
          </Link>
        </nav>
      </aside>

     
      <section className="flex-1 flex flex-col">
       
        <header className="bg-[#006a9a] text-white flex justify-between items-center px-6 py-3">
          <nav className="flex-1 flex justify-center space-x-6 text-lg">
            <Link to="/dashboard" className="hover:underline">Home</Link>
            <Link to="/petitions" className="hover:underline">Petitions</Link>
            <Link to="/polls" className="hover:underline">Polls</Link>
            <Link to="/reports" className="hover:underline">Reports</Link>
          </nav>
          <section className="flex items-center space-x-2">
            <span className="bg-white text-[#006699] rounded-full w-10 h-10 flex items-center justify-center font-bold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </span>
          </section>
        </header>

       
        <section className="p-8 flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Reports & Analytics</h2>
            <button
              onClick={handleExport}
              disabled={exporting}
              className={`px-4 py-2 rounded-lg ${exporting ? 'bg-gray-400' : 'bg-[#006a9a] text-white'} hover:bg-[#00557a] disabled:cursor-not-allowed`}
            >
              {exporting ? "Exporting..." : "Export Data"}
            </button>
          </div>

          <p className="text-gray-600 mb-4">Track civic engagement and measure the impact of petitions and polls.</p>

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold">Total Petitions</h3>
              <p className="text-2xl font-bold text-[#006a9a]">3</p>
              <p className="text-sm text-green-600">+12% from last month</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold">Total Polls</h3>
              <p className="text-2xl font-bold text-[#006a9a]">0</p>
              <p className="text-sm text-red-600">0% from last month</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold">Active Engagement</h3>
              <p className="text-2xl font-bold text-[#006a9a]">3</p>
              <p className="text-sm text-gray-600">active petitions and polls</p>
            </div>
          </div>

      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Petition Status Breakdown</h3>
              <p className="text-sm text-gray-600">Distribution of petitions by current status</p>
              <div className="w-full h-64 flex items-center justify-center bg-gray-200">
                <p className="text-gray-500">Chart Placeholder (Active 100%, Under Review 0%, Closed 0%)</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">Active - Under Review - Closed</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Poll Status Breakdown</h3>
              <p className="text-sm text-gray-600">Distribution of polls by current status</p>
              <div className="w-full h-64 flex items-center justify-center bg-gray-200">
                <p className="text-gray-500">Chart Placeholder (Active 0%, Closed 0%)</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">Active - Closed</p>
            </div>
          </div>
        </section>

        <footer className="bg-[#006a9a] text-white text-center p-3">
          <p>© 2025 Civix. All rights reserved.</p>
          <section className="flex justify-center space-x-6 mt-2">
            <Link to="/about">About Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/support">Support</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </section>
        </footer>
      </section>
    </section>
  );
}

export default ReportsDashboard;