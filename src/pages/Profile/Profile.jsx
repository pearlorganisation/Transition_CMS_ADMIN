import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from '../../features/actions/User/userAction';

const Profile = () => {
    const dispatch = useDispatch();
    const { handleSubmit, register, setValue, formState: { errors } } = useForm();
    const { profileData } = useSelector(state => state.users);
    const { profileInfo, isLoading, isError } = profileData;

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    const handleOpen = () => {
        if (profileInfo) {
            setValue("name", profileInfo.name);
            setValue("email", profileInfo.email);
            setValue("role", profileInfo.role);
        }
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleUpdateProfile = (data) => {
        dispatch(updateProfile({ name: data.name }));
        dispatch(getProfile());
        setIsModalOpen(false);
    };

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (isError) {
        return <div className="text-red-500 text-center mt-4">Error loading profile.</div>;
    }

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 ">
            <div className="flex justify-between items-center p-4">
                <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
                <button
                    onClick={handleOpen}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Edit
                </button>
            </div>

           

            <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                    <h1 className="text-lg font-semibold text-gray-700">Name</h1>
                    <span className="text-gray-600">{profileInfo?.name}</span>
                </div>

                <div className="flex justify-between items-center border-b pb-2">
                    <h1 className="text-lg font-semibold text-gray-700">Role</h1>
                    <span className="text-gray-600">{profileInfo?.role}</span>
                </div>

                <div className="flex justify-between items-center">
                    <h1 className="text-lg font-semibold text-gray-700">Email</h1>
                    <span className="text-gray-600">{profileInfo?.email}</span>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <button
                            onClick={handleClose}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                        <form onSubmit={handleSubmit(handleUpdateProfile)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Name</label>
                                <input
                                    {...register("name", { required: "Name is required" })}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Email</label>
                                <input
                                    {...register("email")}
                                    disabled
                                    className="w-full px-3 py-2 border rounded-md bg-gray-100"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Role</label>
                                <input
                                    {...register("role")}
                                    disabled
                                    className="w-full px-3 py-2 border rounded-md bg-gray-100"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
