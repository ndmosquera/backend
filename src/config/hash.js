import bcrypt from "bcrypt";
import * as con from '../utils/GlobalConstants.mjs'

const createHash = async (password) => {
  const salts = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salts);
};

const passwordValidation = async (user, password) =>
  bcrypt.compare(password, user[con.PASSWORD]);


export { createHash, passwordValidation}