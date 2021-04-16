import express from "express";
import { getprojects, writeProjects } from "../lib/fs-tools.js";
import uniqid from "uniqid";
import { check, validationResult } from "express-validator";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const students = await getprojects();

    if (req.query && req.query.name) {
      const filteredStudents = students.filter(
        (student) =>
          student.hasOwnProperty("name") && student.name === req.query.name
      );
      res.send(filteredStudents);
    } else {
      res.send(students);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:identifier", async (req, res, next) => {
  try {
    const students = await getprojects();
    const student = students.find((s) => s.ID === req.params.identifier);
    res.send(student);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const students = await getprojects();
    const newStudent = { ...req.body, ID: uniqid(), createdAt: new Date() };
    students.push(newStudent);
    await writeProjects(students);
    res.status(201).send({ id: newStudent.ID });
  } catch (error) {
    console.log(error);
    error.httpStatusCode = 500;
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const students = await getprojects();

    const newStudents = students.filter(
      (student) => student.ID !== req.params.id
    );

    const modifiedStudent = {
      ...req.body,
      ID: req.params.id,
      modifiedAt: new Date(),
    };

    newStudents.push(modifiedStudent);
    await writeProjects(newStudents);

    res.send(modifiedStudent);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const students = await getprojects();

    const newStudents = students.filter(
      (student) => student.ID !== req.params.id
    );
    await writeProjects(newStudents);
    res.status(204).send();
  } catch (error) {
    console.log(error);
  }
});

export default router;
