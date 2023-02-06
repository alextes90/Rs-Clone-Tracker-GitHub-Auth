require("dotenv").config();
const CLIENT_ID_LOCALHOST = process.env.CLIENT_ID_LOCALHOST;
const CLIENT_SECRET_LOCALHOST = process.env.CLIENT_SECRET_LOCALHOST;
const REDIRECT_URL_LOCALHOST = process.env.REDIRECT_URL_LOCALHOST;

const CLIENT_ID_NETLIFY = process.env.CLIENT_ID_NETLIFY;
const CLIENT_SECRET_NETLIFY = process.env.CLIENT_SECRET_NETLIFY;
const REDIRECT_URL_NETLIFY = process.env.REDIRECT_URL_NETLIFY;

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
  console.log(req.query.code);
  console.log(req.get("origin"));
  let params = "";
  if (req.get("origin").includes("local")) {
    params =
      "?client_id=" +
      CLIENT_ID_LOCALHOST +
      "&client_secret=" +
      CLIENT_SECRET_LOCALHOST +
      "&code=" +
      req.query.code +
      "&redirect_uri=" +
      REDIRECT_URL_LOCALHOST;
  } else {
    params =
      "?client_id=" +
      CLIENT_ID_NETLIFY +
      "&client_secret=" +
      CLIENT_SECRET_NETLIFY +
      "&code=" +
      req.query.code +
      "&redirect_uri=" +
      REDIRECT_URL_NETLIFY;
  }

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
  res.json(data);
});

//getUserData
app.get("/getUserData", async (req, res) => {
  console.log(req.get("Authorization"));
  const response = await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"),
    },
  });
  const data = await response.json();
  res.json(data);
});

app.listen(4000, () => {
  console.log("CORS server running om port 4000");
});
