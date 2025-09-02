import { Link } from "react-router-dom";
import commImg from "../assets/comm.webp";
import petitionsImg from "../assets/petitions.jpg";
import pollsImg from "../assets/polls.jpg";
import reportsImg from "../assets/reports.webp";
import teamCommImg from "../assets/team_comm.webp";
import transportImg from "../assets/transport.webp";
import lightImg from "../assets/light.webp";
import trashImg from "../assets/trash.jpg";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
   
      <nav className="flex justify-between items-center px-10 py-4 shadow">
        <h1 className="text-2xl font-bold">Civix</h1>
        <div className="space-x-6">
          <Link to="/" className="hover:text-blue-500" style={{ color: "#006a9a" }}>Home</Link>
          <Link to="/login" className="hover:text-blue-500" style={{ color: "#006a9a" }}>Login</Link>
          <Link to="/signup" className="hover:text-blue-500" style={{ color: "#006a9a" }}>Sign Up</Link>
        </div>
      </nav>

    
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-16">
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold leading-snug">
            Your <span className="text-blue-600" style={{ color: "#006a9a" }}>Voice Matters</span>: Act, Vote, Impact!
          </h2>
          <p className="mt-4 text-gray-600">
            Participate in civic decisions and shape the future of your community.
          </p>
          <Link
            to="/signup"
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
            style={{ backgroundColor: "#006a9a", color: "#ffffff" }}
          >
            Get Started
          </Link>
        </div>
        <div className="mt-8 md:mt-0 md:w-1/2">
          <img src={commImg} alt="Community Illustration" className="rounded-lg shadow-lg" />
        </div>
      </section>

  
      <section className="px-10 py-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "#006a9a" }}>How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <img src={petitionsImg} alt="Submit Issue" className="mx-auto mb-4 w-24 h-24 object-cover" />
            <h3 className="text-xl font-semibold mb-2">Submit Issue</h3>
            <p className="text-gray-600">Raise your concerns with ease and track progress.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <img src={pollsImg} alt="Participate in Polls" className="mx-auto mb-4 w-24 h-24 object-cover" />
            <h3 className="text-xl font-semibold mb-2">Participate in Polls</h3>
            <p className="text-gray-600">Vote on local issues and influence decisions.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <img src={reportsImg} alt="Track Reports" className="mx-auto mb-4 w-24 h-24 object-cover" />
            <h3 className="text-xl font-semibold mb-2">Track Reports</h3>
            <p className="text-gray-600">Monitor updates and official responses.</p>
          </div>
        </div>
      </section>

     
      <section className="px-10 py-16 relative">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "#006a9a" }}>Why Use Civix?</h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8">
            <img
              src={teamCommImg}
              alt="Community Meeting"
              className="w-full md:w-3/4 rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="bg-white p-6 rounded-lg shadow" style={{ backgroundColor: "#e6f0fa" }}>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  User-friendly interface
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Real-time updates
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                 Enhanced transparency in civic processes
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Direct communication with local authorities
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Personalized civic engagement options
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Access to community feedback and insights
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Community-driven city
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

     
      <section className="px-10 py-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "#006a9a" }}>Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <img src={transportImg} alt="Transport" className="mx-auto mb-4 w-24 h-24 object-cover" />
            <h3 className="text-xl font-semibold mb-2">Transport</h3>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <img src={lightImg} alt="Lighting" className="mx-auto mb-4 w-24 h-24 object-cover" />
            <h3 className="text-xl font-semibold mb-2">Lighting</h3>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <img src={trashImg} alt="Waste" className="mx-auto mb-4 w-24 h-24 object-cover" />
            <h3 className="text-xl font-semibold mb-2">Waste</h3>
          </div>
        </div>
      </section>


      <section className="px-10 py-16">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "#006a9a" }}>Frequently Asked Questions</h2>
        <div className="bg-white p-6 rounded-lg shadow" style={{ backgroundColor: "#e6f0fa" }}>
          <ul className="space-y-4">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              How do I submit a report?
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Can I track my report?
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              How can I get support?
            </li>
          </ul>
        </div>
      </section>

   
      <footer className="bg-gray-800 text-white px-10 py-6" style={{ backgroundColor: "#006a9a" }}>
        <div className="flex justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Civix</h3>
            <p>© 2025 Civix AI. All rights reserved.</p>
          </div>
          <div className="space-x-4">
            <a href="#" style={{ color: "#ffffff" }}>Home</a>
            <a href="#" style={{ color: "#ffffff" }}>Support</a>
            <a href="#" style={{ color: "#ffffff" }}>Contact</a>
            <a href="#" style={{ color: "#ffffff" }}>Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}