import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import {
  getFocusFeatureById,
  updateFocusAreaFeature,
} from "../../features/actions/focusAreaAction";

const EditFocusAreaFeature = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { focusAreaFeature } = useSelector((state) => state.focusArea);

  useEffect(() => {
    dispatch(getFocusFeatureById(id));
  }, [dispatch, id]);

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      features: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  useEffect(() => {
    if (focusAreaFeature) {
      reset({
        title: focusAreaFeature.title || "",
        features: focusAreaFeature.features?.length
          ? focusAreaFeature.features.map((feature) => ({ value: feature }))
          : [],
      });
      if (focusAreaFeature.image) {
        setImagePreview(focusAreaFeature.image.secure_url);
      }
    }
  }, [focusAreaFeature, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    await dispatch(
      updateFocusAreaFeature({ id: focusAreaFeature._id, updatedData: data })
    );
    setLoading(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Edit Focus Area Feature
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title Input */}
          <div>
            <label
              htmlFor="title"
              className="block font-medium text-gray-700 dark:text-gray-300"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: "Title is required" })}
              className="w-full border rounded-lg px-4 py-2 mt-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Features Input */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              Features
            </label>

            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-3 mb-2">
                <input
                  {...register(`features.${index}.value`, {
                    required: "Feature is required",
                  })}
                  placeholder="Enter feature"
                  className="border rounded-lg px-4 py-2 w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition flex items-center"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="w-5 h-5" /> {/* Trash Icon */}
                </button>
              </div>
            ))}

            <button
              type="button"
              className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition mt-2 flex items-center justify-center gap-2"
              onClick={() => append({ value: "" })}
            >
              <Plus className="w-5 h-5" /> Add Feature {/* Plus Icon */}
            </button>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              Upload Icon
            </label>
            <input
              type="file"
              {...register("image")}
              accept="image/*"
              className="w-full border rounded-lg px-4 py-2 mt-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              onChange={handleImageChange}
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="flex flex-col items-center mt-4">
              <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                Image Preview:
              </p>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Focus Area Feature"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditFocusAreaFeature;
