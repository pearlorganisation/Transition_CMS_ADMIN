import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getFocusAreas,
  deleteFocusArea,
} from "../../features/actions/focusAreaAction";
import parse from "html-react-parser";

const FocusArea = () => {
  const dispatch = useDispatch();
  const { focusAreaInfo } = useSelector((state) => state.focusArea);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(getFocusAreas());
  }, [dispatch]);

  const handleDelete = () => {
    if (selectedId) {
      dispatch(deleteFocusArea(selectedId));
      setShowModal(false);
      setSelectedId(null);
    }
  };

  return (
    <div className="px-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Focus Area</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Index</th>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(focusAreaInfo) &&
              focusAreaInfo.map((item, index) => (
                <tr key={item._id} className="text-center">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border w-[70%] border-gray-300 p-2">
                    {item.title && parse(item.title)}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() =>
                        navigate(`/focusarea/view-focusarea/${item._id}`, {
                          state: { focusarea: item },
                        })
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/focusarea/edit-focusarea/${item._id}`)
                      }
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedId(item._id);
                        setShowModal(true);
                      }}
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
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this focus area?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
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

export default FocusArea;
