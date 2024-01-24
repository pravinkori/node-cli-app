# Notes CLI (Command-Line Interface)

This is a command-line interface (CLI) for managing notes using yargs in Node.js. The application provides various commands to interact with notes, including creating new notes, retrieving all notes, finding notes based on a filter, removing a note by ID, launching a placeholder website to view notes, and cleaning (removing) all notes.

## Prerequisites

Before running the project, ensure that you have Node.js and npm (Node Package Manager) installed on your machine.

-   Node.js: [Download Node.js](https://nodejs.org/)
-   npm (comes with Node.js installation)

## Installation

1. Clone the repository or download the source code.

```bash
git clone https://github.com/pravinkori/node-cli-app.git
cd node-cli-app
```

2. Install project dependencies.

```bash
npm install
```

## Run the Project

The project includes a binary named "note" that can be executed from the command line. Use the following command to run the project:

```bash
sudo npm link
note <command> [options]
```

Replace `<command>` with one of the available commands (e.g., "new", "all", "find", "remove", "web", "clean") and provide any required options based on the chosen command.

## Available Commands

### 1. Create a New Note

```bash
note new <note> [--tags, -t]
```

-   `<note>`: The content of the note you want to create.
-   `--tags, -t`: Tags to add to the note (optional).

Example:

```bash
note new "Meeting at 3 PM" --tags work, important
```

### 2. Get All Notes

```bash
note all
```

### 3. Find Matching Notes

```bash
note find <filter>
```

-   `<filter>`: The search term to filter notes by, applied to `note.content`.

Example:

```bash
note find important
```

### 4. Remove a Note by ID

```bash
note remove <id>
```

-   `<id>`: The ID of the note you want to remove.

Example:

```bash
note remove 1
```

### 5. Remove All Notes

```bash
note clean
```

## Testing

To run tests, execute the following command:

```bash
npm test
```

This command uses Jest for testing. Jest will run the test suites and report the results.

## Additional Information

-   The project uses the "yargs" library for handling command-line arguments.
-   Jest is used for testing.
-   The project is written in ECMAScript modules (ESM) as indicated by the `"type": "module"` field in the `package.json` file.

## Notes Management Functions

The commands are associated with corresponding functions from the `notes.js` module for note management.

-   `newNote`: Creates a new note with optional tags.
-   `getAllNotes`: Retrieves all notes.
-   `findNotes`: Finds notes matching a provided filter.
-   `removeNote`: Removes a note by specifying its ID.
-   `removeAllNotes`: Removes all notes.

## Additional Information

-   The application uses the `yargs` library for handling command-line arguments.
-   The `server.js` module is used for launching a placeholder website (functionality not fully implemented).
-   The `utility.js` module includes a `listNotes` function for displaying notes.

Feel free to explore and manage your notes using this simple command-line interface!
