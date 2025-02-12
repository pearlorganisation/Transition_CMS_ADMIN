import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePortfolioCard,
  getPortfolioCards,
} from "../../features/actions/Portfolio/portfolioCardsAction";
import { useNavigate } from "react-router-dom";

const ListPortfolioCards = () => {
  const { portfolioCards } = useSelector((state) => state.portfolioCards);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPortfolioCards());
  }, [dispatch]);

  console.log(portfolioCards, "portfolioCards");

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      dispatch(deletePortfolioCard(id));
    }
  };

  return (
    <div className="px-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Portfolio Cards List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">#</th>

              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Image</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(portfolioCards) &&
              portfolioCards.map((item, index) => (
                <tr key={item.id} className="text-center">
                  <td className="border border-gray-300 p-2">{index + 1}</td>

                  <td className="border border-gray-300 p-2">{item.title}</td>
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
                          `/portfolios/view-portfolio-cards/${item._id}`,
                          {
                            state: { portfolioCard: item },
                          }
                        )
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/portfolios/edit-portfolio-cards/${item._id}`)
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
    </div>
  );
};

export default ListPortfolioCards;
