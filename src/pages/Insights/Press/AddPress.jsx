import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axiosInstance from "../../../axiosInstance";
import JoditEditor from "jodit-react";
import ClipLoader from "react-spinners/ClipLoader";

const config = {
  readonly: false,
  height: 400,
  toolbar: true,
  placeholder: "Start writing...",
  showCharsCounter: true,
  showWordsCounter: true,
  language: "en",
};

const AddArticle = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const [articleType, setArticleType] = useState("link");
  const [loading, setLoading] = useState(false);
  const [iconPreview, setIconPreview] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("icon", data?.icon?.[0]);
      formData.append("blogType", "PRESS");
      formData.append("dateMetaData", data?.dateMetaData);
      formData.append("shortTitle", data?.shortTitle);
      formData.append("order", data?.order);

      if (articleType === "link") {
        formData.append("link", data.link);
      } else {
        formData.append("blogBody", data.blogBody);
      }

      const response = await axiosInstance.post("/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response.data);

      toast.success("Article Created Successfully!");
      reset();
      setIconPreview(null); // Reset preview after successful submission
      navigate("/press");
    } catch (error) {
      console.log(error.message);
      toast.error("Error creating article!");
    } finally {
      setLoading(false);
    }
  };

  // Handle image preview before submission
  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-6 py-10">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Add New Press Data
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter title"
              {...register("title", { required: "Title is required" })}
              className="w-full px-4 py-3 border rounded-md dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:outline-none"
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">
                {errors.title.message}
              </p>
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
              <p className="mt-1 text-xs text-red-500">
                {errors.order.message}
              </p>
            )}
          </div>

          {/* Short Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Short Title
            </label>
            <input
              type="text"
              placeholder="INVESTMENT/NEWS"
              {...register("shortTitle", {
                required: "Short Title is required",
              })}
              className="w-full px-4 py-3 border rounded-md dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:outline-none"
            />
            {errors.shortTitle && (
              <p className="text-xs text-red-500 mt-1">
                {errors.shortTitle.message}
              </p>
            )}
          </div>

          {/* Date Metadata */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date
            </label>
            <input
              type="text"
              placeholder="Aug 22, 2024 - 4 min read"
              {...register("dateMetaData", { required: "Date is required" })}
              className="w-full px-4 py-3 border rounded-md dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:outline-none"
            />
            {errors.dateMetaData && (
              <p className="text-xs text-red-500 mt-1">
                {errors.dateMetaData.message}
              </p>
            )}
          </div>

          {/* Article Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Choose Article Type
            </label>
            <div className="flex space-x-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="link"
                  checked={articleType === "link"}
                  onChange={() => setArticleType("link")}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-gray-800 dark:text-gray-300">
                  Link to Article
                </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="write"
                  checked={articleType === "write"}
                  onChange={() => setArticleType("write")}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-gray-800 dark:text-gray-300">
                  Write Own
                </span>
              </label>
            </div>
          </div>

          {/* Article Link / Body */}
          {articleType === "link" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Link
              </label>
              <input
                type="url"
                {...register("link", { required: "Link is required" })}
                className="w-full px-4 py-3 border rounded-md dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:outline-none"
              />
              {errors.link && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.link.message}
                </p>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Body
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
              {errors.blogBody && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.blogBody.message}
                </p>
              )}
            </div>
          )}

          {/* Icon Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Icon
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("icon", { required: "Icon is required" })}
              onChange={handleIconChange}
              className="w-full px-4 py-3 border rounded-md dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:outline-none"
            />
            {errors.icon && (
              <p className="text-xs text-red-500 mt-1">{errors.icon.message}</p>
            )}

            {/* Icon Preview */}
            {iconPreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Icon Preview:
                </p>
                <img
                  src={iconPreview}
                  alt="Icon Preview"
                  className="w-32 h-32 object-cover rounded-lg shadow-md"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-lg font-medium ${
              loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white rounded-md transition`}
          >
            {loading ? (
              <ClipLoader size={20} color="#ffffff" loading={loading} />
            ) : (
              "Add Press Data"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;
