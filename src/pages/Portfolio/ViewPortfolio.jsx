import parse from "html-react-parser";
import { useLocation } from "react-router-dom";

const ViewPortfolio = () => {
  const location = useLocation();
  const { portfolio } = location.state || {};

  if (!portfolio) {
    return (
      <div className="text-center text-red-500 text-xl font-semibold mt-10">
        Portfolio item not found!
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
        Portfolio Details
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <img
            src={portfolio?.image?.secure_url}
            alt={portfolio.name}
            className="w-40 h-40 rounded-full shadow-md border-4 border-blue-500 dark:border-blue-400"
          />
          <h2 className="text-2xl font-semibold mt-4">{portfolio.name}</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {parse(portfolio.title)}
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            Main Description
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2 text-lg">
            {parse(portfolio.mainDescription)}
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            Background Image
          </h2>
          <img
            src={portfolio?.bg?.secure_url}
            alt={portfolio.name}
            className="w-full md:w-3/4 h-64 object-cover rounded-lg mt-4 shadow-md"
          />
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            Overview
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2 text-lg">
            {parse(portfolio.overview)}
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            Bottom Section Icon
          </h2>
          <img
            src={portfolio?.bottomSectionIcon?.secure_url}
            alt={portfolio.name}
            className="w-24 h-24 mx-auto rounded-lg shadow-md border-2 border-gray-300"
          />
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            Investment Timeline
          </h2>
          <img
            src={portfolio?.investmentTimeline?.image?.secure_url}
            alt={portfolio.name}
            className="w-full md:w-3/4 h-64 object-cover rounded-lg mt-4 shadow-md"
          />
          <p className="mt-4 text-lg">
            {parse(portfolio?.investmentTimeline?.description)}
          </p>
          <p className="mt-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
            Investment Year: {portfolio?.investmentTimeline?.investmentYear}
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            Investment Cards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {Array.isArray(portfolio?.investmentTimeline?.cards) &&
              portfolio?.investmentTimeline?.cards.map((card, index) => (
                <div
                  key={card._id}
                  className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md"
                >
                  <h3 className="text-lg font-semibold">
                    {index + 1}. {card.body}
                  </h3>
                </div>
              ))}
          </div>
        </div>

        <a
          href={portfolio.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-2 px-4 rounded-lg shadow-md transition"
        >
          View Portfolio
        </a>
      </div>
    </div>
  );
};

export default ViewPortfolio;
