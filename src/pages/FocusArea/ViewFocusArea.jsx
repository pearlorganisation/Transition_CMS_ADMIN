import { useLocation } from "react-router-dom";
import parse from "html-react-parser";
const ViewFocusArea = () => {
  const location = useLocation();

  const { focusarea } = location.state || {};

  if (!focusarea) {
    return (
      <div className="text-center text-red-500">Focus Area not found!</div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">View Focus Area Features Page</h1>
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-semibold text-center">
          TITLE : {parse(focusarea.title)}
        </h2>

        <h1 className="mt-3 text-4xl text-green-500 font-semibold">
          {" "}
          Focus Areas{" "}
        </h1>

        {Array.isArray(focusarea.focusAreas) &&
          focusarea.focusAreas.map((item, index) => (
            <div key={index} className="mt-4">
              <div className="bg-red-300 px-1 py-1 w-12 h-12 rounded-full flex items-center justify-center">
                <h1 className="">{index + 1}</h1>
              </div>

              <h1 className="text-2xl font-bold"> {item.title}</h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ViewFocusArea;
