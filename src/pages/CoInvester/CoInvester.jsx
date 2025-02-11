import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateCoInvester,
  deleteInvestor,
  getInvestors,
  updateInvestor,
} from "../../features/actions/coInvester";

const CoInvester = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const { loading, coInvestors } = useSelector((state) => state.coInvestors);
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState(null);
  const [id, setId] = useState([]);

  useEffect(() => {
    dispatch(getInvestors());
  }, [id]);
  const onSubmit = (data) => {
    const formData = new FormData();
    console.log("data", data.logo);

    formData.append("name", data.name);

    if (data.logo && data.logo.length > 0) {
      formData.append("logo", data.logo[0]);
    }

    if (editingId) {
      dispatch(updateInvestor({ id: editingId, updatedData: formData }));
      setEditingId(null);
    } else {
      dispatch(CreateCoInvester(formData));
    }
  };

  const handleEdit = (id) => {
    const investor = coInvestors?.data?.find((item) => item._id === id);
    if (investor) {
      setValue("name", investor.name);
      setPreview(investor.logo?.secure_url || null);
      setEditingId(id);
    }
  };
  const handleDelete = (id) => {
    dispatch(deleteInvestor(id))
  };

  return (
    <div className="flex justify-center flex-col items-center py-10 bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-6 space-y-6 max-w-lg w-full"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          {editingId ? "Edit Co-Investor" : "Add Co-Investor"}
        </h2>

        {/* Name Input */}
        <div>
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            placeholder="Enter name"
            {...register("name", { required: "Name is required" })}
            className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-gray-700 font-medium">Upload Logo</label>
          <input
            type="file"
            accept="image/*"
            {...register("logo")}
            className="w-full border rounded-lg p-2 mt-1 bg-gray-50"
            onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-16 h-16 object-cover rounded-lg mt-2"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {editingId ? "Update" : "Submit"}
        </button>
      </form>

      {/* Table */}
      {coInvestors?.data?.length > 0 ? (
  <table className="w-full table-auto border-collapse mt-6">
    <thead>
      <tr className="bg-gray-200 w-full">
        <th className="px-6 py-3 text-center w-1/4">Logo</th>
        <th className="px-6 py-3 text-left w-1/3">Name</th>
        <th className="px-6 py-3 text-center w-1/3">Actions</th>
      </tr>
    </thead>
    <tbody>
      {coInvestors?.data?.map((item) =>
        item?.logo && item?.logo?.secure_url ? (
          <tr key={item?._id} className="border-b">
            <td className="px-6 py-3 text-center">
              <img
                src={item?.logo?.secure_url}
                alt={`Logo of ${item?.name}`}
                className="w-16 h-16 object-cover rounded-lg mx-auto"
              />
            </td>
            <td className="px-6 py-3 text-left whitespace-nowrap">{item?.name}</td>
            <td className="px-6 py-3 text-center whitespace-nowrap">
              <button
                onClick={() => {
                  handleEdit(item?._id);
                  setId(item?._id);
                }}
                className="text-blue-600 hover:text-blue-800 mr-4"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  handleDelete(item?._id);
                  setId(item?._id);
                }}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </td>
          </tr>
        ) : null
      )}
    </tbody>
  </table>
) : (
  <div className="text-center text-gray-500 mt-4">No co-investors found.</div>
)}

    </div>
  );
};

export default CoInvester;
