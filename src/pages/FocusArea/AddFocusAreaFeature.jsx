import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Plus, Trash2 } from "lucide-react";
import { addFocusAreaFeature } from "../../features/actions/focusAreaAction";

const AddFocusAreaFeature = () => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  const onSubmit = async (data) => {
    setLoading(true);
    await dispatch(addFocusAreaFeature(data));
    reset();
    setImagePreview(null);
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
          Add Focus Area Feature
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title Field */}
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

          {/* Features Field */}
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
              id="image"
              accept="image/*"
              {...register("image")}
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
            {loading ? "Submitting..." : "Add Focus Area Feature"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFocusAreaFeature;
