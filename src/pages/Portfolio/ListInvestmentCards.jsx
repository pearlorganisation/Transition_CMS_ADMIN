import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteInvestmentTimelineCard,
  getInvestmentTimelineCards,
} from "../../features/actions/Portfolio/investmentTimelineCardsAction";

const ListInvestmentCards = () => {
  const { investmentTimelineCards } = useSelector(
    (state) => state.investmentTimelineCards
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(getInvestmentTimelineCards());
  }, [dispatch]);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (deleteId) {
      dispatch(deleteInvestmentTimelineCard(deleteId)).then(() => {
        setShowModal(false);
        setDeleteId(null);
        dispatch(getInvestmentTimelineCards()); // Refresh the list
      });
    }
  };

  return (
    <div className="px-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Investment Timeline Cards List
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">#</th>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Body</th>
              <th className="border border-gray-300 p-2">Image</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(investmentTimelineCards) &&
              investmentTimelineCards.map((item, index) => (
                <tr key={item.id} className="text-center">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{item.title}</td>
                  <td className="border border-gray-300 p-2">{item.body}</td>
                  <td className="border border-gray-300 p-2">
                    <img
                      src={item.icon.secure_url}
                      alt={item.name}
                      className="w-16 h-16 rounded-full mx-auto"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() =>
                        navigate(
                          `/portfolios/view-invest-timeline-cards/${item._id}`,
                          {
                            state: { investmentTimelineCard: item },
                          }
                        )
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        navigate(
                          `/portfolios/edit-invest-timeline-cards/${item._id}`
                        )
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
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this item?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-3 py-1 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-3 py-1 rounded"
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

export default ListInvestmentCards;
