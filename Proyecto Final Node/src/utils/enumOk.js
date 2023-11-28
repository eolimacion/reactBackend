const interestedInEnum = require("../data/interestedInEnum");

//! --------------- ENUM GENDER ------------------
const enumGenderOk = (gender) => {
  const enumGender = ["hombre", "mujer", "otros"];
  if (enumGender.includes(gender)) {
    console.log("entro en el true");
    return { check: true, gender };
  } else {
    return {
      check: false,
    };
  }
};
//FIX Estaba puesto como chcek

//! --------------- ENUM POSITION ------------------
const enumPositionOk = (position) => {
  const enumPosition = [
    "goalkeeper",
    "centre-back",
    "right-back",
    "left-back",
    "midfielder",
    "forward",
  ];
  if (enumPosition.includes(position)) {
    console.log("entro en el true");
    return { check: true, position };
  } else {
    return {
      check: false,
    };
  }
};

//! --------------- ENUM PREFERRED FOOT ------------------
const enumPreferredFootOk = (foot) => {
  const enumPreferredFoot = ["right", "left"];
  if (enumPreferredFoot.includes(foot)) {
    console.log("entro en el true");
    return { check: true, foot };
  } else {
    return {
      check: false,
    };
  }
};

//! --------------- ENUM LEAGUE ------------------
const enumLeagueOk = (league) => {
  const enumLeague = ["Premier", "LaLiga", "Serie A", "Bundesliga", "Ligue 1"];
  if (enumLeague.includes(league)) {
    console.log("entro en el true");
    return { check: true, league };
  } else {
    return {
      check: false,
    };
  }
};


//!-------- ENUM  WEIGHT CATEGORIES ----------

const enumWeightCatOk = (weight) => {
  const enumWeight = [ 53, 59, 66, 74, 83, 93, 105, 120, "+120", 43, 47, 52, 57, 63, 69, 76, 84, "+84" ];
  if (enumWeight.includes(weight)) {
    console.log("entro en el true");
    return true
  } else {
    return false
  }
};

const enumInterestOk = (interest) => {
  if (interestedInEnum.includes(interest)) {
    console.log("entro en el true");
    return { check: true, interest };
  } else {
    return {
      check: false,
    };
  }
};


module.exports = {
  enumGenderOk,
  enumPositionOk,
  enumPreferredFootOk,
  enumLeagueOk,
  enumWeightCatOk,
  enumInterestOk,
};
