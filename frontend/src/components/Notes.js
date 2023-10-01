import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notecontext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  let navigate = useNavigate();
  const { notes, getNotes, editNote } = useContext(noteContext);
  console.log(notes);

  useEffect(() => {
   if(localStorage.getItem('token')){
    getNotes()
   }
   else{
    navigate("/login");
   }
   
    // eslint-disable-next-line
  }, [])

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag} )
  }

  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({id:"", etitle:"",edescription:"",etag:""})

  const handleEdit = () => {
    console.log("updating the note", note)
    refClose.current.click();
   editNote(note.id, note.etitle, note.edescription, note.etag);
   props.showAlert("Updated Successfully", "Success")
  }

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <AddNote showAlert ={props.showAlert} />

      {/* bootstrap modal for update note */}
      <button type="button" ref={ref} className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">title</label>
                  <input type="text" className="form-control" value={note.etitle} id="etitle" name='etitle' onChange={onchange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" value={note.edescription} id="edescription" name='edescription' onChange={onchange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" value={note.etag} id="etag" name='etag' onChange={onchange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleEdit} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      {/* --------------------------------------------------------------------- */}

      <div className="row my-3">
        <h2>Your Notes</h2>
       <div className="container mx-2">
         {notes.length === 0 && 'No Notes to Display'}
       </div>
        {
          notes.map((note) =>
            // pass props
            <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert = {props.showAlert} />
          )
        }
      </div>
    </>
  )
}

export default Notes
