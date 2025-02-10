import { Router } from "express";
import { getStudentById, getStudents, deleteStudent, updatePassword } from "./student.controller.js";

const router = Router();

//url para buscar estudiantes
router.get("/findStudent/:uid", getStudentById);

//url para listar estudiantes
router.get("/", getStudents);

//url para eliminar estudiantes
router.delete("/deleteStudent/:uid", deleteStudent);

//url para actualizar la contraseña
router.patch("/updatePassword/:uid", updatePassword);

export default router;
