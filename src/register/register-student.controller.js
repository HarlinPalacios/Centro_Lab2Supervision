import Student from "../student/student.model.js";
import { hash, verify } from "argon2";

// Registro de estudiante
export const registerStudent = async (req, res) => {
    try {
        const { name, surname, email, grade, password } = req.body;

        const encryptedPassword = await hash(password);
        const student = new Student({
            name,
            surname,
            email,
            grade,
            password: encryptedPassword
        });

        await student.save();

        return res.status(201).json({
            message: "Estudiante registrado exitosamente",
            studentDetails: {
                uid: student._id,  
                firstName: student.firstName,
                email: student.email
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error en el registro del estudiante",
            error: err.message
        });
    }
};

// Login del estudiante
export const loginStudent = async (req, res) => {
    const { email, password } = req.body;
    try {
        const student = await Student.findOne({ email: email });

        if (!student) {
            return res.status(404).json({
                message: "Credenciales inválidas",
                error: "Email no encontrado"
            });
        }

        const validPassword = await verify(student.password, password);

        if (!validPassword) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            });
        }

        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            studentDetails: {
                uid: student._id,  
                firstName: student.firstName
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error en el inicio de sesión",
            error: err.message
        });
    }
};
