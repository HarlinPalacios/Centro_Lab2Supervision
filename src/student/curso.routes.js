import express from "express";
import { assignCurso, getCursos, editarProfile, createCurso, getCursoss } from "./cur.controller.js";

const router = express.Router();

//url para asignar un estudiante al curso
router.post("/assign-curso/:studentId/:cursoId", assignCurso)

//url para listar loe cursos
router.get("/cursos", getCursos)

//url para actuaicar el perfil
router.patch("/:uid/edit-profile", editarProfile)

router.post("/", createCurso)

router.get("/", getCursoss)

export default router;