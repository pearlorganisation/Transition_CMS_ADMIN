import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTeam, getAllTeams } from "../../features/actions/teamsAction";

const Team = () => {
  const dispatch = useDispatch();
  const { teamInfo } = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(getAllTeams());
  }, []);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      dispatch(deleteTeam(id));
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
                  key={item.id}
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
                      onClick={() => handleDelete(item._id)}
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
    </div>
  );
};

export default Team;
