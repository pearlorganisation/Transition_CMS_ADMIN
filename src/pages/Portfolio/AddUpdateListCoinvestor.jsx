import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateCoInvester,
  deleteInvestor,
  getInvestors,
  updateInvestor,
} from "../../features/actions/conInvestorAction";

const AddCoinvester = () => {
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
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(getInvestors());
  }, []);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);

    if (data.logo && data.logo.length > 0) {
      formData.append("logo", data.logo[0]);
    }

    if (editingId) {
      dispatch(updateInvestor({ id: editingId, updatedData: formData })).then(
        () => {
          dispatch(getInvestors());
        }
      );
      setEditingId(null);
    } else {
      dispatch(CreateCoInvester(formData)).then(() => {
        dispatch(getInvestors());
      });
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

  const confirmDelete = () => {
    if (selectedId) {
      dispatch(deleteInvestor(selectedId)).then(() => {
        dispatch(getInvestors());
      });
      setShowModal(false);
      setSelectedId(null);
    }
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
        <div>
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            placeholder="Enter name"
            {...register("name", { required: "Name is required" })}
            className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Upload Logo</label>
          <input
            type="file"
            accept="image/*"
            {...register("logo")}
            className="w-full border rounded-lg p-2 mt-1 bg-gray-50"
            onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))}
            disabled={loading}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-16 h-16 object-cover rounded-lg mt-2"
            />
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                ></path>
              </svg>
              Processing...
            </>
          ) : editingId ? (
            "Update"
          ) : (
            "Submit"
          )}
        </button>
      </form>

      {loading ? (
        <div className="text-center text-gray-500 mt-4">Loading...</div>
      ) : coInvestors?.data?.length > 0 ? (
        <table className="w-full table-auto border-collapse mt-6">
          <thead>
            <tr className="bg-gray-200 w-full">
              <th className="px-6 py-3 text-center w-1/4">Logo</th>
              <th className="px-6 py-3 text-left w-1/3">Name</th>
              <th className="px-6 py-3 text-center w-1/3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coInvestors?.data?.map((item) => (
              <tr key={item?._id} className="border-b">
                <td className="px-6 py-3 text-center">
                  <img
                    src={item?.logo?.secure_url}
                    alt={`Logo of ${item?.name}`}
                    className="w-16 h-16 object-cover rounded-lg mx-auto"
                  />
                </td>
                <td className="px-6 py-3 text-left whitespace-nowrap">
                  {item?.name}
                </td>
                <td className="px-6 py-3 text-center whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(item?._id)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedId(item?._id);
                      setShowModal(true);
                    }}
                    className="text-red-600 hover:text-red-800"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-500 mt-4">
          No co-investors found.
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this co-investor?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
                disabled={loading}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCoinvester;
