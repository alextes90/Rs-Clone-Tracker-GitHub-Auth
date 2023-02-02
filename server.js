const CLIENT_ID = "1a86f6a854cfd5cffcec";
const CLIENT_SECRET = "dc21e6f0c87b744bb7280635700aef77afd51e4f";
const REDIRECT_URL = "http://localhost:3000/tracer";

const express = require("express");
const cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

//code being passed from frontend

app.get("/getAccessToken", async (req, res) => {
  req.query.code;
  const params =
    "?client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET +
    "&code=" +
    req.query.code +
    "&redirect_uri=" +
    REDIRECT_URL;

  const response = await fetch(
    "https://github.com/login/oauth/access_token" + params,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }
  );
  const data = await response.json();
  console.log(data);
  res.json(data);
});

//getUserData
app.get("getUserData", async (req, res) => {
  req.get("Authorization");
  const response = await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"),
    },
  });
  const data = await response.json();
  console.log(data);
  res.json(data);
});

app.listen(4000, () => {
  console.log("CORS server running om port 4000");
});
