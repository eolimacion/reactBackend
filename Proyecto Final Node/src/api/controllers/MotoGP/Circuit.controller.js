const { deleteImgCloudinary } = require('../../../middleware/files.middleware');
const Circuit = require('../../models/MotoGP/Circuit.model');

//! --------------- CREATE ----------------
const create = async (req, res, next) => {
  let catchImg = req.file?.path; //? ------- capturamos la url de la img que se sube a cloudinary. El OPTIONAL CHAINING es porque la img no es obligatoria y puede que no haya imagen en la request
  try {
    await Circuit.syncIndexes(); //? --------------------------- ACTUALIZAMOS INDEXES, que son aquellas claves del objeto que son únicas. Lo hacemos para asegurarnos que tenemos la última versión en caso de haber sido modificados los modelos
    const newCircuit = new Circuit(req.body); //? --------------------- instanciamos un nuevo circuito y le INTRODUCIMOS COMO INFO INICIAL LO QUE RECIBIMOS EN EL BODY DE LA REQUEST
    req.file //? -------------------- miramos si en la request hay imagen. Si la hay, la introducimos al nuevo circuito
      ? (newCircuit.image = catchImg)
      : (newCircuit.image =
          'https://res.cloudinary.com/djfkchzyq/image/upload/v1701098339/k5tpy8ytzrgn4p6dnovw.avif');

    const saveCircuit = await newCircuit.save(); //? ---------------------- GUARDAMOS EL EQUIPO EN LA BASE DE DATOS (DB) O BACKEND
    return res
      .status(saveCircuit ? 200 : 404) //? si se  ha guardado correctamente o si no
      .json(
        saveCircuit
          ? saveCircuit
          : { message: 'The circuit could not be saved ❌' }
      );
  } catch (error) {
    //? -------------------------------------------- si ha habido creando el circuito:
    req.file?.path ? deleteImgCloudinary(catchImg) : null; //? --- hay que borrar la imagen, ya que ya se ha subido a cloudinary. Se ha hecho en la primera línea de esta función
    return next(
      setError(
        500,
        error.message || 'Error general al crear un nuevo circuito ❌'
      )
    );
  }
};

//! --------------- GET by ID ----------------
const getById = async (req, res, next) => {
  // console.log("entro")
  try {
    const { id } = req.params;
    const circuitById = await Circuit.findById(id).populate(
      'likes mostSuccessful fastestLap selected'
    ); //? cogemos el elemento (circuito) identificandola a través del id, que es único
    return res
      .status(circuitById ? 200 : 404)
      .json(circuitById ? circuitById : 'No circuit found with that ID❌');
  } catch (error) {
    return next(setError(500, error.message || 'Error GET by ID ❌'));
  }
};

//! --------------- GET ALL ----------------
const getAll = async (req, res, next) => {
  try {
    const allCircuits = await Circuit.find().populate(
      ' likes mostSuccessful fastestLap selected'
    ); //? ------------- el find() nos devuelve un array con todos los elementos de la colección del BackEnd, es decir, TODOS LOS circuitos
    return res
      .status(allCircuits.length > 0 ? 200 : 404) //? ---- si hay circuitos en la db (el array tiene al menos 1 elemento), 200 o 404
      .json(
        allCircuits.length > 0
          ? allCircuits
          : { message: 'No circuits found ❌' }
      );
  } catch (error) {
    return next(setError(500, error.message || 'Error GET ALL ❌'));
  }
};

//! --------------- GET by NAME ----------------
const getByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const circuitByName = await Circuit.find({ name }).populate(
      'likes mostSuccessful fastestLap selected'
    );
    return res
      .status(circuitByName.length > 0 ? 200 : 404) //? igual que en get all, miramos si el array con ese nombre es mayor que 0 (solo debería de haber 1) y mostramos 200 o 404
      .json(circuitByName.length > 0 ? circuitByName : 'No circuits found ❌');
  } catch (error) {
    return next(setError(500, error.message || 'Error al GET by NAME ❌'));
  }
};

