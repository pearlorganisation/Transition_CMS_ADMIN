import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { editPortfolio } from "../../features/actions/Portfolio/portfolio";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
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

export default function EditPortfolio() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const [imagePreview, setImagePreview] = useState(null);
  const [bgPreview, setBgPreview] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);
  const [options, setOptions] = useState([]);
  const [coInvestors, setCoInvestors] = useState([]);
  const [investmentTimelines, setInvestmentTimelines] = useState([]);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [portfolioCardsRes, timelineRes, coInvestorsRes, portfolioRes] =
          await Promise.all([
            axiosInstance.get("/portfolio-cards"),
            axiosInstance.get("/investment-timeline"),
            axiosInstance.get("/co-investors"),
            axiosInstance.get(`/portfolio/${id}`),
          ]);

        setOptions(
          portfolioCardsRes.data.data.map((feature) => ({
            value: feature._id,
            label: feature.title,
          }))
        );

        setInvestmentTimelines(timelineRes.data.data);

        setCoInvestors(
          coInvestorsRes.data.data.map((feature) => ({
            value: feature._id,
            label: feature.name,
          }))
        );

        const {
          cards,
          coInvestedBy,
          mainDescription,
          image,
          bg,
          bottomSectionIcon,
          name,
          title,
          investmentTimeline,
          link,
          overview,
          bottomSectionContent,
        } = portfolioRes.data.data;

        reset({
          name,
          mainDescription,
          title,
          link,
          overview,
          investmentTimeline,
          bottomSectionContent,
          cards: cards.map((card) => ({
            value: card._id,
            label: card.portfoliocardname,
          })),
          coInvestedBy: coInvestedBy.map((card) => ({
            value: card._id,
            label: card.coInvestorname,
          })),
        });

        setImagePreview(image?.secure_url);
        setBgPreview(bg?.secure_url);
        setIconPreview(bottomSectionIcon?.secure_url);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, reset]);

  const handleImageChange = (e, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  console.log(options, "options for portfolio cards");

  console.log(coInvestors, "my coinvestors");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("mainDescription", data.mainDescription);

      formData.append("title", data.title);
      formData.append("overview", data.overview);
      formData.append("bottomSectionContent", data.bottomSectionContent);
      formData.append("link", data.link);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }
      if (data.bg && data.bg[0]) {
        formData.append("bg", data.bg[0]);
      }
      if (data.bottomSectionIcon && data.bottomSectionIcon[0]) {
        formData.append("bottomSectionIcon", data.bottomSectionIcon[0]);
      }

      formData.append(
        "cards",
        JSON.stringify(
          data.cards.map((card) => ({
            _id: card.value,
            portfoliocardname: card.label,
          }))
        )
      );
      formData.append(
        "coInvestedBy",
        JSON.stringify(
          data.coInvestedBy.map((card) => ({
            _id: card.value,
            coInvestorname: card.label,
          }))
        )
      );

      await dispatch(editPortfolio({ id, portfolioData: formData }));
    } catch (error) {
      console.error("Error updating portfolio:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Edit Portfolio</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="">Name </h1>
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

        <h1 className=""> Link (Optional) </h1>
        <input
          {...register("link")}
          placeholder="Portfolio Link (Optional)"
          className="w-full p-2 border border-gray-300 rounded"
        />

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

        {/** editio section */}
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

        <h1 className=""> Bottom Section Content </h1>
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

        <div>
          <label className="block text-gray-700">Select Portfolio Cards</label>
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

        <div>
          <label className="block text-gray-700">Select Co Investors </label>
          <Controller
            name="coInvestedBy"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={coInvestors}
                isMulti
                className="basic-multi-select"
                classNamePrefix="select"
              />
            )}
          />
          {errors.coInvestedBy && (
            <p className="text-red-500">{errors.coInvestedBy.message}</p>
          )}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md shadow-lg max-w-lg w-full">
              <h2 className="text-xl font-bold mb-4">
                Select Investment Timeline
              </h2>
              <div className="space-y-4 max-h-96 overflow-auto flex flex-row gap-3">
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
                      className="h-20 w-full object-cover rounded-md mb-2"
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

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white p-2 rounded ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}
