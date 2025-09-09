import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PollsDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("active");
  const [polls, setPolls] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/polls")
      .then((res) => res.json())
      .then((data) => setPolls(data))
      .catch((err) => console.error("Error fetching polls:", err));
  }, []);

  const filteredPolls = polls.filter((poll) => {
    if (activeTab === "active" && !poll.isActive) return false;
    if (activeTab === "closed" && poll.isActive) return false;
    if (activeTab === "my" && !poll.isMine) return false;
    if (activeTab === "voted" && !poll.voted) return false;
    return poll.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <section className="flex min-h-screen bg-gray-100">
   
      <aside className="w-64 bg-[#006699] text-white flex flex-col p-4 space-y-4">
        <h1 className="text-2xl font-bold mb-6">Civix</h1>
        <nav className="flex flex-col space-y-3">
          <Link to="/dashboard" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#00557a]">
            <span>🏠</span>
            <span>Dashboard</span>
          </Link>
          <Link to="/petitions" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#00557a]">
            <span>📄</span>
            <span>Petitions</span>
          </Link>
          <Link to="/polls" className="flex items-center space-x-2 p-2 rounded-lg bg-white text-[#006699] font-semibold">
            <span>📊</span>
            <span>Polls</span>
          </Link>
          <Link to="/reports" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#00557a]">
            <span>📑</span>
            <span>Reports</span>
          </Link>
          <Link to="/settings" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#00557a]">
            <span>⚙️</span>
            <span>Settings</span>
          </Link>
          <Link to="/help" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#00557a]">
            <span>❓</span>
            <span>Help & Support</span>
          </Link>
        </nav>
      </aside>

      <section className="flex-1 flex flex-col">
     
        <header className="bg-[#006699] text-white flex justify-between items-center px-6 py-3">
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

     
        <section className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Polls</h2>
            <button
              onClick={() => navigate("/poll-creation")}
              className="bg-[#006699] text-white px-4 py-2 rounded-lg hover:bg-[#00557a]"
            >
              + Create Poll
            </button>
          </div>

        
          <div className="flex space-x-4 mb-4">
            {["active", "voted", "my", "closed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full ${
                  activeTab === tab
                    ? "bg-[#006699] text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {tab === "active" && "Active Polls"}
                {tab === "voted" && "Polls I Voted On"}
                {tab === "my" && "My Polls"}
                {tab === "closed" && "Closed Polls"}
              </button>
            ))}
          </div>

      
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search polls..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-4 py-2 rounded-lg w-full"
            />
          </div>

        
          {filteredPolls.length > 0 ? (
            <div className="space-y-4">
              {filteredPolls.map((poll) => (
                <div
                  key={poll.id}
                  className="bg-white p-4 rounded-lg shadow-md border"
                >
                  <h3 className="font-bold">{poll.title}</h3>
                  <p className="text-gray-600 text-sm">{poll.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      Posted: {poll.date}
                    </span>
                    {poll.isActive && (
                      <button
                        className="text-[#006699] font-semibold"
                        onClick={() => alert("Vote feature here")}
                      >
                        Vote
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-6">
              No polls found with current filters
            </p>
          )}
        </section>

        <footer className="bg-[#006699] text-white text-center p-3">
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