//! --------------- UPDATE ----------------
const update = async (req, res, next) => {
  await Circuit.syncIndexes(); //? .------------------- busca las actualizaciones, por si se ha modficado el modelo player
  let catchImg = req.file?.path; //? ------- capturamos la url de la img que se sube a cloudinary. El OPTIONAL CHAINING es porque la img no es obligatoria y puede que no haya imagen en la request
  try {
    const { id } = req.params; //? ------------------- en esta linea y la siguiente hacemos lo mismo que en getById
    const circuitById = await Circuit.findById(id);
    if (circuitById) {
      const oldImg = circuitById.image; //? ------------- guardamos la imagen que había antes en el elemento

      const customBody = {
        _id: circuitById._id, //? ---------- ponemos _.id porque así lo pone en insomnia
        image: req.file?.path ? catchImg : oldImg, //? -------------- si en el param hay una nueva imagen la ponemos en el lugar de la que había, si no hay una nueva, se deja la que había
        name: req.body?.name ? req.body.name : circuitById.name,
        location: req.body?.totalLength
          ? req.body.location
          : circuitById.location,
        length: req.body?.totalLength
          ? req.body.totalLength
          : circuitById.totalLength,
        capacity: req.body?.capacity ? req.body.capacity : circuitById.capacity,
        topSpeed: req.body?.topSpeed ? req.body.topSpeed : circuitById.topSpeed,
        selected: circuitById.selected,
        likes: circuitById.likes,
        mostSuccessful: circuitById.mostSuccessful,
        fastestLap: circuitById.fastestLap,
      };

      try {
        await Circuit.findByIdAndUpdate(id, customBody); //? cambiamos el body con lo que hemos puesto en customBody en el elemento que encontremos con el id
        if (req.file?.path) {
          deleteImgCloudinary(oldImg); //? -------------- eliminamos la imagen que había antes en la DB para no almacenar basura
        }
        //!           -------------------
        //!           | RUNTIME TESTING |
        //!           -------------------

        const circuitByIdUpdated = await Circuit.findById(id).populate(
          'likes mostSuccessful fastestLap selected'
        ); //? -------- buscamos el elemento actualizado a través del id
        const elementUpdate = Object.keys(req.body); //? ----------- buscamos los elementos de la request para saber qué se tiene que actualizar
        let test = []; //? ----------------------------------------- objeto vacío donde meter los tests. estará compuesta de las claves de los elementos y los valores seran true/false segun haya ido bien o mal

        elementUpdate.forEach((key) => {
          //? ----------------------------- recorremos las claves de lo que se quiere actualizar
          if (req.body[key] === circuitByIdUpdated[key]) {
            //? ------------ si el valor de la clave en la request (el valor actualizado que hemos pedido meter) es el mismo que el que hay ahora en el elemento ---> está bien
            test.push({ [key]: true }); //? ------------------------------------ está bien hecho por lo tanto en el test con la clave comprobada ponemos true --> test aprobado hehe
          } else {
            test.push({ [key]: false }); //? ----------------------------------- algo ha fallado y por lo tanto el test está suspendido (false)
          }
        });

        if (catchImg) {
          circuitByIdUpdated.image = catchImg //? ---------------- si la imagen en la request es la misma que la que hay ahora en el elemento
            ? (test = { ...test, file: true }) //? ------------- hacemos una copia de test y le decimos que en file (foto) es true, ha ido bien
            : (test = { ...test, file: false }); //? ------------ hacemos una copia de test y le decimos que en file (foto) es false, ha ido mal
        }

        let acc = 0;
        for (let clave in test) {
          //? -------------------- recorremos tests
          test[clave] == false ? acc++ : null; //? - si el valor es false es que algo ha fallado y le sumamos al contador de fallos
        }

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
            circuitUpdated: circuitByIdUpdated,
          });
        }
      } catch (error) {
        return next(
          setError(
            500,
            error.message || 'Error al guardar el circuito actualizado ❌'
          )
        );
      }
    } else {
      return res.status(404).json('este circuito no existe ❌');
    }
  } catch (error) {
    return next(
      setError(500, error.message || 'Error general actualizar el circuito ❌')
    );
  }
};

