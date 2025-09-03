import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

<nav className="space-y-4">
  <Link to="/dashboard" className="block">Dashboard</Link>
  <Link to="/petitions" className="block font-bold text-blue-600">Petitions</Link>
  <Link to="/polls" className="block">Polls</Link>
  <Link to="/reports" className="block">Reports</Link>
</nav>



// Fix for default Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng); // allow clicking on map to set new position
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function PetitionCreation() {
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [position, setPosition] = useState(null);

  // Get device location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setPosition(coords);
        setLocation(`${coords.lat}, ${coords.lng}`);
      },
      (err) => {
        console.error("Geolocation error:", err);
      }
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const petitionData = new FormData();
    if (photo) petitionData.append("photo", photo);
    petitionData.append("title", title);
    petitionData.append("category", category);
    petitionData.append("description", description);
    petitionData.append("location", location);

    // Send petition to backend
    fetch("http://localhost:5000/api/petitions", {
      method: "POST",
      body: petitionData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Petition submitted successfully!");
        console.log(data);
      })
      .catch((err) => console.error("Error submitting petition:", err));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="font-bold text-xl mb-6">Civix</h2>
        <nav className="space-y-4">
          <a href="/dashboard" className="block">Dashboard</a>
          <a href="/petitions" className="block font-bold text-blue-600">Petitions</a>
          <a href="/polls" className="block">Polls</a>
          <a href="/officials" className="block">Officials</a>
          <a href="/reports" className="block">Reports</a>
          <a href="/settings" className="block">Settings</a>
          <a href="/help" className="block">Help & Support</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">Create Petition</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Map Section */}
          <div className="h-96 rounded-lg overflow-hidden shadow-md">
            {position && (
              <MapContainer
                center={position}
                zoom={13}
                className="h-full w-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <LocationMarker position={position} setPosition={setPosition} />
              </MapContainer>
            )}
          </div>

          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col space-y-4"
          >
            {/* Photo Upload */}
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
              <p className="text-sm text-gray-500 mt-2">
                Photos increase credibility and help assess urgency.
              </p>
            </div>

            {/* Title */}
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border px-4 py-2 rounded-lg w-full"
              required
            />

            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border px-4 py-2 rounded-lg w-full"
              required
            >
              <option value="">Select Category</option>
              <option value="environment">Environment</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="health">Health</option>
              <option value="education">Education</option>
            </select>

            {/* Description */}
            <textarea
              placeholder="Briefly describe the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border px-4 py-2 rounded-lg w-full"
              rows="3"
              required
            />

            {/* Location (editable) */}
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border px-4 py-2 rounded-lg w-full"
              required
            />

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded-lg"
              style={{backgroundColor:"#006a9a"}}
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
