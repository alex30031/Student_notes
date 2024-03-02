import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotesList from "../Components/NotesList";
import "./HomePage.css";
import Search from "../Components/Search";
import { nanoid } from "nanoid";

const SERVER_URL = "http://localhost:3000";

const HomePage = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const getNotes = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/notes`);
      setNotes(response.data.records);
    } catch (error) {
      console.error(
        "Eroare la luare notita:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const [searchText, setSearchText] = useState("");

  const addNote = async (text) => {
    const date = new Date();
    const newNote = {
      userId: 1, // trebuie să înlocuiești aceasta cu ID-ul utilizatorului actual
      noteTitle: "Titlu notiță", // trebuie să înlocuiești aceasta cu titlul notiței
      noteBody: text,
      noteDate: date.toISOString(), // folosește metoda toISOString pentru a obține data și ora curentă
      noteStatus: "active", // presupunând că 'active' este o valoare validă pentru noteStatus
    };
    try {
      const response = await axios.post(`${SERVER_URL}/notes`, newNote);
      setNotes([...notes, { ...newNote, noteId: response.data.noteId }]);
    } catch (error) {
      console.error(
        "Eroare la adăugarea notiței:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${SERVER_URL}/notes/${id}`);
      const newNotes = notes.filter((note) => note.noteId !== id);
      setNotes(newNotes);
    } catch (error) {
      console.error(
        "Eroare la ștergerea notiței:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const handleLogout = () => {
    navigate("/");
  };

  const updateNote = async (id, newValue) => {
    try {
      await axios.put(`${SERVER_URL}/notes/${id}`, { noteBody: newValue });
      const newNotes = notes.map((note) =>
        note.noteId === id ? { ...note, noteBody: newValue } : note
      );
      setNotes(newNotes);
      refreshPage();
    } catch (error) {
      console.error(
        "Eroare la actualizarea notiței:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="container-note">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Search handleSearchNote={setSearchText} />
        <button onClick={handleLogout} className="logout">
          Logout
        </button>
      </div>

      <NotesList
        notes={notes.filter((note) =>
          note.noteBody.toLowerCase().includes(searchText)
        )}
        handleAddNote={addNote}
        handleDeleteNote={deleteNote}
        handleUpdateNote={updateNote}
      />
    </div>
  );
};

export default HomePage;
