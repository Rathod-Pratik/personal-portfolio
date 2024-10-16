import { useContext } from "react";
import contextValue from "./contect/notes/noteContect";
import { useState } from "react";

const addNote = () => {
  const context = useContext(contextValue);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    })
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div>
      <section className="bg-transparent">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[60vh] lg:py-0 my-4 sm:my-8">
    <div className="w-full max-w-md bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Add your Notes
        </h1>
        <form className="space-y-4 md:space-y-6" action="#">
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              minLength={5}
              onChange={onChange}
              type="text"
              name="title"
              id="title"
              value={note.title}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="title"
              required={true}
            />
          </div>
          <div>
            <label
              htmlFor="tag"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tag
            </label>
            <input
              onChange={onChange}
              type="text"
              name="tag"
              id="tag"
              value={note.tag}
              placeholder="Enter a tag"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required={true}
              minLength={5}
            />
          </div>
          
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              value={note.description}
              minLength={5}
              onChange={onChange}
              name="description"
              rows="6"
              id="description"
              placeholder="desc"
              className="resize-none bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required={true}
            >
            </textarea>
          </div>
          {/* <div className="col-span-2">
                    <label htmlFor="edescription" className="resize-none block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea onChange={onChange} id="edescription" name="edescription" value={note.edescription}  rows="9"  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write edescription here" required={true}></textarea>
                  </div> */}
          <button
            type="submit"
            onClick={handleClick}
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Add notes
          </button>
        </form>
      </div>
    </div>
  </div>
</section>

      </div>
    </>
  );
};

export default addNote;
