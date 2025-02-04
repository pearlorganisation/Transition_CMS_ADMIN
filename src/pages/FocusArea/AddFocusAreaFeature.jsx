import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addFocusAreaFeature } from "../../features/actions/focusAreaAction";

const AddFocusAreaFeature = () => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null); // For image preview
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

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    dispatch(addFocusAreaFeature(data));
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
      <h1 className="text-2xl font-bold mb-6">Add Focus Area Feature</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title Field */}
        <div className="w-full">
          <label htmlFor="title" className="block font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Features Field */}
        <div className="w-full">
          <label htmlFor="features" className="block font-medium mb-1">
            Features
          </label>

          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input
                {...register(`features.${index}.value`, {
                  required: "Feature is required",
                })}
                placeholder="Enter feature"
                className="border px-3 py-2 rounded w-full"
              />
              <button
                type="button"
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            className="bg-green-500 text-white px-3 py-1 rounded"
            onClick={() => append({ value: "" })}
          >
            Add Feature
          </button>
          {errors.features && (
            <p className="text-red-500 text-sm mt-1">
              {errors.features.message}
            </p>
          )}
        </div>

        {/* Image Upload Field */}
        <div>
          <label htmlFor="image" className="block font-medium mb-1">
            Upload Icon
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
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
          Add Focus Area Feature
        </button>
      </form>
    </div>
  );
};

export default AddFocusAreaFeature;
