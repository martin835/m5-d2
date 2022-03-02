import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

console.log(import.meta.url);
console.log(fileURLToPath(import.meta.url));
const currentFilePath = fileURLToPath(import.meta.url);

const parentFolderPath = dirname(currentFilePath);
console.log(parentFolderPath);

const articlesJSONPath = join(parentFolderPath, "articles.json");
console.log(articlesJSONPath);

const articlesRouter = express.Router();
//1
articlesRouter.post("/", (request, response) => {
  console.log(request.body);
  const newArticle = {
    ...request.body,
    createdAt: new Date(),
    _id: uniqid(),
    cover:
      "https://i.insider.com/54856397eab8ea594db17e23?width=1136&format=jpeg",
    readTime: {
      value: 1,
      unit: "minute",
    },
    author: {
      name: "Martin Konečný",
      avatar:
        "https://365psd.com/images/previews/880/punk-is-not-dead-vector-graphics-eps-58962.jpg",
    },
  };
  console.log(newArticle);

  const articlesArray = JSON.parse(fs.readFileSync(articlesJSONPath));

  articlesArray.push(newArticle);

  fs.writeFileSync(articlesJSONPath, JSON.stringify(articlesArray));

  response.status(201).send({ id: newArticle.id });
});

//2
articlesRouter.get("/", (request, response) => {
  const fileContent = fs.readFileSync(articlesJSONPath);
  console.log(JSON.parse(fileContent));
  const articlesArray = JSON.parse(fileContent);
  response.send(articlesArray);
});

//3
articlesRouter.get("/:articleId", (request, response) => {
  console.log(request.params.articleId);
  const articlesArray = JSON.parse(fs.readFileSync(articlesJSONPath));

  const foundarticle = articlesArray.find(
    (article) => article.id === request.params.articleId
  );

  response.send(foundarticle);
});

//4
articlesRouter.put("/:articleId", (request, response) => {
  const articlesArray = JSON.parse(fs.readFileSync(articlesJSONPath));

  const index = articlesArray.findIndex(
    (article) => article.id === request.params.articleId
  );
  const oldarticle = articlesArray[index];
  const updatedarticle = {
    ...oldarticle,
    ...request.body,
    updatedAt: new Date(),
  };

  articlesArray[index] = updatedarticle;

  fs.writeFileSync(articlesJSONPath, JSON.stringify(articlesArray));

  response.send(updatedarticle);
});

//5
articlesRouter.delete("/:articleId", (request, response) => {
  const articlesArray = JSON.parse(fs.readFileSync(articlesJSONPath));
  const remainingarticles = articlesArray.filter(
    (article) => article.id !== request.params.articleId
  );

  fs.writeFileSync(articlesJSONPath, JSON.stringify(remainingarticles));

  response.status(204).send();
});

export default articlesRouter;
