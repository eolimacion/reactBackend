const setError = require("../../../helpers/handle-error");
const Comment = require("../../models/Comment.model");
const Circuit = require("../../models/MotoGP/Circuit.model");
const Podium = require("../../models/MotoGP/Podium.model");
const Rider = require("../../models/MotoGP/Rider.model");
const User = require("../../models/User.model");


//! ---------------- CREATE -----------------
const create = async (req, res, next) => {
  //? para crear con id en vez de name, solo hay que cambiar el String, por ObjectId en el modelo, y aquí en vez de Rider.findOne({name: body[propiedad]}) se haría con Rider.findById(body[propiedad])
  try {
    await Podium.syncIndexes(); //? --------------------------- ACTUALIZAMOS INDEXES, que son aquellas claves del objeto que son únicas. Lo hacemos para asegurarnos que tenemos la última versión en caso de haber sido modificados los modelos
    const body = req.body;
    const owner = req.user._id;
    const userElement = await User.findById(owner);
    console.log(body, owner)
    if (userElement.yourPodium.length > 0) {
      //? ---------------- si el usuario ya tiene un podium mandar error
      return res
        .status(404)
        .json(
          `Este usuario ya tiene un podium, el id es: ${userElement.yourPodium} ❌ No puede crear otro`,
        );
    }
    let myPodium = { name: req.body.name, owner:owner }; //? ----------------------------------------- aqui vamos a guardar los jugadores, si cumplen con la condición de las posición
    let errors = []; //? --------------------------------------------- aquí vamos a guardar los errores indicando, en qué jugador falla, si no se cumple la condición de la posición
    let rider; //? -------------------------------------------------- variable que va cambiando en el recorrido en la que metemos los jugadores y los introducimos en el array myPodium
    for (let propiedad in body) {
      switch (
        propiedad //? ------------------------------------ la propiedad es la posición en la que los hemos puesto
      ) {
        case "firstPlace":
          rider = await Rider.findById(body[propiedad]);
          (myPodium[propiedad] =rider._id)
          break;
        case "secondPlace":
          rider = await Rider.findById(body[propiedad]);
          (myPodium[propiedad] =rider.id)
         
          break;
        case "thirdPlace":
          rider = await Rider.findById(body[propiedad]);
          (myPodium[propiedad] =rider.id)
          break;
        
        default:
          break;
      }
    }
    if (errors.length == 0) {
      //? ----------------------------------------- solamente cuando no hay ningún error:
      const newPodium = new Podium(myPodium); //? ---------------------- instanciamos un nuevo podium y le INTRODUCIMOS COMO INFO INICIAL LO QUE RECIBIMOS EN EL BODY DE LA REQUEST
      const savePodium = await newPodium.save(); //? -------------------- GUARDAMOS EL 11 IDEAL EN LA BASE DE DATOS (DB) O BACKEND
      for (let posicion in body) {
        //todo ----------- RECIPROCIDAD CON RIDER --------------------
        if (posicion != "name") {
          //? --------------------------------- lo hacemos porque name también viene como propiedad en el body pero no es un jugador que cambiar el modelo
          rider = await Rider.findById(body[posicion]);
          await Rider.findByIdAndUpdate(
            rider._id, //? ------------- 1r param: el id del elemento que vamos a modificar (añadirle a la propiedad selected)
            { $push: { selected: savePodium._id } }, //? ------------------- 2o param: le metemos el id del podium que estamos creando a la propiedad selected del rider que hemos puesto en el body
          );
        }
      } //todo ---------------- RECIPROCIDAD CON USER -----------------------
      await User.findByIdAndUpdate(
        owner, //? --------- este es el id que hemos encontrado con req.user._id al ppio de la función
        { $push: { yourPodium: savePodium._id } }, //? ----- le metemos el id del podium a la propiedad yourPodium dentro del modelo de USER
      );
      return res //? ---------------------------------------------------- evaluamos si existe savePodium y por lo tanto se ha guardado bien y mostramos exito o error
        .status(savePodium ? 200 : 404)
        .json(
          savePodium
            ? await Podium.findById(savePodium._id).populate(
                "comments likes circuit thirdPlace secondPlace firstPlace owner",
              )
            : "Error en el guardado del podium",
        );
    } else {
      return res.status(404).json(errors); //? --------------------------- mostramos los errores de posición que hemos almacenado en el recorrido
    }
  } catch (error) {
    //? --------------------------------------------- si ha habido un error creando el jugador:
    return next(error.message)
     
  }
};

