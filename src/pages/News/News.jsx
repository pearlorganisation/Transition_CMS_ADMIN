import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const newsData = [
  {
    id: 1,
    category: "News",
    title: "Transition VC holds hydrogen summit in partnership with IEEE",
    newsLink:
      "https://mediabrief.com/transition-vc-and-ieee-partnered-and-hosted-the-marquee-summit/",
    date: "Aug 28, 2024",
    readTime: "4",
    imageUrl:
      "https://www.transitionventurecapital.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnews-1.c5e52228.png&w=1200&q=75",
  },
  {
    id: 2,
    category: "INVESTMENT",
    title:
      "Low-cost hydrogen cell startup Protonas bags funding in round led by Transition VC",
    newsLink:
      "https://economictimes.indiatimes.com/tech/funding/low-cost-hydrogen-cell-startup-protonas-bags-funding-in-round-led-by-transition-vc/articleshow/111815713.cms?from=mdr",
    date: "Jul 18, 2024",
    readTime: "6",
    imageUrl:
      "https://www.transitionventurecapital.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnews-2.90d9062e.png&w=1200&q=75",
  },
  {
    id: 3,
    category: "Article",
    title: "VCs chase auto parts makers to hitch a ride on EV journey",
    newsLink:
      "https://economictimes.indiatimes.com/tech/startups/vcs-chase-auto-parts-makers-to-hitch-a-ride-on-ev-journey/articleshow/111385994.cms?from=mdr",
    date: "Jul 01, 2024",
    readTime: "5",
    imageUrl:
      "https://www.transitionventurecapital.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnews-3.1e38447c.png&w=1200&q=75",
  },
];

const News = () => {
  const [data, setData] = useState(newsData);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  console.log(data);
  // useEffect(()=>{
  //   setData(data)
  // },[data])
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">News List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Index</th>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Image</th>
              <th className="border border-gray-300 p-2">Link</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Read Time</th>

              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={item.id} className="text-center">
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2 w-[20%]">
                  {item.title}
                </td>
                <td className="border border-gray-300 p-2">{item.category}</td>
                <td className="border border-gray-300 p-2">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-16 rounded-full mx-auto"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <a
                    href={item.newsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Link
                  </a>
                </td>
                <td className="border border-gray-300 p-2">{item.date}</td>
                <td className="border border-gray-300 p-2">{item.readTime}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() =>
                      navigate(`/news/view-news/${item.id}`, {
                        state: { news: item },
                      })
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/edit/${item.id}`)}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default News;
