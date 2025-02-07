import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../axiosInstance';
import { Link } from 'react-router-dom';

const Press = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pressData,setPressData] =  useState(null);;
    const fetchData = async () => {
        try {
          setLoading(true);
          setError(null);
  
          const response = await axiosInstance.get(`api/v1/blogs?press=true`);
  

  
          console.log(response?.data?.data)
          setPressData(response?.data?.data);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
          setLoading(false);
        }
      };
  
    useEffect(() => {
    
      fetchData();
    }, []);  
        async function deletePress(id)
        {
            try {
                setLoading(true);
                setError(null);
        
                const response = await axiosInstance.delete(`api/v1/blogs/${id}`);
        
               
        
                
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
    <h1 className='font-semibold text-xl '>Press Related Data </h1>
    <Link to={"/add_press"} className='font-semibold text-red-500 hover:text-red-600   text-xl p-8'>Add</Link>
    </div>    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>

                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Image
                </th>
                <th scope="col" class="px-6 py-3">
                    Type
                </th>
                <th scope="col" class="px-6 py-3">
                    Actions
                </th>
            </tr>
        </thead>

        <tbody>
        {
            pressData && pressData.map((el)=>{
                return <tr key={el?._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" class="px-6 line-clamp-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {el?.title}
                </th>
                <td class="px-6 py-4">
                    <img className='size-20' src={el?.icon?.secure_url} alt={el?.title} srcset="" />
                </td>
                <td class="px-6 py-4">
                    {el?.shortTitle}
                </td>
                <td class="px-6 py-4 flex gap-4">
                    <button className='text-blue-400 hover:text-blue-500'>
                        View
                    </button>
                    <button  className='text-green-400 hover:text-green-500'>
                        Edit
                    </button>
                    <button  onClick={()=>deletePress(el?._id)} className='text-red-400 hover:text-red-500'>
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

export default Press