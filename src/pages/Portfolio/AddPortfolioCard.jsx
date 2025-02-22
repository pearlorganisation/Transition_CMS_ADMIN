import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addPortfolioCard } from "../../features/actions/Portfolio/portfolioCardsAction";
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
    url: "your-upload-url",
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
const AddPortfolioCard = () => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    await dispatch(addPortfolioCard(data));
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
    <div className="max-w-2xl mx-auto px-6 bg-gray-300 shadow-lg rounded-lg mt-2 pb-6">
      <h1 className="text-2xl font-bold mb-6">Add Portfolio Card</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="w-full">
          <label htmlFor="title" className="block font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter Title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Overview
          </label>
          <Controller
            control={control}
            name="description"
            rules={{ required: "Description is required" }}
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

        <div>
          <label htmlFor="icon" className="block font-medium mb-1">
            Upload Icon
          </label>
          <input
            type="file"
            id="icon"
            accept="image/*"
            {...register("icon", { required: "Icon is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            onChange={handleImageChange}
          />
          {errors.icon && (
            <p className="text-red-500 text-sm mt-1">{errors.icon.message}</p>
          )}
        </div>

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

        <button
          type="submit"
          className={`w-full font-bold py-2 px-4 rounded transition ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Portfolio Card"}
        </button>
      </form>
    </div>
  );
};

export default AddPortfolioCard;
