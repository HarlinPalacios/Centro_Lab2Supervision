import { Router } from "express";
import { registerTeacher, loginTeacher } from './register-teacher.controller.js';

const router = Router()

//url para registar profesores
router.post("/regiterTeacher", registerTeacher)

//url para iniciar sesion
router.post("/login", loginTeacher)

export default router