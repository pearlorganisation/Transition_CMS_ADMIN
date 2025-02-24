// // import React, { useEffect, useState } from "react";
// // import axiosInstance from "../../../axiosInstance";
// // import { Link } from "react-router-dom";

// // const Articles = () => {
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [articleData, setArticlesData] = useState(null);
// //   const fetchData = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);

// //       const response = await axiosInstance.get(`/blogs?articles=true`);

// //       setArticlesData(response?.data?.data);
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : "Something went wrong");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   async function deleteArticle(id) {
// //     try {
// //       setLoading(true);
// //       setError(null);

// //       const response = await axiosInstance.delete(`/blogs/${id}`);

// //       fetchData();
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : "Something went wrong");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   return (
// //     <div class="relative overflow-x-auto p-2 bg-slate-300">
// //       <div className="flex justify-between items-center px-4">
// //         <h1 className="font-semibold text-xl ">Articles Related Data </h1>
// //         <Link
// //           to="/add_article"
// //           className="font-semibold text-red-500 hover:text-red-600   text-xl p-8"
// //         >
// //           Add
// //         </Link>
// //       </div>{" "}
// //       <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
// //         <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
// //           <tr>
// //             <th scope="col" class="px-6 py-3">
// //               Name
// //             </th>
// //             <th scope="col" class="px-6 py-3">
// //               Image
// //             </th>
// //             <th scope="col" class="px-6 py-3">
// //               Contains Link Or Body
// //             </th>
// //             <th scope="col" class="px-6 py-3">
// //               Actions
// //             </th>
// //           </tr>
// //         </thead>

// //         {!loading && (
// //           <tbody>
// //             {articleData &&
// //               articleData.map((el) => {
// //                 return (
// //                   <tr
// //                     key={el?._id}
// //                     class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
// //                   >
// //                     <th
// //                       scope="row"
// //                       class="px-6 line-clamp-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
// //                     >
// //                       {el?.title}
// //                     </th>
// //                     <td class="px-6 py-4">
// //                       <img
// //                         className="size-20"
// //                         src={el?.icon?.secure_url}
// //                         alt={el?.title}
// //                         srcset=""
// //                       />
// //                     </td>
// //                     <td class="px-6 py-4">{el?.link ? "LINK" : "BODY"}</td>

// //                     <td class="px-6 py-4 flex gap-4">
// //                       <Link to={`/edit-article/${el?._id}`}>
// //                         <button className="text-green-400 hover:text-green-500">
// //                           Edit
// //                         </button>
// //                       </Link>

// //                       <button
// //                         onClick={() => deleteArticle(el?._id)}
// //                         className="text-red-400 hover:text-red-500"
// //                       >
// //                         Delete
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 );
// //               })}
// //           </tbody>
// //         )}
// //       </table>
// //     </div>
// //   );
// // };

// // export default Articles;

// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../../axiosInstance";
// import { Link } from "react-router-dom";

// const Articles = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [articleData, setArticlesData] = useState([]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await axiosInstance.get(`/blogs?articles=true`);
//       setArticlesData(response?.data?.data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const deleteArticle = async (id) => {
//     try {
//       setLoading(true);
//       setError(null);
//       await axiosInstance.delete(`/blogs/${id}`);
//       fetchData();
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="bg-white shadow-md rounded-lg p-4">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-2xl font-bold text-gray-700">Articles</h1>
//           <Link
//             to="/add_article"
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             + Add Article
//           </Link>
//         </div>

//         {/* Loading and Error Handling */}
//         {loading ? (
//           <p className="text-center text-gray-500">Loading articles...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm text-left text-gray-600">
//               <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//                 <tr>
//                   <th className="px-6 py-3">Name</th>
//                   <th className="px-6 py-3">Image</th>
//                   <th className="px-6 py-3">Type</th>
//                   <th className="px-6 py-3 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {articleData.map((el) => (
//                   <tr
//                     key={el?._id}
//                     className="border-b hover:bg-gray-50 transition"
//                   >
//                     <td className="px-6 py-4 font-medium">{el?.title}</td>
//                     <td className="px-6 py-4">
//                       <img
//                         className="w-16 h-16 object-cover rounded-md shadow"
//                         src={el?.icon?.secure_url}
//                         alt={el?.title}
//                       />
//                     </td>
//                     <td className="px-6 py-4">{el?.link ? "LINK" : "BODY"}</td>
//                     <td className="px-6 py-4 flex justify-center space-x-4">
//                       <Link to={`/edit-article/${el?._id}`}>
//                         <button className="px-3 py-1 text-green-600 border border-green-500 rounded-lg hover:bg-green-500 hover:text-white transition">
//                           Edit
//                         </button>
//                       </Link>
//                       <button
//                         onClick={() => deleteArticle(el?._id)}
//                         className="px-3 py-1 text-red-600 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Articles;

import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { Link } from "react-router-dom";

const Articles = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articleData, setArticlesData] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/blogs?articles=true`);
      setArticlesData(response?.data?.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteArticle = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await axiosInstance.delete(`/blogs/${id}`);
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 max-w-6xl mx-auto min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Articles Related Data</h1>
        <Link
          to="/add_article"
          className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Add Article
        </Link>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <table className="min-w-full table-auto border-collapse text-gray-800 dark:text-gray-200">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="p-3">#</th> {/* Index Column */}
                <th className="p-3">Name</th>
                <th className="p-3">Image</th>
                <th className="p-3">Type</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articleData.length > 0 ? (
                articleData.map((el, index) => (
                  <tr
                    key={el?._id}
                    className="text-center bg-white dark:bg-gray-700 odd:bg-gray-100 dark:odd:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 transition"
                  >
                    <td className="p-3 font-medium">{index + 1}</td>
                    <td className="p-3 font-medium">{el?.title}</td>
                    <td className="p-3">
                      <img
                        className="w-16 h-16 rounded-full mx-auto shadow-md border"
                        src={el?.icon?.secure_url}
                        alt={el?.title}
                      />
                    </td>
                    <td className="p-3">{el?.link ? "LINK" : "BODY"}</td>
                    <td className="p-3 flex justify-center gap-2 mt-3">
                      <Link to={`/edit-article/${el?._id}`}>
                        <button className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteArticle(el?._id)}
                        className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    No articles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Articles;
