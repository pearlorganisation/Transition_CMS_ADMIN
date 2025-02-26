import JoditEditor from "jodit-react";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateImpactById } from "../../features/actions/Impact/ImapctAction";
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

const EditSdg = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { data } = location.state ?? {};
  const { _id } = data || {};
  console.log(data);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch, // Add watch to debug form state
  } = useForm({
    defaultValues: { title: data.title },
  });

  // Update form values when `data` changes
  // useEffect(() => {
  //   if (data) {
  //     reset({ title: data.title });
  //   }
  // }, [data, reset]);

  // Debugging: Log form state
  useEffect(() => {
    console.log("Current form data:", watch("title"));
  }, [watch("title")]);

  const submitForm = async (formData) => {
    const updatedData = { ...formData, id: _id };

    dispatch(updateImpactById(updatedData));
  };

  return (
    <>
      <div className="mt-8">Edit SDG</div>
      <div className="mt-12">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Body
        </label>
        <form onSubmit={handleSubmit(submitForm)}>
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
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Update SDG
          </button>
        </form>
      </div>
    </>
  );
};

export default EditSdg;
