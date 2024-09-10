import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get("/", function (request, response) {
  response.json("This is the home route! Get out immediately!");
});

app.get("/messages", async function (request, response) {
  const messages = await db.query("SELECT * FROM messages");
  response.json(messages.rows);
});

app.post("/messages", async function (request, response) {
  const name = request.body.name;
  const message = request.body.message;
  const newMessage = await db.query(
    "INSERT INTO messages (name. message, likes, dislikes) VALUES ($1, $2, $3, $4)",
    [name, message, 0]
  );
  response.json(newMessage.rows[0]);
});

app.listen(8080, function () {
  console.log("App running on port 8080");
});
