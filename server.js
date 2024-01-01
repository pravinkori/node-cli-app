import http from "node:http";

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-type", "text/plain");
    res.end("Hello! Welcome to server");
});

server.listen(3000, () => {
    console.log("Server is up on port http://localhost:3000");
});
