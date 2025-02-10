import express from "express";
import { assignCurso, getCursos, editarProfile, createCurso, getCursoss } from "./cur.controller.js";

const router = express.Router();

router.post("/assign-curso/:studentId/:cursoId", assignCurso)

router.get("/cursos", getCursos)

router.patch("/:uid/edit-profile", editarProfile)

router.post("/", createCurso)

router.get("/", getCursoss)

export default router;