import { Router } from "express";
import { getStudentById, getStudents, deleteStudent, updatePassword } from "./student.controller.js";

const router = Router();

router.get("/findStudent/:uid", getStudentById);

router.get("/", getStudents);

router.delete("/deleteStudent/:uid", deleteStudent);

router.patch("/updatePassword/:uid", updatePassword);

export default router;
