import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getHomes } from "../api/homesApi";
import type { Home } from "../types/home";
import HomeCard from "../components/HomeCard";

const HomeList: React.FC = () => {
  const [homes, setHomes] = useState<Home[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const response = await getHomes();
        setHomes(response.data);
      } catch (err) {
        setError("Failed to fetch homes. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomes();
  }, []);

  if (loading) {
    return <div className="text-center p-10">Loading listings...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Explore Homes</h1>
            <p className="mt-1 text-gray-500">Find your perfect stay</p>
          </div>
          <Link
            to="/add-home"
            className="bg-red-500 text-white font-semibold px-5 py-2.5 rounded-lg shadow-sm hover:bg-red-600 transition-colors"
          >
            + Add Home
          </Link>
        </header>
        <main>
          {homes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {homes.map((home) => (
                <HomeCard key={home.id} home={home} />
              ))}
            </div>
          ) : (
            <div className="text-center p-10">
              <p className="text-gray-600">No homes found.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HomeList;
