import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createHome } from "../api/homesApi";
import type { Home } from "../types/home";

interface FormState {
  title: string;
  description: string;
  pricePerNight: string;
  location: string;
  imageUrl: string;
  guests: string;
  bedrooms: string;
  bathrooms: string;
  amenities: string;
}

const AddHome: React.FC = () => {
  const navigate = useNavigate();

  const initialState: FormState = {
    title: "",
    description: "",
    pricePerNight: "",
    location: "",
    imageUrl: "",
    guests: "1",
    bedrooms: "1",
    bathrooms: "1",
    amenities: "",
  };

  const [formData, setFormData] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const newHomeData: Omit<Home, "id"> = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        imageUrl: formData.imageUrl,
        pricePerNight: parseInt(formData.pricePerNight, 10) || 0,
        guests: parseInt(formData.guests, 10) || 0,
        bedrooms: parseInt(formData.bedrooms, 10) || 0,
        bathrooms: parseInt(formData.bathrooms, 10) || 0,
        amenities: formData.amenities
          .split(",")
          .map((item: string) => item.trim())
          .filter((item: string) => item),
      };

      await createHome(newHomeData);
      alert("New home added successfully!");
      navigate("/");
    } catch (error) {
      alert("Failed to add new home. Please check the details and try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 transition-colors flex items-center"
          >
            ← Back to listings
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Add New Home
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="pricePerNight"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price per night ($){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="pricePerNight"
                      id="pricePerNight"
                      value={formData.pricePerNight}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="imageUrl"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label
                      htmlFor="guests"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Guests <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="guests"
                      id="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="bedrooms"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Bedrooms <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="bedrooms"
                      id="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="bathrooms"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Bathrooms <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="bathrooms"
                      id="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="amenities"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Amenities (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="amenities"
                    id="amenities"
                    value={formData.amenities}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
              </div>
              <div className="mt-8 pt-5 border-t border-gray-200 flex justify-end space-x-3">
                <Link
                  to="/"
                  className="bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-red-500 text-white font-semibold px-6 py-3 rounded-lg shadow-sm hover:bg-red-600 flex items-center disabled:bg-red-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Creating..." : "🏠 Create Home"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHome;
