import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axiosInstance from "../../../axiosInstance";

const AddPodcast = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [previewIcon, setPreviewIcon] = useState(null); // For icon preview

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("icon", data?.icon?.[0]);
      formData.append("blogType", "PODCAST");
      formData.append("link", data.link);
      formData.append("shortTitle", data.shortTitle);
      formData.append("order", data.order);

      const response = await axiosInstance.post("/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Podcast created:", response.data);
      toast.success("Podcast Created Successfully!");
      reset();
      navigate("/podcast");
    } catch (error) {
      console.error("Error creating podcast:", error);
      toast.error("Error creating podcast");
    } finally {
      setLoading(false);
    }
  };

  // Handle file change for icon preview
  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewIcon(URL.createObjectURL(file)); // Preview selected icon
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Podcast</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/** for setting the order of the news */}
        <div>
          <label
            htmlFor="order"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Enter Order
          </label>
          <input
            id="order"
            type="number"
            {...register("order")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.order && (
            <p className="mt-1 text-xs text-red-500">{errors.order.message}</p>
          )}
        </div>

        {/* Short Description */}
        <div>
          <label
            htmlFor="shortTitle"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Short Description
          </label>
          <input
            id="shortTitle"
            type="text"
            {...register("shortTitle", {
              required: "Short Description is required",
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.shortTitle && (
            <p className="mt-1 text-xs text-red-500">
              {errors.shortTitle.message}
            </p>
          )}
        </div>

        {/* Link */}
        <div>
          <label
            htmlFor="link"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Link
          </label>
          <input
            id="link"
            type="url"
            {...register("link", { required: "Link is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.link && (
            <p className="mt-1 text-xs text-red-500">{errors.link.message}</p>
          )}
        </div>

        {/* Icon */}
        <div>
          <label
            htmlFor="icon"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Icon
          </label>
          <input
            id="icon"
            type="file"
            accept="image/*"
            {...register("icon", { required: "Icon is required" })}
            onChange={handleIconChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.icon && (
            <p className="mt-1 text-xs text-red-500">{errors.icon.message}</p>
          )}
          {previewIcon && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Preview Icon:</p>
              <img
                src={previewIcon}
                alt="Preview Icon"
                className="mt-1 h-20 w-20 object-cover rounded"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Adding Podcast..." : "Add Podcast"}
        </button>
      </form>
    </div>
  );
};

export default AddPodcast;
