import { useEffect, useState } from "react";
import { apiClient } from "../../lib/api-Client";
import { useAppStore } from "../../store";
import {
  CREATE_SKILL,
  DELETE_SKILL,
  GET_SKILL,
  UPDATE_SKILL,
} from "../../Utils/Constant";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loading from "../../Component/Loading/Loading";

const Skill = () => {
  const { skill, setSkill, addSkills, updateSkill, removeSkill } =
    useAppStore();
  const [loading, setLoading] = useState(false);
  const [FilterData, SetFilterData] = useState(skill);
  const [ShowModel, SetShowModel] = useState(false);
  const [FormData, SetFormData] = useState({
    color: "",
    language: "",
    percentage: "",
  });
  const ToggleModel = (item) => {
    SetShowModel(!ShowModel);
    SetFormData(item);
  };

  const FetchSkill = async () => {
    try {
      const response = await apiClient.get(GET_SKILL);

      if (response.status === 200) {
        setSkill(response.data.data);
      }
    } catch (error) {
      console.log("Error" + error);
      toast.error("Some error occured while fetching skill");
    }
  };

  const CreateSkill = async () => {
    try {
      setLoading(true);
      const response = await apiClient.post(CREATE_SKILL, {
        language: FormData.language,
        color: FormData.color,
        percentage: FormData.percentage,
      },{
        withCredentials:true
      });
      if (response.status === 200) {
        toast.success("Skill create successfully");
        addSkills(response.data.data);
        SetShowModel(false);
        SetFormData([]);
      }
    } catch (error) {
      console.log("Error while create skill" + error);
      toast.error("Some error is occured");
    } finally {
      setLoading(false);
    }
  };
  const filterSearch = (searchValue) => {
    const lowerValue = searchValue.toLowerCase();
    if (lowerValue === "") {
      SetFilterData(skill);
    } else {
      const filtered = skill.filter((item) =>
        item.language.toLowerCase().includes(lowerValue)
      );
      SetFilterData(filtered);
    }
  };

  const DeleteSkill = async (_id) => {
    try {
      const response = await apiClient.delete(`${DELETE_SKILL}/${_id}`,{withCredentials:true});
      if (response.status == 200) {
        toast.success("Skill Deleted successfully");
        removeSkill(_id);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some error is occured");
    }
  };

  const updateSkills = async (_id) => {
    try {
      setLoading(true);
      const response = await apiClient.put(UPDATE_SKILL, {
        _id: _id,
        color: FormData.color,
        language: FormData.language,
        percentage: FormData.percentage,
      },{withCredentials:true});
      if (response.status === 200) {
        toast.success("Skill updated successfully");
        updateSkill(_id, response.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some error occured try again after some time");
    } finally {
      setLoading(false);
      SetShowModel(false);
    }
  };
  useEffect(() => {
    FetchSkill();
  }, []);
  useEffect(() => {
    SetFilterData(skill);
  }, [skill]);

        useEffect(() => {
    if (ShowModel) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Clean up in case the component unmounts while modal is open
    return () => document.body.classList.remove("overflow-hidden");
  }, [ShowModel]);

  return (
    <div>
      <div className="flex justify-evenly gap-3 py-5">
        <input
          onChange={(e) => filterSearch(e.target.value)}
          className="border-2 text-gray-500 outline-none rounded-md px-4 py-2 w-[90%]"
          type="text"
          placeholder="Search Skills"
        />
        <button
          onClick={ToggleModel}
          className="text-white bg-blue-500 px-5 cursor-pointer py-2 rounded-md"
        >
          new
        </button>
      </div>

      {ShowModel && (
        <div className="backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative  rounded-lg shadow-sm bg-gray-700">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-200">
                <h3 className="text-lg font-semibold text-white">
                  {FormData._id ? "Update Skill" : "Add new Skill"}
                </h3>
                <button
                  type="button"
                  onClick={ToggleModel}
                  className="text-gray-400 bg-transparent  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
                  data-modal-toggle="crud-modal"
                >
                  <svg
                    className="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 md:p-5">
                <div className="grid gap-4 mb-4">
                  {/* Language Input */}
                  <div className="col-span-2">
                    <label
                      htmlFor="Skill"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Language
                    </label>
                    <input
                      type="text"
                      name="language"
                      value={FormData.language || ""}
                      onChange={(e) =>
                        SetFormData({ ...FormData, language: e.target.value })
                      }
                      className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="Enter language"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="Percentage"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Percentage
                    </label>
                    <input
                      type="text"
                      name="Percentage"
                      value={FormData.percentage || ""}
                      onChange={(e) =>
                        SetFormData({ ...FormData, percentage: e.target.value })
                      }
                      className=" border   text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="Enter Percentage"
                      required
                    />
                  </div>
                  {/* Color Picker */}
                  <div className="col-span-2">
  <label className="block mb-2 text-sm font-medium text-white">Color</label>

  <div className="flex items-center gap-3">
    {/* Color Picker */}
    <input
      type="color"
      value={FormData.color || "#3b82f6"}
      onChange={(e) =>
        SetFormData({ ...FormData, color: e.target.value })
      }
      className="h-10 w-10 cursor-pointer rounded border border-gray-500"
      title="Choose color"
    />

    {/* Hex Input */}
    <input
      type="text"
      value={FormData.color || ""}
      onChange={(e) => {
        const hex = e.target.value;
        // Allow user to type freely, but only update if valid
        if (hex === "" || /^#[0-9A-Fa-f]{0,6}$/.test(hex)) {
          SetFormData({ ...FormData, color: hex });
        }
      }}
      className="border text-sm rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white outline-none"
      placeholder="#RRGGBB"
      maxLength={7}
    />
  </div>

  <p className="mt-1 text-xs text-gray-400">
    Click the color box or enter a hex code like <code>#3b82f6</code>
  </p>
</div>

                </div>

                {/* Submit Button */}
                <button
                  disabled={loading}
                  onClick={() =>
                    FormData._id ? updateSkills(FormData._id) : CreateSkill()
                  }
                  className="text-white inline-flex items-center focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div >
        {
          skill.length === 0 ? (
             <div className="flex justify-center items-center h-[80vh]">
            <Loading />
          </div>
          ):(
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
  {FilterData?.map((item) => (
          <div
            key={item.id} // Don't forget to add a unique key when mapping
            className={`w-[180px] sm:w-[200px] md:w-[218px] lg:w-[220px] m-auto bg-white rounded-[20px] my-[18px] hover:scale-110 transition-all duration-300`}
          >
            <div className="flex flex-col items-center text-center my-[18px]">
              {/* Circle Container */}
              <div
                className="w-[120px] h-[120px] flex items-center mt-4 justify-center relative rounded-full"
                style={{
                  background: `conic-gradient(${item.color} ${
                    item.percentage * 3.6
                  }deg, #ededed 0deg)`,
                }}
              >
                <div className="w-[90px] sm:w-[100px] md:w-[110px] h-[90px] sm:h-[100px] md:h-[110px] bg-white rounded-full flex items-center justify-center">
                  <div
                    className="absolute text-[20px] sm:text-[22px] md:text-[24px] font-bold"
                    style={{ color: item.color }}
                  >
                    {item.percentage}%
                  </div>
                </div>
              </div>
              <br />
              {/* Card Text */}
              <div className="text-[1rem] sm:text-[1.1rem] md:text-[1.2rem] lg:text-[1.4rem] font-medium text-black">
                {item.language}
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="flex justify-evenly space-x-3">
                <button
                  onClick={() => ToggleModel(item)}
                  className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  title="Edit"
                >
                  <FaEdit className="mr-1" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => DeleteSkill(item._id)}
                  className="flex items-center text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                  title="Delete"
                >
                  <FaTrash className="mr-1" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
            </div>
          )
        }
      
      </div>
    </div>
  );
};

export default Skill;
