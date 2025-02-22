import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePortfolio,
  getPortfolios,
} from "../../features/actions/Portfolio/portfolio";
import { useNavigate } from "react-router-dom";

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
    <div className="px-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Portfolios List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">#</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Image</th>
              <th className="border border-gray-300 p-2">Link</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(portfolios) &&
              portfolios.map((item, index) => (
                <tr key={item.id} className="text-center">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{item.name}</td>
                  <td className="border border-gray-300 p-2">
                    <img
                      src={item.image.secure_url}
                      alt={item.name}
                      className="w-16 h-16 rounded-full mx-auto"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Link
                    </a>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() =>
                        navigate(`/portfolio/view-portfolio/${item._id}`, {
                          state: { portfolio: item },
                        })
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/portfolio/edit-portfolio/${item._id}`)
                      }
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this portfolio?</p>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
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
