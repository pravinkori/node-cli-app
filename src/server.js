import fs from "node:fs/promises";
import http from "node:http";

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
export const interpolate = (html, data) => {
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
export const formatNotes = (notes) => {
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

/**
 * Creates an HTTP server handling requests to display formatted notes as HTML.
 *
 * @param {Array<Object>} notes - An array of note objects to be displayed.
 * @returns {http.Server} An HTTP server instance.
 *
 * This function sets up an HTTP server that handles incoming requests and responds
 * by rendering a formatted HTML page containing the provided notes. It reads an
 * HTML template file, formats the notes into HTML using 'formatNotes', and
 * generates a response with the formatted HTML.
 */
export const createServer = (notes) => {
    return http.createServer(async (req, res) => {
        const HTML_PATH = new URL("./template.html", import.meta.url).pathname;
        const template = await fs.readFile(HTML_PATH, "utf-8");
        const html = interpolate(template, { notes: formatNotes(notes) });

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
    });
};

/**
 * Starts an HTTP server to display notes on a specified port.
 *
 * @param {Array<Object>} notes - An array of note objects to be displayed.
 * @param {number} port - The port on which the server will listen.
 *
 * This function initiates an HTTP server using 'createServer' to display notes
 * as HTML. It listens on the specified 'port' and logs a message indicating
 * the server's start-up with the provided port.
 */
export const start = (notes, port) => {
    const server = createServer(notes);
    server.listen(port, () => {
        console.log(`Server is listening on port http://localhost:${port}`);
    });
};
