import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getImpact } from '../../features/actions/Impact/ImapctAction'
import { Link } from 'react-router-dom'

const Mission = () => {
    const dispatch = useDispatch()
    const { impactData } = useSelector(state => state.impacts)
    useEffect(() => {
        dispatch(getImpact())
    }, [])

    return (

        <div class="relative overflow-x-auto p-2 bg-slate-300">
            <div className='flex justify-between items-center px-4'>
                <h1 className='font-semibold text-xl '>Mission Related Data </h1>
                {/* <Link to={"/add_press"} className='font-semibold text-red-500 hover:text-red-600   text-xl p-8'>Add</Link> */}
            </div><table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>

                        <th scope="col" class="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Image
                        </th>

                        <th scope="col" class="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        Array.isArray(impactData) &&
                        impactData?.filter(el => el?.impactDataType === "MISSION").map(el => (
                            <tr key={el?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <th scope="row" className="px-6 line-clamp-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {el?.impactDataType}
                                </th>
                                <td className="px-6 py-4">
                                    <img className="size-20" src={el?.icon?.secure_url} alt="N/A" />
                                </td>
                                <td className="px-6 py-4 flex gap-4">
                                    <button className="text-blue-400 hover:text-blue-500">View</button>
                                    <Link to={`/edit-mission/${el?._id}`} state={{data:el}}>
                                        <button className="text-green-400 hover:text-green-500">Edit</button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Mission