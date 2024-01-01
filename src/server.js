import fs from "node:fs/promises";
import http from "node:http";
// import open from 'open'

/**
 * Interpolates dynamic data into HTML template placeholders.
 *
 * @param {string} html - The HTML template containing placeholders.
 * @param {object} data - The data object used for substitution.
 * @returns {string} The HTML template with placeholders replaced by corresponding data values.
 *
 * This function replaces all instances of {{ placeholder }} in the HTML template
 * with corresponding values from the 'data' object. If a placeholder is not found
 * in the 'data' object, it's replaced with an empty string.
 */
const interpolate = (html, data) => {
    return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) => {
        return data[placeholder] || "";
    });
};

/**
 * Formats an array of notes into HTML structure.
 *
 * @param {Array<Object>} notes - An array of note objects to be formatted.
 * @returns {string} HTML structure representing formatted notes.
 *
 * This function maps each note to an HTML structure containing its content
 * and associated tags. The content and tags are placed within a 'note' div,
 * with tags represented as 'tag' spans inside a 'tags' div. The resulting
 * HTML structure is returned as a string.
 */
const formatNotes = (notes) => {
    return notes
        .map((note) => {
            return `
        <div class="note">
          <p>${note.content}</p>
          <div class="tags">
            ${note.tags
                .map((tag) => `<span class="tag">${tag}</span>`)
                .join("")}
          </div>
        </div>
      `;
        })
        .join("\n");
};
