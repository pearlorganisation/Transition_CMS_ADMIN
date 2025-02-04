import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { CreateCoInvester, getInvestors } from "../../features/actions/coInvester";

const CoInvester = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("logo", data.logo[0]);
    dispatch(CreateCoInvester(formData));
  };

  const { loading, coInvestors } = useSelector((state) => state.coInvestors);

  console.log("Co-investors: ", coInvestors);

  useEffect(() => {
    dispatch(getInvestors());
  }, [dispatch]);

  
  
  return (
    <div className="flex justify-center flex-col items-center py-10 bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-6 space-y-6 max-w-lg w-full"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Add Co-Investor
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
            {...register("logo", { required: "Logo is required" })}
            className="w-full border rounded-lg p-2 mt-1 bg-gray-50"
          />
          {errors.logo && (
            <p className="text-red-500 text-sm mt-1">{errors.logo.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </form>

   
        {coInvestors?.data?.length > 0 ? (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Logo</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coInvestors?.data?.map((item) =>
                item?.logo && item?.logo?.secure_url ? (
                  <tr key={item?._id} className="border-b">
                    <td className="px-4 py-2">
                      <img
                        src={item?.logo?.secure_url}
                        alt={`Logo of ${item?.name}`}
                        className="w-16 h-16 object-cover rounded-lg mx-auto"
                      />
                    </td>
                    <td className="px-4 py-2">{item?.name}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEdit(item?._id)} // You can implement the edit logic here
                        className="text-blue-600 hover:text-blue-800 mx-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item?._id)} // You can implement the delete logic here
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
          <div>No co-investors found.</div>
        )}
        
    </div>
  );
};

export default CoInvester;
