import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import axiosInstance from "../../axiosInstance";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { updateFocusArea } from "../../features/actions/focusAreaAction";

const EditFocusArea = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axiosInstance
  //     .get("/api/v1/focusArea")
  //     .then((response) => {
  //       console.log(response.data.data, "Fouc Features");
  //       const formattedOptions = response.data.data.map((feature) => ({
  //         value: feature._id,
  //         label: feature.title,
  //       }));
  //       setOptions(formattedOptions);
  //     })
  //     .catch((error) => console.error("Error fetching features:", error));
  // }, []);

  // useEffect(() => {
  //   axiosInstance
  //     .get(`/api/v1/focus-areas/${id}`)
  //     .then((response) => {
  //       const { title, focusAreas } = response.data.data;
  //       setValue("title", title);
  //       setValue(
  //         "focusAreas",
  //         focusAreas.map((area) => area._id)
  //       );
  //       setLoading(false);
  //     })
  //     .catch((error) => console.error("Error fetching focus feature:", error));
  // }, [id, setValue]);

  const onSubmit = (data) => {
    dispatch(updateFocusArea(id, data));
    navigate("/focus-features");
  };

  // if (loading) return <p>Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          {...register("title", { required: "Title is required" })}
          className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
          placeholder="Enter Focus Area Title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Select Focus Areas</label>
        <Controller
          name="focusAreas"
          control={control}
          rules={{ required: "At least one focus area is required" }}
          render={({ field }) => (
            <Select
              {...field}
              options={options}
              isMulti
              className="mt-1"
              classNamePrefix="react-select"
              getOptionLabel={(e) => e.label}
              getOptionValue={(e) => e.value}
              value={options.filter((option) =>
                field.value?.includes(option.value)
              )}
              onChange={(selectedOptions) => {
                field.onChange(selectedOptions.map((option) => option.value));
              }}
            />
          )}
        />
        {errors.focusAreas && (
          <p className="text-red-500 text-sm">{errors.focusAreas.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
      >
        Update Focus Feature
      </button>
    </form>
  );
};

export default EditFocusArea;
