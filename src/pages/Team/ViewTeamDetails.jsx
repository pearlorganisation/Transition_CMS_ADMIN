import { useLocation } from "react-router-dom";

const ViewTeamDetails = () => {
  const location = useLocation();
  const { teamDetails } = location.state || {};

  if (!teamDetails) {
    return (
      <div className="text-center text-red-500 font-semibold text-lg mt-10">
        Team Details not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={teamDetails.image.secure_url}
              alt={teamDetails.title}
              className="w-40 h-40 rounded-full border-4 border-indigo-500 dark:border-indigo-400 shadow-lg"
            />
          </div>
          <h2 className="text-2xl font-bold mt-4 text-gray-800 dark:text-white">
            {teamDetails.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mt-2">
            {teamDetails.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewTeamDetails;
