const { upload } = require('../../../middleware/files.middleware');

const {
  create,
  getById,
  getByName,
  getAll,
  update,
  deleteCircuit,
  sortCircuitsbyDescending,
  sortCircuitsbyAscending,
  filterGeneralNum,
  filterAndSort,
  averageStats,
  getByIdNotPopulated,
} = require('../../controllers/MotoGP/Circuit.controller');

const CircuitRoutes = require('express').Router();

CircuitRoutes.post('/', upload.single('image'), create);
CircuitRoutes.get('/:id', getById);
CircuitRoutes.get('/', getAll);
CircuitRoutes.get('/byName/:name', getByName);
CircuitRoutes.patch('/:id', upload.single('image'), update);
CircuitRoutes.delete('/:id', deleteCircuit);
CircuitRoutes.get('/sortdescending/circuits/:stat', sortCircuitsbyDescending);
CircuitRoutes.get('/sortascending/circuits/:stat', sortCircuitsbyAscending);
CircuitRoutes.get('/filter/circuits/:filter/:gt/:lt', filterGeneralNum);
CircuitRoutes.get('/filtersort/circuits/:filter/:gt/:lt', filterAndSort);
CircuitRoutes.get('/average/:stat/', averageStats);
CircuitRoutes.get('/notPopulated/:id', getByIdNotPopulated);


module.exports = CircuitRoutes;
