import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { updateFocusArea } from "../../features/actions/focusAreaAction";
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

const EditFocusArea = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const [options, setOptions] = useState([]); // Focus Areas options
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch available focus area features for dropdown options
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

  // Fetch existing focus area details
  useEffect(() => {
    axiosInstance
      .get(`/focusarea/${id}`)
      .then((response) => {
        const { title, focusAreas } = response.data.data;
        setValue("title", title);

        // Set preselected focus areas in react-select format
        const preselectedOptions = focusAreas.map((area) => ({
          value: area._id,
          label: area.title,
        }));
        setValue("focusAreas", preselectedOptions);

        setLoading(false);
      })
      .catch((error) => console.error("Error fetching focus area:", error));
  }, [id, setValue]);

  // Handle form submission
  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const formattedData = {
        title: data.title,
        focusAreas: data.focusAreas.map((option) => ({
          _id: option.value,
          title: option.label,
        })),
      };
      await dispatch(updateFocusArea({ id, updatedData: formattedData }));
    } catch (error) {
      console.error("Error updating focus area:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">
        Edit Focus Area
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
                value={field.value} // Ensure preselected values are set
                onChange={field.onChange}
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
          disabled={submitting}
        >
          {submitting ? "Updating..." : "Update Focus Area"}
        </button>
      </form>
    </div>
  );
};

export default EditFocusArea;
