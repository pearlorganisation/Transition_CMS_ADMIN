import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteTeamDetails,
  getAllTeamDetails,
} from "../../features/actions/teamDetailsAction";

const TeamDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teamDetailsInfo } = useSelector((state) => state.teamDetails);

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(getAllTeamDetails());
  }, [dispatch]);

  const handleDeleteConfirm = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (selectedId) {
      dispatch(deleteTeamDetails(selectedId));
      setShowModal(false);
      setSelectedId(null);
    }
  };

  return (
    <div className="px-6 max-w-6xl mx-auto min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Team Details</h1>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <table className="min-w-full table-auto border-collapse text-gray-800 dark:text-gray-200">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="p-3">ID</th>
              <th className="p-3">Title</th>
              <th className="p-3">Image</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(teamDetailsInfo) &&
              teamDetailsInfo.map((item, index) => (
                <tr
                  key={item._id}
                  className="text-center bg-white dark:bg-gray-700 odd:bg-gray-100 dark:odd:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 transition"
                >
                  <td className="p-3 font-medium">{index + 1}</td>
                  <td className="p-3">{item.title}</td>
                  <td className="p-3">
                    <img
                      src={item.image.secure_url}
                      alt={item.name}
                      className="w-12 h-12 rounded-full mx-auto shadow-md border"
                    />
                  </td>
                  <td className="p-3 flex justify-center gap-2">
                    <button
                      onClick={() =>
                        navigate(`/teamDetails/view-teamDetails/${item._id}`, {
                          state: { teamDetails: item },
                        })
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-700 transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/teamDetails/edit-teamDetails/${item._id}`)
                      }
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg shadow hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteConfirm(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 transition"
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Are you sure you want to delete this team member?
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
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

export default TeamDetails;
