import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../utils/api";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    async function load() {
      try {
        const res = await apiFetch("http://localhost:5000/api/dashboard");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to load dashboard:", err);
      }
    }
    load();
  }, []);

  if (!data) return <p className="p-6">Loading...</p>;

  const { petitions = [], myPetitions = 0, successfulPetitions = 0, pollsCreated = 0 } = data;

  const filteredPetitions =
    activeFilter === "All"
      ? petitions
      : petitions.filter((p) => p.category === activeFilter);

  return (
    <div className="flex min-h-screen bg-gray-50">
     
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6" style={{ color: "#006a9a" }}>Civix</h2>
        <nav className="space-y-4">
          <Link to="/dashboard" className="flex items-center space-x-2 font-semibold" style={{ color: "#006a9a" }}>
            <span>🏠</span> <span>Dashboard</span>
          </Link>
          <Link to="/petitions" className="flex items-center space-x-2 hover:underline" style={{ color: "#006a9a" }}>
            <span>📄</span> <span>Petitions</span>
          </Link>
          <Link to="#" className="flex items-center space-x-2 hover:underline" style={{ color: "#006a9a" }}>
            <span>📊</span> <span>Polls</span>
          </Link>
          <Link to="#" className="flex items-center space-x-2 hover:underline" style={{ color: "#006a9a" }}>
            <span>📝</span> <span>Reports</span>
          </Link>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col">
    
        <header className="flex justify-between items-center px-6 py-4 text-white" style={{ backgroundColor: "#006a9a" }}>
          <nav className="space-x-6">
            <Link to="/dashboard" className="hover:underline text-white">Home</Link>
            <Link to="/petitions" className="hover:underline text-white">Petitions</Link>
            <Link to="#" className="hover:underline text-white">Polls</Link>
            <Link to="#" className="hover:underline text-white">Reports</Link>
          </nav>
          <div className="flex items-center space-x-2">
            <span>👤</span>
            <span>{data.user?.name || "User"}</span>
          </div>
        </header>

       
        <div className="p-8">
          <h1 className="text-2xl font-bold">Welcome, {data.user?.name || "User"}!</h1>
          <p className="text-gray-600 mb-8">
            See what’s happening in your community and make your voice heard.
          </p>

       
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <h3 className="text-lg font-semibold mb-2">My Petitions</h3>
              <p className="text-3xl font-bold" style={{ color: "#006a9a" }}>{myPetitions}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <h3 className="text-lg font-semibold mb-2">Successful Petitions</h3>
              <p className="text-3xl font-bold" style={{ color: "#006a9a" }}>{successfulPetitions}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <h3 className="text-lg font-semibold mb-2">Polls Created</h3>
              <p className="text-3xl font-bold" style={{ color: "#006a9a" }}>{pollsCreated}</p>
            </div>
          </div>

        
          <h2 className="text-xl font-bold mb-4">Active Petitions Near You</h2>
          <div className="flex space-x-4 mb-6">
            {["All", "Environment", "Infrastructure", "Education"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: activeFilter === cat ? "#006a9a" : "#e5e7eb",
                  color: activeFilter === cat ? "#fff" : "#374151",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

         
          <div className="bg-white p-6 rounded-lg shadow">
            {filteredPetitions.length === 0 ? (
              <p className="text-gray-600 text-center">
                No petitions found with current filters
              </p>
            ) : (
              <ul className="space-y-4">
                {filteredPetitions.map((p, idx) => (
                  <li key={idx} className="p-4 border rounded">
                    <h3 className="font-bold">{p.title}</h3>
                    <p className="text-gray-600">{p.description}</p>
                    <span className="text-sm text-gray-500">Category: {p.category}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {activeFilter !== "All" && (
            <div className="text-center mt-6">
              <button
                onClick={() => setActiveFilter("All")}
                className="px-6 py-2 border rounded-lg hover:bg-gray-100"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

       
        <footer className="text-white p-6" style={{ backgroundColor: "#006a9a" }}>
          <div className="flex justify-between flex-col md:flex-row">
            <p>© 2025 Civix. All rights reserved.</p>
            <div className="space-x-4">
              <a href="#" className="text-white">Home</a>
              <a href="#" className="text-white">About Us</a>
              <a href="#" className="text-white">Services</a>
              <a href="#" className="text-white">Contact</a>
              <a href="#" className="text-white">Support</a>
              <a href="#" className="text-white">Privacy Policy</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

