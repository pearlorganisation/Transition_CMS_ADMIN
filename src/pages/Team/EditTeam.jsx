import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleTeam, updateTeam } from "../../features/actions/teamsAction";
import { useForm } from "react-hook-form";

const EditTeam = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { team } = useSelector((state) => state.teams);

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getSingleTeam(id));
  }, [dispatch, id]);

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

  const onSubmit = async (data) => {
    setLoading(true);
    await dispatch(updateTeam({ id: team._id, updatedData: data }));
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-8">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h1 className="text-xl font-semibold text-center text-gray-800 mb-6">
          Edit Team Member
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Designation */}
          <div>
            <label htmlFor="bio" className="block text-gray-700 font-medium">
              Designation
            </label>
            <input
              type="text"
              id="bio"
              {...register("bio", { required: "Designation is required" })}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter designation"
            />
            {errors.bio && (
              <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
            )}
          </div>

          {/* LinkedIn Link */}
          <div>
            <label htmlFor="link" className="block text-gray-700 font-medium">
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
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter LinkedIn profile link"
            />
            {errors.link && (
              <p className="text-red-500 text-sm mt-1">{errors.link.message}</p>
            )}
          </div>

          {/* Upload Image */}
          <div>
            <label htmlFor="image" className="block text-gray-700 font-medium">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              {...register("image")}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={handleImageChange}
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-4 flex flex-col items-center">
              <p className="font-medium text-gray-700">Image Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-28 h-28 object-cover rounded-lg border border-gray-300 shadow-md mt-2"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
            }`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Edit Team Member"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTeam;
