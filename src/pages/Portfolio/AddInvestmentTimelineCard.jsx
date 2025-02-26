import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addInvestmentTimelineCard } from "../../features/actions/Portfolio/investmentTimelineCardsAction";

const AddInvestmentTimelineCard = () => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    await dispatch(addInvestmentTimelineCard(data));
    setLoading(false);
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
    <div className="max-w-2xl mx-auto px-6 bg-gray-300 shadow-lg rounded-lg mt-2 pb-6">
      <h1 className="text-2xl font-bold mb-6">Add Investment Timeline Card</h1>
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

        {/* Body Field */}
        <div className="w-full">
          <label htmlFor="body" className="block font-medium mb-1">
            Body
          </label>
          <input
            type="text"
            id="body"
            {...register("body", { required: "Body is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter Body Text"
          />
          {errors.body && (
            <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>
          )}
        </div>

        {/* Image Upload Field */}
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
          className={`w-full text-white font-bold py-2 px-4 rounded transition ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Investment Timeline Card"}
        </button>
      </form>
    </div>
  );
};

export default AddInvestmentTimelineCard;
