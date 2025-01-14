import { RequestHandler } from "express";
import GameModel from "../models/game"
import QuestionModel from "../models/question";
import createHttpError from "http-errors";
import mongoose, { Model, Types } from "mongoose";

// adding type RequestHandler allows express to infer types: req, res, next
// request handler that retrieves all games
export const getGames: RequestHandler = async (req, res, next) => {
    try {
        const games = await GameModel.find().exec(); // returns promise, executes find operation, (async aka takes time)
        res.status(200).json(games);
    } catch (error) {
        next(error);
    }
};

// request handler that retrieves a game by its game id
export const getGame: RequestHandler = async (req, res, next) => {
    const game_id = req.params.noteId;

    try {
        if (!mongoose.isValidObjectId(game_id)) {
            throw createHttpError(400, "Invalid Note ID.");
        }
        const game = await GameModel.findById(game_id).exec();

        if (!game) {
            throw createHttpError(404, "Note not found");
        }

        res.status(200).json(game);
    } catch (error) {
        next(error);
    }
};

interface CreateGameBody {
    title: string,
    description?: string,
    questions: string[],
    maxMembers?: number,
}

// request handler creates a new note
export const createGame: RequestHandler<unknown, unknown, CreateGameBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    let description = req.body.description;
    let questions = req.body.questions;
    let maxMembers = req.body.maxMembers;

    try {
        if (!title) {
            throw createHttpError(400, "Note must have a title");
        }

        if (!description) {
            description = "";
        }

        if (!questions) {
            questions = [];
        }

        if (!maxMembers) {
            maxMembers = 100;
        }

        const newGame = await GameModel.create({
            title: title,
            description: description,
            questions: questions,
            maxMembers: maxMembers
        }); // not a promise, dont need exec()

        res.status(201).json(newGame);
    } catch (error) {
        next(error);
    }
}

interface UpdateGameParams {
    gameId: string,
}

interface UpdateGameBody {
    title?: string,
    description?: string,
    maxMembers?: number,
    update?: [string, string][],
    delete?: string[],
    add?: string[],
}

// updates note
export const updateGame: RequestHandler<UpdateGameParams, unknown, UpdateGameBody, unknown> = async (req, res, next) => {
    const id = req.params.gameId;
    const newTitle = req.body.title;
    const newDescription = req.body.description;
    const newMaxMembers = req.body.maxMembers;
    const toUpdate = req.body.update;
    const toDelete = req.body.delete;
    const toAdd = req.body.add;

    try {
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid Note ID.");
        }

        const game = await GameModel.findById(id).exec();

        if (!game) {
            throw createHttpError(404, "Note not found");
        }

        // update games fields
        if (newTitle) game.title = newTitle;
        if (newDescription) game.description = newDescription;
        if (newMaxMembers) game.maxMembers = newMaxMembers;

        // update questions
        if (toUpdate) {
            for (let [key, value] of toUpdate) {
                QuestionModel.findByIdAndUpdate(
                    key,
                    { question: value },
                    { new: true }
                )
            }
        }

        // add questions
        if (toAdd) {
            for (let i = 0; i < toAdd.length; i++) {
                try {
                    // create question object in database
                    const question = await QuestionModel.create({
                        question: req.body.add[i],
                    });
                    // add question id to question list
                    game.questions.push(question._id.toString());

                } catch (error) {
                    next(error);
                };
            }
        }

        // delete questions
        if (toDelete) {
            for (let i = 0; i < toDelete.length; i++) {
                try {
                    // delete from database
                    await QuestionModel.findByIdAndDelete(toDelete[i]).exec();
                    // delete from questions list
                    const deleteIdx = game.questions.findIndex(question => question === toDelete[i]);
                    game.questions.splice(deleteIdx, 1);
                }
                catch (error) {
                    next(error);
                }
            }
        }

        const updatedGame = await game.save(); // updates game

        res.status(200).json(updatedGame);
    } catch (error) {
        next(error);
    }
}

// deletes game
export const deleteGame: RequestHandler<UpdateGameParams, unknown, unknown, unknown> = async (req, res, next) => {
    const id = req.params.gameId;

    try {
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid Game ID.");
        }

        const note = await GameModel.findById(id).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        await GameModel.findByIdAndDelete(id);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};