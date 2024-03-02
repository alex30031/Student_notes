import express from "express";
import * as notesController from "../controllers/notes.js";
export const router = express.Router();

router.get("/", notesController.getNotes);
router.post("/", notesController.createNote);
router.delete("/:noteId", notesController.deleteNote);
router.put("/:noteId", notesController.updateNote); // adaugă această linie
