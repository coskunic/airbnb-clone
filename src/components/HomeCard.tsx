import React from "react";
import { Link } from "react-router-dom";
import type { Home } from "../types/home";

interface HomeCardProps {
  home: Home;
}

const HomeCard: React.FC<HomeCardProps> = ({ home }) => {
  return (
    // Link, kartın tamamını tıklanabilir yapar
    <Link to={`/homes/${home.id}`} className="block group">
      {/* Kartın ana kapsayıcısı */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden h-full transform group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
        {/* Resim Alanı */}
        <div className="h-52 overflow-hidden">
          <img
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            src={home.imageUrl}
            alt={home.title}
          />
        </div>

        {/* İçerik Alanı */}
        <div className="p-5">
          {/* Başlık */}
          <h3 className="text-lg font-bold text-gray-800 truncate">
            {home.title}
          </h3>

          {/* Lokasyon */}
          <p className="text-sm text-gray-500 mt-1">📍 {home.location}</p>

          {/* Detaylar (Misafir, Yatak, Banyo) */}
          <div className="flex items-center text-gray-600 text-xs space-x-3 mt-4">
            <span>👥 {home.guests} guests</span>
            <span>•</span>
            <span>🛏️ {home.bedrooms} bed</span>
            <span>•</span>
            <span>🛁 {home.bathrooms} bath</span>
          </div>

          {/* Fiyat */}
          <div className="mt-4">
            <p className="text-xl font-extrabold text-gray-900">
              ${home.pricePerNight}
              <span className="font-medium text-base text-gray-500">
                {" "}
                / night
              </span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HomeCard;
