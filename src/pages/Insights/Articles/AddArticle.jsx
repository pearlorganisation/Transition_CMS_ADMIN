import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../axiosInstance";
import JoditEditor from "jodit-react";

const config = {
  readonly: false,
  height: 400,
  toolbar: true,
  buttons: [
    "source",
    "|",
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "|",
    "superscript",
    "subscript",
    "|",
    "ul",
    "ol",
    "|",
    "outdent",
    "indent",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "image",
    "video",
    "file",
    "table",
    "link",
    "|",
    "align",
    "undo",
    "redo",
    "|",
    "hr",
    "eraser",
    "copyformat",
    "selectall",
    "|",
    "print",
    "about",
  ],
  uploader: {
    insertImageAsBase64URI: true,
    url: "your-upload-url", // If you have a file upload URL
    format: "json",
  },
  placeholder: "Start typing here...",
  showCharsCounter: true,
  showWordsCounter: true,
  showXPathInStatusbar: false,
  spellcheck: true,
  allowResizeY: true,
  allowResizeX: false,
  language: "en",
  askBeforePasteHTML: true,
  askBeforePasteFromWord: true,
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
  const [iconPreview, setIconPreview] = useState(null); // State for icon preview
  const navigate = useNavigate();

  const handleIconChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIconPreview(URL.createObjectURL(file)); // Set the preview URL for the selected file
    }
  };

  const onSubmit = async (data) => {
    setLoading(true); // Set loading state to true while submitting
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("icon", data?.icon?.[0]);
      formData.append("blogType", "ARTICLES");
      formData.append("dateMetaData", data?.dateMetaData);
      formData.append("order", data.order);

      if (articleType === "link") {
        formData.append("link", data.link);
      } else {
        formData.append("blogBody", data.blogBody);
      }

      const response = await axiosInstance.post("/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response.data);
      toast.success("Article Created Successfully!!");
      reset();
      navigate("/articles");
    } catch (error) {
      console.error("Error creating article:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Reset loading state after submission
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-xl border border-gray-300">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Add New Article
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="mt-2 text-xs text-red-500">{errors.title.message}</p>
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
            htmlFor="dateMetaData"
            className="text-sm font-medium text-gray-700"
          >
            Date Section
          </label>
          <input
            id="dateMetaData"
            type="text"
            placeholder="YYYY-MM-DD"
            {...register("dateMetaData", {
              required: "Date metadata is required",
            })}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.dateMetaData && (
            <p className="mt-2 text-xs text-red-500">
              {errors.dateMetaData.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Choose Article Type
          </label>
          <div className="flex space-x-6">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="link"
                checked={articleType === "link"}
                onChange={() => setArticleType("link")}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-2">Link to Article</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="write"
                checked={articleType === "write"}
                onChange={() => setArticleType("write")}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-2">Write Own</span>
            </label>
          </div>
        </div>

        {articleType === "link" ? (
          <div>
            <label htmlFor="link" className="text-sm font-medium text-gray-700">
              Link
            </label>
            <input
              id="link"
              type="url"
              {...register("link", { required: "Link is required" })}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.link && (
              <p className="mt-2 text-xs text-red-500">{errors.link.message}</p>
            )}
          </div>
        ) : (
          <div>
            <label
              htmlFor="blogBody"
              className="text-sm font-medium text-gray-700"
            >
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
              <p className="mt-2 text-xs text-red-500">
                {errors.blogBody.message}
              </p>
            )}
          </div>
        )}

        <div>
          <label htmlFor="icon" className="text-sm font-medium text-gray-700">
            Icon
          </label>
          <input
            id="icon"
            type="file"
            accept="image/*"
            {...register("icon", { required: "Icon is required" })}
            onChange={handleIconChange}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.icon && (
            <p className="mt-2 text-xs text-red-500">{errors.icon.message}</p>
          )}

          {/* Icon Preview */}
          {iconPreview && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700">Icon Preview:</p>
              <img
                src={iconPreview}
                alt="Icon Preview"
                className="w-24 h-24 object-cover mt-2 rounded-md"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition-colors`}
        >
          {loading ? "Submitting..." : "Add Article"}
        </button>
      </form>
    </div>
  );
};

export default AddArticle;