//! --------------- GET by ID ----------------
const getById = async (req, res, next) => {
  console.log("estoy en get by id podium")
  try {
    const { id } = req.params;
    const podiumById = await Podium.findById(id).populate(
      "comments likes circuit thirdPlace secondPlace firstPlace owner",
    ); //? cogemos el elemento (podium) identificandola a través del id, que es único
    return res
      .status(podiumById ? 200 : 404)
      .json(
        podiumById
          ? podiumById
          : "no se ha encontrado un podium con ese id ❌",
      );
  } catch (error) {
    return next(
      setError(
        500,
        error.message || "Error general al buscar podium a través de ID ❌",
      ),
    );
  }
};

//! --------------- GET ALL ----------------
const getAll = async (req, res, next) => {
  try {
    const allPodiums = await Podium.find().populate(
      "comments likes circuit thirdPlace secondPlace firstPlace owner",
    ); //? ------------- el find() nos devuelve un array con todos los elementos de la colección del BackEnd, es decir, TODOS LOS 11 IDEALES
    console.log(allPodiums);
    return res
      .status(allPodiums.length > 0 ? 200 : 404) //? ---- si hay equipos en la db (el array tiene al menos 1 elemento), 200 o 404
      .json(
        allPodiums.length > 0
          ? allPodiums
          : "No se han encontrado podiums en la DB ❌",
      );
  } catch (error) {
    return next(
      setError(
        500,
        error.message || "Error general al buscar todos los podiums ❌",
      ),
    );
  }
};

//! --------------- GET by NAME ----------------
const getByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const podiumByName = await Podium.find({ name }).populate(
      "comments likes circuit thirdPlace secondPlace firstPlace owner",
    );
    return res
      .status(podiumByName.length > 0 ? 200 : 404) //? igual que en get all, miramos si el array con ese nombre es mayor que 0 (solo debería de haber 1) y mostramos 200 o 404
      .json(
        podiumByName.length > 0
          ? podiumByName
          : "no se ha encontrado un podium con ese nombre ❌",
      );
  } catch (error) {
    return next(
      setError(
        500,
        error.message ||
          "Error general al buscar podium a través de nombre ❌",
      ),
    );
  }
};

