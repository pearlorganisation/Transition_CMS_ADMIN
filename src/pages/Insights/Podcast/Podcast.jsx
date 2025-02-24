// import React, { useEffect, useState } from 'react'
// import axiosInstance from '../../../axiosInstance';
// import { Link } from 'react-router-dom';

// const Podcast = () => {

//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [podcastData,setPodcastData] =  useState(null);;
//     const fetchData = async () => {
//         try {
//           setLoading(true);
//           setError(null);

//           const response = await axiosInstance.get(`/blogs?podcast=true`);

//           setPodcastData(response?.data?.data);
//         } catch (err) {
//           setError(err instanceof Error ? err.message : "Something went wrong");
//         } finally {
//           setLoading(false);
//         }
//       };
//     useEffect(() => {

//       fetchData();
//     }, []);

//         async function deletePodcast(id)
//         {
//             try {
//                 setLoading(true);
//                 setError(null);

//                 const response = await axiosInstance.delete(`/blogs/${id}`);

//                 fetchData();
//               } catch (err) {
//                 setError(err instanceof Error ? err.message : "Something went wrong");
//               } finally {
//                 setLoading(false);
//               }
//         }

//   return (

// <div class="relative overflow-x-auto p-2 bg-slate-300">
//     <div className='flex justify-between items-center px-4'>
//     <h1 className='font-semibold text-xl '>Podcast Related Data </h1>
//     <Link to="/add_podcast" className='font-semibold text-red-500 hover:text-red-600   text-xl p-8'>Add</Link>
//     </div>
//     <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//         <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>

//                 <th scope="col" class="px-6 py-3">
//                     Title
//                 </th>
//                 <th scope="col" class="px-6 py-3">
//                     Image
//                 </th>
//                 <th scope="col" class="px-6 py-3">
//                     Link
//                 </th>
//                 <th scope="col" class="px-6 py-3">
//                     Actions
//                 </th>
//             </tr>
//         </thead>

//         <tbody>
//         {
//             podcastData && podcastData.map((el)=>{
//                 return <tr key={el?._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
//                 <th scope="row" class="px-6 line-clamp-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                     {el?.title}
//                 </th>
//                 <td class="px-6 py-4">
//                     <img className='size-20' src={el?.icon?.secure_url} alt={el?.title} srcset="" />
//                 </td>
//                 <td class="px-6 py-4 text-xl text-blue-400 hover:text-red-500">
//                     <a href={el?.link}>
//                         Link
//                     </a>
//                 </td>
//                 <td class="px-6 py-4 flex gap-4">
//                    <Link to={`/edit-podcast/${el?._id}`}>
//                     <button className='text-green-400 hover:text-green-500'>
//                         Edit
//                     </button>
//                    </Link>
//                     <button onClick={()=>deletePodcast(el?._id)}  className='text-red-400 hover:text-red-500'>
//                         Delete
//                     </button>
//                 </td>
//             </tr>
//             })
//         }
//         </tbody>
//     </table>
// </div>

//   )
// }

// export default Podcast;

import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { Link } from "react-router-dom";

const Podcast = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [podcastData, setPodcastData] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/blogs?podcast=true`);
      setPodcastData(response?.data?.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deletePodcast = async (id) => {
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
        <h1 className="text-3xl font-semibold">Podcast Related Data</h1>
        <Link
          to="/add_podcast"
          className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Add Podcast
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
                <th className="p-3">Title</th>
                <th className="p-3">Image</th>
                <th className="p-3">Link</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {podcastData.length > 0 ? (
                podcastData.map((el, index) => (
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
                    <td className="p-3">
                      <a
                        href={el?.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-red-500 underline"
                      >
                        Link
                      </a>
                    </td>
                    <td className="p-3 flex justify-center gap-2 mt-3">
                      <Link to={`/edit-podcast/${el?._id}`}>
                        <button className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => deletePodcast(el?._id)}
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
                    No podcasts found.
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

export default Podcast;
