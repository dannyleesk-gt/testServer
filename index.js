const express = require("express");
const bodyParserMiddleware = require("./middleware/bodyParser");

const app = express();
const PORT = process.env.PORT || 3000;

bodyParserMiddleware(app);

app.post("/debug", (req, res) => {
    console.log(123, req.body);
    res.status(200).json({ message: "success" });
});

app.get("/callback", (req, res) => {
    console.log(
        JSON.stringify({
            headers: req.headers,
            body: req.body,
            params: req.params,
            query: req.query
        })
    );
    res.status(200).json({ message: "success" });
});

app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
