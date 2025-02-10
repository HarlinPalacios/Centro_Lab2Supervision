import { Router } from "express";
import { getTeacherById, getTeachers, deleteTeacher, updatePasswords } from "./teacher.controller.js";

const router = Router();

//url para buscar los profesores
router.get("/findTeacher/:uid", getTeacherById);

//url para listar los profesores
router.get("/", getTeachers);

//url para elimnar profesores
router.delete("/deleteTeacher/:uid", deleteTeacher);

//url para actualizar la contraseña del profesor
router.patch("/updatePasswords/:uid", updatePasswords);

export default router;