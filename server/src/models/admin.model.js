import { admin } from "../config/db.js";

export const createAdmin = async (data) => {
  const persona = {
    email: data.email,
    username: data.username,
    password: data.password,
  };
  const result = await admin().insertOne(persona);
  return result.insertedId;
};

export const findAdmin = async (username) => {
  const result = admin().findOne({ username });
  return result
};
