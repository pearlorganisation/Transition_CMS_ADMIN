import { useLocation } from "react-router-dom";

const Viewteam = () => {
  const location = useLocation();
  const { team } = location.state || {};

  if (!team) {
    return (
      <div className="text-center text-red-500 font-semibold text-lg mt-10">
        Team item not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={team.image.secure_url}
              alt={team.name}
              className="w-32 h-32 rounded-full border-4 border-blue-500 dark:border-blue-400 shadow-lg"
            />
          </div>
          <h2 className="text-2xl font-semibold mt-4 text-gray-800 dark:text-white">
            {team.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mt-2">
            {team.bio}
          </p>
        </div>

        <div className="mt-6 text-center">
          <a
            href={team.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            🔗 View LinkedIn Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default Viewteam;
