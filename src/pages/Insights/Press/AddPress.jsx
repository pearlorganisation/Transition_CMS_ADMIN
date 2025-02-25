import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axiosInstance from '../../../axiosInstance';
import JoditEditor from 'jodit-react';
const config = {
  readonly: false,
  height: 400,
  toolbar: true,
  buttons: [
    "source",
    "|",
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "|",
    "superscript",
    "subscript",
    "|",
    "ul",
    "ol",
    "|",
    "outdent",
    "indent",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "image",
    "video",
    "file",
    "table",
    "link",
    "|",
    "align",
    "undo",
    "redo",
    "|",
    "hr",
    "eraser",
    "copyformat",
    "selectall",
    "|",
    "print",
    "about",
  ],
  uploader: {
    insertImageAsBase64URI: true,
    url: "your-upload-url", // If you have a file upload URL
    format: "json",
  },
  placeholder: "Start typing here...",
  showCharsCounter: true,
  showWordsCounter: true,
  showXPathInStatusbar: false,
  spellcheck: true,
  allowResizeY: true,
  allowResizeX: false,
  language: "en",
  askBeforePasteHTML: true,
  askBeforePasteFromWord: true,
};
const AddArticle = () => {
  const { register, handleSubmit, control,formState: { errors }, reset } = useForm();
  const [articleType, setArticleType] = useState('link');
  const navigate = useNavigate();
    const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('icon', data?.icon?.[0]);
      formData.append('blogType',"PRESS");
      formData.append('dateMetaData',data?.dateMetaData);
      formData.append('shortTitle',data?.shortTitle);
      formData.append('order', data?.order)
      if (articleType == 'link') {
        formData.append('link', data.link);
      } else {
        formData.append('blogBody', data.blogBody);
      }
      const response = await axiosInstance.post('/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Article created:', response.data);
      toast.success("Article Created Successfully !!")
      reset();
      navigate('/press')
      // You can add a success message or redirect here
    } catch (error) {
      console.error('Error creating article:', error);
      // You can add an error message here
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Press Data</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder='VCs chase auto parts makers to hitch a ride on EV journey'
            {...register('title', { required: 'Title is required' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
        </div>

        {/** for setting the order of the news */}
        <div>
          <label
            htmlFor="order"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Enter Order
          </label>
          <input
            id="order"
            type="number"
            {...register("order")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.order && (
            <p className="mt-1 text-xs text-red-500">{errors.order.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="shortTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Short Title
          </label>
          <input
            id="shortTitle"
            type="text"
            placeholder='INVESTMENT/NEWS'
            {...register('shortTitle', { required: 'Short Title is required' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.shortTitle && <p className="mt-1 text-xs text-red-500">{errors.shortTitle.message}</p>}
        </div>

        <div>
          <label htmlFor="dateMetaData" className="block text-sm font-medium text-gray-700 mb-1">
            Date Section
          </label>
          <input
            id="dateMetaData"
            type="text"
            placeholder='Aug 22, 2024 - 4 min read'
            {...register('dateMetaData', { required: 'Date meta data is required' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.dateMetaData && <p className="mt-1 text-xs text-red-500">{errors.dateMetaData.message}</p>}
        </div>

<div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose Article Type
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="link"
                checked={articleType === 'link'}
                onChange={() => setArticleType('link')}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Link to Article</span>
            </label>
            {/* <label className="inline-flex items-center">
              <input
                type="radio"
                value="write"
                checked={articleType === 'write'}
                onChange={() => setArticleType('write')}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Write Own</span>
            </label> */}
          </div>
        </div>

        {articleType === 'link' ? (
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
        ) : (
            <div>
              <label htmlFor='blogBody' className='block text-sm font-medium text-gray-700 mb-1'>
                Body
              </label>
              <Controller
                control={control}
                name='blogBody'
                rules={{ required: "Body is required" }}
                render={({ field }) => (
                  <JoditEditor
                    //   ref={editorRef}
                    value={field.value}
                    config={config}
                    onBlur={field.onBlur}
                    onChange={(content) => field.onChange(content)}
                  />
                )}
              />
            </div>
        )}
         

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
          Add Press Data
        </button>
      </form>
    </div>
  );
};

export default AddArticle;