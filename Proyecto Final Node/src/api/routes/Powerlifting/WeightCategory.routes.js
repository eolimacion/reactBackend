const {
  getWeightCategoryById,
  getAllWeightCategories,
  createWeightCategory,
  updateWeightCategory,
  toggleLifter,
  getWeightCategoryByGender,
  deleteWeightCategory,
  liftersByCategory,
} = require('../../controllers/Powerlifting/WeightCategory.controller');

const { isAuthAdmin } = require('../../../middleware/auth.middleware');

const WeightCategoryRoutes = require('express').Router();

WeightCategoryRoutes.get('/:id', getWeightCategoryById);
WeightCategoryRoutes.get('/', getAllWeightCategories);
WeightCategoryRoutes.get('/sort/:gender', getWeightCategoryByGender);
WeightCategoryRoutes.get('/getLiftersInCategory/:id', liftersByCategory);

//!------------ como admin ------------

WeightCategoryRoutes.post('/create', [isAuthAdmin], createWeightCategory);
WeightCategoryRoutes.patch('/update/:id', [isAuthAdmin], updateWeightCategory);
WeightCategoryRoutes.patch('/addLifters/:id', [isAuthAdmin], toggleLifter);
WeightCategoryRoutes.delete('/:id', [isAuthAdmin], deleteWeightCategory);

module.exports = WeightCategoryRoutes;