//! --------------- DELETE ----------------
const deleteCircuit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const circuit = await Circuit.findByIdAndDelete(id); //? buscamos el circuito y lo eliminamos

    if (circuit) {
      try {
        await Rider.updateMany({ circuits: id }, { $pull: { circuits: id } });

        try {
          await User.updateMany(
            { favCircuits: id },
            { $pull: { favCircuits: id } }
          );
          try {
            await Podium.updateMany(
              { circuit: id },
              { $pull: { circuits: id } }
            );
          } catch (error) {
            return next(
              setError(
                500,
                error.message || 'Error al eliminar al EQUIPO, del PODIUM❌'
              )
            );
          }
        } catch (error) {
          return next(
            setError(
              500,
              error.message || 'Error al eliminar al EQUIPO, del USER ❌'
            )
          );
        }
      } catch (error) {
        return next(
          setError(
            500,
            error.message || 'Error al eliminar al circuito del rider ❌'
          )
        );
      }
      const findByIdCircuit = await Circuit.findById(id); //? hemos encontrado este circuito? no debería existir porque lo hemos eliminado al ppio
      return res.status(findByIdCircuit ? 404 : 200).json({
        //? si se encuentra hay un error, porque no se ha eliminado
        deleteTest: findByIdCircuit ? false : true, //? si existe, el test ha dado fallo y si no existe ha aprobado el test
      });
    } else {
      return res.status(404).json('este circuito no existe ❌'); //? si no existe el jugador antes de eliminarlo hay que dar error porque el jugador seleccionado para borrar no existia en un primer momento
    }
  } catch (error) {
    return next(
      setError(500, error.message || 'Error general al eliminar al EQUIPO ❌')
    );
  }
};

// todo -----------------------------------------------------
// todo -------------- EXTRA CONTROLLERS --------------------
// todo -----------------------------------------------------

//! --------------- SORT GENERAL DESCENDING----------------
const sortCircuitsbyDescending = async (req, res, next) => {
  try {
    const { stat } = req.params;
    const circuitsArray = await Circuit.find().populate(
      'likes mostSuccessful fastestLap selected'
    );
    console.log(circuitsArray);
    switch (stat) {
      case 'totalLength':
      case 'location':
      case 'capacity':
      case 'topSpeed':
        circuitsArray.sort((a, b) => {
          return b[stat] - a[stat]; //? le decimos que ordene de manera descendiente (ascendiente sería a - b)
        });
        break;

      case 'name':
        circuitsArray.sort((a, b) => {
          a = a[stat].toLowerCase();
          b = b[stat].toLowerCase();
          return a[stat] < b[stat] ? -1 : 1; //? le decimos que ordene ALFABÉTICAMENTE (al revés sería b - a)
        });
        break;

      default:
        return res
          .status(404)
          .json(
            'La propiedad por la que quiere ordenar no existe/está mal escrita ❌, compruebe el modelo de datos para checkear como se escribe'
          );
    }

    return res
      .status(circuitsArray.length > 0 ? 200 : 404)
      .json(
        circuitsArray.length > 0
          ? circuitsArray
          : 'No se han encontrado circuitos en la DB/BackEnd ❌'
      );
  } catch (error) {
    return next(
      setError(
        500,
        error.message ||
          'Error general al ordenar circuitos de forma Descendiente ❌'
      )
    );
  }
};

//! --------------- SORT GENERAL ASCENDING ----------------
const sortCircuitsbyAscending = async (req, res, next) => {
  try {
    const { stat } = req.params;
    const circuitsArray = await Circuit.find().populate(
      'likes mostSuccessful fastestLap selected'
    );
    console.log(circuitsArray);
    switch (stat) {
      case 'totalLength':
      case 'location':
      case 'capacity':
      case 'topSpeed':
        circuitsArray.sort((a, b) => {
          return a[stat] - b[stat]; //? le decimos que ordene de manera ASCENDIENTE
        });
        break;

      case 'name':
        circuitsArray.sort((a, b) => {
          a = a[stat].toLowerCase();
          b = b[stat].toLowerCase();
          return a[stat] > b[stat] ? -1 : 1; //? le decimos que ordene ALFABÉTICAMENTE INVERSO
        });
        break;

      default:
        return res
          .status(404)
          .json(
            'La propiedad por la que quiere ordenar no existe/está mal escrita ❌, compruebe el modelo de datos para checkear como se escribe'
          );
    }
    // const arrayResumido = circuitsArray.map((circuit) => ({ //? que nos muestre solo esta información para no tener ese montón de datos, solo lo relevante
    //     name: circuit.name,
    //     [stat]: circuit[stat],
    // }))
    return res
      .status(circuitsArray.length > 0 ? 200 : 404)
      .json(
        circuitsArray.length > 0
          ? circuitsArray
          : 'No se han encontrado circuitos en la DB/BackEnd ❌'
      );
  } catch (error) {
    return next(
      setError(
        500,
        error.message ||
          'Error general al ordenar circuitos de forma Ascendiente ❌'
      )
    );
  }
};