//! --------------- UPDATE ----------------
const update = async (req, res, next) => {
  await Podium.syncIndexes(); //? .------------------- busca las actualizaciones, por si se ha modficado el modelo rider
  try {
    const { id } = req.params; //? ------------------- en esta linea y la siguiente hacemos lo mismo que en getById
    const podiumById = await Podium.findById(id);
    const body = req.body;
    
    if (podiumById) {
      const customBody = {
        _id: podiumById._id, //? ---------- ponemos _.id porque así lo pone en insomnia
        name: body?.name ? body.name : podiumById.name,
        firstPlace:
          body?.firstPlace 
            ? body.firstPlace
            : podiumById.firstPlace,
        secondPlace:
          body?.secondPlace
            ? body.secondPlace
            : podiumById.secondPlace,
        thirdPlace:
          body?.thirdPlace 
            ? body.thirdPlace
            : podiumById.thirdPlace,
        circuit:
          body?.circuit
            ? body.circuit
            : podiumById.circuit,
    
        likes: podiumById.likes,
        comments: podiumById.comments,
      };
      for (let position in body) {
        //? estamos sacando el selected del jugador que estamos quitando, porque deja de ser selected
        if (position != "name") {
          const elementRider = await Rider.findById(body[position]); //? hago findone y no find porque así solo me da uno y puedo hacer elementRider._id, sino tendría q hacer elementRider[0]._id
          await Rider.findByIdAndUpdate(elementRider._id, {
            $pull: { selected: id },
          });
          // console.log(elementRider.id + "HOLLLAAAAAAA")
        }
      }
      for (let position in body) {
        if (position != "name") {
          const elementRider = await Rider.findById(body[position]); //? hago findone y no find porque así solo me da uno y puedo hacer elementRider._id, sino tendría q hacer elementRider[0]._id
          await Rider.findByIdAndUpdate(elementRider.id, {
            $push: { selected: id },
          });
          console.log(elementRider.id + "HOLLiiiiiiiii");
        }
      }
      try {
        await Podium.findByIdAndUpdate(id, customBody); //? cambiamos el body con lo que hemos puesto en customBody en el elemento que encontremos con el id
        //!           -------------------
        //!           | RUNTIME TESTING |
        //!           -------------------

        const podiumByUpdated = await Podium.findById(id); //? -------- buscamos el elemento actualizado a través del id
        const elementUpdate = Object.keys(req.body); //? ----------- buscamos los elementos de la request para saber qué se tiene que actualizar
        let test = []; //? ----------------------------------------- objeto vacío donde meter los tests. estará compuesta de las claves de los elementos y los valores seran true/false segun haya ido bien o mal
        let acc = 0;

        elementUpdate.forEach((key) => {
          //? ----------------------------- recorremos las claves de lo que se quiere actualizar
          console.log(podiumByUpdated[key]);
          console.log(body[key]);
          if (req.body[key] == podiumByUpdated[key]) {
            //? ------------ si el valor de la clave en la request (el valor actualizado que hemos pedido meter) es el mismo que el que hay ahora en el elemento ---> está bien
            test.push({ [key]: true }); //? ------------------------------------ está bien hecho por lo tanto en el test con la clave comprobada ponemos true --> test aprobado hehe
          } else {
            test.push({ [key]: false }); //? ----------------------------------- algo ha fallado y por lo tanto el test está suspendido (false)
            acc++; //? ------------------------------------------------ por cada fallo que tenemos sumamos uno para el siguiente paso: informar de errores
          }
        });

        if (acc > 0) {
          //? --------------------- si acc 1 o más, es que ha habido uno o más errores, y por lo tanto hay que notificarlo
          return res.status(404).json({
            dataTest: test, //? ------------ por aquí podremos examinar los errores viendo en qué claves se han producido
            update: false,
          });
        } else {
          return res.status(200).json({
            dataTest: test,
            update: true,
            updatedEleven: podiumByUpdated,
          });
        }
      } catch (error) {
        return next(
          setError(500, error.message || "Error al guardar tu podium ❌"),
        );
      }
    } else {
      return res.status(404).json("este podium no existe ❌");
    }
  } catch (error) {
    return next(
      setError(
        500,
        error.message || "Error al actualizar los datos de tu podium ❌",
      ),
    );
  }
};

