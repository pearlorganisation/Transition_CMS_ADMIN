import { useLocation } from "react-router-dom";
import parse from "html-react-parser";
const ViewInvestmentTimeline = () => {
  const location = useLocation();

  const { investmentTimeline } = location.state || {};

  console.log(investmentTimeline, "location state focus Area");

  if (!investmentTimeline) {
    return (
      <div className="text-center text-red-500">Focus Area not found!</div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">View Investment Timeline Page</h1>
      <div className="bg-white rounded-lg p-6">
        <h1 className="text-2xl font-bold">
          Description : {parse(investmentTimeline.description)}
        </h1>

        <h1 className="text-2xl font-bold">
          Investment Year : {investmentTimeline.investmentYear}
        </h1>

        <img src={investmentTimeline.image.secure_url} className="w-32 h-32" />

        <h1 className="mt-3 text-4xl text-green-500 font-semibold"> Cards </h1>

        {Array.isArray(investmentTimeline.cards) &&
          investmentTimeline.cards.map((item, index) => (
            <div key={index} className="mt-4">
              <div className="bg-red-300 px-1 py-1 w-12 h-12 rounded-full flex items-center justify-center">
                <h1 className="">{index + 1}</h1>
              </div>

              <h1 className="text-2xl font-bold"> {item.body}</h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ViewInvestmentTimeline;
