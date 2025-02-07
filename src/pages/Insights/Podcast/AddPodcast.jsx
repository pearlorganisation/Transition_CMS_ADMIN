import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axiosInstance from '../../../axiosInstance';

const AddPodcast = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
    const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('icon', data?.icon?.[0]);
      formData.append('blogType',"PODCAST");
      formData.append('link', data.link);
      formData.append('shortTitle', data.link);


      const response = await axiosInstance.post('/api/v1/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Article created:', response.data);
      toast.success("Article Created Successfully !!")
      reset();
      navigate('/podcast')
      // You can add a success message or redirect here
    } catch (error) {
      console.error('Error creating article:', error);
      // You can add an error message here
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Podcast</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register('title', { required: 'Title is required' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Short Description
          </label>
          <input
            id="shortTitle"
            type="text"
            {...register('shortTitle', { required: 'Short Description  is required' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.shortTitle && <p className="mt-1 text-xs text-red-500">{errors.shortTitle.message}</p>}
        </div>

       


        
          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
              Link
            </label>
            <input
              id="link"
              type="url"
              {...register('link', { required: 'Link is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.link && <p className="mt-1 text-xs text-red-500">{errors.link.message}</p>}
          </div>
      
         

        <div>
          <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">
            Icon
          </label>
          <input
            id="icon"
            type="file"
            accept="image/*"
            {...register('icon', { required: 'Icon is required' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.icon && <p className="mt-1 text-xs text-red-500">{errors.icon.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Add Podcast
        </button>
      </form>
    </div>
  );
};

export default AddPodcast;