//! --------------- FILTER GENERAL NUMÉRICO ----------------
const filterGeneralNum = async (req, res, next) => {
  try {
    let circuitsArray;
    const { filter, gt, lt } = req.params; //? en el param ponemos 1o: propiedad a filtrar, 2o: mayor que (Greater Than), 3o: menor que (Lower Than)
    switch (filter) {
      case 'totalLength':
      case 'location':
      case 'capacity':
      case 'topSpeed':
        circuitsArray = await Circuit.find({
          $and: [{ [filter]: { $gt: gt } }, { [filter]: { $lt: lt } }],
        }).populate('likes mostSuccessful fastestLap selected');
        break;

      default:
        return res
          .status(404)
          .json(
            'La propiedad por la que quiere filtrar no existe/está mal escrita ❌, compruebe el modelo de datos para checkear como se escribe'
          );
    }

    return res
      .status(circuitsArray.length > 0 ? 200 : 404)
      .json(
        circuitsArray.length > 0
          ? circuitsArray
          : `No se han encontrado circuitos con ${filter} mayor que ${gt} y menor que ${lt} en la DB/BackEnd ❌`
      );
  } catch (error) {
    return next(
      setError(500, error.message || `Error general al filtrar circuitos ❌`)
    );
  }
};

//! --------------- FILTER + SORT ----------------
const filterAndSort = async (req, res, next) => {
  try {
    let circuitsArray;
    const { filter, gt, lt } = req.params; //? en el param ponemos 1o: propiedad a filtrar, 2o: mayor que (Greater Than), 3o: menor que (Lower Than)
    switch (filter) {
      case 'totalLength':
      case 'capacity':
      case 'topSpeed':
        circuitsArray = await Circuit.find({
          $and: [{ [filter]: { $gt: gt } }, { [filter]: { $lt: lt } }],
        }).populate('likes mostSuccessful fastestLap selected');
        break;

      default:
        return res
          .status(404)
          .json(
            'La propiedad por la que quiere filtrar no existe/está mal escrita ❌, compruebe el modelo de datos para checkear como se escribe'
          );
    }

    switch (filter) {
      case 'totalLength':
      case 'capacity':
      case 'topSpeed':
        circuitsArray.sort((a, b) => {
          return b[filter] - a[filter]; //? le decimos que ordene de manera DESCENDIENTE
        });
        break;
    }

    return res.status(circuitsArray.length > 0 ? 200 : 404).json(
      circuitsArray.length > 0
        ? {
            circuitos: circuitsArray,
            Explicación: `circuitos ordenados según ${filter} de mayor a menor`,
          }
        : `No se han encontrado circuitos con ${filter} mayor que ${gt} y menor que ${lt} en la DB/BackEnd ❌`
    );
  } catch (error) {
    return next(
      setError(
        500,
        error.message ||
          `Error general al filtrar circuitos y ordenar de manera desdenciente ❌`
      )
    );
  }
};

// //! --------------- AVERAGE STATS ----------------
const averageStats = async (req, res, next) => {
  try {
    const { stat, circuitId } = req.params; //? el stat es la propiedad de la que sacamos media, y el circuitId es para poder encontrar los jugadores del circuito
    let average; //? tanto esta variable como circuitRiders, las declaramos fuera para poder acceder luego en el return a ellas
    let circuitRiders;
    switch (stat) {
      case 'totalLength':
      case 'capacity':
      case 'topSpeed':
        // eslint-disable-next-line no-case-declarations
        let acc = 0;
        // eslint-disable-next-line no-case-declarations
        let numberCircuits = 0;
        numberCircuits = await Circuit.find({ circuits: circuitId });
        for (let circuit of numberCircuits) {
          acc += circuit[stat];
          numberRiders += 1;
        }
        average = acc / numberRiders;
        break;

      default:
        return res
          .status(404)
          .json(
            'La propiedad de la que quiere sacar la media no existe/está mal escrita/no es aplicable para este caso ❌, compruebe el modelo de datos para checkear como se escribe'
          );
    }
    return res
      .status(circuitRiders.length > 0 ? 200 : 404)
      .json(
        circuitRiders.length > 0
          ? `Average ${stat}: ${average}`
          : 'No se han encontrado jugadores de este circuito en la DB/BackEnd ❌'
      );
  } catch (error) {
    return next(
      setError(
        500,
        error.message ||
          `Error general al sacar la media de los jugadores del circuito ❌`
      )
    );
  }
};

module.exports = {
  //! MAIN
  create,
  getById,
  getAll,
  getByName,
  update,
  deleteCircuit,
  sortCircuitsbyDescending,
  sortCircuitsbyAscending,
  filterGeneralNum,
  filterAndSort,
  averageStats,
};
