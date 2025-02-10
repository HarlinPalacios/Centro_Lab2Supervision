import { Schema, model } from "mongoose";

//requisitos que se deben cunplir
const teacherSchema = Schema({
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

teacherSchema.methods.toJSON = function() {
    const { _id, ...teacher } = this.toObject();
    teacher.uid = _id;
    return teacher;
};

export default model("Teacher", teacherSchema);
