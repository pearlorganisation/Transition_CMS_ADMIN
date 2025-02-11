import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPortfolios } from "../../features/actions/Portfolio/portfolio";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
  const { portfolios } = useSelector((state) => state.portfolios);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPortfolios());
  }, [dispatch]);

  console.log(portfolios, "portfolios");

  const navigate = useNavigate();

  // const handleDelete = (id) => {
  //   const confirmDelete = window.confirm("Are you sure you want to delete?");
  //   if (confirmDelete) {
  //     dispatch(deleteTeam(id));
  //   }
  // };

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
              <th className="border border-gray-300 p-2">BG Image</th>
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
                    <img
                      src={item.bg.secure_url}
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
                      onClick={() => navigate(`/team/edit-team/${item._id}`)}
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      // onClick={() => handleDelete(item._id)}
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

export default Portfolio;
