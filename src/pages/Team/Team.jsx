import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTeam, getAllTeams } from "../../features/actions/teamsAction";

const Team = () => {
  const dispatch = useDispatch();
  const { teamInfo } = useSelector((state) => state.teams);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    dispatch(getAllTeams());
  }, [dispatch]);

  const handleDelete = () => {
    if (selectedTeam) {
      dispatch(deleteTeam(selectedTeam._id));
      setShowModal(false);
      setSelectedTeam(null);
    }
  };

  return (
    <div className="px-6 max-w-6xl mx-auto min-h-screen bg-gradient-to-r from-teal-500 to-blue-600 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Team List</h1>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto border-collapse border border-gray-300 text-gray-800">
          <thead>
            <tr className="bg-gradient-to-r from-teal-500 to-blue-600 text-white">
              <th className="border border-gray-300 p-3">#</th>
              <th className="border border-gray-300 p-3">Name</th>
              <th className="border border-gray-300 p-3">Designation</th>
              <th className="border border-gray-300 p-3">Type</th>
              <th className="border border-gray-300 p-3">Image</th>
              <th className="border border-gray-300 p-3">LinkedIn</th>
              <th className="border border-gray-300 p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(teamInfo) &&
              teamInfo.map((item, index) => (
                <tr
                  key={item._id}
                  className="text-center bg-white hover:bg-gray-100 transition"
                >
                  <td className="border border-gray-300 p-3">{index + 1}</td>
                  <td className="border border-gray-300 p-3">{item.name}</td>
                  <td className="border border-gray-300 p-3">{item.bio}</td>
                  <td className="border border-gray-300 p-3">{item.type}</td>
                  <td className="border border-gray-300 p-3">
                    <img
                      src={item.image.secure_url}
                      alt={item.name}
                      className="w-16 h-16 rounded-full mx-auto shadow-md"
                    />
                  </td>
                  <td className="border border-gray-300 p-3">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 transition"
                    >
                      LinkedIn
                    </a>
                  </td>
                  <td className="border border-gray-300 p-1">
                    <button
                      onClick={() =>
                        navigate(`/team/view-team/${item._id}`, {
                          state: { team: item },
                        })
                      }
                      className="bg-gradient-to-r from-teal-500 to-blue-600 text-white py-1 px-3 rounded-lg shadow-md hover:opacity-80 transition mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/team/edit-team/${item._id}`)}
                      className="bg-gradient-to-r from-teal-500 to-blue-600 text-white py-1 px-3 rounded-lg shadow-md hover:opacity-80 transition mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedTeam(item);
                        setShowModal(true);
                      }}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-red-600 transition"
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
      {showModal && selectedTeam && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Are you sure you want to delete{" "}
              <span className="text-red-500">{selectedTeam.name}</span>?
            </h2>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
