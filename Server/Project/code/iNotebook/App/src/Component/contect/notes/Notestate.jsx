import { useState } from "react";
import NoteContext from "./noteContect"; // Correct the typo here

const NoteState = (props) => {
  const noteinitial=[];
  const [notes, setNotes] = useState(noteinitial); // Notice capitalization in setNotes
  const host ="https://inotebookbackend-ten.vercel.app"
  //get all notes
  const getnotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
  
      const json = await response.json(); // Make sure to await the response
  
      setNotes(json); // Update the notes state

    } catch (error) {

      console.error('Error fetching notes:', error);
    }
  };
  

  //Add a note
  const addNote=async(title,description,tag)=>{
    
    const response=await fetch(`${host}/api/notes/addnotes`,{
      method:'POST',
      headers:{
        'content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
    });

    const note=await response.json();
    setNotes(notes.concat(note));
    props.showAlert("Note Added successfuly","text-green-800","bg-green-50");
  }
  //edit a note
  const editNote=async(id,title,description,tag)=>{
    
    const response=await fetch(`${host}/api/notes/updatenode/${id}`,{
      method:'PUT',
      headers:{
        'content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
    });

    const json= response.json();
    let newNotes = JSON.parse(JSON.stringify(notes))
    //logic to edit in client
    for(let index=0; index<newNotes.length; index++){
      const element =newNotes[index];

      if(element._id===id){
        element.title=title;
        element.description=description;
        element.tag=tag

        break;
      }
    }
    props.showAlert("Note updated successfuly","text-green-800","bg-green-50");
    setNotes(newNotes);
  }
  //delete a note
  const deleteNode = async (id) => {
    
    // Optimistically remove the note from UI (update state first)
    const newNotes = notes.filter((note) => note._id !== id);
    const previousNotes = notes; // Save the current state in case we need to rollback
    setNotes(newNotes); // Update the state immediately to reflect the deletion
  
    try {
      // Send DELETE request to the server
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token') // Add your token here
        },
      });
  
      const json = await response.json();
      // If the delete operation fails (status is not 200), restore the original notes
      if (response.status !== 200) {
        setNotes(previousNotes); // Roll back to previous state
      }

    } catch (error) {
      setNotes(previousNotes); // Roll back to previous state in case of failure

    }
    props.showAlert("Delete note successfully","text-green-800","bg-green-50")
  };
  
  return (
    <NoteContext.Provider value={{ notes,editNote, setNotes,addNote,deleteNode,getnotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
