import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogsById } from "../../../features/actions/Blogs/blogsAction";
import { useForm, Controller } from "react-hook-form";
import axiosInstance from "../../../axiosInstance";
import { toast } from "react-toastify";
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

const EditArticle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [articleType, setArticleType] = useState("link");
  const [loading, setLoading] = useState(false);
  const [previewIcon, setPreviewIcon] = useState(null); // For icon preview
  const { singleBlogData } = useSelector((state) => state.blogs);
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      dateMetaData: "",
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
        link: singleBlogData.link || "",
        blogBody: singleBlogData.blogBody || "",
        order: singleBlogData.order,
      });
      setArticleType(singleBlogData.link ? "link" : "write");
      setPreviewIcon(singleBlogData.icon?.secure_url || null); // Set initial icon preview
    }
  }, [singleBlogData, reset]);

  const onSubmitForm = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();

      if (data.title) formData.append("title", data.title);
      if (data.dateMetaData) formData.append("dateMetaData", data.dateMetaData);
      if (data.order) formData.append("order", data.order);
      formData.append("blogType", "ARTICLES");

      // Handle file upload if selected
      if (data.icon?.[0]) {
        formData.append("icon", data.icon[0]);
      }

      if (articleType === "link") {
        if (data.link) formData.append("link", data.link);
      } else {
        if (data.blogBody) formData.append("blogBody", data.blogBody);
      }

      const response = await axiosInstance.put(`/blogs/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response.data);

      toast.success("Article Updated Successfully!");
      navigate("/articles");
    } catch (error) {
      console.error("Error updating article:", error);
      toast.error(error.response?.data?.message || "Failed to update article");
    } finally {
      setLoading(false);
    }
  };

  const registerOptions = {
    title: { required: "Title is required" },
    dateMetaData: { required: "Date meta data is required" },
    link: {
      required: articleType === "link" ? "Link is required" : false,
      pattern: {
        value: /^https?:\/\/.+/,
        message: "Please enter a valid URL starting with http:// or https://",
      },
    },
    blogBody: {
      required: articleType === "write" ? "Article body is required" : false,
      minLength: {
        value: 10,
        message: "Blog body must be at least 10 characters long",
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

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewIcon(URL.createObjectURL(file)); // Show preview for selected icon
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Edit Article</h1>
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

        <div>
          <label
            htmlFor="dateMetaData"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Date Section
          </label>
          <input
            id="dateMetaData"
            type="text"
            {...register("dateMetaData", registerOptions.dateMetaData)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.dateMetaData && (
            <p className="mt-1 text-xs text-red-500">
              {errors.dateMetaData.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose Article Type
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="link"
                checked={articleType === "link"}
                onChange={() => setArticleType("link")}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Link to Article</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="write"
                checked={articleType === "write"}
                onChange={() => setArticleType("write")}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Write Own</span>
            </label>
          </div>
        </div>

        {articleType === "link" ? (
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.link && (
              <p className="mt-1 text-xs text-red-500">{errors.link.message}</p>
            )}
          </div>
        ) : (
          <div>
            <label
              htmlFor="blogBody"
              className="block text-sm font-medium text-gray-700 mb-2"
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
          </div>
        )}

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

        <button
          type="submit"
          className={`w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Article"}
        </button>
      </form>
    </div>
  );
};

export default EditArticle;
