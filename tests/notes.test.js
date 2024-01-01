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
