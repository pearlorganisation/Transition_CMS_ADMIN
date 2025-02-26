import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddNews = () => {
  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
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
      <h1 className="text-2xl font-bold mb-6">Add News </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Read Time Field */}
        <div>
          <label htmlFor="readTime" className="block font-medium mb-1">
            Read Time
          </label>
          <input
            type="text"
            id="readTime"
            {...register("readTime", { required: "Read Time is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter read time in minutes"
          />
          {errors.readTime && (
            <p className="text-red-500 text-sm mt-1">
              {errors.readTime.message}
            </p>
          )}
        </div>

        {/* Category Field */}
        <div>
          <label htmlFor="category" className="block font-medium mb-1">
            Category
          </label>
          <input
            type="text"
            id="category"
            {...register("category", {
              required: "category is required",
            })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter category"
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* News or Article Link Field */}
        <div>
          <label htmlFor="newsLink" className="block font-medium mb-1">
            News or Article Link
          </label>
          <input
            type="url"
            id="newsLink"
            {...register("newsLink", {
              required: "A link is required",
              pattern: {
                value: /^https?:\/\/(www\.)\.com\/.+$/,
                message: "Please enter a valid LinkedIn URL",
              },
            })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter News or Article Link"
          />
          {errors.newsLink && (
            <p className="text-red-500 text-sm mt-1">
              {errors.newsLink.message}
            </p>
          )}
        </div>

        {/* Image Upload Field */}
        <div>
          <label htmlFor="imageUrl" className="block font-medium mb-1">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            {...register("imageUrl", { required: "Image is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            onChange={handleImageChange}
          />
          {errors.imageUrl && (
            <p className="text-red-500 text-sm mt-1">
              {errors.imageUrl.message}
            </p>
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
          Add News
        </button>
      </form>
    </div>
  );
};

export default AddNews;
