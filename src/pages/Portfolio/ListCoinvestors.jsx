const coInvestors = [
  {
    id: 1,
    name: "A Ventures",
    logo: "data:image/jpeg;base64,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", // Replace with actual image URL
  },
  {
    id: 2,
    name: "A Capital",
    logo: "https://img.freepik.com/free-vector/gradient-quill-pen-logo-with-tagline-template_23-2149813051.jpg?ga=GA1.1.1863103195.1731134780&semt=ais_hybrid",
  },
  {
    id: 3,
    name: "B Holdings",
    logo: "https://img.freepik.com/free-vector/gradient-quill-pen-logo-template_23-2149848755.jpg?ga=GA1.1.1863103195.1731134780&semt=ais_hybrid0",
  },
  {
    id: 4,
    name: "D Investments",
    logo: "https://img.freepik.com/free-vector/letter-t-letter-e-combine-3d-logo_530521-1723.jpg?ga=GA1.1.1863103195.1731134780&semt=ais_hybrid",
  },
];

const ListCoinvestors = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Co-Investors
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {coInvestors.map((investor) => (
          <div
            key={investor.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition"
          >
            <img
              src={investor.logo}
              alt={investor.name}
              className="w-28 h-28 object-cover rounded-full mb-3"
            />
            <h3 className="text-lg font-medium text-gray-700">
              {investor.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCoinvestors;
