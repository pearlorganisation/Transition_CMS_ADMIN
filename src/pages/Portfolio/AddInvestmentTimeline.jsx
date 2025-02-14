import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import axiosInstance from "../../axiosInstance";

const AddInvestmentTimeline = () => {
  const {
    register,
    handleSubmit,
    control,

    formState: { errors },
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/api/v1/investment-timeline-cards")
      .then((response) => {
        const formattedOptions = response.data.data.map((feature) => ({
          value: feature._id,
          label: feature.body,
        }));
        setOptions(formattedOptions);
      })
      .catch((error) => console.error("Error fetching features:", error));
  }, []);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("description", data.description);
      formData.append("investmentYear", data.investmentYear);
      formData.append("image", data.image[0]);

      formData.append(
        "cards",
        JSON.stringify(
          data.cards.map((card) => ({ _id: card.value, body: card.label }))
        )
      );

      await axiosInstance.post("/api/v1/investment-timeline", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Investment Timeline added successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Investment Timeline</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Description */}
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full p-2 border rounded"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Investment Year */}
        <div>
          <label className="block text-gray-700">Investment Year</label>
          <input
            type="number"
            {...register("investmentYear", {
              required: "Investment Year is required",
            })}
            className="w-full p-2 border rounded"
          />
          {errors.investmentYear && (
            <p className="text-red-500">{errors.investmentYear.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            {...register("image", { required: "Image is required" })}
            className="w-full p-2 border rounded"
            accept="image/*"
            onChange={(e) =>
              setImagePreview(URL.createObjectURL(e.target.files[0]))
            }
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        {/* Cards Multi-Select */}
        <div>
          <label className="block text-gray-700">Select Cards</label>
          <Controller
            name="cards"
            control={control}
            rules={{ required: "At least one card must be selected" }}
            render={({ field }) => (
              <Select
                {...field}
                options={options}
                isMulti
                className="basic-multi-select"
                classNamePrefix="select"
              />
            )}
          />
          {errors.cards && (
            <p className="text-red-500">{errors.cards.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddInvestmentTimeline;
