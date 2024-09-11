async function seed() {
  const query = `INSERT INTO messages (name, message, likes, dislikes) VALUES($1, $2, $3, $4)`;
  const result = await db.query(query, ["Ryu", "Hadouken", 2, 1]);
}
seed();
