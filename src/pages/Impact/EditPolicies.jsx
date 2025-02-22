import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateImpactById } from "../../features/actions/Impact/ImapctAction";
import axiosInstance from "../../axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPolicies = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { data } = location.state ?? {};
  const { _id } = data || {};

  const [iconPreview, setIconPreview] = useState(data?.icon?.secure_url || "");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: data?.title || "",
      shortDescription: data?.shortDescription || "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        shortDescription: data.shortDescription,
      });
    }
  }, [data, reset]);

  const submitForm = async (formData) => {
    setLoading(true);
    try {
      const updatedData = new FormData();
      updatedData.append("title", formData.title);
      updatedData.append("shortDescription", formData.shortDescription);
      updatedData.append("impactDataType", "POLICIES");

      if (formData.icon && formData.icon.length > 0) {
        updatedData.append("icon", formData.icon[0]); // File input is an array, so get the first file
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      await axiosInstance.put(`/impact/${_id}`, updatedData, config);

      // Show success toast
      toast.success("Policy updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error updating policy:", error);

      // Show error toast
      toast.error("Failed to update policy. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>Edit Policies</div>
      <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
        {/* Title Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            className="border p-2 w-full"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Short Description Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Short Description
          </label>
          <textarea
            {...register("shortDescription", {
              required: "Short description is required",
            })}
            className="border p-2 w-full"
          />
          {errors.shortDescription && (
            <p className="text-red-500">{errors.shortDescription.message}</p>
          )}
        </div>

        {/* Icon Upload Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Icon
          </label>
          <input
            type="file"
            {...register("icon")}
            accept="image/*"
            className="border p-2 w-full"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setIconPreview(URL.createObjectURL(file));
              }
            }}
          />
          {iconPreview && (
            <div className="mt-2">
              <p>Preview:</p>
              <img
                src={iconPreview}
                alt="Icon Preview"
                className="w-20 h-20 object-cover rounded"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Policy"}
        </button>
      </form>
    </>
  );
};

export default EditPolicies;
