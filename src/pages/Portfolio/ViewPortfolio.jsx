import { useLocation } from "react-router-dom";

import parse from "html-react-parser";
const ViewPortfolio = () => {
  const location = useLocation();
  const { portfolio } = location.state || {};

  if (!portfolio) {
    return (
      <div className="text-center text-red-500">Portfolio item not found!</div>
    );
  }

  console.log(portfolio, "portfolio 1234546");

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">View portfolio Page</h1>
      <h1 className="text-lg"> LOGO</h1>
      {/* <div className="bg-white rounded-lg p-6">
        <img
          src={portfolio.image.secure_url}
          alt={portfolio.name}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold text-center">
          {" "}
          Name : {portfolio.name}
        </h2>
        <h2 className="text-xl font-semibold text-center mt-6"> TITLE</h2>
        <p className="text-gray-600 text-center">{parse(portfolio.title)}</p>

        <h2 className="text-xl font-semibold text-center mt-6"> DESCRIPTION</h2>
        <p className="text-gray-600 text-center">
          {parse(portfolio.mainDescription)}
        </p>

        <h2 className="text-xl font-semibold text-center mt-6">
          {" "}
          BOTTOM SECTION ICON
        </h2>

        <img
          src={portfolio.bottomSectionIcon.secure_url}
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
          <h1 className="mt-6"> NORMAL CARDS </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(portfolio?.cards) &&
              portfolio?.cards?.map((pCard) => (
                <div className="" key={pCard?._id}>
                  <img src={pCard?.icon?.secure_url} className="w-12 h-12" />
                  <h1> {pCard?.title}</h1>

                  <p> {pCard?.description}</p>

                  <p></p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6 mb-6">
            {Array.isArray(portfolio?.investmentTimeline?.cards) &&
              portfolio?.investmentTimeline?.cards.map((card) => (
                <div className="" key={card._id}>
                  <h1 className="">{card.title} </h1>
                  <h1 className="">{card.body} </h1>
                  <img src={card?.icon?.secure_url} className="w-16 h-16" />
                </div>
              ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ViewPortfolio;
