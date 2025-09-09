
import React, { useState, useRef, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import { FaThumbsUp, FaCommentAlt, FaShare } from "react-icons/fa";
import { PetitionContext } from "../PetitionContext";

function AllPetitions() {
  const { petitions, setPetitions } = useContext(PetitionContext);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [selectedPetitionId, setSelectedPetitionId] = useState(null);
  const sigCanvas = useRef(null);
  const navigate = useNavigate();

  // Simulate user-signed petitions (replace with auth/user data later)
  const [signedPetitions, setSignedPetitions] = useState([]); // Array of petition IDs signed by the user

  // Update signedPetitions when a signature is saved
  const handleSaveSignature = () => {
    if (sigCanvas.current.isEmpty()) {
      alert("Please provide a signature before saving.");
      return;
    }
    const signatureData = sigCanvas.current.toDataURL();
    setPetitions((prevPetitions) =>
      prevPetitions.map((petition) =>
        petition.id === selectedPetitionId
          ? {
              ...petition,
              signatures: petition.signatures + 1,
              signaturesList: [...petition.signaturesList, signatureData],
            }
          : petition
      )
    );
    setSignedPetitions((prev) => [...prev, selectedPetitionId]); // Add to signed list
    setShowSignatureModal(false);
    sigCanvas.current.clear();
  };

  const handleSignPetition = (petitionId) => {
    setSelectedPetitionId(petitionId);
    setShowSignatureModal(true);
  };

  const handleClearSignature = () => {
    sigCanvas.current.clear();
  };

  const handleCloseModal = () => {
    setShowSignatureModal(false);
    sigCanvas.current.clear();
  };

  const filters = ["All", "Environment", "Infrastructure", "Education", "Public Safety", "Transportation", "Healthcare", "Housing"];

  return (
    <section className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-[#006a9a] text-white flex flex-col p-4 space-y-4">
        <h1 className="text-2xl font-bold mb-6">Civix</h1>
        <nav className="flex flex-col space-y-3">
          <Link to="/dashboard" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#0097cc]">
            <span>🏠</span><span>Dashboard</span>
          </Link>
          <Link to="/petitions" className="flex items-center space-x-2 p-2 rounded-lg bg-white text-[#006a9a] font-semibold">
            <span>📄</span><span>Petitions</span>
          </Link>
          <Link to="/polls" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#0097cc]">
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
            <h2 className="text-2xl font-bold">All Petitions</h2>
            <button
              onClick={() => navigate("/petitions")}
              className="bg-[#006a9a] text-white px-4 py-2 rounded-lg hover:bg-[#00557a]"
            >
              + Create Petition
            </button>
          </section>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <p className="text-gray-600 mb-4">Browse, sign, and track petitions in your community.</p>
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => setActiveFilter("All")}
                className={`px-4 py-2 rounded-lg ${activeFilter === "All" ? "bg-[#006a9a] text-white" : "bg-gray-200 text-gray-700"} hover:bg-gray-300`}
              >
                All Petitions
              </button>
              <button
                onClick={() => setActiveFilter("My Petitions")}
                className={`px-4 py-2 rounded-lg ${activeFilter === "My Petitions" ? "bg-[#006a9a] text-white" : "bg-gray-200 text-gray-700"} hover:bg-gray-300`}
              >
                My Petitions
              </button>
              <button
                onClick={() => setActiveFilter("Signed by Me")}
                className={`px-4 py-2 rounded-lg ${activeFilter === "Signed by Me" ? "bg-[#006a9a] text-white" : "bg-gray-200 text-gray-700"} hover:bg-gray-300`}
              >
                Signed by Me
              </button>
            </div>
            <div className="flex space-x-4">
              <select className="p-2 border rounded-lg" defaultValue="All Locations">
                <option>All Locations</option>
              </select>
              <select
                className="p-2 border rounded-lg"
                onChange={(e) => setActiveFilter(e.target.value)}
                defaultValue="All Categories"
              >
                <option>All Categories</option>
                {filters.map((filter) => (
                  <option key={filter} value={filter}>
                    {filter}
                  </option>
                ))}
              </select>
              <select className="p-2 border rounded-lg" defaultValue="All">
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {petitions
              .filter((petition) => {
                if (activeFilter === "All") return true;
                if (activeFilter === "Signed by Me") return signedPetitions.includes(petition.id);
                if (activeFilter === "My Petitions") return petition.user === "User1"; // Simulate "My Petitions" (replace with actual user later)
                return activeFilter === petition.category;
              })
              .map((petition) => (
                <div key={petition.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">{petition.time}</p>
                    <h3 className="text-lg font-semibold">{`Petition ${petition.id}`}</h3>
                    <p className="text-gray-700">{petition.title}</p>
                    <p className="text-sm text-gray-500">{`${petition.signatures} of ${petition.signatureGoal} signatures`}</p>
                    <p className="text-sm text-green-600">{petition.status}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/petitions/${petition.id}`)}
                      className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleSignPetition(petition.id)}
                      className="px-4 py-2 bg-[#006a9a] text-white rounded-lg hover:bg-[#00557a]"
                    >
                      Sign Petition
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {showSignatureModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Sign Petition</h3>
              <SignatureCanvas
                ref={sigCanvas}
                canvasProps={{ className: "border border-gray-300 w-full h-40 mb-4" }}
                penColor="black"
                backgroundColor="white"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleClearSignature}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Clear
                </button>
                <button
                  onClick={handleSaveSignature}
                  className="px-4 py-2 bg-[#006a9a] text-white rounded-lg hover:bg-[#00557a]"
                >
                  Save Signature
                </button>
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

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

export default AllPetitions;
