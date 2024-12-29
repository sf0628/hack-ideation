import { RequestHandler } from "express";
import NoteModel from "../models/note"
import createHttpError from "http-errors";
import mongoose from "mongoose";

// adding type RequestHandler allows express to infer types: req, res, next
// request handler that retrieves all notes
export const getNotes: RequestHandler = async (req, res, next) => {
    try {
        const notes = await NoteModel.find().exec(); // returns promise, executes find operation, (async aka takes time)
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};

// request handler that retrieves a note by its note id
export const getNote: RequestHandler = async (req, res, next) => {
    const id = req.params.noteId;

    try {
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid Note ID.");
        }
        const note = await NoteModel.findById(id).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

interface CreateNoteBody {
    title?: string,
    text?: string,
}

// request handler creates a new note
export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    try {
        if (!title) {
            throw createHttpError(400, "Note must have a title");
        }

        const newNode = await NoteModel.create({
            title: title,
            text: text,
        }); // not a promise, dont need exec()

        res.status(201).json(newNode);
    } catch (error) {
        next(error);
    }
}

interface UpdateNodeParams {
    noteId: string,
}

interface UpdateNodeBody {
    title?: string,
    text?: string,
}

// updates note
export const updateNote: RequestHandler<UpdateNodeParams, unknown, UpdateNodeBody, unknown> = async (req, res, next) => {
    const id = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;

    try {
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid Note ID.");
        }

        if (!newTitle) {
            throw createHttpError(400, "Note must have a title");
        }
        
        const note = await NoteModel.findById(id).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        note.title = newTitle;
        note.text = newText;

        const updatedNote = await note.save(); // updates note

        res.status(200).json(updatedNote);

    } catch (error) {
        next(error);
    }
}

// deletes note
export const deleteNote: RequestHandler = async (req, res, next) => {
    const id = req.params.noteId;

    try {
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid Note ID.");
        }

        const note = await NoteModel.findById(id).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        await NoteModel.findByIdAndDelete(id);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};