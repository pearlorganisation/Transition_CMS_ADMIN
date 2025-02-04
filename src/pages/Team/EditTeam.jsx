import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleTeam, updateTeam } from "../../features/actions/teamsAction";
import { useForm } from "react-hook-form";

const EditTeam = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { team } = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(getSingleTeam(id));
  }, [dispatch, id]);

  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (team) {
      reset({
        name: team.name || "",
        bio: team.bio || "",
        link: team.link || "",
      });
      if (team.image) {
        setImagePreview(team.image.secure_url);
      }
    }
  }, [team, reset]);

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    dispatch(updateTeam({ id: team._id, updatedData: data }));
    alert("Team edited successfully!");
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

  console.log(team, "Single Team");
  return (
    <div className="max-w-2xl mx-auto px-6 bg-gray-400 shadow-lg rounded-lg h-full mt-2 pb-6">
      <h1 className="text-2xl font-bold mb-6">Edit Team </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Name is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Designation Field */}
        <div>
          <label htmlFor="bio" className="block font-medium mb-1">
            Designation
          </label>
          <input
            type="text"
            id="bio"
            {...register("bio", {
              required: "Designation is required",
            })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter designation"
          />
          {errors.bio && (
            <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
          )}
        </div>

        {/* LinkedIn Link Field */}
        <div>
          <label htmlFor="link" className="block font-medium mb-1">
            LinkedIn Link
          </label>
          <input
            type="url"
            id="linkedinLink"
            {...register("link", {
              required: "LinkedIn link is required",
              pattern: {
                value: /^https?:\/\/(www\.)?linkedin\.com\/.+$/,
                message: "Please enter a valid LinkedIn URL",
              },
            })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter LinkedIn profile link"
          />
          {errors.link && (
            <p className="text-red-500 text-sm mt-1">{errors.link.message}</p>
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
          Edit Team Mate
        </button>
      </form>
    </div>
  );
};

export default EditTeam;
