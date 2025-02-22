import { useLocation } from "react-router-dom";

import parse from "html-react-parser";

const ViewPortfolioCard = () => {
  const location = useLocation();
  const { portfolioCard } = location.state || {};

  if (!portfolioCard) {
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
          src={portfolioCard.icon.secure_url}
          alt={portfolioCard.name}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold text-center mt-6">
          {portfolioCard.title}
        </h2>
        <p className="text-gray-600 text-center mt-6">
          {parse(portfolioCard.description)}
        </p>
      </div>
    </div>
  );
};

export default ViewPortfolioCard;
