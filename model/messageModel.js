const { pool } = require("./dbConnection");
async function createMessage(messageData) {
  await pool.query(
    "INSERT INTO messages(message,time,user_id) VALUES ($1,$2,$3)",
    [messageData.message, messageData.time, messageData.userId],
  );
}

async function getAllMessagesWithUser() {
  const result = await pool.query(
    `SELECT email,messages.id,messages.message,messages.time FROM messages 
    inner join users on messages.user_id=users.id`,
  );
  return result.rows;
}

module.exports = { createMessage, getAllMessagesWithUser };
