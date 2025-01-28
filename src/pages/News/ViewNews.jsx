import { useLocation } from "react-router-dom";
const ViewNews = () => {
  const location = useLocation();
  const { news } = location.state || {};

  if (!news) {
    return <div className="text-center text-red-500">News item not found!</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Category: {news.category}</h1>
      <div className="bg-white rounded-lg p-6">
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold text-center"> {news.title}</h2>
        <p className="text-gray-600 text-center">{news.designation}</p>

        <h2 className="text-xl font-semibold text-center">{news.date}</h2>
        <p className="text-gray-600 text-center">{news.readTime} min Read </p>
        <a
          href={news.newsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline text-center block mt-4"
        >
          Link
        </a>
      </div>
    </div>
  );
};

export default ViewNews;
