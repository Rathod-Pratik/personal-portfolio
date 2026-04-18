import { useState, useEffect } from "react";
import { GET_NOTES } from "../../Utils/Constant";
import { apiClient } from "../../lib/api-Client";
import Card from "../../Component/Note/Notes";
import { useAppStore } from "../../store";
import { toast } from "react-toastify";
import Loading from "../../Component/Loading/Loading";

const Note = () => {
  const { Note, setNote } = useAppStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadNotes = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(GET_NOTES);
        if (!isMounted) {
          return;
        }

        if (response.status === 200) {
          console.log(response.data.data);
          setNote(response.data.data);
        }
      } catch (error) {
        console.error(error);
        toast.error("Some error occurred, try again later.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadNotes();

    return () => {
      isMounted = false;
    };
  }, [setNote]);

  return (
    <div className="min-h-screen flex flex-col py-4">
      <h2 className="text-3xl font-bold text-center my-6 sm:hidden">Notes</h2>
      {loading && <Loading />}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center 2xl:grid-cols-4 gap-4 sm:gap-6 w-full m-auto px-2 sm:px-4">
        {Note.map((item, index) => (
          <div key={index} className="w-full flex justify-center">
            <Card item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Note;
