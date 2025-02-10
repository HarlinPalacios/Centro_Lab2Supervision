"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from './mongo.js'
import registerRoutes from "../src/register/resgiter-student.routes.js"
import registrarRoutes from "../src/register/register-teacher.routes.js"
import studentRoutes from "../src/student/student.routes.js"
import teacherRoutes from "../src/teacher/teacher.routes.js"
import cursoRoutes from "../src/student/curso.routes.js"
import apiLimiter from '../src/middlewares/validar-cant-peticiones.js'

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) => {
    app.use("/gestor/v1/registro", registerRoutes)
    app.use("/gestor/v1/student", studentRoutes)
    app.use("/gestor/v1/registro", registrarRoutes)
    app.use("/gestor/v1/teacher", teacherRoutes)
    app.use("/gestor/v1/curso", cursoRoutes)
    app.use("/gestor/v1/cursoA", cursoRoutes)
}

const conectarDB = async () => {
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port: ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}