import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getFocusAreaFeatures,
  deleteFocusFeature,
} from "../../features/actions/focusAreaAction";

const FocusAreaFeature = () => {
  const dispatch = useDispatch();
  const { focusAreaFeatureInfo } = useSelector((state) => state.focusArea);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(getFocusAreaFeatures());
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedId) {
      dispatch(deleteFocusFeature(selectedId));
      setIsModalOpen(false);
      setSelectedId(null);
    }
  };

  return (
    <div className="px-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Focus Area Features</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Index</th>
              <th className="border border-gray-300 p-2">Icon</th>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(focusAreaFeatureInfo) &&
              focusAreaFeatureInfo.map((item, index) => (
                <tr key={item.id} className="text-center">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">
                    <img
                      src={item.image.secure_url}
                      className="w-8 h-8"
                      alt="icon"
                    />
                  </td>
                  <td className="border w-[70%] border-gray-300 p-2">
                    {item.title}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() =>
                        navigate(
                          `/focusarea/view-focusareafeature/${item._id}`,
                          {
                            state: { focusareafeature: item },
                          }
                        )
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/focusarea/edit-focusareafeature/${item._id}`)
                      }
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete this feature?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
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

export default FocusAreaFeature;
