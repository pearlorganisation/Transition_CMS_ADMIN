// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import {
//   getSingleInvestmentTimelineCard,
//   updateInvestmentTimelineCard,
// } from "../../features/actions/Portfolio/investmentTimelineCardsAction";

// const EditInvestmentCard = () => {
//   const { id } = useParams();

//   const dispatch = useDispatch();

//   const { singleInvestmentTimelineCard } = useSelector(
//     (state) => state.investmentTimelineCards
//   );

//   useEffect(() => {
//     dispatch(getSingleInvestmentTimelineCard(id));
//   }, [dispatch, id]);

//   const [imagePreview, setImagePreview] = useState(null);
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     if (singleInvestmentTimelineCard) {
//       reset({
//         title: singleInvestmentTimelineCard.title || "",
//         body: singleInvestmentTimelineCard.body || "",
//       });
//       if (singleInvestmentTimelineCard.icon) {
//         setImagePreview(singleInvestmentTimelineCard.icon.secure_url);
//       }
//     }
//   }, [singleInvestmentTimelineCard, reset]);

//   // Handle form submission
//   const onSubmit = (data) => {
//     dispatch(
//       updateInvestmentTimelineCard({
//         id: singleInvestmentTimelineCard._id,
//         updatedData: data,
//       })
//     );

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

//   console.log(singleInvestmentTimelineCard, "Single portfolio card");
//   return (
//     <div className="max-w-2xl mx-auto px-6 bg-gray-400 shadow-lg rounded-lg h-full mt-2 pb-6">
//       <h1 className="text-2xl font-bold mb-6">
//         Edit Investment Timeline Card{" "}
//       </h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
//         {/* Name Field */}
//         <div>
//           <label htmlFor="title" className="block font-medium mb-1">
//             Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             {...register("title", { required: "Title is required" })}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//             placeholder="Enter name"
//           />
//           {errors.title && (
//             <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
//           )}
//         </div>

//         {/* Designation Field */}
//         <div>
//           <label htmlFor="body" className="block font-medium mb-1">
//             Body Text
//           </label>
//           <input
//             type="text"
//             id="body"
//             {...register("body", {
//               required: "Body is required",
//             })}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//             placeholder="Enter body"
//           />
//           {errors.body && (
//             <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>
//           )}
//         </div>

//         {/* Image Upload Field */}
//         <div>
//           <label htmlFor="icon" className="block font-medium mb-1">
//             Upload Image
//           </label>
//           <input
//             type="file"
//             id="icon"
//             accept="image/*"
//             {...register("icon")}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//             onChange={handleImageChange}
//           />
//           {errors.icon && (
//             <p className="text-red-500 text-sm mt-1">{errors.icon.message}</p>
//           )}
//         </div>

//         {/* Image Preview */}
//         {imagePreview && (
//           <div className="mt-4">
//             <p className="font-medium mb-1">Icon Preview:</p>
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
//           Edit Investment Timeline Card
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditInvestmentCard;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  getSingleInvestmentTimelineCard,
  updateInvestmentTimelineCard,
} from "../../features/actions/Portfolio/investmentTimelineCardsAction";

const EditInvestmentCard = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { singleInvestmentTimelineCard } = useSelector(
    (state) => state.investmentTimelineCards
  );

  useEffect(() => {
    dispatch(getSingleInvestmentTimelineCard(id));
  }, [dispatch, id]);

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (singleInvestmentTimelineCard) {
      reset({
        title: singleInvestmentTimelineCard.title || "",
        body: singleInvestmentTimelineCard.body || "",
      });
      if (singleInvestmentTimelineCard.icon) {
        setImagePreview(singleInvestmentTimelineCard.icon.secure_url);
      }
    }
  }, [singleInvestmentTimelineCard, reset]);

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    await dispatch(
      updateInvestmentTimelineCard({
        id: singleInvestmentTimelineCard._id,
        updatedData: data,
      })
    );
    setLoading(false);
    reset();
    setImagePreview(null);
  };

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  console.log(singleInvestmentTimelineCard, "Single portfolio card");
  return (
    <div className="max-w-2xl mx-auto px-6 bg-gray-400 shadow-lg rounded-lg h-full mt-2 pb-6">
      <h1 className="text-2xl font-bold mb-6">
        Edit Investment Timeline Card{" "}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
        {/* Name Field */}
        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter name"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Designation Field */}
        <div>
          <label htmlFor="body" className="block font-medium mb-1">
            Body Text
          </label>
          <input
            type="text"
            id="body"
            {...register("body", {
              required: "Body is required",
            })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter body"
          />
          {errors.body && (
            <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>
          )}
        </div>

        {/* Image Upload Field */}
        <div>
          <label htmlFor="icon" className="block font-medium mb-1">
            Upload Image
          </label>
          <input
            type="file"
            id="icon"
            accept="image/*"
            {...register("icon")}
            className="w-full border border-gray-300 rounded px-3 py-2"
            onChange={handleImageChange}
          />
          {errors.icon && (
            <p className="text-red-500 text-sm mt-1">{errors.icon.message}</p>
          )}
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-4">
            <p className="font-medium mb-1">Icon Preview:</p>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded border"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Updating..." : "Edit Investment Timeline Card"}
        </button>
      </form>
    </div>
  );
};

export default EditInvestmentCard;
