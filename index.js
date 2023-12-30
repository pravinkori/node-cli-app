#!/usr/bin/env node

const note = process.argv[2];

const newNotes = {
    content: note,
    id: Date.now(),
};

console.log(newNotes);
