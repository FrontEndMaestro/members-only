const { pool } = require("./dbConnection");
async function addUser(userData) {
  const result = await findUser(userData.email);
  if (result == null) {
    await pool.query(
      "INSERT INTO users(first_name,last_name,email,password,isadmin) VALUES ($1,$2,$3,$4,$5)",
      [
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.hashedPassword,
        userData.isAdmin
      ],
    );
  } else {
    return "User with this email already exists. Please sign in.";
  }
}

async function findUser(userMail) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email=($1)", [
    userMail,
  ]);
  if (!rows.length) {
    return null;
  } else return rows[0];
}

async function findUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id=($1)", [id]);
  if (rows.length == 0) {
    return null;
  } else return rows[0];
}

async function updateUserMembership(userId) {
  await pool.query("UPDATE users SET membership_status=true WHERE id=($1)", [
    userId,
  ]);
}

module.exports = { addUser, findUser, findUserById, updateUserMembership };
