import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getBlogsById } from '../../../features/actions/Blogs/blogsAction'
import { useForm , Controller} from 'react-hook-form'
import axiosInstance from '../../../axiosInstance'
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react'
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
const EditArticle = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [articleType, setArticleType] = useState('link');
    const { singleBlogData } = useSelector(state=> state.blogs)
    const { handleSubmit,register, formState:{errors}, control, reset } = useForm(
        {
            defaultValues:{
                title: '',
                dateMetaData: '',
                link: '',
                blogBody: ''
            }
        }
    );
    useEffect(()=>{
      dispatch(getBlogsById(id));
    },[])

     useEffect(() => {
            if (singleBlogData) {
                reset({
                    title: singleBlogData.title || '',
                    dateMetaData: singleBlogData.dateMetaData || '',
                    link: singleBlogData.link || '',
                    blogBody: singleBlogData.blogBody || ''
                });
                setArticleType(singleBlogData.link ? 'link' : 'write');
            }
        }, [singleBlogData, reset]);

        const onSubmitForm = async (data) => {
                try {
                    // Log form data for debugging
                    console.log('Form Data:', data);
        
                    const formData = new FormData();
        
                    // Append all form fields, checking for undefined values
                    if (data.title) formData.append('title', data.title);
                    if (data.dateMetaData) formData.append('dateMetaData', data.dateMetaData);
                  
                    formData.append('blogType', 'ARTICLES');
        
                    // Handle file upload
                    if (data.icon?.[0]) {
                        formData.append('icon', data.icon[0]);
                    }
        
                    // Handle article content based on type
                    if (articleType === 'link') {
                        if (data.link) formData.append('link', data.link);
                    } else {
                        if (data.blogBody) formData.append('blogBody', data.blogBody);
                    }
        
                    const response = await axiosInstance.put(`/blogs/${id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    });
        
                    console.log('Response:', response.data);
                    toast.success('Article Updated Successfully!');
                    navigate('/articles');
                } catch (error) {
                    console.error('Error updating article:', error);
                    console.error('Error response:', error.response);
                    toast.error(error.response?.data?.message || 'Failed to update article');
                }
            };

    const registerOptions = {
        title: { required: 'Title is required' },
        
        dateMetaData: { required: 'Date meta data is required' },
        link: {
            required: articleType === 'link' ? 'Link is required' : false,
            pattern: {
                value: /^https?:\/\/.+/,
                message: 'Please enter a valid URL starting with http:// or https://'
            }
        },
        blogBody: {
            required: articleType === 'write' ? 'Article body is required' : false,
            minLength: {
                value: 10,
                message: 'Blog body must be at least 10 characters long'
            }
        }
    };

    if (!singleBlogData) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-gray-600">Loading...</div>
            </div>
        );
    }

        
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div>EditArticle</div>
          <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
              <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                  </label>
                  <input
                      id="title"
                      type="text"
                      {...register('title', registerOptions.title)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
              </div>

              <div>
                  <label htmlFor="dateMetaData" className="block text-sm font-medium text-gray-700 mb-1">
                      Date Section
                  </label>
                  <input
                      id="dateMetaData"
                      type="text"
                      {...register('dateMetaData', registerOptions.dateMetaData)}
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
                      <label className="inline-flex items-center">
                          <input
                              type="radio"
                              value="write"
                              checked={articleType === 'write'}
                              onChange={() => setArticleType('write')}
                              className="form-radio h-4 w-4 text-blue-600"
                          />
                          <span className="ml-2">Write Own</span>
                      </label>
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
                          {...register('link', registerOptions.link)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.link && <p className="mt-1 text-xs text-red-500">{errors.link.message}</p>}
                  </div>
              ) : (
                  <div>
                      {/* <label htmlFor="blogBody" className="block text-sm font-medium text-gray-700 mb-1">
                          Article Body
                      </label>
                      <textarea
                          id="blogBody"
                          {...register('blogBody', registerOptions.blogBody)}
                          rows="6"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                      {errors.blogBody && <p className="mt-1 text-xs text-red-500">{errors.blogBody.message}</p>} */}
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
                      {...register('icon')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.icon && <p className="mt-1 text-xs text-red-500">{errors.icon.message}</p>}
                  {singleBlogData.icon?.secure_url && (
                      <div className="mt-2">
                          <p className="text-sm text-gray-600">Current icon:</p>
                          <img
                              src={singleBlogData.icon.secure_url}
                              alt="Current icon"
                              className="mt-1 h-20 w-20 object-cover rounded"
                          />
                      </div>
                  )}
              </div>

              <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                  Update Article
              </button>
          </form>
    </div>
  )
}

export default EditArticle