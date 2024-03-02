import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
const SERVER_URL = "http://localhost:3000";

const Note = ({ id, text, date, handleDeleteNote, handleUpdateNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    handleUpdateNote(id, editedText);
    setIsEditing(false);
  };

  return (
    <div className="note" onClick={handleEditClick}>
      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <div id="textNotite">{text}</div>
      )}
      <div className="note-footer">
        <small>{date}</small>
        {isEditing ? (
          <button onClick={handleSaveClick} className="save">
            Save
          </button>
        ) : (
          <MdDeleteForever
            onClick={() => handleDeleteNote(id)}
            className="delete-icon"
            size="1.3em"
          />
        )}
      </div>
    </div>
  );
};

export default Note;
