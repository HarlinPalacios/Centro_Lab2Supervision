import { hash, verify } from "argon2"
import Teacher from "./teacher.model.js"

//Aqui se buscar el Profesor
export const getTeacherById = async (req, res) => {
    try {
        const { uid } = req.params
        const teacher = await Teacher.findById(uid)

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Profesor no existe",
                error: "No se ha encontrado un profesor con este ID"
            })
        }

        return res.status(200).json({
            success: true,
            teacher
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el profesor",
            error: err.message
        })
    }
}

//Se listan profesores
export const getTeachers = async (req, res) => {
    try {
        const { limits = 3, from = 0 } = req.query
        const query = { status: true }

        const [total, teachers] = await Promise.all([
            Teacher.countDocuments(query),
            Teacher.find(query)
                .skip(Number(from))
                .limit(Number(limits))
        ])

        return res.status(200).json({
            success: true,
            total,
            teachers
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al listar los profesores",
            error: err.message
        })
    }
}

// Eliminar profesor
export const deleteTeacher = async (req, res) => {
    try {
        const { uid } = req.params
        const teacher = await Teacher.findByIdAndUpdate(uid, { status: false }, { new: true })

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Profesor no encontrado",
            })
        }

        return res.status(200).json({
            success: true,
            message: "El profesor esta eliminado"
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el profesor",
            error: err.message
        })
    }
}

// Actualizar la contraseña del estudiante
export const updatePasswords = async (req, res) => {
    try {
        const { uid } = req.params
        const { newPassword } = req.body

        const teacher = await Teacher.findById(uid)

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Profesor no encontrado",
            })
        }

        const matchPassword = await verify(teacher.password, newPassword)

        if (matchPassword) {
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            })
        }

        const encryptedPassword = await hash(newPassword)

        await Teacher.findByIdAndUpdate(uid, { password: encryptedPassword })

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada"
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la contraseña",
            error: err.message
        })
    }
}
