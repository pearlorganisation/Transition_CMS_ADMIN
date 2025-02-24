// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import {
//   getSingleTeamDetails,
//   updateTeamDetails,
// } from "../../features/actions/teamDetailsAction";
// import { toast } from "sonner";

// const EditTeamDetails = () => {
//   const { id } = useParams();

//   const [loading, setLoading] = useState(false);

//   const dispatch = useDispatch();

//   const { teamDetails } = useSelector((state) => state.teamDetails);

//   useEffect(() => {
//     dispatch(getSingleTeamDetails(id));
//   }, [dispatch, id]);

//   const [imagePreview, setImagePreview] = useState(null);
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     if (teamDetails) {
//       reset({
//         title: teamDetails.title || "",
//         description: teamDetails.description || "",
//       });
//       if (teamDetails.image) {
//         setImagePreview(teamDetails.image.secure_url);
//       }
//     }
//   }, [teamDetails, reset]);

//   // Handle form submission
//   // const onSubmit = (data) => {
//   //   dispatch(updateTeamDetails({ id: teamDetails._id, updatedData: data }));
//   //   toast.success("Team Details edited successfully!");
//   //   reset();
//   //   setImagePreview(null);
//   // };

//   const onSubmit = async (data) => {
//     setLoading(true); // Start loading
//     try {
//       await dispatch(
//         updateTeamDetails({ id: teamDetails._id, updatedData: data })
//       );
//       toast.success("Team Details edited successfully!");
//       reset();
//       setImagePreview(null);
//     } catch (error) {
//       toast.error("Failed to update team details!");
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   // Handle image preview
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   console.log(teamDetails, "Single Team Details");
//   return (
//     <div className="max-w-2xl mx-auto px-6 bg-gray-400 shadow-lg rounded-lg h-full mt-2 pb-6">
//       <h1 className="text-2xl font-bold mb-6">Edit Team Details </h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
//         {/* Name Field */}
//         <div>
//           <label htmlFor="title" className="block font-medium mb-1">
//             Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             {...register("title", { required: "Name is required" })}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//             placeholder="Enter Title"
//           />
//           {errors.title && (
//             <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
//           )}
//         </div>

//         {/* Description Field */}
//         <div>
//           <label htmlFor="description" className="block font-medium mb-1">
//             Description
//           </label>
//           <input
//             type="text"
//             id="description"
//             {...register("description", {
//               required: "Designation is required",
//             })}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//             placeholder="Enter designation"
//           />
//           {errors.description && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.description.message}
//             </p>
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
//             {...register("image")}
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
//           className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition flex items-center justify-center"
//           disabled={loading}
//         >
//           {loading ? "Editing..." : "Edit Team Details"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditTeamDetails;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  getSingleTeamDetails,
  updateTeamDetails,
} from "../../features/actions/teamDetailsAction";
import { toast } from "sonner";

const EditTeamDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { teamDetails } = useSelector((state) => state.teamDetails);

  useEffect(() => {
    dispatch(getSingleTeamDetails(id));
  }, [dispatch, id]);

  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (teamDetails) {
      reset({
        title: teamDetails.title || "",
        description: teamDetails.description || "",
      });
      if (teamDetails.image) {
        setImagePreview(teamDetails.image.secure_url);
      }
    }
  }, [teamDetails, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await dispatch(
        updateTeamDetails({ id: teamDetails._id, updatedData: data })
      );
      toast.success("Team Details edited successfully!");
      reset();
      setImagePreview(null);
    } catch (error) {
      toast.error("Failed to update team details!");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg mt-4">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
        Edit Team Details
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title Field */}
        <div>
          <label
            htmlFor="title"
            className="block text-gray-700 dark:text-gray-300 font-medium mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full border rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800 dark:text-white"
            placeholder="Enter Title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="description"
            className="block text-gray-700 dark:text-gray-300 font-medium mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full border rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800 dark:text-white"
            placeholder="Enter Description"
            rows="4"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Image Upload Field */}
        <div>
          <label
            htmlFor="image"
            className="block text-gray-700 dark:text-gray-300 font-medium mb-1"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            {...register("image")}
            className="w-full border rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800 dark:text-white"
            onChange={handleImageChange}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-4">
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
              Image Preview:
            </p>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-lg border"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 dark:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition flex items-center justify-center"
          disabled={loading}
        >
          {loading ? "Editing..." : "Edit Team Details"}
        </button>
      </form>
    </div>
  );
};

export default EditTeamDetails;
