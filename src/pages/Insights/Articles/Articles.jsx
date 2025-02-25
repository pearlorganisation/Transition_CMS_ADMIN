import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { Link } from "react-router-dom";

const Articles = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articleData, setArticlesData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/blogs?articles=true`);
      setArticlesData(response?.data?.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteArticle = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await axiosInstance.delete(`/blogs/${id}`);
      setShowDeleteModal(false);
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 max-w-6xl mx-auto min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Articles Related Data</h1>
        <Link
          to="/add_article"
          className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Add Article
        </Link>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <table className="min-w-full table-auto border-collapse text-gray-800 dark:text-gray-200">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Image</th>
                <th className="p-3">Type</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articleData.length > 0 ? (
                articleData.map((el, index) => (
                  <tr
                    key={el?._id}
                    className="text-center bg-white dark:bg-gray-700 odd:bg-gray-100 dark:odd:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 transition"
                  >
                    <td className="p-3 font-medium">{index + 1}</td>
                    <td className="p-3 font-medium">{el?.title}</td>
                    <td className="p-3">
                      <img
                        className="w-16 h-16 rounded-full mx-auto shadow-md border"
                        src={el?.icon?.secure_url}
                        alt={el?.title}
                      />
                    </td>
                    <td className="p-3">{el?.link ? "LINK" : "BODY"}</td>
                    <td className="p-3 flex justify-center gap-2 mt-3">
                      <Link to={`/edit-article/${el?._id}`}>
                        <button className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedArticle(el);
                          setShowDeleteModal(true);
                        }}
                        className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    No articles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedArticle && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Are you sure you want to delete this article?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              This action cannot be undone.
            </p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteArticle(selectedArticle?._id)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
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

export default Articles;
