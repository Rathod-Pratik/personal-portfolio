import React,{useState,useEffect} from 'react'
import { FETCH_PDF, GET_NOTES } from '../../Utils/Constant';
import { apiClient } from '../../lib/api-Client';
import Card from '../../Component/Note/Notes';
import { useAppStore } from '../../store';

const Note = () => {
    const {Note,setNote}=useAppStore();

    useEffect(() => {
     const FetchNote = async () => {
      if(Note) return
       try {
         const response = await apiClient.get(GET_NOTES);
         if (response.status === 200) {
          setNote(response.data.data); // Set notes to global store
         }
       } catch (error) {
         console.error(error);
         toast.error("Some error occurred, try again later.");
       }
     };
     FetchNote();
    }, []);

  return (
    <div className="min-h-screen flex flex-col py-4">
    {/* Main Content */}
    <h2 className="flex text-5xl justify-center font-bold">Notes</h2>
    {Note ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center 2xl:grid-cols-4 gap-6 w-full m-auto mt-5">
        {Note.map((item, index) => (
          <div key={index}>
            <Card  item={item} />
          </div>
        ))}
      </div>
    ) : (
      <div className="flex-grow"></div>
    )}
  </div>
  )
}

export default Note
