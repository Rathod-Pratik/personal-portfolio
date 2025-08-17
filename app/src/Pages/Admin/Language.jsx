import { useEffect, useState } from "react";
import { apiClient } from "../../lib/api-Client";
import {
  CREATE_LANGUAGE,
  DELETE_LANGUAGE,
  GET_LANGUAGE,
  UPDATE_LANGUAGE,
} from "../../Utils/Constant";
import { format } from "date-fns";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAppStore } from "../../store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../../Component/Loading/Loading";

const Languages = () => {
  const navigate = useNavigate();
  const { setLanguage, language, addLanguage, updateLanguage, removeLanguage } =
    useAppStore();
  const [FilterData, SetFilterData] = useState(language);
  const [loading, SetLoading] = useState(false);
  const [FormData, SetFormData] = useState({
    description: "",
    language: "",
  });
  const [model, setModel] = useState(false);
  const showModel = (item) => {
    setModel(!model);
    SetFormData(item);
  };

  const AddLanguages = async () => {

    if(!FormData.language){
      toast.error("Please enter Language")
    }
    if(!FormData.description){
      toast.error("Please enter Description")
    }

    SetLoading(true);
    try {
      const response = await apiClient.post(
        CREATE_LANGUAGE,
        {
          description: FormData.description,
          language: FormData.language,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data?.success) {
        toast.success("Language added successfully");
        addLanguage(response.data.data); 
      
      setModel(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("some error is occured");
    } finally {
      SetLoading(false);
    }
  };
  const filterSearch = (searchValue) => {
    const lowerValue = searchValue.toLowerCase();
    if (lowerValue === "") {
      SetFilterData(language);
    } else {
      const filtered = language.filter((item) =>
        item.language.toLowerCase().includes(lowerValue)
      );
      SetFilterData(filtered);
    }
  };

  const FetchLanguage = async () => {
    if(language.length>1)return
    try {
      const response = await apiClient.get(GET_LANGUAGE);
      if (response.status === 200) {
        setLanguage(response.data.data);
        SetFilterData(response.data.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      console.log(error);
      toast.error("Some error is occured");
    }
  };

  const EditData = async (_id) => {
    SetLoading(true);
    try {
      const response = await apiClient.put(
        UPDATE_LANGUAGE,
        {
          _id,
          description: FormData.description,
          language: FormData.language,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Language updated successfully");
        updateLanguage(response.data.data._id, response.data.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      console.error("Update failed:", error);
      toast.error("Failed to update language. Please try again.");
    } finally {
      SetLoading(false);
      setModel(false);
    }
  };

  const DeleteLanguage = async (_id) => {
    try {
      const response = await apiClient.delete(`${DELETE_LANGUAGE}/${_id}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Language remove successfully");
        removeLanguage(_id);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      console.error("Delete failed:", error);
      toast.error("Failed to delete language. Please try again.");
    }
  };
  useEffect(() => {
    FetchLanguage();
  }, []);

  useEffect(() => {
    SetFilterData(language);
  }, [language]);

    useEffect(() => {
    if (model) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Clean up in case the component unmounts while modal is open
    return () => document.body.classList.remove("overflow-hidden");
  }, [model]);

  return (
    <div>
      <div className="flex justify-evenly gap-3 py-5">
        <input
          onChange={(e) => filterSearch(e.target.value)}
          className="border-2 text-gray-500 outline-none rounded-md px-4 py-2 w-[90%]"
          type="text"
          placeholder="Search Languages"
        />
        <button
          onClick={showModel}
          className="text-white bg-blue-500 px-5 cursor-pointer py-2 rounded-md"
        >
          new
        </button>
      </div>

      {model && (
        <div className="backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative  rounded-lg shadow-sm bg-gray-700">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-200">
                <h3 className="text-lg font-semibold text-white">
                  {FormData._id ? "Update Language" : "Add new Language"}
                </h3>
                <button
                  type="button"
                  onClick={showModel}
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
                      htmlFor="language"
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
                      className=" border   text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="Enter language"
                      required
                    />
                  </div>

                  {/* Description Input */}
                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Description
                    </label>
                    <textarea
                      name="description"
                      rows="4"
                      value={FormData.description || ""}
                      onChange={(e) =>
                        SetFormData({
                          ...FormData,
                          description: e.target.value,
                        })
                      }
                      className="block p-2.5 w-full text-sm   rounded-lg border bg-gray-600  border-gray-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Write language description here"
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  disabled={loading}
                  onClick={() =>
                    FormData?._id ? EditData(FormData._id) : AddLanguages()
                  }
                  className="text-white inline-flex items-center  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                >
                  {loading ? "Saving" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Language
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {language.length === 0 ? (
              <tr>
                <td colSpan={5} className="h-[60vh] text-center align-middle">
                  <div className="flex justify-center items-center h-full">
                    <Loading />
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {FilterData?.map((item) => (
                  <tr
                    key={item._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-200">
                        {item.language}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      {item.description}
                    </td>
                    <td className="px-6 py-4">
                      {format(new Date(item.createdAt), "MMM dd, yyyy HH:mm")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => showModel(item)}
                          className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                          title="Edit"
                        >
                          <FaEdit className="mr-1" />
                          <span>Edit</span>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => DeleteLanguage(item._id)}
                          className="flex items-center text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                          title="Delete"
                        >
                          <FaTrash className="mr-1" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Languages;
