import { Question } from "./question";

export interface Game {
    _id: string
    title: string,
    description?: string,
    questions: Question[],
    maxMembers: number,
    createdAt: string,
    updatedAt: string,
}