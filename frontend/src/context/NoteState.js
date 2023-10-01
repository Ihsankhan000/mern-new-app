import React, { useState } from "react";
import NoteContext from "./notecontext";
const host = 'http://localhost:4000';

const NoteState = (props) => {
const notesInitial = []
   const [notes, setNotes] = useState(notesInitial)

   // Get all Note
   const getNotes = async () => {
   // API CALL
   const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET',
    headers:{ 'Content-Type': 'application/json',
    "auth-token":localStorage.getItem('token')
  }
   });
   // to get only exact json
   const json = await response.json();  
   setNotes(json);
     
   }



   // Add a Note
   const addNote =async (title, description, tag) => {
   // API CALL
   const response = await fetch(`${host}/api/notes/addnote`, {
    method: 'POST',
    headers:{ 'Content-Type': 'application/json',
    "auth-token":localStorage.getItem('token')
  },
  // convert json into string and send in body.
  body: JSON.stringify({title, description, tag})
   });
   const note = await response.json();
   setNotes(notes.concat(note)); 
   }


   // Delete a Note
   const deleteNote = async (id) => {
     // API CALL..
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
          }
      });
  
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
   
      // Rest of the code...
  
      const json = await response.json()
      console.log("response json", json)
  } catch (error) {
      console.error('Error during fetch:', error);
  }
  
    const newNotes = notes.filter((note) =>{ return note._id!==id })
    setNotes(newNotes);

   }

   // Edit a Note
   const editNote =async (id, title, description, tag) => {
    //API CALL
   const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: 'PUT',
    headers:{ 'Content-Type': 'application/json',
    "auth-token":localStorage.getItem('token')
  },
  body: JSON.stringify({title, description, tag})
   });
   if(!response.ok){
    throw new Error(
      'Network error encountered'
    )
   }
   const json =await response.json();
   console.log(json)
    
   const newNote = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client side
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if(element._id === id){
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
     setNotes(newNote)
   }

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;