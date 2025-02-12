import { useLocation } from "react-router-dom";
const ViewTeamDetails = () => {
  const location = useLocation();
  const { teamDetails } = location.state || {};

  if (!teamDetails) {
    return (
      <div className="text-center text-red-500">Team Details not found!</div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">View team Details Page</h1>
      <div className="bg-white rounded-lg p-6">
        <img
          src={teamDetails.image.secure_url}
          alt={teamDetails.title}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold text-center">
          {teamDetails.title}
        </h2>
        <p className="text-gray-600 text-center">{teamDetails.description}</p>
      </div>
    </div>
  );
};

export default ViewTeamDetails;
