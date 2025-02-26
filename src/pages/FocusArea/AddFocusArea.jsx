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
  },
  placeholder: "Start typing here...",
  showCharsCounter: true,
  showWordsCounter: true,
  spellcheck: true,
  allowResizeY: true,
};

const AddFocusArea = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formattedData = {
        title: data.title,
        focusAreas: data.focusAreas.map((id) => {
          const selectedFeature = options.find((option) => option.value === id);
          return { _id: selectedFeature.value, title: selectedFeature.label };
        }),
      };

      await dispatch(addFocusArea(formattedData));
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">
        Create Focus Area
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Title
          </label>
          <Controller
            control={control}
            name="title"
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <JoditEditor
                value={field.value || ""}
                config={config}
                onBlur={field.onBlur}
                onChange={field.onChange}
              />
            )}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Focus Areas Multi-Select */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Select Focus Areas
          </label>
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
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Focus Area"}
        </button>
      </form>
    </div>
  );
};

export default AddFocusArea;
