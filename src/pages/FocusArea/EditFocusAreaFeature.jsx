// import { useEffect, useState } from "react";
// import { useFieldArray, useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";

// import { useParams } from "react-router-dom";
// import {
//   getFocusFeatureById,
//   updateFocusAreaFeature,
// } from "../../features/actions/focusAreaAction";

// const EditFocusAreaFeature = () => {
//   const { id } = useParams();

//   const dispatch = useDispatch();

//   const { focusAreaFeature } = useSelector((state) => state.focusArea);

//   useEffect(() => {
//     dispatch(getFocusFeatureById(id));
//   }, [dispatch, id]);

//   const [imagePreview, setImagePreview] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     control,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: focusAreaFeature || {},
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "features",
//   });

//   //   useEffect(() => {
//   //     reset(focusAreaFeature);
//   //   }, [focusAreaFeature, reset]);

//   useEffect(() => {
//     if (focusAreaFeature) {
//       reset({
//         title: focusAreaFeature.title || "",
//         features: focusAreaFeature.features || [{ value: "" }],
//       });
//       if (focusAreaFeature.image) {
//         setImagePreview(focusAreaFeature.image.secure_url);
//       }
//     }
//   }, [focusAreaFeature, reset]);

//   // Handle form submission
//   const onSubmit = (data) => {
//     console.log("Updated Data:", data);
//     dispatch(updateFocusAreaFeature(data));
//   };

//   // Handle image preview
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto px-6 bg-gray-300 shadow-lg rounded-lg mt-2 pb-6">
//       <h1 className="text-2xl font-bold mb-6">Edit Focus Area Feature</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Title Field */}
//         <div className="w-full">
//           <label htmlFor="title" className="block font-medium mb-1">
//             Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             {...register("title", { required: "Title is required" })}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//             placeholder="Enter title"
//           />
//           {errors.title && (
//             <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
//           )}
//         </div>

//         {/* Features Field */}
//         <div className="w-full">
//           <label htmlFor="features" className="block font-medium mb-1">
//             Features
//           </label>

//           {fields.map((field, index) => (
//             <div key={field.id} className="flex gap-2 mb-2">
//               <input
//                 {...register(`features.${index}.value`, {
//                   required: "Feature is required",
//                 })}
//                 placeholder="Enter feature"
//                 className="border px-3 py-2 rounded w-full"
//               />
//               <button
//                 type="button"
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//                 onClick={() => remove(index)}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}

//           <button
//             type="button"
//             className="bg-green-500 text-white px-3 py-1 rounded"
//             onClick={() => append({ value: "" })}
//           >
//             Add Feature
//           </button>
//         </div>

//         {/* Image Upload Field */}
//         <div>
//           <label htmlFor="image" className="block font-medium mb-1">
//             Upload Icon
//           </label>
//           <input
//             type="file"
//             id="image"
//             accept="image/*"
//             className="w-full border border-gray-300 rounded px-3 py-2"
//             onChange={handleImageChange}
//           />
//         </div>

//         {/* Image Preview */}
//         {imagePreview && (
//           <div className="mt-4">
//             <p className="font-medium mb-1">Image Preview sdlfsdkjf:</p>
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
//           Update Focus Area Feature
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditFocusAreaFeature;

import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getFocusFeatureById,
  updateFocusAreaFeature,
} from "../../features/actions/focusAreaAction";

const EditFocusAreaFeature = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { focusAreaFeature } = useSelector((state) => state.focusArea);

  useEffect(() => {
    dispatch(getFocusFeatureById(id));
  }, [dispatch, id]);

  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      features: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  console.log(focusAreaFeature, "Single Focus Area Feature");

  useEffect(() => {
    if (focusAreaFeature) {
      reset({
        title: focusAreaFeature.title || "",
        features: focusAreaFeature.features?.length
          ? focusAreaFeature.features.map((feature) => ({ value: feature }))
          : [],
      });
      if (focusAreaFeature.image) {
        setImagePreview(focusAreaFeature.image.secure_url);
      }
    }
  }, [focusAreaFeature, reset]);

  const onSubmit = (data) => {
    console.log("Update Fpcus Area Feature Data:", data);
    dispatch(
      updateFocusAreaFeature({ id: focusAreaFeature._id, updatedData: data })
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 bg-gray-300 shadow-lg rounded-lg mt-2 pb-6">
      <h1 className="text-2xl font-bold mb-6">Edit Focus Area Feature</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="w-full">
          <label htmlFor="title" className="block font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="w-full">
          <label htmlFor="features" className="block font-medium mb-1">
            Features
          </label>

          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input
                {...register(`features.${index}.value`, {
                  required: "Feature is required",
                })}
                placeholder="Enter feature"
                className="border px-3 py-2 rounded w-full"
              />
              <button
                type="button"
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            className="bg-green-500 text-white px-3 py-1 rounded"
            onClick={() => append({ value: "" })}
          >
            Add Feature
          </button>
        </div>

        <div>
          <label htmlFor="image" className="block font-medium mb-1">
            Upload Icon
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            className="w-full border border-gray-300 rounded px-3 py-2"
            onChange={handleImageChange}
          />
        </div>

        {imagePreview && (
          <div className="mt-4">
            <p className="font-medium mb-1">Image Preview:</p>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded border"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Update Focus Area Feature
        </button>
      </form>
    </div>
  );
};

export default EditFocusAreaFeature;
