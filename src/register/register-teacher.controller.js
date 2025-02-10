import Teacher from "../teacher/teacher.model.js";
import { hash, verify } from "argon2";

// Registro de estudiante
export const registerTeacher = async (req, res) => {
    try {
        const { name, surname, email, grade, password } = req.body;

        const encryptedPassword = await hash(password);
        const teacher = new Teacher({
            name,
            surname,
            email,
            grade,
            password: encryptedPassword
        });

        await teacher.save();

        return res.status(201).json({
            message: "Profesor registrado exitosamente",
            teacherDetails: {
                uid: teacher._id,  
                name: teacher.name,//corregir
                email: teacher.email
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error en el registro del profesor",
            error: err.message
        });
    }
};

// Login del estudiante
export const loginTeacher = async (req, res) => {
    const { email, password } = req.body;
    try {
        const teacher = await Teacher.findOne({ email: email });

        if (!teacher) {
            return res.status(404).json({
                message: "Credenciales inválidas",
                error: "Email no encontrado"
            });
        }

        const validPassword = await verify(teacher.password, password);

        if (!validPassword) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            });
        }

        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            teacherDetails: {
                uid: teacher._id,  
                name: teacher.name
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error en el inicio de sesión",
            error: err.message
        });
    }
};
