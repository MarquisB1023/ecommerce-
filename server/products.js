const { client } = require("./index.js");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT_SECRET || "preptime";
if (JWT === "preptime") {
  console.log("jwt functional");
}

async function createProducts({ price, password }) {
  const SQL = `
    INSERT INTO Products(id, price, password) VALUES($1, $2, $3) RETURNING *
  `;
  const response = await client.query(SQL, [
    uuid.v4(),
    price,
    await bcrypt.hash(password, 5),
  ]);
  return response.rows[0];
}

async function fetchProductss() {
  const SQL = `
    SELECT id, price FROM Products;
  `;
  const response = await client.query(SQL);
  return response.rows;
}

async function findProductsWithToken(token) {
  let id;
  try {
    const payload = jwt.verify(token, JWT);
    id = payload.id;
  } catch (ex) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  const SQL = `
    SELECT id, price FROM Products WHERE id=$1;
  `;
  const response = await client.query(SQL, [id]);
  if (!response.rows.length) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  return response.rows[0];
}

async function authenticate({ price, password }) {
  const SQL = `
    SELECT id, price, password FROM Products WHERE price=$1;
  `;
  const response = await client.query(SQL, [price]);
  if (
    !response.rows.length ||
    (await bcrypt.compare(password, response.rows[0].password)) === false
  ) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  const token = jwt.sign({ id: response.rows[0].id }, JWT);
  return { token };
}

module.exports = {
  createProducts,
  fetchProductss,

  findProductsWithToken,
  authenticate,
};
