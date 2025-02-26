import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBullseye } from "react-icons/fa";
import {
  MdPeople,
  MdWork,
  MdPublic,
  MdInsights,
  MdClose,
  MdArticle,
  MdLibraryBooks,
  MdMic,
  MdHandshake,
  MdPieChart,
  MdApartment,
} from "react-icons/md";

const sections = [
  {
    name: "Team",
    path: "/team",
    icon: <MdPeople />,
    description: "Manage team members and details.",
  },
  {
    name: "Insights",
    icon: <MdInsights />,
    description: "View articles, press releases, and podcasts.",
  },
  {
    name: "Focus Area",
    path: "/focusarea",
    icon: <FaBullseye />,
    description: "Define focus areas and key features.",
  },
  {
    name: "Portfolios",
    path: "/portfolios",
    icon: <MdWork />,
    description: "Manage portfolios and investment details.",
  },
  {
    name: "Impact",
    icon: <MdPublic />,
    description: "Monitor policies, ESGs, and SDGs.",
  },
];

const insightsOptions = [
  { name: "Press", path: "/press", icon: <MdLibraryBooks /> },
  { name: "Articles", path: "/articles", icon: <MdArticle /> },
  { name: "Podcast", path: "/podcast", icon: <MdMic /> },
];

const impactOptions = [
  { name: "ESGs", path: "/esg", icon: <MdHandshake /> },
  { name: "Mission", path: "/mission", icon: <MdPieChart /> },
  { name: "SDGs", path: "/sdg", icon: <MdApartment /> },
  { name: "Policies", path: "/policies", icon: <MdArticle /> },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [modalContent, setModalContent] = useState(null);

  const handleCardClick = (section) => {
    if (section.name === "Insights") {
      setModalContent({
        title: "Select an Insights Option",
        options: insightsOptions,
      });
    } else if (section.name === "Impact") {
      setModalContent({
        title: "Select an Impact Option",
        options: impactOptions,
      });
    } else {
      navigate(section.path);
    }
  };

  const handleNavigate = (path) => {
    setModalContent(null);
    navigate(path);
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sections.map((section, index) => (
        <div
          key={index}
          className="p-6 bg-white shadow-lg rounded-2xl flex items-center space-x-4 cursor-pointer hover:shadow-2xl transition"
          onClick={() => handleCardClick(section)}
        >
          <div className="text-3xl text-blue-600">{section.icon}</div>
          <div>
            <h3 className="text-lg font-semibold">{section.name}</h3>
            <p className="text-gray-500 text-sm">{section.description}</p>
          </div>
        </div>
      ))}

      {modalContent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">{modalContent.title}</h2>
              <button onClick={() => setModalContent(null)} className="text-xl">
                <MdClose />
              </button>
            </div>

            <div className="space-y-3">
              {modalContent.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigate(option.path)}
                  className="flex items-center space-x-3 p-3 w-full text-left bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  <span className="text-xl text-blue-600">{option.icon}</span>
                  <span className="font-medium">{option.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
