import mongoose from "mongoose";
import Student from "./student.model.js"
import Curso from "./curso.model.js"


//Acregar Cursos
export const createCurso = async (req, res) => {
    try{
        const { nameCurso, descripcionCurso, teacher } = req.body
        
        if(!nameCurso || !descripcionCurso || !teacher) {
            return res.status(400).json({
                success: false,
                message: "Todos los campos son requeridos para crear el curso"
            })
        }

        const newCurso = new Curso({
            nameCurso,
            descripcionCurso,
            teacher
        })

        await newCurso.save()

        return res.status(201).json({
            success: true,
            message: "Curso creado exitosamente",
            curso: newCurso
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al crear el curso",
            error: err.message
        })
    }
}

//Listar los cursos creados
export const getCursoss = async (req, res) => {
    try{
        const cursos = await Curso.find()
        res.status(200).json({
            success: true,
            cursos
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Error al listar los cursos",
            error: error.message
        })
    }
}

//Asignar un curso a un estudiante
export const assignCurso = async (req, res) => {
    try {
        const { studentId, cursoId } = req.params;

        // Verifica si el estudiante existe
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Estudiante no encontrado"
            });
        }

        // Verifica si el curso existe
        const curso = await Curso.findById(cursoId);
        if (!curso) {
            return res.status(404).json({
                success: false,
                message: "Curso no encontrado"
            });
        }

        // Verifica si el estudiante ya está asignado al curso
        if (curso.students.includes(studentId)) {
            return res.status(400).json({
                success: false,
                message: "El estudiante ya está asignado a este curso"
            });
        }

        // Asignar el curso al estudiante
        curso.students.push(studentId)
        await curso.save()

        // Asignar el estudiante al curso
        student.curso.push(cursoId);
        await student.save()

        return res.status(200).json({
            success: true,
            message: "Estudiante asignado al curso exitosamente",
            student,
            curso
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al asignar al estudiante al curso",
            error: err.message
        })
    }
}

//Listar los cursos que tiene un studiante por ID
export const getCursos = async (req, res) => {
    try{
        const { uid } = req.params

        const student = await Student.findById(uid).populate("cursos")

        if(!student) return res.status(404).json({ message: "Estudiante no encontrado "})

        res.status(200).json(student.cursos)

    }catch(error){ 
        res.status(500).json({ message: "Error al obtenes los cursos", error})
    }
}

//Edita el perfil del estudiante
export const editarProfile = async (req, res) => {
    try{
        const { uid } = req.params
        const { name, email, grade } = req.body

        const student = await Student.findByIdAndUpdate(
            uid,
            { name, email, grade },
            { new: true}
        );

        if(!student) return res.status(404).json({ message: "Estudiante no econtrado" })

        res.status(200).json({ message: "Se a actualizado el perfil del estudiante", student})
    }catch(error){
        res.status(500).json({ message: "Error al actuaizar el perfil", error})
    }
}

