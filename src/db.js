import fs from "node:fs/promises";

const DATABASE_PATH = new URL("../db.json", import.meta.url).pathname;

/**
 * Retrieves data from a specified file assumed to be in JSON format.
 * The fs.readFile function reads the file specified by DATABASE_PATH using "utf-8" encoding.
 * The await keyword pauses the execution of the function until the file reading operation is complete,
 * and the file content is stored in the variable 'db'.
 * The content of the file 'db' is assumed to be in JSON format, as the code uses JSON.parse to convert it
 * from a string to a JavaScript object.
 * @async
 * @function getDB
 * @returns {Promise<Object>} A Promise that resolves to the JSON parsed content of the file.
 */
export const getDB = async () => {
    const db = await fs.readFile(DATABASE_PATH, "utf-8");
    return JSON.parse(db);
};

/**
 * Saves data to a specified file in JSON format.
 *
 * @async
 * @function saveDB
 * @param {Object} db - The data to be saved to the file as a JavaScript object.
 * @returns {Promise<Object>} A Promise that resolves to the data that was saved.
 * @throws {Error} If an error occurs during file writing or JSON stringification.
 */
export const saveDB = async (db) => {
    await fs.writeFile(DATABASE_PATH, JSON.stringify(db, null, 2));
    return db;
};

/**
 * Inserts new data into the database.
 *
 * @async
 * @function insert
 * @param {Object} data - The data to be inserted into the database.
 * @returns {Promise<Object>} A Promise that resolves to the inserted data.
 * @throws {Error} If there is an error retrieving or saving data in the database.
 */
export const insert = async (data) => {
    const db = await getDB();
    db.notes.push(data);
    await saveDB(db);
    return data;
};
