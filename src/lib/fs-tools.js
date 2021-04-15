import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");

export const getStudents = async () =>
  await readJSON(join(dataFolderPath, "students.json"));
export const writeStudents = async (content) =>
  await writeJSON(join(dataFolderPath, "students.json"), content);
