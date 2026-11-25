const express = require("express");
const bodyParserMiddleware = require("./middleware/bodyParser");

const app = express();
const PORT = process.env.PORT || 3000;

bodyParserMiddleware(app);

app.post("/debug", (req, res) => {
    console.log(123, req.body);
    return res.status(200).json({ message: "success" });
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
    return res.status(200).json({ message: "success" });
});

app.get("/", (req, res) => {
    return res.status(200).json({ message: "Server is running" });
});

app.get("/.well-known", (req, res) => {
    console.log("jwks public keys retrieved");
    const publicKeys = {
        keys: [
            {
                alg: "ES256",
                crv: "P-256",
                kid: "aQPyZ72NM043E4KEioaHWzixt0owV99gC9kRK388WoQ",
                kty: "EC",
                use: "sig",
                x: "BXUWq0Z2RRFqrlWbW2muIybNnj_YBxflNQTEOg-QmCQ",
                y: "vXO4G4yDo0iOVJAzmEWyIZwXwnSnGxPIrZe7SX0PKu4"
            },
            {
                alg: "RS256",
                e: "AQAB",
                kid: "stg.consent.myinfo.gov.sg",
                kty: "RSA",
                n: "xgUXbIg6ijxsh4Dqc8ZklNhEJJvs2GS75T5cJMMnxVi53RS2d7GsSUviyIsbBYbp661E_WWdMfmwejFeeaO9M-AATiURTVsdcGzBqnYgtBcn6cGnd4mKUVY2TvuXrRwPSRKGkz6Bcb_pLXfJFQC_T-SO_z4uoNUfgdrdpbGhNmzEsLWaoLOeYG-37Akd2eJ0IuwXXWEezGdpQDFn-4ew5JurkZRoZdkb7ZmGunVxZyt0YSKXUDlE96rsocHjBrKaMAv7WEhvgTYctVrpG8ISD-b0wL79Vmx04PlmlFFfqT9E4z0HGO93JR8TaSOc6zag5sA9q6IDX3jykVCOt8gVHw",
                use: "sig",
                x5t: "mmATxVPTu2oOYsFIiYTkcva7TGg"
            },
            {
                alg: "RS256",
                e: "AQAB",
                kid: "x0zDLIC9yNRIXu3gW8nTQDOMNe7sKMAjQnZj3AWTW2U",
                kty: "RSA",
                n: "xgUXbIg6ijxsh4Dqc8ZklNhEJJvs2GS75T5cJMMnxVi53RS2d7GsSUviyIsbBYbp661E_WWdMfmwejFeeaO9M-AATiURTVsdcGzBqnYgtBcn6cGnd4mKUVY2TvuXrRwPSRKGkz6Bcb_pLXfJFQC_T-SO_z4uoNUfgdrdpbGhNmzEsLWaoLOeYG-37Akd2eJ0IuwXXWEezGdpQDFn-4ew5JurkZRoZdkb7ZmGunVxZyt0YSKXUDlE96rsocHjBrKaMAv7WEhvgTYctVrpG8ISD-b0wL79Vmx04PlmlFFfqT9E4z0HGO93JR8TaSOc6zag5sA9q6IDX3jykVCOt8gVHw",
                use: "sig",
                x5t: "mmATxVPTu2oOYsFIiYTkcva7TGg"
            },
            {
                alg: "ECDH-ES+A256KW",
                crv: "P-256",
                kid: "7TkyMajWBXRZ7iZfgyPPff2gL39h2XtfJDzcs5tcerM",
                kty: "EC",
                use: "enc",
                x: "NfIxJudBO1_XD4DnhkVKPonHux0LG12O3D-Z2NfsuEE",
                y: "2HG6eyJcEEBVZUp1YlF57LWMlAImySuN5wQceErmo98"
            }
        ]
    };
    return res.status(200).json(publicKeys);
});

app.use("/{*path}", (req, res) => {
    return res.status(404).json({ errorMessage: "no such path" });
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
