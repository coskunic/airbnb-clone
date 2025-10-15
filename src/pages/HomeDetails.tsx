import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getHomeById, deleteHome } from "../api/homesApi";
import type { Home } from "../types/home";

const HomeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [home, setHome] = useState<Home | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Home ID is missing.");
      setLoading(false);
      return;
    }

    const fetchHomeDetails = async () => {
      try {
        const response = await getHomeById(id);
        setHome(response.data);
      } catch (err) {
        setError("Could not find the requested home.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeDetails();
  }, [id]);

  const handleDelete = async () => {
    if (
      home &&
      window.confirm("Are you sure you want to delete this listing?")
    ) {
      try {
        await deleteHome(home.id);
        alert("Listing deleted successfully!");
        navigate("/");
      } catch (err) {
        alert("Failed to delete the listing.");
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="text-center p-10">Loading home details...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  if (!home) {
    return <div className="text-center p-10">Home not found.</div>;
  }

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 transition-colors flex items-center"
          >
            ← Back to listings
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            className="w-full h-64 sm:h-96 object-cover"
            src={home.imageUrl}
            alt={`View of ${home.title}`}
          />

          <div className="p-6 sm:p-8">
            <section className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {home.title}
                </h1>
                <p className="text-md text-gray-500 mt-2 flex items-center">
                  📍 {home.location}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleDelete}
                  className="text-gray-500 hover:text-red-600 p-2 rounded-full transition-colors text-xl"
                >
                  🗑️
                </button>
              </div>
            </section>

            <section className="flex items-center space-x-8 text-gray-700 mb-6">
              <div className="flex items-center space-x-2">
                <span>👥</span>
                <div>
                  <span className="block text-sm">Guests</span>
                  <span className="block font-bold">{home.guests}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span>🛏️</span>
                <div>
                  <span className="block text-sm">Bedrooms</span>
                  <span className="block font-bold">{home.bedrooms}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span>🛁</span>
                <div>
                  <span className="block text-sm">Bathrooms</span>
                  <span className="block font-bold">{home.bathrooms}</span>
                </div>
              </div>
            </section>

            <hr className="my-6" />

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                About this place
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {home.description}
              </p>
            </section>

            <hr className="my-6" />

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700">
                {home.amenities.map((amenity) => (
                  <span key={amenity} className="flex items-center">
                    ✓ {amenity}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <footer className="bg-gray-50 px-6 sm:px-8 py-4 border-t flex justify-between items-center">
            <p className="text-2xl font-bold text-gray-900">
              ${home.pricePerNight}
              <span className="font-normal text-base text-gray-500">
                {" "}
                / night
              </span>
            </p>
            <button className="bg-red-500 text-white font-semibold px-6 py-3 rounded-lg shadow-sm hover:bg-red-600 transition-colors">
              Reserve
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default HomeDetails;
