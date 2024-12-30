import { Note as NoteModel } from "../models/notes";

interface NoteProps {
    note: NoteModel,
}

function Note({ note }: NoteProps) {
    const {
        title,
        text,
        createdAt,
        updatedAt,
    } = note;

    return (
        JSON.stringify(note)
    )
}

export default Note;