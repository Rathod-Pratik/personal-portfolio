import React, { useEffect } from "react";
import { useContext } from "react";
import contextValue from "./contect/notes/noteContect";
import NoteItem from "./NoteItem";
import AddNote from "./addNote";
import { useRef,useState } from "react";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  let navigation=useNavigate();
  const context = useContext(contextValue);
  const { notes, getnotes,editNote } = context;

  const [note, setNote] = useState({
    id:"",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const handleClick = (e) => {
    editNote(note.id,note.etitle,note.edescription,note.etag)
    setIsOpen(!isOpen);
    e.preventDefault();
  };
  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
}

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null); // Create a reference for the button

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const updatenote = (CurrentNote) => {
    ref.current.click(); // This will trigger the button click
    setNote({
      id:CurrentNote._id,
      edescription:CurrentNote.description,
      etag:CurrentNote.tag,
      etitle:CurrentNote.title
    });
  };

  useEffect(() => {
    if(localStorage.getItem('token')){
      getnotes();
    }
    else{
      navigation('/login');
    }
  }, []);
  const value = localStorage.getItem('name');
  return (
    <>
    <h1 className="text-white text-center mt-8 text-3xl">Account: {`${value}`}</h1>
      <AddNote/>
      <div>
        <h2 className="text-white text-center text-5xl pb-7">your notes</h2>

        <div className=" w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
  {notes.map((note) => {
    return (
      <NoteItem
        note={note}
        title={note.title}
        updatenote={updatenote}
        key={note._id}
        id={note._id}
        tag={note.tag}
        description={note.description}
      />
    );
  })}
</div>

      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-40"></div>
      )}
      <button 
      ref={ref}
        onClick={toggleModal} 
        className="hidden" 
        type="button"
      >
        Toggle modal
      </button>

      {/* Main modal */}
      {isOpen && (
        <div 
          id="crud-modal" 
          tabIndex="-1" 
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="m-auto relative p-4 w-full max-w-[30rem] mt-12 max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Edit your note
                </h3>
                <button 
                  type="button"  
                  onClick={toggleModal} 
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label htmlFor="etitle"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input onChange={onChange} type="text" name="etitle" id="etitle" value={note.etitle} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required={true} />
                  </div>
                  <div className="col-span-2 sm:col-span-2">
                    <label htmlFor="etag" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tag</label>
                    <input onChange={onChange} type="text" name="etag" id="etag" value={note.etag} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="etag" required={true} />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="edescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea onChange={onChange} id="edescription" name="edescription" value={note.edescription}  rows="6"  className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write edescription here" required={true}></textarea>
                  </div>
                </div>
                <button onClick={handleClick} type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

                  Edit note
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notes;
