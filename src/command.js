import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
    newNote,
    getAllNotes,
    findNotes,
    removeNote,
    removeAllNotes,
} from "./notes.js";

const listNotes = (notes) => {
    notes.forEach((note) => {
        console.log("id: ", note.id);
        console.log("tags: ", note.tags.join(", "));
        console.log("note: ", note.content);
        console.log("\n");
    });
};

/**
 * CLI (Command-Line Interface) for managing notes using yargs.
 *
 * Available Commands:
 * - 'new <note>': Creates a new note with optional tags.
 * - 'all': Retrieves and displays all notes.
 * - 'find <filter>': Finds and displays notes matching a provided filter.
 * - 'remove <id>': Removes a note by specifying its ID.
 * - 'web [port]': Launches a website (placeholder functionality).
 * - 'clean': Removes all notes.
 *
 * Each command is associated with corresponding functions from the 'notes.js' module for note management.
 * Arguments and options are defined using yargs to capture user inputs from the command line.
 *
 * Usage:
 * Run the script from the command line with specific commands and options to manage notes interactively.
 */
yargs(hideBin(process.argv))
    .command(
        "new <note>",
        "create a new note",
        (yargs) => {
            return yargs.positional("note", {
                describe: "The content of the note you want to create",
                type: "string",
            });
        },
        async (argv) => {
            const tags = argv.tags ? argv.tags.split(",") : [];
            const note = await newNote(argv.note, tags);
            console.log("Note added!", note);
        }
    )
    .option("tags", {
        alias: "t",
        type: "string",
        description: "tags to add to the note",
    })
    .command(
        "all",
        "get all notes",
        () => {},
        async (argv) => {
            const notes = await getAllNotes();
            listNotes(notes);
        }
    )
    .command(
        "find <filter>",
        "get matching notes",
        (yargs) => {
            return yargs.positional("filter", {
                describe:
                    "The search term to filter notes by, will be applied to note.content",
                type: "string",
            });
        },
        async (argv) => {
            const matchedNotes = await findNotes(argv.filter);
            listNotes(matchedNotes);
        }
    )
    .command(
        "remove <id>",
        "remove a note by id",
        (yargs) => {
            return yargs.positional("id", {
                type: "number",
                description: "The id of the note you want to remove",
            });
        },
        async (argv) => {
            const id = await removeNote(argv.id);
            if (id) {
                console.log("Note removed: ", id);
            } else {
                console.log("Note not found");
            }
        }
    )
    .command(
        "web [port]",
        "launch website to see notes",
        (yargs) => {
            return yargs.positional("port", {
                describe: "port to bind on",
                default: 5000,
                type: "number",
            });
        },
        async (argv) => {}
    )
    .command(
        "clean",
        "remove all notes",
        () => {},
        async (argv) => {
            await removeAllNotes();
            console.log("All notes removed");
        }
    )
    .demandCommand(1)
    .parse();
