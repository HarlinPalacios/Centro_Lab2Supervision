import { Router } from "express";
import { registerStudent, loginStudent } from './register-student.controller.js';

const router = Router()

router.post("/regiterstudent", registerStudent)

router.post("/login", loginStudent)

export default router