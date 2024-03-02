import express from "express";
import { Op } from "sequelize";
import { Note } from "../models/notes.js";
import cors from "cors";

const app = express();

export const getNotes = async (req, res) => {
  const titleQuery = req.query.title;
  const where = titleQuery
    ? { noteTitle: { [Op.like]: `%${titleQuery}%` } }
    : {};
  const notesList = await Note.findAll({ where: where });
  res.status(200).send({ records: notesList });
};

export const getNoteById = async (req, res) => {
  const noteId = req.params.noteId;
  const note = await Note.findOne({ where: { noteId: noteId } });
  if (note) {
    res.status(200).send(note);
  } else {
    res
      .status(404)
      .send({ message: `Nu am găsit nicio notă cu id-ul ${noteId}.` });
  }
};

export const createNote = async (req, res) => {
  const note = req.body;
  await Note.create(note);
  res
    .status(201)
    .send({ message: `Nota cu id-ul ${note.noteId} a fost creată.` });
};

export const updateNote = async (req, res) => {
  const noteId = req.params.noteId;
  const note = req.body;
  const updatedNote = await Note.update(note, { where: { noteId: noteId } });
  if (updatedNote) {
    res
      .status(200)
      .send({ message: `Nota cu id-ul ${noteId} a fost actualizată.` });
  } else {
    res
      .status(404)
      .send({ message: `Nu am găsit nicio notă cu id-ul ${noteId}.` });
  }
};

export const deleteNote = async (req, res) => {
  const noteId = req.params.noteId;
  const deletedNote = await Note.destroy({ where: { noteId: noteId } });
  if (deletedNote) {
    res.status(200).send({ message: `Nota a fost ștearsă.` });
  } else {
    res
      .status(404)
      .send({ message: `Nu am găsit nicio notă cu id-ul ${noteId}.` });
  }
};