//! ---------------- DELETE -----------------
const deletePodium = async (req, res, next) => {
  try {
    const { id } = req.params;
    const podium = await Podium.findByIdAndDelete(id); //? buscamos el podium y lo eliminamos

    if (podium) {
      //? si el podium que queremos eliminar existe (tiene que hacerlo para poder eliminarlo)

      try {
        //? --------------------------------------------- ELIMINAMOS AL Podium, DEL JUGADOR
        await Rider.updateMany(
          //? --------- ahora estamos cambiando en el model de Rider para poder quitar el podium que ya no existe
          { selected: id }, //? --------------------------- queremos cambiar lo que sea que haya que cambiar en esta propiedad del model, si se omite se dice que se cambia cualquier conincidencia en todo el modelo. es la condición
          { $pull: { selected: id } }, //? ------------------- estamos diciendo que quite de la propiedad selected, el id indicado, es decir el del podium que se ha eliminado. es la ejecución
        );

        try {
          //? -------------------------------------- ELIMINAMOS AL YOURTEAM DEL USER
          await User.updateMany(
            //? ---- ahora estamos cambiando en el model de User para poder quitar el podium que ya no existe
            { yourPodium: id }, //? -------------------- condición/ubicación del cambio (eliminación)
            { $pull: { yourPodium: id } }, //? ------------ ejecución
          );

          try {
            //? ---------------------------------------- ELIMINAMOS AL FAVELEVEN DEL USER
            await User.updateMany(
              //? ------ ahora estamos cambiando en el model de User para poder quitar el podium que ya no existe
              { favElevens: id }, //? -------------------- condición/ubicación del cambio (eliminación)
              { $pull: { favElevens: id } }, //? ------------ ejecución
            );

            try {
              //? -------------------------------------- ELIMINAMOS LOS COMMENTS DEL Podium - repetimos lo que hacemos en el delteComment, porque lo estamos eliminando
              const arrayComments = await Comment.find({ locationMoto: id });
              let errors = [];
              arrayComments.forEach(async (comment) => {
                //? --------------------------- hacemos forEach para recorrer el array de comentarios que hemos encontrado en el podium a borrar
                await Comment.findByIdAndDelete(comment); //? ----- cogemos el id de cada comentario con param comment y lo borramos
                try {
                  //? ----------------------------------------- ELIMINAMOS AL FAVCOMMENT DEL USER
                  await User.updateMany(
                    //? ------- ahora estamos cambiando en el model de User para poder quitar el favcomment que ya no existe
                    { favComments: id }, //? -------------------- condición/ubicación del cambio (eliminación)
                    { $pull: { favComments: id } }, //? ------------ ejecución
                  );
                } catch (error) {
                  return next(
                    setError(
                      500,
                      error.message ||
                        "Error al eliminar el comentario del user - DELETE ELEVEN❌",
                    ),
                  );
                }
                const checkCommentExist = await Comment.findById(comment); //? --------- miramos si el comment aun existe (no debería)
                checkCommentExist ? errors.push(comment) : null; //? ------------------- si existe pusheamos el id(comment) al array de errores
              });
              if (errors.length > 0) {
                //? ----------------------------------------------- si el array tiene 1 o mas errores, lo mostramos, si no es así, seguimos con el código
                return res.status(404).json(errors);
              }
            } catch (error) {
              return next(
                setError(
                  500,
                  error.message ||
                    "Error al eliminar los comments del podium ❌",
                ),
              );
            }
          } catch (error) {
            return next(
              setError(
                500,
                error.message || "Error al eliminar el podium del user ❌",
              ),
            );
          }
        } catch (error) {
          return next(
            setError(
              500,
              error.message || "Error al eliminar el podium del user ❌",
            ),
          );
        }
      } catch (error) {
        return next(
          setError(
            500,
            error.message || "Error al eliminar el podium del jugador ❌",
          ),
        );
      }

      const findByIdEleven = await Podium.findById(id); //? hemos encontrado este podium? no debería existir porque lo hemos eliminado al ppio
      return res.status(findByIdEleven ? 404 : 200).json({
        //? si se encuentra hay un error, porque no se ha eliminado
        deleteTest: findByIdEleven ? false : true, //? si existe, el test ha dado fallo y si no existe ha aprobado el test
      });
    } else {
      return res.status(404).json("este podium no existe ❌"); //? si no existe el jugador antes de eliminarlo hay que dar error porque el jugador seleccionado para borrar no existia en un primer momento
    }
  } catch (error) {
    return next(
      setError(
        500,
        error.message || "Error general al eliminar tu podium ❌",
      ),
    );
  }
};

module.exports = {
  create,
  getById,
  getAll,
  getByName,
  update,
  deletePodium,
};
