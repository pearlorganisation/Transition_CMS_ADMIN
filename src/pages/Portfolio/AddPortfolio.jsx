import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { addPortfolio } from "../../features/actions/Portfolio/portfolio";
import { useDispatch } from "react-redux";
import JoditEditor from "jodit-react";
const config = {
  readonly: false,
  height: 100,
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
    url: "your-upload-url", // If you have a file upload URL
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
export default function AddPortfolio() {
  const { register, handleSubmit, control, reset } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [bgPreview, setBgPreview] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);

  const handleImageChange = (e, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const [options, setOptions] = useState([]);

  const dispatch = useDispatch();

  const [coInvestors, setCoInvestors] = useState([]);

  const [investmentTimelines, setInvestmentTimelines] = useState([]);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/portfolio-cards")
      .then((response) => {
        const formattedOptions = response.data.data.map((feature) => ({
          value: feature._id,
          label: feature.title,
        }));
        setOptions(formattedOptions);
      })
      .catch((error) =>
        console.error("Error fetching portfolio cards:", error)
      );
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/investment-timeline")
      .then((response) => {
        setInvestmentTimelines(response.data.data);
      })
      .catch((error) =>
        console.error("Error fetching investment timelines:", error)
      );
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/co-investors")
      .then((response) => {
        const formattedOptions = response.data.data.map((feature) => ({
          value: feature._id,
          label: feature.name,
        }));
        setCoInvestors(formattedOptions);
      })
      .catch((error) =>
        console.error("Error fetching investment timelines:", error)
      );
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formattedCards =
        data.cards?.map((card) => ({
          _id: card.value,
          portfoliocardname: card.label,
        })) || [];
      const formattedCoInvestors =
        data.coInvestedBy?.map((investor) => ({
          _id: investor.value,
          coInvestorname: investor.label,
        })) || [];

      const submissionData = {
        ...data,
        image: data.image[0],
        bg: data.bg[0],
        bottomSectionIcon: data.bottomSectionIcon[0],
        investmentTimeline: selectedInvestment?._id,
        cards: formattedCards,
        coInvestedBy: formattedCoInvestors,
      };

      await dispatch(addPortfolio(submissionData));
      reset();
      setImagePreview(null);
      setBgPreview(null);
      setIconPreview(null);
    } catch (error) {
      console.error("Error submitting portfolio:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Add Portfolio</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name", { required: true })}
          placeholder="Name"
          className="w-full p-2 border border-gray-300 rounded"
        />

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <Controller
            control={control}
            name="title"
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <JoditEditor
                //   ref={editorRef}
                value={field.value}
                config={config}
                onBlur={field.onBlur}
                onChange={(content) => field.onChange(content)}
              />
            )}
          />
        </div>
        <input
          {...register("link")}
          placeholder="Portfolio Link (Optional)"
          className="w-full p-2 border border-gray-300 rounded"
        />

        {/* Image Upload */}

        <h1> Add Image</h1>
        <input
          type="file"
          {...register("image")}
          onChange={(e) => handleImageChange(e, setImagePreview)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="h-20" />
        )}

        {/* Background Image Upload */}

        <h1> Add Background Image</h1>
        <input
          type="file"
          {...register("bg")}
          onChange={(e) => handleImageChange(e, setBgPreview)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {bgPreview && (
          <img src={bgPreview} alt="Background Preview" className="h-20" />
        )}

        {/* Bottom Section Icon Upload */}
        <h1> Add Bottom Section Image</h1>
        <input
          type="file"
          {...register("bottomSectionIcon")}
          onChange={(e) => handleImageChange(e, setIconPreview)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {iconPreview && (
          <img src={iconPreview} alt="Icon Preview" className="h-20" />
        )}
        {/**overview */}
        <div>
          <label
            htmlFor="overview"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Overview
          </label>
          <Controller
            control={control}
            name="overview"
            rules={{ required: "Overview is required" }}
            render={({ field }) => (
              <JoditEditor
                //   ref={editorRef}
                value={field.value}
                config={config}
                onBlur={field.onBlur}
                onChange={(content) => field.onChange(content)}
              />
            )}
          />
        </div>

        <div>
          <label
            htmlFor="mainDescription"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Main Description
          </label>
          <Controller
            control={control}
            name="mainDescription"
            rules={{ required: "Overview is required" }}
            render={({ field }) => (
              <JoditEditor
                //   ref={editorRef}
                value={field.value}
                config={config}
                onBlur={field.onBlur}
                onChange={(content) => field.onChange(content)}
              />
            )}
          />
        </div>
        <textarea
          {...register("bottomSectionContent", { required: true })}
          placeholder="Bottom Section Content"
          className="w-full p-2 border border-gray-300 rounded"
        />

        <h2 className="font-semibold">Investment Timeline</h2>
        <button
          type="button"
          className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-left"
          onClick={() => setIsModalOpen(true)}
        >
          {selectedInvestment
            ? `Description: ${selectedInvestment.description}`
            : "Select Investment Timeline"}
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-4xl max-h-[100vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4 text-center">
                Select Investment Timeline
              </h2>
              <div className="grid grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto p-2">
                {investmentTimelines.map((timeline) => (
                  <div
                    key={timeline._id}
                    className="p-4 border rounded cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedInvestment(timeline);
                      setIsModalOpen(false);
                    }}
                  >
                    <img
                      src={timeline.image.secure_url}
                      alt="Timeline"
                      className="h-24 w-full object-cover rounded-md mb-2"
                    />
                    <p className="font-semibold">{timeline.investmentYear}</p>
                    <p className="text-gray-600">{timeline.description}</p>
                  </div>
                ))}
              </div>
              <button
                className="mt-4 w-full bg-red-500 text-white p-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Cards Dropdown */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Select Cards</label>
          <Controller
            name="cards"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={options}
                isMulti
                placeholder="Select Cards"
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              />
            )}
          />
        </div>

        {/* Co-Investors Dropdown */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">
            Select Co-Investors
          </label>
          <Controller
            name="coInvestedBy"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={coInvestors}
                isMulti
                placeholder="Select Co-Investors"
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              />
            )}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Portfolio"}
        </button>
      </form>
    </div>
  );
}
