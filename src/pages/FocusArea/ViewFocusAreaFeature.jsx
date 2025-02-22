import { useLocation } from "react-router-dom";
const ViewFocusAreaFeature = () => {
  const location = useLocation();

  const { focusareafeature } = location.state || {};

  if (!focusareafeature) {
    return <div className="text-center text-red-500">Focus Area not found</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">View Focus Area Page</h1>
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-semibold ">
          TITLE : {focusareafeature.title}
        </h2>

        <div className="flex flex-row gap-3 mt-6">
          <h2 className="text-xl font-semibold mt-3"> ICON : </h2>
          <img
            src={focusareafeature.image.secure_url}
            className="w-16 h-16 mt-3"
          />
        </div>

        <h1 className="mt-6 mb-3 text-4xl text-green-500 font-semibold">
          {" "}
          Focus Area Features
        </h1>

        {Array.isArray(focusareafeature.features) &&
          focusareafeature.features.map((item, index) => (
            <div key={index} className="mt-4">
              <h1 className="text-2xl font-bold"> {item}</h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ViewFocusAreaFeature;
