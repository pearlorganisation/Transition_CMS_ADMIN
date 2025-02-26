import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContact,
  getContactData,
  postContactData,
  updateContact,
} from "../../features/actions/contactAction";

export default function ContactUs() {
  const {
    isLoading,
    contactsData,
    postResponse,
    deleteResponse,
    updateResponse,
  } = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  const { register, control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      mainTitle: "",
      fieldArr: [{ title: "", type: "FORM", value: "", buttonText: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fieldArr",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const onSubmit = (data) => {
    console.log(data, "data");
    if (editingData) {
      dispatch(updateContact(data));
      // Dispatch update action here if needed
    } else {
      dispatch(postContactData(data));
    }
    setIsModalOpen(false);
    reset({
      mainTitle: "",
      fieldArr: [{ title: "", type: "FORM", value: "", buttonText: "" }],
    });
    setEditingData(null);
  };

  const handleEdit = (data) => {
    setEditingData(data);
    reset(data); // Reset form with selected data
    setIsModalOpen(true);
  };

  const handleDelete = (data) => {
    dispatch(deleteContact(data?._id));
  };

  useEffect(() => {
    dispatch(getContactData());
  }, [postResponse, deleteResponse, updateResponse]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md overflow-scroll h-[90vh]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  {...register("mainTitle")}
                  placeholder="Main Title"
                  className="w-full p-2 border rounded mb-2"
                />
              </div>
              {fields.map((field, index) => {
                const selectedType = watch(`fieldArr.${index}.type`);
                return (
                  <div key={field.id} className="mb-4 p-4 border rounded">
                    <input
                      {...register(`fieldArr.${index}.title`)}
                      placeholder="Title"
                      className="w-full p-2 border rounded mb-2"
                    />
                    <input
                      {...register(`fieldArr.${index}.buttonText`)}
                      placeholder="Button Text"
                      className="w-full p-2 border rounded mb-2"
                    />
                    <select
                      {...register(`fieldArr.${index}.type`)}
                      className="w-full p-2 border rounded mb-2"
                    >
                      <option value="FORM">FORM</option>
                      <option value="LINK">LINK</option>
                      <option value="MAIL">MAIL</option>
                    </select>
                    {selectedType === "FORM" && (
                      <input
                        {...register(`fieldArr.${index}.value`)}
                        placeholder="Enter Form Heading"
                        className="w-full p-2 border rounded mb-2"
                      />
                    )}
                    {selectedType === "LINK" && (
                      <input
                        {...register(`fieldArr.${index}.value`)}
                        placeholder="Enter Link"
                        className="w-full p-2 border rounded mb-2"
                      />
                    )}
                    {selectedType === "MAIL" && (
                      <input
                        {...register(`fieldArr.${index}.value`)}
                        placeholder="Enter Email"
                        className="w-full p-2 border rounded mb-2"
                        type="email"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
              <div className="space-x-3">
                <button
                  type="button"
                  onClick={() =>
                    append({
                      title: "",
                      type: "FORM",
                      value: "",
                      buttonText: "",
                    })
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                >
                  Add Section
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingData(null);
                    setIsModalOpen(false);
                  }}
                  className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="mt-6">
        <div>
          <h2 className="text-lg font-bold mb-2">Contact Us Data</h2>
          <button
            onClick={() => {
              reset({
                mainTitle: "",
                fieldArr: [
                  { title: "", type: "FORM", value: "", buttonText: "" },
                ],
              });
              setIsModalOpen(true);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Add
          </button>
        </div>
        {Array.isArray(contactsData) &&
          contactsData?.map((data, idx) => (
            <div
              key={idx}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm mb-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-800">
                  Main Title: {data.mainTitle}
                </p>
                {data.fieldArr.map((section, i) => (
                  <div key={i} className="p-4 bg-gray-100 rounded-lg">
                    <p className="text-sm font-semibold text-gray-800">
                      Title: {section.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      Type: {section.type}
                    </p>
                    <p className="text-sm text-gray-600">
                      Value: {section.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(contactsData[idx])}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(data)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
