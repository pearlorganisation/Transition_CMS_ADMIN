import JoditEditor from 'jodit-react';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom'
import { updateImpactById } from '../../features/actions/Impact/ImapctAction';
import { useDispatch } from 'react-redux';
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

const EditEsg = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { data } = location.state ?? {}
  const { _id } = data || {};
console.log(data)
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch, // Add watch to debug form state
  } = useForm({
    defaultValues: { title: data.title },
  });

  const submitForm = async (formData) => {
    const updatedData = {...formData, id: _id, impactDataType: "ESGS" };
    console.log("Submitting updated data:", updatedData);
    dispatch(updateImpactById(updatedData));
  };

  return (
    <>
      <div>Edit ESG</div>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
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
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          <button type="submit">Update Mission</button>
        </form>
      </div>
    </>
  )
}

export default EditEsg