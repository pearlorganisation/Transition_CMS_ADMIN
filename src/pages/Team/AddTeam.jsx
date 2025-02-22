// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { addTeam } from "../../features/actions/teamsAction";

// const AddTeam = () => {
//   const dispatch = useDispatch();
//   const [imagePreview, setImagePreview] = useState(null); // For image preview
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   // Handle form submission
//   const onSubmit = (data) => {
//     console.log("Form Data:", data);

//     dispatch(addTeam(data));
//     reset();
//     setImagePreview(null);
//   };

//   // Handle image preview
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto px-6 bg-gray-300 shadow-lg rounded-lg  mt-2 pb-6">
//       <h1 className="text-2xl font-bold mb-6">Add Team </h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Name Field */}
//         <div className="flex flex-row gap-8">
//           <div className="w-1/2">
//             <label htmlFor="name" className="block font-medium mb-1">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               {...register("name", { required: "Name is required" })}
//               className="w-full border border-gray-300 rounded px-3 py-2"
//               placeholder="Enter name"
//             />
//             {errors.name && (
//               <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
//             )}
//           </div>

//           {/* Designation Field */}
//           <div className="w-1/2">
//             <label htmlFor="bio" className="block font-medium mb-1">
//               Designation
//             </label>
//             <input
//               type="text"
//               id="bio"
//               {...register("bio", {
//                 required: "Designation is required",
//               })}
//               className="w-full border border-gray-300 rounded px-3 py-2"
//               placeholder="Enter designation"
//             />
//             {errors.bio && (
//               <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
//             )}
//           </div>
//         </div>

//         <div className="w-1/2">
//           <label htmlFor="type" className="block font-medium mb-1">
//             Type
//           </label>
//           <select
//             id="type"
//             {...register("type", {
//               required: "Type is required",
//             })}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//           >
//             <option value="">Select Type</option>
//             <option value="executive_team">Executive Team</option>
//             <option value="general_partners">General Partners</option>
//             <option value="experts">Experts </option>
//           </select>
//           {errors.type && (
//             <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
//           )}
//         </div>

//         {/* LinkedIn Link Field */}
//         <div>
//           <label htmlFor="link" className="block font-medium mb-1">
//             LinkedIn Link
//           </label>
//           <input
//             type="url"
//             id="link"
//             {...register("link", {
//               required: "LinkedIn link is required",
//               pattern: {
//                 value: /^https?:\/\/(www\.)?linkedin\.com\/.+$/,
//                 message: "Please enter a valid LinkedIn URL",
//               },
//             })}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//             placeholder="Enter LinkedIn profile link"
//           />
//           {errors.link && (
//             <p className="text-red-500 text-sm mt-1">{errors.link.message}</p>
//           )}
//         </div>

//         {/* Image Upload Field */}
//         <div>
//           <label htmlFor="image" className="block font-medium mb-1">
//             Upload Image
//           </label>
//           <input
//             type="file"
//             id="image"
//             accept="image/*"
//             {...register("image", { required: "Image is required" })}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//             onChange={handleImageChange}
//           />
//           {errors.image && (
//             <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
//           )}
//         </div>

//         {/* Image Preview */}
//         {imagePreview && (
//           <div className="mt-4">
//             <p className="font-medium mb-1">Image Preview:</p>
//             <img
//               src={imagePreview}
//               alt="Preview"
//               className="w-32 h-32 object-cover rounded border"
//             />
//           </div>
//         )}

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition"
//         >
//           Add Team Mate
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddTeam;

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTeam } from "../../features/actions/teamsAction";

const AddTeam = () => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    dispatch(addTeam(data));
    reset();
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-500 to-blue-600 px-6">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add Team Member
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-row gap-6">
            <div className="w-1/2">
              <label htmlFor="name" className="block font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="w-1/2">
              <label htmlFor="bio" className="block font-medium mb-1">
                Designation
              </label>
              <input
                type="text"
                id="bio"
                {...register("bio", { required: "Designation is required" })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter designation"
              />
              {errors.bio && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bio.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="type" className="block font-medium mb-1">
              Type
            </label>
            <select
              id="type"
              {...register("type", { required: "Type is required" })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Type</option>
              <option value="executive_team">Executive Team</option>
              <option value="general_partners">General Partners</option>
              <option value="experts">Experts</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="link" className="block font-medium mb-1">
              LinkedIn Link
            </label>
            <input
              type="url"
              id="link"
              {...register("link", {
                required: "LinkedIn link is required",
                pattern: {
                  value: /^https?:\/\/(www\.)?linkedin\.com\/.+$/,
                  message: "Please enter a valid LinkedIn URL",
                },
              })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Enter LinkedIn profile link"
            />
            {errors.link && (
              <p className="text-red-500 text-sm mt-1">{errors.link.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="image" className="block font-medium mb-1">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
              onChange={handleImageChange}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {imagePreview && (
            <div className="mt-4 flex flex-col items-center">
              <p className="font-medium mb-1 text-gray-700">Image Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-full border border-gray-300 shadow-md"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:opacity-80 transition"
          >
            Add Team Member
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTeam;
