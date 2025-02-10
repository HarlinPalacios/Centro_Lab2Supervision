import { Router } from "express";
import { registerStudent, loginStudent } from './register-student.controller.js';

const router = Router()

//url para registar estudiantes
router.post("/regiterstudent", registerStudent)

//url para iniciar sesion
router.post("/login", loginStudent)

export default router