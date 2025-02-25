import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogsById } from "../../../features/actions/Blogs/blogsAction";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axiosInstance from "../../../axiosInstance";

const EditPodcast = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleBlogData } = useSelector((state) => state.blogs);
  const [loading, setLoading] = useState(false); // For form submission loading
  const [iconPreview, setIconPreview] = useState(
    singleBlogData?.icon?.secure_url || ""
  ); // Preview of icon

  useEffect(() => {
    dispatch(getBlogsById(id));
  }, [dispatch, id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: singleBlogData?.title,
      shortTitle: singleBlogData?.shortTitle,
      link: singleBlogData?.link,
      order: singleBlogData?.order,
    },
  });

  useEffect(() => {
    if (singleBlogData) {
      reset({
        title: singleBlogData.title || "",
        shortTitle: singleBlogData.shortTitle || "",
        link: singleBlogData.link || "",
        order: singleBlogData.order,
      });
    }
  }, [singleBlogData, reset]);

  const onSubmitForm = async (data) => {
    try {
      setLoading(true); // Disable form while loading
      // Log form data for debugging
      console.log("Form Data:", data);

      const formData = new FormData();

      // Append all form fields, checking for undefined values
      if (data.title) formData.append("title", data.title);
      if (data.shortTitle) formData.append("shortTitle", data.shortTitle);
      if (data.link) formData.append("link", data.link);

      formData.append("blogType", "PODCAST");
      if (data.order) formData.append("order", data.order);
      // Handle file upload
      if (data.icon?.[0]) {
        formData.append("icon", data.icon[0]);
      }

      const response = await axiosInstance.put(`/blogs/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response.data);
      toast.success("Podcast Updated Successfully!");
      navigate("/podcast");
    } catch (error) {
      console.error("Error updating podcast:", error);
      toast.error(error.response?.data?.message || "Failed to update podcast");
    } finally {
      setLoading(false); // Enable form after submission
    }
  };

  const handleIconChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIconPreview(URL.createObjectURL(file)); // Show preview of new icon
    }
  };

  // Add form validation rules
  const registerOptions = {
    title: { required: "Title is required" },
    shortTitle: { required: "Short Title is required" },
    link: {
      required: true,
      pattern: {
        value: /^https?:\/\/.+/,
        message: "Please enter a valid URL starting with http:// or https://",
      },
    },
  };

  if (!singleBlogData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Edit Podcast
      </h1>
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register("title", registerOptions.title)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading} // Disable input while loading
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
        <div>
          <label
            htmlFor="shortTitle"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Short Title
          </label>
          <input
            id="shortTitle"
            type="text"
            {...register("shortTitle", registerOptions.shortTitle)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading} // Disable input while loading
          />
          {errors.shortTitle && (
            <p className="mt-1 text-xs text-red-500">
              {errors.shortTitle.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="link"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Link
          </label>
          <input
            id="link"
            type="url"
            {...register("link", registerOptions.link)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading} // Disable input while loading
          />
          {errors.link && (
            <p className="mt-1 text-xs text-red-500">{errors.link.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="icon"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Icon
          </label>
          <input
            id="icon"
            type="file"
            accept="image/*"
            {...register("icon")}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleIconChange}
            disabled={loading} // Disable input while loading
          />
          {errors.icon && (
            <p className="mt-1 text-xs text-red-500">{errors.icon.message}</p>
          )}

          {/* Show preview of icon */}
          {iconPreview && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">Preview Icon:</p>
              <img
                src={iconPreview}
                alt="Icon preview"
                className="mt-2 h-20 w-20 object-cover rounded-full border"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading} // Disable button while loading
        >
          {loading ? "Updating..." : "Update Podcast Data"}
        </button>
      </form>
    </div>
  );
};

export default EditPodcast;
