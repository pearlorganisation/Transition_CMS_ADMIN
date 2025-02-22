// import { useEffect, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import Select from "react-select";
// import axiosInstance from "../../axiosInstance";
// import { useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { updateListInvest } from "../../features/actions/Portfolio/investmentTimelineAction";

// const EditInvestmentTimeline = () => {
//   const { id } = useParams();

//   const dispatch = useDispatch();
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     control,
//     formState: { errors },
//   } = useForm();

//   const [imagePreview, setImagePreview] = useState(null);
//   const [options, setOptions] = useState([]);
//   const [imageUrl, setImageUrl] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axiosInstance
//       .get("/investment-timeline-cards")
//       .then((response) => {
//         const formattedOptions = response.data.data.map((feature) => ({
//           value: feature._id,
//           label: feature.body,
//         }));
//         setOptions(formattedOptions);
//       })
//       .catch((error) => console.error("Error fetching features:", error));
//   }, []);

//   useEffect(() => {
//     axiosInstance
//       .get(`/investment-timeline/${id}`)
//       .then((response) => {
//         const { cards, description, image, investmentYear } =
//           response.data.data;
//         setValue("description", description);
//         setValue("investmentYear", investmentYear);
//         setImageUrl(image);
//         setValue("image", []);
//         setValue(
//           "cards",
//           cards.map((card) => ({ value: card._id, label: card.body }))
//         );
//         setLoading(false);
//       })
//       .catch((error) => console.error("Error fetching focus area:", error));
//   }, [id, setValue]);

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append("description", data.description);
//       formData.append("investmentYear", data.investmentYear);
//       if (data.image.length > 0) {
//         formData.append("image", data.image[0]);
//       }

//       formData.append(
//         "cards",
//         JSON.stringify(
//           data.cards.map((card) => ({ _id: card.value, body: card.label }))
//         )
//       );

//       dispatch(updateListInvest({ id: id, updatedData: formData }));
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold mb-4">EDIT Investment Timeline</h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Description */}
//         <div>
//           <label className="block text-gray-700">Description</label>
//           <textarea
//             {...register("description", {
//               required: "Description is required",
//             })}
//             className="w-full p-2 border rounded"
//           />
//           {errors.description && (
//             <p className="text-red-500">{errors.description.message}</p>
//           )}
//         </div>

//         {/* Investment Year */}
//         <div>
//           <label className="block text-gray-700">Investment Year</label>
//           <input
//             type="number"
//             {...register("investmentYear", {
//               required: "Investment Year is required",
//             })}
//             className="w-full p-2 border rounded"
//           />
//           {errors.investmentYear && (
//             <p className="text-red-500">{errors.investmentYear.message}</p>
//           )}
//         </div>

//         {imageUrl && !imagePreview && (
//           <img
//             src={imageUrl.secure_url}
//             alt="Current"
//             className="mt-2 w-32 h-32 object-cover rounded"
//           />
//         )}

//         {/* Image Upload */}
//         <div>
//           <label className="block text-gray-700">Image</label>
//           <input
//             type="file"
//             {...register("image")}
//             className="w-full p-2 border rounded"
//             accept="image/*"
//             onChange={(e) =>
//               setImagePreview(URL.createObjectURL(e.target.files[0]))
//             }
//           />
//           {errors.image && (
//             <p className="text-red-500">{errors.image.message}</p>
//           )}
//           {imagePreview && (
//             <img
//               src={imagePreview}
//               alt="Preview"
//               className="mt-2 w-32 h-32 object-cover rounded"
//             />
//           )}
//         </div>

//         {/* Cards Multi-Select */}
//         <div>
//           <label className="block text-gray-700">Select Cards</label>
//           <Controller
//             name="cards"
//             control={control}
//             rules={{ required: "At least one card must be selected" }}
//             render={({ field }) => (
//               <Select
//                 {...field}
//                 options={options}
//                 isMulti
//                 className="basic-multi-select"
//                 classNamePrefix="select"
//               />
//             )}
//           />
//           {errors.cards && (
//             <p className="text-red-500">{errors.cards.message}</p>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditInvestmentTimeline;

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import axiosInstance from "../../axiosInstance";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateListInvest } from "../../features/actions/Portfolio/investmentTimelineAction";

const EditInvestmentTimeline = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);
  const [options, setOptions] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/investment-timeline-cards")
      .then((response) => {
        const formattedOptions = response.data.data.map((feature) => ({
          value: feature._id,
          label: feature.body,
        }));
        setOptions(formattedOptions);
      })
      .catch((error) => console.error("Error fetching features:", error));
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`/investment-timeline/${id}`)
      .then((response) => {
        const { cards, description, image, investmentYear } =
          response.data.data;
        setValue("description", description);
        setValue("investmentYear", investmentYear);
        setImageUrl(image);
        setValue("image", []);
        setValue(
          "cards",
          cards.map((card) => ({ value: card._id, label: card.body }))
        );
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching focus area:", error));
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("description", data.description);
      formData.append("investmentYear", data.investmentYear);
      if (data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      formData.append(
        "cards",
        JSON.stringify(
          data.cards.map((card) => ({ _id: card.value, body: card.label }))
        )
      );

      await dispatch(updateListInvest({ id: id, updatedData: formData }));
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">EDIT Investment Timeline</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Description */}
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full p-2 border rounded"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Investment Year */}
        <div>
          <label className="block text-gray-700">Investment Year</label>
          <input
            type="number"
            {...register("investmentYear", {
              required: "Investment Year is required",
            })}
            className="w-full p-2 border rounded"
          />
          {errors.investmentYear && (
            <p className="text-red-500">{errors.investmentYear.message}</p>
          )}
        </div>

        {imageUrl && !imagePreview && (
          <img
            src={imageUrl.secure_url}
            alt="Current"
            className="mt-2 w-32 h-32 object-cover rounded"
          />
        )}

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            {...register("image")}
            className="w-full p-2 border rounded"
            accept="image/*"
            onChange={(e) =>
              setImagePreview(URL.createObjectURL(e.target.files[0]))
            }
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        {/* Cards Multi-Select */}
        <div>
          <label className="block text-gray-700">Select Cards</label>
          <Controller
            name="cards"
            control={control}
            rules={{ required: "At least one card must be selected" }}
            render={({ field }) => (
              <Select
                {...field}
                options={options}
                isMulti
                className="basic-multi-select"
                classNamePrefix="select"
              />
            )}
          />
          {errors.cards && (
            <p className="text-red-500">{errors.cards.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded disabled:bg-blue-400 transition"
          disabled={submitting}
        >
          {submitting ? "Editing..." : "Edit Investment Timeline"}
        </button>
      </form>
    </div>
  );
};

export default EditInvestmentTimeline;
