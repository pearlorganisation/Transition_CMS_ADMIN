import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteListInvest,
  getListInvest,
} from "../../features/actions/Portfolio/investmentTimelineAction";

const ListInvestmentTimeline = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { listInvest } = useSelector((state) => state.listInvestTime);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(getListInvest());
  }, [dispatch]);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (deleteId) {
      dispatch(deleteListInvest(deleteId)).then(() => {});
      window.location.reload();
      setShowModal(false);
    }
  };

  return (
    <div>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Year</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(listInvest?.data) &&
            listInvest?.data.map((item, index) => (
              <tr key={item._id} className="text-center">
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">
                  <img
                    src={item.image.secure_url}
                    alt={item.name}
                    className="w-16 h-16 rounded-full mx-auto"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  {item.investmentYear}
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() =>
                      navigate(`/portfolios/view-invest-timeline/${item._id}`, {
                        state: { investmentTimeline: item },
                      })
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/portfolios/edit-invest-timeline/${item._id}`)
                    }
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="mb-4">
              Are you sure you want to delete this investment?
            </p>
            <div className="flex justify-end">
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

export default ListInvestmentTimeline;
