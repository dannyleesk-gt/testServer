const bodyParser = require("body-parser");

function bodyParserMiddleware(app) {
    app.use((req, res, next) => {
        bodyParser.json()(req, res, (err) => {
            if (err) {
                console.log("invalid json", err);
                return res.status(400).json({ error: "Invalid JSON body" });
            }
            next();
        });
    });
    app.use((req, res, next) => {
        bodyParser.urlencoded({ extended: true })(req, res, (err) => {
            if (err) {
                console.log("invalid url encoding");
                return res
                    .status(400)
                    .json({ error: "Invalid URL-encoded body" });
            }
            next();
        });
    });
}

module.exports = bodyParserMiddleware;
