import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTeam } from "../../features/actions/teamsAction";

const AddTeam = () => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    await dispatch(addTeam(data));
    setLoading(false);
    reset();
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="max-w-lg w-full bg-white shadow-md rounded-xl p-8 border border-gray-200">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Add Team Member
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name & Designation */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
  
            <div>
              <label htmlFor="bio" className="block text-gray-700 font-medium">
                Designation
              </label>
              <input
                type="text"
                id="bio"
                {...register("bio", { required: "Designation is required" })}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter designation"
              />
              {errors.bio && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bio.message}
                </p>
              )}
            </div>
          </div>

          {/* Type */}
          <div>
            <label htmlFor="type" className="block text-gray-700 font-medium">
              Type
            </label>
            <select
              id="type"
              {...register("type", { required: "Type is required" })}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            >
              <option value="">Select Type</option>
              <option value="executive_team">Executive Team</option>
              <option value="general_partners">General Partners</option>
              <option value="experts">Experts</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>
{/** order */}
          <div>
            <label htmlFor="order" className="block text-gray-700 font-medium">
              Select Order
            </label>
            <input
              type="number"
              id="order"
              {...register("order", { required: "Order is required" })}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Enter Order"
            />
            {errors.order && (
              <p className="text-red-500 text-sm mt-1">
                {errors.order.message}
              </p>
            )}
          </div>
          {/* LinkedIn Link */}
          <div>
            <label htmlFor="link" className="block text-gray-700 font-medium">
              LinkedIn Link
            </label>
            <input
              type="url"
              id="link"
              {...register("link", {
                required: "LinkedIn link is required",
                pattern: {
                  value: /^https?:\/\/(www\.)?linkedin\.com\/.+$/,
                  message: "Please enter a valid LinkedIn URL",
                },
              })}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Enter LinkedIn profile link"
            />
            {errors.link && (
              <p className="text-red-500 text-sm mt-1">{errors.link.message}</p>
            )}
          </div>

          {/* Upload Image */}
          <div>
            <label htmlFor="image" className="block text-gray-700 font-medium">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              onChange={handleImageChange}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-4 flex flex-col items-center">
              <p className="font-medium text-gray-700">Image Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-full border border-gray-300 shadow-md mt-2"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Team Member"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTeam;
