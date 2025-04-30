import React, { useEffect, useState } from "react";
import { apiClient } from "../../lib/api-Client";
import { DELETE_CONTACT, GET_CONTACT } from "../../Utils/Constant";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const [FilterData, SetFilterData] = useState([]);
  const navigate = useNavigate();
  const [contact, SetContact] = useState();

  const FetchContact = async () => {
    try {
      const response = await apiClient.get(GET_CONTACT, {
        withCredentials: true,
      });

      if (response.status == 200) {
        SetContact(response.data.data);
        SetFilterData(response.data.data);
      }
      if (response.data.success == false) {
        toast.success("Please login again")
        return navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      console.log(error);
      toast.error("Some error occured while fetching contacts");
    }
  };
  useEffect(() => {
    FetchContact();
  }, []);

  const filterSearch = (searchValue) => {
    const lowerValue = searchValue.toLowerCase();
    if (!lowerValue) {
      SetFilterData(contact);
    } else {
      const filtered = contact.filter((item) =>
        item.name.toLowerCase().includes(lowerValue)
      );
      SetFilterData(filtered);
    }
  };
  const DeleteContact = async (_id) => {
    try {
      const response = await apiClient.delete(`${DELETE_CONTACT}/${_id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success("Contact Deleted successfully");
        SetFilterData((prev) => prev.filter((item) => item._id !== _id));
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      console.log(error);
      toast.error("Some error occured while fetching contacts");
    }
  };
  return (
    <div>
      <div className="flex justify-evenly gap-3 py-5">
        <input
          onChange={(e) => filterSearch(e.target.value)}
          className="border-2 text-gray-500 outline-none rounded-md px-4 py-2 w-[90%]"
          type="text"
          placeholder="Search Contacts"
        />
        <button className="text-white bg-blue-500 px-5 cursor-pointer py-2 rounded-md">
          new
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Mobile</th>
              <th className="py-2 px-4">Message</th>
              <th className="py-2 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {FilterData.length > 0 ? (
              FilterData.map((contact, index) => (
                <tr
                  key={contact._id}
                  className="text-gray-300 hover:bg-gray-700"
                >
                  <td className="py-2 px-4 text-center">{index + 1}</td>
                  <td className="py-2 px-4">{contact.name}</td>
                  <td className="py-2 px-4">{contact.email}</td>
                  <td className="py-2 px-4">{contact.mobile}</td>
                  <td className="py-2 px-4">{contact.message}</td>
                  <td className="py-2 px-4 text-center">
                    {/* ✅ Delete Button */}
                    <button
                      onClick={() => DeleteContact(contact._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-400">
                  No contacts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactUs;
