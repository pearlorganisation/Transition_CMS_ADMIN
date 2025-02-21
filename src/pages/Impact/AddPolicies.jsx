"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import axiosInstance from "../../axiosInstance";

const AddPolicies = () => {
  const { register, handleSubmit, reset } = useForm();
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("shortDescription", data.shortDescription);
    formData.append("impactDataType", "POLICIES");
    formData.append("icon", data.icon[0]); // File input

    try {
      const config = {
        headers:{
          "Content-Type":"multipart/form-data"
        }
      }
      const response = await axiosInstance.post(`/impact`, formData,config);

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      setSuccessMessage("Policy added successfully!");
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add Policy</h2>
      {successMessage && (
        <div className="p-2 mb-4 text-green-600 border border-green-400 rounded">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            {...register("title")}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Short Description</label>
          <textarea
            {...register("shortDescription")}
            className="w-full p-2 border rounded"
            required
          />
        </div>
 

        <div>
          <label className="block font-medium">Icon (Image)</label>
          <input
            type="file"
            accept="image/*"
            {...register("icon")}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPolicies;
