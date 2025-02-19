import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getFocusAreas,
  deleteFocusArea,
} from "../../features/actions/focusAreaAction";

const FocusArea = () => {
  const dispatch = useDispatch();

  const { focusAreaInfo } = useSelector((state) => state.focusArea);

  useEffect(() => {
    dispatch(getFocusAreas());
  }, []);

  // const [data, setData] = useState(teamsData);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the Focus Area ?"
    );
    if (confirmDelete) {
      dispatch(deleteFocusArea(id));
    }
  };

  return (
    <div className="px-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Focus Area </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Index</th>
              <th className="border border-gray-300 p-2">Title</th>

              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(focusAreaInfo) &&
              focusAreaInfo.map((item, index) => (
                <tr key={item.id} className="text-center">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border w-[70%] border-gray-300 p-2">
                    {item.title}
                  </td>

                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() =>
                        navigate(`/focusarea/view-focusarea/${item._id}`, {
                          state: { focusarea: item },
                        })
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/focusarea/edit-focusarea/${item._id}`)
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

export default FocusArea;
