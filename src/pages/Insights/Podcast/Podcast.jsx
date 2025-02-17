import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../axiosInstance';
import { Link } from 'react-router-dom';

const Podcast = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [podcastData,setPodcastData] =  useState(null);;
    const fetchData = async () => {
        try {
          setLoading(true);
          setError(null);
  
          const response = await axiosInstance.get(`/blogs?podcast=true`);
  

  
          
          setPodcastData(response?.data?.data);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
          setLoading(false);
        }
      };
    useEffect(() => {

      fetchData();
    }, []);  

        async function deletePodcast(id)
        {
            try {
                setLoading(true);
                setError(null);
        
                const response = await axiosInstance.delete(`/blogs/${id}`);
        
               
        
                
                fetchData();
              } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong");
              } finally {
                setLoading(false);
              }
        }

  return (
    

<div class="relative overflow-x-auto p-2 bg-slate-300">
    <div className='flex justify-between items-center px-4'>
    <h1 className='font-semibold text-xl '>Podcast Related Data </h1>
    <Link to="/add_podcast" className='font-semibold text-red-500 hover:text-red-600   text-xl p-8'>Add</Link>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>

                <th scope="col" class="px-6 py-3">
                    Title
                </th>
                <th scope="col" class="px-6 py-3">
                    Image
                </th>
                <th scope="col" class="px-6 py-3">
                    Link 
                </th>
                <th scope="col" class="px-6 py-3">
                    Actions
                </th>
            </tr>
        </thead>

        <tbody>
        {
            podcastData && podcastData.map((el)=>{
                return <tr key={el?._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" class="px-6 line-clamp-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {el?.title}
                </th>
                <td class="px-6 py-4">
                    <img className='size-20' src={el?.icon?.secure_url} alt={el?.title} srcset="" />
                </td>
                <td class="px-6 py-4 text-xl text-blue-400 hover:text-red-500">
                    <a href={el?.link}>
                        Link
                    </a>
                </td>
                <td class="px-6 py-4 flex gap-4">
                   <Link to={`/edit-podcast/${el?._id}`}>
                    <button className='text-green-400 hover:text-green-500'>
                        Edit
                    </button>
                   </Link>
                    <button onClick={()=>deletePodcast(el?._id)}  className='text-red-400 hover:text-red-500'>
                        Delete
                    </button>
                </td>
            </tr>
            })
        }
        </tbody>
    </table>
</div>

  )
}


export default Podcast;