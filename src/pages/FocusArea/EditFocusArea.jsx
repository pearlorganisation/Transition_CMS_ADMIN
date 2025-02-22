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

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

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

  useEffect(() => {
    axiosInstance
      .get(`/focusarea/${id}`)
      .then((response) => {
        const { title, focusAreas } = response.data.data;
        setValue("title", title);
        setValue(
          "focusAreas",
          focusAreas.map((area) => area._id)
        );
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching focus area:", error));
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setSubmitting(true);

    try {
      const formattedData = {
        title: data.title,
        focusAreas: data.focusAreas.map((id) => {
          const selectedFeature = options.find((option) => option.value === id);
          return { _id: selectedFeature.value, title: selectedFeature.label };
        }),
      };

      await dispatch(updateFocusArea({ id, updatedData: formattedData }));
    } catch (error) {
      console.error("Error updating focus area:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      {/* Title Field */}
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
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
        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
        disabled={submitting}
      >
        {submitting ? "Updating..." : "Update Focus Area"}
      </button>
    </form>
  );
};

export default EditFocusArea;
