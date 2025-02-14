import { useLocation } from "react-router-dom";
const Viewteam = () => {
  const location = useLocation();
  const { team } = location.state || {};

  if (!team) {
    return <div className="text-center text-red-500">Team item not found!</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">View team Page</h1>
      <div className="bg-white rounded-lg p-6">
        <img
          src={team.image.secure_url}
          alt={team.name}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold text-center">{team.name}</h2>
        <p className="text-gray-600 text-center">{team.bio}</p>
        <a
          href={team.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline text-center block mt-4"
        >
          View LinkedIn Profile
        </a>
      </div>
    </div>
  );
};

export default Viewteam;
