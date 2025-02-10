import mongoose from "mongoose";

const CursoSchema = new mongoose.Schema({
    nameCurso:{
        type: String,
        required: true,
    },
    descripcionCurso:{
        type: String,
        requires: true,
    },
    teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true
    },
    student: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }
    ],
    status:{
        type: Boolean,
        default: true
    }
}, { timestamps: true })

CursoSchema.methods.toJSON = function() {
    const { _id, ...curso } = this.toObject()
    curso.uid = _id
    return curso
}

export default mongoose.model("Curso", CursoSchema)