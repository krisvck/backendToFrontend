const PORT = 3333;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const url = "https://www.theguardian.com/uk";

app.get("/", (req, res) => {
  res.json("This is my webscraper");
});

app.get("/results", (req, res) => {
  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const articles = [];

      $(".fc-item__title", html).each(function () {
        const title = $(this).text();
        const url = $(this).find("a").attr("href");

        articles.push({
          title,
          url,
        });
      });
      //console.log(articles);
      res.json(articles);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
