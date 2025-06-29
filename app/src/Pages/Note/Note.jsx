import {useEffect} from 'react'
import { GET_NOTES } from '../../Utils/Constant';
import { apiClient } from '../../lib/api-Client';
import Card from '../../Component/Note/Notes';
import { useAppStore } from '../../store';
import { toast } from 'react-toastify';
import Loading from '../../Component/Loading/Loading';

const Note = () => {
    const {Note,setNote}=useAppStore();

    useEffect(() => {
const FetchNote = async () => {
  if (Note.length > 1) return;
  let attempts = 0;
  while (attempts < 2) {
    try {
      const response = await apiClient.get(GET_NOTES);
      if (response.status === 200) {
        setNote(response.data.data);
        return;
      }
    } catch (error) {
      attempts += 1;
      if (attempts === 2) {
        console.error(error);
        toast.error("Some error occurred, try again later.");
      }
    }
  }
};
     FetchNote();
    }, []);

  return (
    <div className="min-h-screen flex flex-col py-4">
    {/* Main Content */}
    <h2 className="flex text-5xl justify-center font-bold">Notes</h2>
    {Note.length === 0 ? (
      <div className="flex justify-center items-center h-[80vh]">
        <Loading/>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center 2xl:grid-cols-4 gap-6 w-full m-auto mt-5">
        {Note.map((item, index) => (
          <div key={index}>
            <Card  item={item} />
          </div>
        ))}
      </div>
    )}
  </div>
  )
}

export default Note
