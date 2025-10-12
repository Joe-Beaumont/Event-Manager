const db = require("../db/connection");

exports.saveGoogleTokens = async ({ user_id, access_token, refresh_token, expiry_date }) => {
  const result = await db.query(
    `INSERT INTO google (user_id, google_access_token, google_refresh_token, google_token_expiry)
     VALUES ($1, $2, $3, to_timestamp($4 / 1000.0))
     ON CONFLICT (user_id)
     DO UPDATE SET google_access_token=$2, google_refresh_token=$3, google_token_expiry=to_timestamp($4 / 1000.0)
     RETURNING *`,
    [user_id, access_token, refresh_token || null, expiry_date || Date.now()]
  );
  return result.rows[0];
};

exports.getGoogleTokensByUserId = async (user_id) => {
  const result = await db.query(
    `SELECT * FROM google WHERE user_id=$1`,
    [user_id]
  );
  return result.rows[0];
};