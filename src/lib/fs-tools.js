import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON, writeFile, createReadStream } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");
const studentsFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../public/img/students"
);

export const getBooksReadStream = () =>
  fs.createReadStream(join(dataFolderPath, "students.json"));
console.log(getBooksReadStream());
export const getStudents = async () =>
  await readJSON(join(dataFolderPath, "students.json"));
export const writeStudents = async (content) =>
  await writeJSON(join(dataFolderPath, "students.json"), content);

export const getprojects = async () =>
  await readJSON(join(dataFolderPath, "projects.json"));
export const writeProjects = async (content) =>
  await writeJSON(join(dataFolderPath, "projects.json"), content);

export const getreview = async () =>
  await readJSON(join(dataFolderPath, "reviews.json"));
export const writereview = async (content) =>
  await writeJSON(join(dataFolderPath, "reviews.json"), content);

export const writeStudentsPictures = async (fileName, content) =>
  await writeFile(join(studentsFolderPath, fileName), content);

export const getCurrentFolderPath = (currentFile) =>
  dirname(fileURLToPath(currentFile));

export const readStudentsPictures = (fileName) =>
  createReadStream(join(studentsFolderPath, fileName));
