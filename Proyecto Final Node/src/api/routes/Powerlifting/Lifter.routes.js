const  {
    createLifter,
    getLifterById,
    getAllLifters,
    getByLifterName,
    addAndRemoveCategoryById,
    updateLifter,
    deleteLifter,
  } = require('../../controllers/Powerlifting/Lifter.controller')

  const { isAuthAdmin } = require('../../../middleware/auth.middleware');

const LifterRoutes = require('express').Router();

LifterRoutes.get('/:id', getLifterById)
LifterRoutes.get('/', getAllLifters)
LifterRoutes.get('/sort/:name', getByLifterName)




//!------------ como admin ------------

LifterRoutes.post('/', [isAuthAdmin], createLifter)
LifterRoutes.delete('/', [isAuthAdmin], deleteLifter)
LifterRoutes.patch('/update', [isAuthAdmin], updateLifter)
LifterRoutes.patch('/addWeightCatefory/:id', [isAuthAdmin], addAndRemoveCategoryById)



module.exports = LifterRoutes