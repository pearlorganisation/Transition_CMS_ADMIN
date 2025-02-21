import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { addFocusArea } from "../../features/actions/focusAreaAction";
import JoditEditor from "jodit-react";
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
    url: "your-upload-url",
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

const AddFocusArea = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance
      .get("/focus-features")
      .then((response) => {
        const formattedOptions = response.data.data.map((feature) => ({
          value: feature._id,
          label: feature.title,
        }));
        setOptions(formattedOptions);
      })
      .catch((error) => console.error("Error fetching features:", error));
  }, []);

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);

    const formattedData = {
      title: data.title,
      focusAreas: data.focusAreas.map((id) => {
        const selectedFeature = options.find((option) => option.value === id);
        return { _id: selectedFeature.value, title: selectedFeature.label };
      }),
    };

    dispatch(addFocusArea(formattedData));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      {/* Title Field */}
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        {/* <input
          {...register("title", { required: "Title is required" })}
          className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
          placeholder="Enter Focus Area Title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )} */}
        <Controller
          control={control}
          name="title"
          rules={{ required: "Body is required" }}
          render={({ field }) => (
            <JoditEditor
              value={field.value || ""}
              config={config}
              onBlur={field.onBlur}
              onChange={(content) => {
                field.onChange(content); // Ensure new content is saved
              }}
            />
          )}
        />
      </div>

      {/* Focus Areas Multi-Select */}
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

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
      >
        Create Focus Area
      </button>
    </form>
  );
};

export default AddFocusArea;
