const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.json()); // IMPORTANT to read json as string

app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});

app.use("/public", express.static(`${__dirname}/../frontend/public`));

app.get("/beers", (req, res) => {
  fs.readFile(`${__dirname}/data/data.json`, (err, data) => {
    if (err) {
      console.log("hiba:", err);
      res.status(500).send("hibavan");
    } else {
      res.status(200).send(JSON.parse(data));
    }
  });
});

app.get("/beers/:id", (req, res) => {
  const paramId = parseInt(req.params.id);
  let response = "beer does not exist";

  fs.readFile(`${__dirname}/data/data.json`, (err, data) => {
    if (err) {
      console.log("hiba:", err);
      return res.status(500).send("error reading file");
    } else {
      const beersData = JSON.parse(data);
      beersData.forEach((beer) => {
        if (beer.id === paramId) {
          response = beer;
        }
      });
      return res.send(response);
    }
  });
});

app.post("/beers/:id", (req, res) => {
  const paramId = parseInt(req.params.id);
  const newBeerData = req.body;

  fs.readFile(`${__dirname}/data/data.json`, (err, data) => {
    if (err) {
      console.log("error:", err);
      return res.status(500).send(err);
    } else {
      const beersData = JSON.parse(data);

      for (let i = 0; i < beersData.length; i++) {
        if (beersData[i].id === paramId) {
          beersData[i] = newBeerData;
        }
      }

      fs.writeFile(
        `${__dirname}/data/data.json`,
        JSON.stringify(beersData, null, 2),
        (err) => {
          if (err) {
            console.log("error", err);
            return res.status(500).send(err);
          } else {
            return res.send({ response: "done" });
          }
        }
      );
    }
  });
});

app.listen(2022, console.log("server listening on http://127.0.0.1:2022"));
