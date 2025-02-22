import parse from "html-react-parser";
import { useLocation } from "react-router-dom";

const ViewPortfolio = () => {
  const location = useLocation();
  const { portfolio } = location.state || {};

  if (!portfolio) {
    return (
      <div className="text-center text-red-500">Portfolio item not found!</div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">View portfolio Page</h1>

      <div className="bg-white rounded-lg p-6">
        <h1 className="text-lg"> Image </h1>
        <img
          src={portfolio?.image?.secure_url}
          alt={portfolio.name}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />

        <h1 className="text-lg"> Background Image </h1>
        <img
          src={portfolio?.bg?.secure_url}
          alt={portfolio.name}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold text-center">
          {" "}
          Name : {portfolio.name}
        </h2>
        <h2 className="text-xl font-semibold text-center mt-6"> TITLE</h2>
        <p className="text-gray-600 text-center">{parse(portfolio.title)}</p>

        <h2 className="text-xl font-semibold text-center mt-6">
          {" "}
          MAIN DESCRIPTION
        </h2>
        <p className="text-gray-600 text-center">
          {parse(portfolio.mainDescription)}
        </p>

        <h2 className="text-xl font-semibold text-center mt-6">
          {" "}
          BOTTOM SECTION ICON
        </h2>

        <img
          src={portfolio?.bottomSectionIcon?.secure_url}
          alt={portfolio.name}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />

        <h2 className="text-xl font-semibold text-center mt-6">OVERVIEW </h2>
        <p className="text-gray-600 text-center">{parse(portfolio.overview)}</p>
        <a
          href={portfolio.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline text-center block mt-4"
        >
          View Link
        </a>

        <div className="">
          <h1 className="mt-6"> List of CARDS </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(portfolio?.cards) &&
              portfolio?.cards?.map((pCard, index) => (
                <div className="" key={pCard?._id}>
                  <h1 className="mt-2">
                    {index + 1} . {pCard?.portfoliocardname}
                  </h1>
                </div>
              ))}
          </div>
        </div>

        <div className="">
          <h1 className="mt-6"> List of Co Investors </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(portfolio?.coInvestedBy) &&
              portfolio?.coInvestedBy?.map((pCard, index) => (
                <div className="" key={pCard?._id}>
                  <h1 className="mt-2">
                    {index + 1} . {pCard?.coInvestorname}
                  </h1>
                </div>
              ))}
          </div>
        </div>

        <div className="">
          <h1 className="mt-6"> INVESTMENT TIMELINE</h1>

          <img
            src={portfolio?.investmentTimeline?.image?.secure_url}
            alt={portfolio?.name}
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />

          <h1 className="mt-6"> Description </h1>
          <p>{parse(portfolio?.investmentTimeline?.description)}</p>

          <h1 className="mt-6"> Investment Year </h1>
          <p>{portfolio?.investmentTimeline?.investmentYear}</p>

          <h1 className="mt-6 mb-6"> INVESTMENT CARDS</h1>

          <div className="grid grid-cols-1  gap-3 mt-6 mb-6">
            {Array.isArray(portfolio?.investmentTimeline?.cards) &&
              portfolio?.investmentTimeline?.cards.map((card, index) => (
                <div className="" key={card._id}>
                  <h1 className="">
                    {index + 1} . {card.body}{" "}
                  </h1>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPortfolio;
