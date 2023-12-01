const { isAuth, isFollower } = require('../../middleware/auth.middleware');
const { upload } = require('../../middleware/files.middleware'); //? lo traemos porque hay una subida de ficheros
const {
  //! MAIN
  registerLargo,
  registerEstado,
  registerWithRedirect,
  sendCode,
  getById,
  getAll,
  getByName,
  login,
  autologin,
  resendCode,
  checkNewUser,
  changePassword,
  sendPassword,
  exampleAuth,
  modifyPassword,
  update,
  deleteUser,

  //! EXTRA
  addFavTeam,
  addFavPlayer,
  addFavEleven,
  addFavRider,
  addFavCircuit,
  addFavPodium,
  addFavLifter,
  addFavWeightCategory,
  addFavComment,
  addFollow,
  getFavTeams,
  getFavPlayers,
  getFavRiders,
  getFavCircuits,
  getFavPodiums,
  getFavLifters,
  getFavWeightCategory,
  getFollowers,
  getFollowed,
  getFavElevens,
  getFavComments,
  getComments,
} = require('../controllers/User.controller');

const UserRoutes = require('express').Router();

UserRoutes.post('/register', upload.single('image'), registerLargo);
UserRoutes.post('/registerUtil', upload.single('image'), registerEstado);
UserRoutes.post(
  '/registerRedirect',
  upload.single('image'),
  registerWithRedirect
);
UserRoutes.get('/:id', getById);
UserRoutes.get('/', getAll);
UserRoutes.get('/byName/:name', getByName);
UserRoutes.post('/login', login);
UserRoutes.post('/login/autologin', autologin);
UserRoutes.post('/check', checkNewUser);
UserRoutes.patch('/forgotpassword/forgotpassword', changePassword);
UserRoutes.post('/resend', resendCode);

//! ----> Controladores autenticados
UserRoutes.get('/pruebas', [isAuth], exampleAuth);
UserRoutes.patch('/changepassword', [isAuth], modifyPassword);
UserRoutes.patch('/update/update', [isAuth], upload.single('image'), update);
UserRoutes.delete('/', [isAuth], deleteUser);
//todo ------- EXTRA
UserRoutes.patch('/toggleTeam/:idTeam', [isAuth], addFavTeam);
UserRoutes.patch('/togglePlayer/:idPlayer', [isAuth], addFavPlayer);
UserRoutes.patch('/toggleRider/:idRider', [isAuth], addFavRider);
UserRoutes.patch('/toggleCircuit/:idCircuit', [isAuth], addFavCircuit);
UserRoutes.patch('/togglePodium/:idPodium', [isAuth], addFavPodium);
UserRoutes.patch('/lifter/toggleLifter/:idLifter', [isAuth], addFavLifter);
UserRoutes.patch('/toggleWeightCategory/:idWeightCategory', [isAuth], addFavWeightCategory);
UserRoutes.patch('/toggleComment/:idComment', [isAuth], addFavComment);
UserRoutes.patch('/toggleFollow/:idUser', [isAuth], addFollow);
UserRoutes.get('/favTeams/:id', [isAuth], [isFollower], getFavTeams);
UserRoutes.get('/favPlayers/:id', [isAuth],  getFavPlayers);
UserRoutes.get('/favRiders/:id', [isAuth], getFavRiders);
UserRoutes.get('/favCircuits/:id', [isAuth], [isFollower], getFavCircuits);
UserRoutes.get('/favPodiums/:id', [isAuth], [isFollower], getFavPodiums);
UserRoutes.get('/favLifters/:id', [isAuth], getFavLifters);
UserRoutes.get('/favWeightCategory/:id', [isAuth], [isFollower], getFavWeightCategory);
UserRoutes.get('/followers/:id', [isAuth], [isFollower], getFollowers);
UserRoutes.get('/followed/:id', [isAuth], [isFollower], getFollowed);
UserRoutes.get('/favElevens/:id', [isAuth], [isFollower], getFavElevens);
UserRoutes.get('/favComments/:id', [isAuth], [isFollower], getFavComments);
UserRoutes.get('/comments/:id', [isAuth], [isFollower], getComments);

//!-----> Controladores de redirect
UserRoutes.post('/register/sendMail/:id', sendCode);
UserRoutes.patch('/sendPassword/:id', sendPassword);

module.exports = UserRoutes;
