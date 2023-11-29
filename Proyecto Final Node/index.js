
//! 1. ---- IMPORTACIONES Y CONFIGURAMOS DOTENV
const express = require("express")
const dotenv = require("dotenv");
dotenv.config();

//?--------------------- SEEDS -------------------------

// const seedLifters = require('./src/helpers/lifterSeed'); //para sembrar unas cuantas canciones y Albumes
// seedLifters();


// const seedRider = require ('./src/helpers/riderSeed')

// seedRider()



//! 2. ------- TRAEMOS CONEXION DE LA DB (DATABASE) -----> EJECUTAMOS LA FUNCIÓN
const { connect } = require("./src/utils/db");
connect();

//! 3. -------- CONFIGURAMOS CLOUDINARY
const { configCloudinary } = require("./src/middleware/files.middleware");
configCloudinary();

//! 3. -------- VARIABLES DE ENTORNO (CONSTANTES)
const PORT = process.env.PORT


//! 4. --------- CREAMOS SERVIDOR WEB
const app = express();
const cors = require("cors");
app.use(cors());

//! 5. --------- LIMITACIONES DE CANTIDAD EN EL BACKEND
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));

//! 6. --------- RUTAS

//* 6.1. --------- RUTAS USER--------------------------------------
const UserRoutes = require("./src/api/routes/User.routes");
app.use("/api/v1/users/", UserRoutes);

const CommentRoutes = require("./src/api/routes/Comment.routes");
app.use("/api/v1/comment/", CommentRoutes);

//* 6.2. --------- RUTAS FUTBOL--------------------------------------
const PlayerRoutes = require("./src/api/routes/Player.routes");
app.use("/api/v1/players/", PlayerRoutes)

const TeamRoutes = require("./src/api/routes/Team.routes");
app.use("/api/v1/teams/", TeamRoutes)

const ElevenRoutes = require("./src/api/routes/Eleven.routes");
app.use("/api/v1/eleven/", ElevenRoutes);

//* 6.3. --------- RUTAS MOTO--------------------------------------
const CircuitRoutes = require("./src/api/routes/MotoGP/Circuit.routes");
app.use("/api/v1/circuit/", CircuitRoutes);

const RiderRoutes = require("./src/api/routes/MotoGP/Rider.routes");
app.use("/api/v1/rider/", RiderRoutes);

const PodiumRoutes = require("./src/api/routes/MotoGP/Podium.routes");
app.use("/api/v1/podium/", PodiumRoutes);


// //* 6.1. --------- RUTAS POWER--------------------------------------

const LifterRoutes = require("./src/api/routes/Powerlifting/Lifter.routes");
app.use("/api/v1/lifter/", LifterRoutes);

const WeightCategoryRoutes = require("./src/api/routes/Powerlifting/WeightCategory.routes");
app.use("/api/v1/weightCategory/", WeightCategoryRoutes);


//! 7. --------- ERRORES
//------- ERR0R: RUTA NO ENCONTRADA
app.use(".", (req, res, next) =>{
    const error = new Error("Route not found");
    error.status = 404;
    return next(error)
})

//------ ERROR: CRASH DEL SERVIDOR
// app.use((error, req, res) => {
//     return res
//       .status(error.status || 500)
//       .json(error.message || 'unexpected error');
//   });

//! 8. -------- ESCUCHAMOS EN EL PUERTO EL SERVIDOR WEB
app.disable("x-powered-by"); //? ----- nos dice con qué tecnologia esta hecho el backend
app.listen(PORT, () => console.log(`server lisitening on port http://localhost:${PORT}`));