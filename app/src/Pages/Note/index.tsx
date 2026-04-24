import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { GET_NOTES } from "@api";
import { apiClient } from "@apiClient";
import { toast } from "react-toastify";
import {Loading} from '@component'
import Card from "./Component";
import type { NoteItem } from "@Type";

const Note = () => {
  const notesQuery = useQuery<NoteItem[]>({
    queryKey: ["notes"],
    queryFn: async () => {
      const response = await apiClient.get(GET_NOTES);
      return response.data.data;
    },
  });

  const notes = notesQuery.data ?? [];

  useEffect(() => {
    if (notesQuery.isError) {
      console.error(notesQuery.error);
      toast.error("Some error occurred, try again later.");
    }
  }, [notesQuery.isError, notesQuery.error]);

  return (
    <div className="min-h-screen flex flex-col py-4">
      <h2 className="text-3xl font-bold text-center my-6 sm:hidden">Notes</h2>
      {notesQuery.isLoading && <Loading />}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 sm:gap-6 w-full px-2 sm:px-4">
        {notes.map((item, index) => (
          <div key={item._id || index} className="w-full">
            <Card item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Note;
