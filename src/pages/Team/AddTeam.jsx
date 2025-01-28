import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddTeam = () => {
  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("News added successfully!");
    reset();
    setImagePreview(null);
  };

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 bg-gray-300 shadow-lg rounded-lg h-full mt-2 pb-6">
      <h1 className="text-2xl font-bold mb-6">Add Team </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Name is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Designation Field */}
        <div>
          <label htmlFor="designation" className="block font-medium mb-1">
            Designation
          </label>
          <input
            type="text"
            id="designation"
            {...register("designation", {
              required: "Designation is required",
            })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter designation"
          />
          {errors.designation && (
            <p className="text-red-500 text-sm mt-1">
              {errors.designation.message}
            </p>
          )}
        </div>

        {/* LinkedIn Link Field */}
        <div>
          <label htmlFor="linkedinLink" className="block font-medium mb-1">
            LinkedIn Link
          </label>
          <input
            type="url"
            id="linkedinLink"
            {...register("linkedinLink", {
              required: "LinkedIn link is required",
              pattern: {
                value: /^https?:\/\/(www\.)?linkedin\.com\/.+$/,
                message: "Please enter a valid LinkedIn URL",
              },
            })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter LinkedIn profile link"
          />
          {errors.linkedinLink && (
            <p className="text-red-500 text-sm mt-1">
              {errors.linkedinLink.message}
            </p>
          )}
        </div>

        {/* Image Upload Field */}
        <div>
          <label htmlFor="image" className="block font-medium mb-1">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            onChange={handleImageChange}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-4">
            <p className="font-medium mb-1">Image Preview:</p>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded border"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Add Team Mate
        </button>
      </form>
    </div>
  );
};

export default AddTeam;
