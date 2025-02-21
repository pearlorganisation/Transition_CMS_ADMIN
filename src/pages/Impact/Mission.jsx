import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getImpact } from '../../features/actions/Impact/ImapctAction';
import { Link } from 'react-router-dom';

const Mission = () => {
    const dispatch = useDispatch();
    const { impactData } = useSelector(state => state.impacts);

    useEffect(() => {
        dispatch(getImpact());
    }, [dispatch]);

    return (
        <div className="relative overflow-x-auto p-6 bg-gray-100 min-h-screen">
            <div className='flex justify-between items-center bg-white shadow-md p-4 rounded-md mb-6'>
                <h1 className='font-bold text-2xl text-gray-800'>Mission Related Data</h1>
                {/* <Link to={"/add_press"} className='font-semibold text-red-500 hover:text-red-600 text-xl'>Add</Link> */}
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs uppercase bg-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(impactData) && impactData.filter(el => el?.impactDataType === "MISSION").length > 0 ? (
                            impactData
                                .filter(el => el?.impactDataType === "MISSION")
                                .map(el => (
                                    <tr key={el?._id} className="border-b hover:bg-gray-100">
                                        <td className="px-6 py-4 font-medium text-gray-900">{el?.impactDataType}</td>
                                        <td className="px-6 py-4 flex gap-4">
                                             <Link to={`/edit-mission/${el?._id}`} state={{ data: el }}>
                                                <button className="text-green-500 hover:text-green-600">Edit</button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                                    No Mission data available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Mission;
