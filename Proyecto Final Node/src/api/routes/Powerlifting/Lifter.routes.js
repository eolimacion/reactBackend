const {
  createLifter,
  getLifterById,
  getAllLifters,
  getByLifterName,
  getLifterByGL,
  addAndRemoveCategoryById,
  updateLifter,
  deleteLifter,
} = require('../../controllers/Powerlifting/Lifter.controller');

const { isAuthAdmin } = require('../../../middleware/auth.middleware');

const LifterRoutes = require('express').Router();

LifterRoutes.get('/:id', getLifterById);
LifterRoutes.get('/', getAllLifters);
LifterRoutes.get('/sort/:name', getByLifterName);
LifterRoutes.get('/getByGL', getLifterByGL);

//!------------ como admin ------------

LifterRoutes.post('/', [isAuthAdmin], createLifter);
LifterRoutes.delete('/:id', [isAuthAdmin], deleteLifter);
LifterRoutes.patch('/update/:id', [isAuthAdmin], updateLifter);
LifterRoutes.patch(
  '/addWeightCategory/:id',
  [isAuthAdmin],
  addAndRemoveCategoryById
);

module.exports = LifterRoutes;
