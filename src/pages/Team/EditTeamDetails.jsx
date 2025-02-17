import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  getSingleTeamDetails,
  updateTeamDetails,
} from "../../features/actions/teamDetailsAction";
import { toast } from "sonner";

const EditTeamDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { teamDetails } = useSelector((state) => state.teamDetails);

  useEffect(() => {
    dispatch(getSingleTeamDetails(id));
  }, [dispatch, id]);

  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (teamDetails) {
      reset({
        title: teamDetails.title || "",
        description: teamDetails.description || "",
      });
      if (teamDetails.image) {
        setImagePreview(teamDetails.image.secure_url);
      }
    }
  }, [teamDetails, reset]);

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    dispatch(updateTeamDetails({ id: teamDetails._id, updatedData: data }));
    toast.success("Team Details edited successfully!");
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

  console.log(teamDetails, "Single Team Details");
  return (
    <div className="max-w-2xl mx-auto px-6 bg-gray-400 shadow-lg rounded-lg h-full mt-2 pb-6">
      <h1 className="text-2xl font-bold mb-6">Edit Team Details </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
        {/* Name Field */}
        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Name is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter Title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <input
            type="text"
            id="description"
            {...register("description", {
              required: "Designation is required",
            })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter designation"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Image Upload Field */}
        <div>
          <label htmlFor="image" className="block font-medium mb-1">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            {...register("image")}
            className="w-full border border-gray-300 rounded px-3 py-2"
            onChange={handleImageChange}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
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
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Edit Team Details
        </button>
      </form>
    </div>
  );
};

export default EditTeamDetails;
