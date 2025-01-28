import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const teamsData = [
  {
    id: 1,
    name: "Shubham Mamgain",
    designation: "Full Stack Developer",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBlPlpTtK_z4wQ4W74DmV5pxpZYatxBAmzrg&s",
    linkedinLink: "https://linkedin/1234",
  },
  {
    id: 2,
    name: "Abhishek Bahuguna",
    designation: "Vice President",
    imageUrl:
      "https://static1.squarespace.com/static/656f4e4dababbd7c042c4946/657236350931ee4538eea52c/65baf15103d8ad2826032a8a/1727029299965/how-to-stop-being-a-people-pleaser-1_1.jpg?format=1500w",
    linkedinLink: "https://linkedin/8468",
  },
  {
    id: 3,
    name: "Akriti",
    designation: "CEO",
    imageUrl:
      "https://img.freepik.com/free-photo/man-woman-covered-with-american-flag-isolated-blue-wall-unity-american-people_231208-11968.jpg",
    linkedinLink: "https://linkedin/5989",
  },
];

const Team = () => {
  const [data, setData] = useState(teamsData);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Team List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">#</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Designation</th>
              <th className="border border-gray-300 p-2">Image</th>
              <th className="border border-gray-300 p-2">LinkedIn</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="text-center">
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2">
                  {item.designation}
                </td>
                <td className="border border-gray-300 p-2">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 rounded-full mx-auto"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <a
                    href={item.linkedinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    LinkedIn
                  </a>
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() =>
                      navigate(`/team/view-team/${item.id}`, {
                        state: { team: item },
                      })
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/team/edit-team/${item.id}`)}
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

export default Team;
