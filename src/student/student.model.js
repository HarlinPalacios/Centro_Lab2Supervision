import { Schema, model } from "mongoose";

//Requisitos que se deben cumplir
const studentSchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre es requerido"],
        maxLength: 50
    },
    surname: {
        type: String,
        required: [true, "Last name is required"],
        maxLength: 50
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    grade: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});

studentSchema.methods.toJSON = function() {
    const { _id, ...student } = this.toObject();
    student.uid = _id;
    return student;
};

export default model("Student", studentSchema);
