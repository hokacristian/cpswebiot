const express = require("express");
const app = express();
const axios = require("axios");
const port = 8080;

app.set("view engine", "ejs");

let config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "https://platform.antares.id:8443/~/antares-cse/antares-id/TheEnergySaver/SuhuRuangan/la",
  headers: {
    "X-M2M-Origin": "06251d8f7ec63bae:da03676e705d0152",
    "Content-Type": "application/json;ty=4",
    Accept: "application/json",
  },
};

app.get("/", (req, res) => {
  axios
    .request(config)
    .then((response) => {
      const data = JSON.parse(response.data["m2m:cin"].con);
      res.render("index", { data: data });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

app.listen(port, () => {
  console.log(`Aplikasi sudah berjalan yaa!!!`);
});
