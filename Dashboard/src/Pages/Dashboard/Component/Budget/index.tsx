import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  GET_BUDGET_OPTIONS,
  CREATE_BUDGET_OPTION,
  UPDATE_BUDGET_OPTION,
  DELETE_BUDGET_OPTION,
} from "@api";
import apiClient from "@apiClient";
import { Loading } from "@component";

type OptionItem = {
  _id: string;
  value: string;
};

const Budget = () => {
  const [newValue, setNewValue] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");

  const queryClient = useQueryClient();

  const { data: budgets = [], isLoading } = useQuery<OptionItem[]>({
    queryKey: ["budget-options"],
    queryFn: async () => {
      const response = await apiClient.get(`${GET_BUDGET_OPTIONS}`, { withCredentials: true });
      return response.data.data ?? [];
    },
  });

  const handleAdd = async () => {
    if (!newValue.trim()) return;
    try {
      const res = await apiClient.post(`${CREATE_BUDGET_OPTION}`, { value: newValue.trim() }, { withCredentials: true });
      if (res.status === 200) {
        toast.success("Budget added");
        setNewValue("");
        queryClient.invalidateQueries({ queryKey: ["budget-options"] });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add");
    }
  };

  const startEdit = (item: OptionItem) => {
    setEditingId(item._id);
    setEditingValue(item.value);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingValue("");
  };

  const saveEdit = async (id: string) => {
    if (!editingValue.trim()) return;
    try {
      const res = await apiClient.put(`${UPDATE_BUDGET_OPTION}/${id}`, { value: editingValue.trim() }, { withCredentials: true });
      if (res.status === 200) {
        toast.success("Budget updated");
        cancelEdit();
        queryClient.invalidateQueries({ queryKey: ["budget-options"] });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this budget?")) return;
    try {
      const res = await apiClient.delete(`${DELETE_BUDGET_OPTION}/${id}`, { withCredentials: true });
      if (res.status === 200) {
        toast.success("Deleted");
        queryClient.invalidateQueries({ queryKey: ["budget-options"] });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 h-full">
      <h4 className="font-semibold mb-3">Budgets</h4>

      <div className="flex gap-2 mb-4">
        <input
          className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="New Budget"
        />
        <button onClick={handleAdd} className="px-4 py-2 bg-green-600 text-white rounded">
          <FaPlus />
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Loading />
        </div>
      ) : (
        <div className="space-y-2">
          {(budgets as OptionItem[]).map((item) => (
            <div key={item._id} className="bg-gray-700 rounded-lg p-3 border border-gray-600 text-white">
              {editingId === item._id ? (
                <div className="flex items-center gap-2">
                  <input className="flex-1 bg-gray-700 text-white border border-gray-600 rounded px-2 py-1" value={editingValue} onChange={(e) => setEditingValue(e.target.value)} />
                  <button onClick={() => saveEdit(item._id)} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium">
                    <FaSave />
                  </button>
                  <button onClick={cancelEdit} className="px-3 py-1 bg-gray-300 rounded">
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex-1">{item.value}</div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(item)} className="bg-yellow-300 px-3 py-1 rounded">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Budget;
