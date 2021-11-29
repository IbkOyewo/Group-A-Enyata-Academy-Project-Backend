const db = require("../db");
const queries = require("../db/queries");
const { hashPassword, comparePassword, generateToken } = require("../utils");

// getting user
const getUser = (email) => db.any(queries.login, email);

const createUser = async (body) => {
  const { firstName, lastName, email, phoneNumber, password } = body;
  const encryptedPassword = await hashPassword(password);
  const payload = [firstName, lastName, email, phoneNumber, encryptedPassword];
  return db.one(queries.addUser, payload);
};

const validatePassword = async (email, password) => {
  const user = await getUser(email);

  if (user.length === 1) {
    const isValid = await comparePassword(password, user[0].password);
    const userdata = user[0];
    console.log(userdata);
    if (isValid) {
      const token = generateToken({
        id: userdata.id,
      });
      return token;
    }
  }
  return false;
};

// const updatePassword = async (req) => {
//   const {
//     body: { password },
//     user: { id },
//   } = req;
//   const encryptedPassword = await hashPassword(password);
//   return db.any(queries.updatePassword, [encryptedPassword, id]);
// };

module.exports = {
  createUser,
  validatePassword,
  getUser,
  // updatePassword,
};
