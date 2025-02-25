import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { getBlogsById } from "../../../features/actions/Blogs/blogsAction";
import JoditEditor from "jodit-react";

const config = {
  readonly: false,
  height: 400,
  toolbar: true,
  buttons: [
    "bold",
    "italic",
    "underline",
    "ul",
    "ol",
    "link",
    "image",
    "video",
    "align",
    "undo",
    "redo",
  ],
  placeholder: "Start typing here...",
};

const UpdatePress = () => {
  const { id } = useParams();
  const [articleType, setArticleType] = useState("link");
  const [loading, setLoading] = useState(false); // Manage loading state
  const [iconPreview, setIconPreview] = useState(null); // State to store the icon preview
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singleBlogData } = useSelector((state) => state.blogs);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      title: "",
      dateMetaData: "",
      shortTitle: "",
      link: "",
      blogBody: "",
      order: "",
    },
  });

  useEffect(() => {
    dispatch(getBlogsById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleBlogData) {
      reset({
        title: singleBlogData.title || "",
        dateMetaData: singleBlogData.dateMetaData || "",
        shortTitle: singleBlogData.shortTitle || "",
        link: singleBlogData.link || "",
        blogBody: singleBlogData.blogBody || "",
        order: singleBlogData.order,
      });
      setArticleType(singleBlogData.link ? "link" : "write");
    }
  }, [singleBlogData, reset]);

  const onSubmitForm = async (data) => {
    try {
      setLoading(true); // Set loading to true during the API call
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("dateMetaData", data.dateMetaData);
      formData.append("shortTitle", data.shortTitle);
      formData.append("blogType", "PRESS");

      if (data.icon?.[0]) {
        formData.append("icon", data.icon[0]);
      }

      if (data.order) formData.append("order", data.order);
      if (articleType === "link") {
        formData.append("link", data.link);
      } else {
        formData.append("blogBody", data.blogBody);
      }

      await axiosInstance.put(`/blogs/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Article Updated Successfully!");
      navigate("/press");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update article");
    } finally {
      setLoading(false); // Set loading to false once the API call is done
    }
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIconPreview(URL.createObjectURL(file)); // Create an object URL for the selected file
    }
  };

  if (!singleBlogData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg border border-gray-300">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Update Press Data
      </h2>
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
          )}
        </div>

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

        {/* Short Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Short Title
          </label>
          <input
            type="text"
            {...register("shortTitle", { required: "Short Title is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Section
          </label>
          <input
            type="date"
            {...register("dateMetaData", { required: "Date is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Article Type Selection */}
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="link"
              checked={articleType === "link"}
              onChange={() => setArticleType("link")}
              className="mr-2"
            />
            Link to Article
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="write"
              checked={articleType === "write"}
              onChange={() => setArticleType("write")}
              className="mr-2"
            />
            Write Own
          </label>
        </div>

        {/* Article Content */}
        {articleType === "link" ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link
            </label>
            <input
              type="url"
              {...register("link", {
                required: articleType === "link" ? "Link is required" : false,
                pattern: {
                  value: /^https?:\/\/.+/,
                  message:
                    "Enter a valid URL starting with http:// or https://",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Article Body
            </label>
            <Controller
              control={control}
              name="blogBody"
              rules={{ required: "Body is required" }}
              render={({ field }) => (
                <JoditEditor
                  value={field.value}
                  config={config}
                  onBlur={field.onBlur}
                  onChange={(content) => field.onChange(content)}
                />
              )}
            />
          </div>
        )}

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Icon
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("icon")}
            onChange={handleIconChange} // Handle icon change
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {iconPreview && (
            <div className="mt-3">
              <p className="text-sm text-gray-600">Preview:</p>
              <img
                src={iconPreview}
                alt="New Icon Preview"
                className="h-24 w-24 object-cover rounded-lg border mt-2"
              />
            </div>
          )}
          {singleBlogData.icon?.secure_url && !iconPreview && (
            <img
              src={singleBlogData.icon.secure_url}
              alt="Current Icon"
              className="mt-3 h-24 w-24 object-cover rounded-lg border"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading} // Disable button while loading
          className={`w-full py-3 font-medium rounded-lg shadow-md transition duration-300 ${
            loading
              ? "bg-blue-400 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Submitting..." : "Update Press Data"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePress;
