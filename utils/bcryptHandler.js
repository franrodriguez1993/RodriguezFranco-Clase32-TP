const { hash, compare } = require("bcryptjs");

//Función para encriptar:
const encrypt = async (pass) => {
  const hassPass = await hash(pass, 8);
  return hassPass; //retorna la pass hasheada.
};

//Función para comparar:
const verified = async (pass, hassPass) => {
  const isCorrect = await compare(pass, hassPass);
  return isCorrect; //Retorna un boolean
};

module.exports = { encrypt, verified };
