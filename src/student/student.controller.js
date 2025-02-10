import { hash, verify } from "argon2"
import Student from "./student.model.js"

//Buscar el estudiante por uid
export const getStudentById = async (req, res) => {
    try {
        const { uid } = req.params
        const student = await Student.findById(uid)

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Estudiante no existe",
                error: "No se ha encontrado un estudiante con este ID"
            })
        }

        return res.status(200).json({
            success: true,
            student
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el estudiante",
            error: err.message
        })
    }
}

//Listar los estudiante
export const getStudents = async (req, res) => {
    try {
        const { limits = 3, from = 0 } = req.query
        const query = { status: true }

        const [total, students] = await Promise.all([
            Student.countDocuments(query),
            Student.find(query)
                .skip(Number(from))
                .limit(Number(limits))
        ])

        return res.status(200).json({
            success: true,
            total,
            students
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al listar los estudiantes",
            error: err.message
        })
    }
}

// Eliminar estudiante
export const deleteStudent = async (req, res) => {
    try {
        const { uid } = req.params
        const student = await Student.findByIdAndUpdate(uid, { status: false }, { new: true })

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Estudiante no encontrado",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Estudiante Eliminado",
            student
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el estudiante",
            error: err.message
        })
    }
}

// Actualizar la contraseña del estudiante
export const updatePassword = async (req, res) => {
    try {
        const { uid } = req.params
        const { newPassword } = req.body

        const student = await Student.findById(uid)

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Estudiante no encontrado",
            })
        }

        const matchPassword = await verify(student.password, newPassword)

        if (matchPassword) {
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            })
        }

        const encryptedPassword = await hash(newPassword)

        await Student.findByIdAndUpdate(uid, { password: encryptedPassword })

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
