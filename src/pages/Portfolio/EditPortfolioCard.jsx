import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  getSinglePortfolioCard,
  updatePortfolioCard,
} from "../../features/actions/Portfolio/portfolioCardsAction";

const EditPortfolioCard = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { singlePortfolioCard } = useSelector((state) => state.portfolioCards);

  useEffect(() => {
    dispatch(getSinglePortfolioCard(id));
  }, [dispatch, id]);

  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (singlePortfolioCard) {
      reset({
        title: singlePortfolioCard.title || "",
        description: singlePortfolioCard.description || "",
      });
      if (singlePortfolioCard.icon) {
        setImagePreview(singlePortfolioCard.icon.secure_url);
      }
    }
  }, [singlePortfolioCard, reset]);

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    dispatch(
      updatePortfolioCard({ id: singlePortfolioCard._id, updatedData: data })
    );
    alert("Portfolio Card edited successfully!");
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

  console.log(singlePortfolioCard, "Single portfolio card");
  return (
    <div className="max-w-2xl mx-auto px-6 bg-gray-400 shadow-lg rounded-lg h-full mt-2 pb-6">
      <h1 className="text-2xl font-bold mb-6">Edit Portfolio Card </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
        {/* Name Field */}
        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter name"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Designation Field */}
        <div>
          <label htmlFor="bio" className="block font-medium mb-1">
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
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Image Upload Field */}
        <div>
          <label htmlFor="icon" className="block font-medium mb-1">
            Upload Image
          </label>
          <input
            type="file"
            id="icon"
            accept="image/*"
            {...register("icon")}
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
            <p className="font-medium mb-1">Icon Preview:</p>
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
          Edit Profile Card
        </button>
      </form>
    </div>
  );
};

export default EditPortfolioCard;
