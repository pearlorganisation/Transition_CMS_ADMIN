import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deletePortfolio,
  getPortfolios,
} from "../../features/actions/Portfolio/portfolio";

const Portfolio = () => {
  const { portfolios } = useSelector((state) => state.portfolios);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(getPortfolios());
  }, [dispatch]);

  const handleDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedId) {
      dispatch(deletePortfolio(selectedId));
      setShowModal(false);
      setSelectedId(null);
    }
  };

  return (
    <div className="px-6 max-w-6xl mx-auto min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        Portfolio List
      </h1>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <table className="min-w-full table-auto border-collapse text-gray-800 dark:text-gray-200">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Image</th>
              <th className="p-3">Link</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(portfolios) &&
              portfolios.map((item, index) => (
                <tr
                  key={item.id}
                  className="text-center bg-white dark:bg-gray-700 odd:bg-gray-100 dark:odd:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 transition"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-medium">{item.name}</td>
                  <td className="p-3">
                    <img
                      src={item.image.secure_url}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg mx-auto shadow-md border"
                    />
                  </td>
                  <td className="p-3">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      View
                    </a>
                  </td>
                  <td className="p-3 flex justify-center gap-2">
                    <button
                      onClick={() =>
                        navigate(`/portfolio/view-portfolio/${item._id}`, {
                          state: { portfolio: item },
                        })
                      }
                      className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/portfolio/edit-portfolio/${item._id}`)
                      }
                      className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition"
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
              Are you sure you want to delete this portfolio?
            </h2>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
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

export default Portfolio;
