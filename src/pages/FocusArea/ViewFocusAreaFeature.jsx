import { useLocation } from "react-router-dom";

const ViewFocusAreaFeature = () => {
  const location = useLocation();
  const { focusareafeature } = location.state || {};

  if (!focusareafeature) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-xl font-semibold">
        Focus Area not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-6">
          {focusareafeature.title}
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-blue-500 to-teal-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Focus Area Icon</h2>
          <img
            src={focusareafeature.image.secure_url}
            alt="Focus Area Icon"
            className="w-20 h-20 rounded-lg border-2 border-white shadow-md"
          />
        </div>

        <h2 className="mt-8 text-3xl font-semibold text-teal-500 text-center">
          Focus Area Features
        </h2>

        <div className="mt-6 space-y-4">
          {Array.isArray(focusareafeature.features) &&
            focusareafeature.features.map((item, index) => (
              <div
                key={index}
                className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md flex items-center gap-4"
              >
                <span className="bg-teal-500 text-white text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full">
                  {index + 1}
                </span>
                <h3 className="text-lg font-medium">{item}</h3>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewFocusAreaFeature;
