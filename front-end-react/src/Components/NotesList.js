import Note from "./Note";
import AddNote from "./AddNote";

const NotesList = ({
  notes,
  handleAddNote,
  handleDeleteNote,
  handleUpdateNote,
}) => {
  return (
    <div className="notes-list">
      {notes.map((note) => {
        const date = new Date(note.noteDate);
        const displayDate = date.toLocaleDateString();
        return (
          <Note
            id={note.noteId}
            title={note.noteTitle}
            text={note.noteBody}
            date={displayDate}
            handleDeleteNote={handleDeleteNote}
            handleUpdateNote={handleUpdateNote} // adaugă această linie
          />
        );
      })}
      <AddNote handleAddNote={handleAddNote} />
    </div>
  );
};

export default NotesList;
