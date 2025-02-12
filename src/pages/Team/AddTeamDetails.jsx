import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTeam } from "../../features/actions/teamsAction";
import { addTeamDetails } from "../../features/actions/teamDetailsAction";

const AddTeamDetails = () => {
  const dispatch = useDispatch();
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

    dispatch(addTeamDetails(data));
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
    <div className="max-w-2xl mx-auto px-6 bg-gray-300 shadow-lg rounded-lg  mt-2 pb-6">
      <h1 className="text-2xl font-bold mb-6">Add Team Details </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}

        <div className="w-full">
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

        {/* Designation Field */}
        <div className="w-full">
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <input
            type="text"
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter description"
          />
          {errors.bio && (
            <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
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
          Add Team Details
        </button>
      </form>
    </div>
  );
};

export default AddTeamDetails;
