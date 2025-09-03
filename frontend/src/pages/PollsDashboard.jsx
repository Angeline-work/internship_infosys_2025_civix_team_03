import { useState, useEffect } from "react";

export default function PollsDashboard() {
  const [activeTab, setActiveTab] = useState("active");
  const [polls, setPolls] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Fetch all polls from backend
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
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="font-bold text-xl mb-6">Civix</h2>
        <nav className="space-y-4">
          <a href="/dashboard" className="block">Dashboard</a>
          <a href="/petitions" className="block">Petitions</a>
          <a href="/polls" className="block font-bold text-blue-600">Polls</a>
          <a href="/officials" className="block">Officials</a>
          <a href="/reports" className="block">Reports</a>
          <a href="/settings" className="block">Settings</a>
          <a href="/help" className="block">Help & Support</a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Polls</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            style={{ backgroundColor: "#006a9a" }}
          >
            + Create Poll
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-4">
          {["active", "voted", "my", "closed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
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

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search polls..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-lg w-full"
          />
        </div>

        {/* Polls List */}
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
                      className="text-blue-600 font-semibold"
                      onClick={() => alert("Vote feature here")}
                    >
                      Vote
