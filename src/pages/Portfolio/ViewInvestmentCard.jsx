import { useLocation } from "react-router-dom";

const ViewInvestmentCard = () => {
  const location = useLocation();
  const { investmentTimelineCard } = location.state || {};

  if (!investmentTimelineCard) {
    return (
      <div className="text-center text-red-500">
        Portfolio Card item not found!
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">View Portfolio Card Page</h1>
      <div className="bg-white rounded-lg p-6">
        <img
          src={investmentTimelineCard.icon.secure_url}
          alt={investmentTimelineCard.title}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />

        <h2 className="text-xl font-semibold text-center mt-6">
          {investmentTimelineCard.title}
        </h2>
        <h2 className="text-xl font-semibold text-center mt-6">
          {investmentTimelineCard.body}
        </h2>
      </div>
    </div>
  );
};

export default ViewInvestmentCard;
