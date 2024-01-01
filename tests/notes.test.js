import { jest } from "@jest/globals";

// Jest Testing Setup
// Mocks functions from the '../src/db.js' module using jest.unstable_mockModule to isolate the 'notes' module for testing purposes.
jest.unstable_mockModule("../src/db.js", () => ({
    insert: jest.fn(),
    getDB: jest.fn(),
    saveDB: jest.fn(),
}));

// Dynamically imports specific functions ('insert', 'getDB', 'saveDB', 'newNote', 'getAllNotes', 'removeNote') from the 'db' and 'notes' modules for testing.
const { insert, getDB, saveDB } = await import("../src/db.js");
const { newNote, getAllNotes, removeNote } = await import("../src/notes.js");

// Resets the mocked functions' states before each test using beforeEach and mockClear to ensure a clean testing environment without interference between test cases.
beforeEach(() => {
    insert.mockClear();
    getDB.mockClear();
    saveDB.mockClear();
});

/**
 * Test case for 'newNote' function:
 *
 * Test scenario:
 * 1. Sets up a test note content and tags.
 * 2. Defines an expected 'data' object to simulate the structure after insertion into the database.
 * 3. Mocks the 'insert' function to simulate its behavior, resolving with the provided 'data'.
 * 4. Invokes the 'newNote' function with the test note content and tags.
 * 5. Asserts that the returned result from 'newNote' matches the expected 'data' structure after insertion.
 *
 * This test ensures that 'newNote' correctly inserts data into the database and returns the inserted data.
 */
test("newNote inserts data and returns it", async () => {
    const note = "Test note";
    const tags = ["tag1", "tag2"];
    const data = {
        tags,
        content: note,
        id: Date.now(),
    };
    insert.mockResolvedValue(data);

    const result = await newNote(data.content, data.tags);
    expect(result.content).toEqual(data.content);
    expect(result.tags).toEqual(data.tags);
});

/**
 * Test case for 'getAllNotes' function:
 *
 * Test scenario:
 * 1. Sets up a mock database object containing an array of notes.
 * 2. Mocks the 'getDB' function to simulate its behavior, resolving with the provided mock database.
 * 3. Invokes the 'getAllNotes' function to retrieve all notes from the database.
 * 4. Asserts that the returned result from 'getAllNotes' matches the array of notes present in the mock database.
 *
 * This test ensures that 'getAllNotes' correctly retrieves and returns all notes from the database.
 */
test("getAllNotes returns all notes", async () => {
    const db = {
        notes: ["note1", "note2", "note3"],
    };
    getDB.mockResolvedValue(db);

    const result = await getAllNotes();
    expect(result).toEqual(db.notes);
});

/**
 * Test case for 'removeNote' function when ID is not found:
 *
 * Test scenario:
 * 1. Sets up a mock array of notes with different IDs.
 * 2. Mocks the 'saveDB' function to simulate its behavior, resolving with the provided mock notes array.
 * 3. Calls the 'removeNote' function with an ID that does not exist in the mock notes array.
 * 4. Asserts that 'removeNote' does nothing and returns 'undefined' when the specified ID is not found.
 *
 * This test ensures that 'removeNote' gracefully handles the scenario when attempting to remove a note with an ID that does not exist in the database.
 */
test("removeNote does nothing if id is not found", async () => {
    const notes = [
        { id: 1, content: "note 1" },
        { id: 2, content: "note 2" },
        { id: 3, content: "note 3" },
    ];
    saveDB.mockResolvedValue(notes);

    const idToRemove = 4;
    const result = await removeNote(idToRemove);
    expect(result).toBeUndefined();
});
