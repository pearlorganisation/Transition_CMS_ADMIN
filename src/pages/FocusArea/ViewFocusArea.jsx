import { useLocation } from "react-router-dom";
import parse from "html-react-parser";

const ViewFocusArea = () => {
  const location = useLocation();
  const { focusarea } = location.state || {};

  if (!focusarea) {
    return (
      <div className="text-center text-red-500 text-xl font-semibold mt-10">
        Focus Area not found!
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen bg-white text-black">
      <h1 className="text-4xl font-extrabold text-center mb-6">
        View Focus Area
      </h1>

      <div className="bg-white text-gray-900 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-black">
          {parse(focusarea.title)}
        </h2>

        <h1 className="mt-6 text-3xl text-green-600 font-bold text-center">
          Focus Areas
        </h1>

        <div className="mt-6 space-y-4">
          {Array.isArray(focusarea.focusAreas) &&
            focusarea.focusAreas.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white text-2xl font-bold shadow-md">
                  {index + 1}
                </div>

                <h1 className="text-xl font-bold">{item.title}</h1>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewFocusArea;
