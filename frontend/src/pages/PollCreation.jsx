import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function PollCreation() {
  const [poll, setPoll] = useState({
    question: "",
    description: "",
    options: ["", ""],
    location: "",
    closesOn: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPoll((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...poll.options];
    newOptions[index] = value;
    setPoll((prev) => ({ ...prev, options: newOptions }));
  };

  const addOption = () => {
    if (poll.options.length < 10) {
      setPoll((prev) => ({ ...prev, options: [...prev.options, ""] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Poll submitted:", poll);
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
          <Link to="/polls" className="flex items-center space-x-2 p-2 rounded-lg bg-white text-[#006a9a] font-semibold">
            <span>📊</span><span>Polls</span>
          </Link>
          <Link to="/reports" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#0097cc]">
            <span>📑</span><span>Reports</span>
          </Link>
          <Link to="/settings" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#0097cc]">
            <span>⚙️</span><span>Settings</span>
          </Link>
          <Link to="/help" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#0097cc]">
            <span>❓</span><span>Help & Support</span>
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
            <span className="bg-white text-[#006a9a] rounded-full w-10 h-10 flex items-center justify-center font-bold">
              U
            </span>
          </section>
        </header>

      
        <section className="p-8 flex-1">
          <section className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Poll Creation</h2>
            <Link to="/polls" className="bg-[#006a9a] text-white px-4 py-2 rounded-lg hover:bg-[#00557a]">
              View All Polls
            </Link>
          </section>

          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
            <p className="text-gray-600 mb-4">Create a poll to gather community feedback on local issues.</p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Poll Question</label>
              <input
                type="text"
                name="question"
                value={poll.question}
                onChange={handleChange}
                placeholder="What do you want to ask the community?"
                className="mt-1 p-2 w-full border rounded-lg"
              />
              <p className="text-xs text-gray-500 mt-1">Keep your question clear and specific.</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={poll.description}
                onChange={handleChange}
                placeholder="Provide more context about the poll..."
                className="mt-1 p-2 w-full border rounded-lg"
                rows="4"
              />
              <p className="text-xs text-gray-500 mt-1">Give community members enough information to make an informed choice.</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Poll Options</label>
              {poll.options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="mt-1 p-2 w-full border rounded-lg mb-2"
                />
              ))}
              <button
                type="button"
                onClick={addOption}
                className="mt-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Add Option 2 options, up to a maximum of 10.
              </button>
            </div>
            <div className="flex space-x-4 mb-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Poll Location</label>
                <input
                  type="text"
                  name="location"
                  value={poll.location}
                  onChange={handleChange}
                  placeholder="The area this poll is relevant to."
                  className="mt-1 p-2 w-full border rounded-lg"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Closes On</label>
                <input
                  type="date"
                  name="closesOn"
                  value={poll.closesOn}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-lg"
                />
                <p className="text-xs text-gray-500 mt-1">Choose when this will close (max 30 days).</p>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
              <p className="text-yellow-700">
                <span className="font-bold">Important Information</span> Polls should be designed to gather genuine community feedback on issues that affect your area. Polls that are misleading or designed to push a specific agenda may be removed.
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-[#006a9a] text-white px-4 py-2 rounded-lg hover:bg-[#00557a]"
            >
              Create a New Poll
            </button>
          </form>
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

export default PollCreation;