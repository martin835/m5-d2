import fs from "fs-extra"; // 3RD PARTY MODULE
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON, writeFile } = fs;

const getJSONPath = (filename) =>
  join(join(dirname(fileURLToPath(import.meta.url)), "../data"), filename);

const articlesJSONPath = getJSONPath("articles.json");
const authorsJSONPath = getJSONPath("authors.json");

/* const usersPublicFolderPath = join(process.cwd(), "./public/img/users"); */

export const getArticles = () => readJSON(articlesJSONPath);
export const writeArticles = (content) => writeJSON(articlesJSONPath, content);
export const getAuthors = () => readJSON(authorsJSONPath);
export const writeAuthors = (content) => writeJSON(authorsJSONPath, content);

/* export const saveUsersPictures = (filename, contentAsABuffer) =>
  writeFile(join(usersPublicFolderPath, filename), contentAsABuffer); */
