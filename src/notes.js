import { insert, getDB, saveDB } from "./db.js";

/**
 * Creates a new note with specified content and tags, then inserts it into the database.
 *
 * @async
 * @function newNote
 * @param {string} note - The content of the new note.
 * @param {string[]} tags - An array of tags associated with the new note.
 * @returns {Promise<Object>} A Promise that resolves to the newly created note object.
 */
export const newNote = async (note, tags) => {
    const data = {
        tags,
        content: note,
        id: Date.now(),
    };
    await insert(data);
    return data;
};

/**
 * Retrieves all notes from the database.
 *
 * @async
 * @function getAllNotes
 * @returns {Promise<Array<Object>>} A Promise that resolves to an array containing all notes from the database.
 */
export const getAllNotes = async () => {
    const db = await getDB();
    return db.notes;
};

/**
 * Finds notes in the database based on a provided filter string.
 *
 * @async
 * @function findNotes
 * @param {string} filter - The filter string to search for within note contents.
 * @returns {Promise<Array<Object>>} A Promise that resolves to an array containing notes matching the filter criteria.
 */
export const findNotes = async (filter) => {
    const { notes } = await getAllNotes();
    return notes.filter((note) =>
        note.content.toLowerCase().includes(filter.toLowerCase())
    );
};

/**
 * Removes a note from the database based on its ID.
 *
 * @async
 * @function removeNote
 * @param {number} id - The ID of the note to be removed from the database.
 * @returns {Promise<number|undefined>} A Promise that resolves to the ID of the removed note, or undefined if the note with the specified ID is not found.
 */
export const removeNote = async (id) => {
    const { notes } = await getAllNotes();
    const match = notes.find((note) => note.id === id);

    if (match) {
        const newNotes = notes.filter((note) => note.id !== id);
        await saveDB({ notes: newNotes });
        return id;
    }
};

/**
 * Removes all notes from the database.
 *
 * @async
 * @function removeAllNotes
 */
export const removeAllNotes = () => saveDB({ notes: [] });
