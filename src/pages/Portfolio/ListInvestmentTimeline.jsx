import { useEffect } from "react";
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

  useEffect(() => {
    dispatch(getListInvest());
  }, [dispatch]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the Focus Area ?"
    );
    if (confirmDelete) {
      dispatch(deleteListInvest(id));
    }
  };

  return (
    <div>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">ID </th>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Year </th>
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
  );
};

export default ListInvestmentTimeline;
