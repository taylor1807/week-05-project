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
  const messages = await db.query(
    "SELECT * FROM messages ORDER BY created_at DESC"
  );
  response.json(messages.rows);
});

app.post("/messages", async function (request, response) {
  try {
    const name = request.body.name;
    const message = request.body.message;
    const newMessage = await db.query(
      "INSERT INTO messages (name, message, likes, dislikes) VALUES ($1, $2, $3, $4)",
      [name, message, 0, 0]
    );
    response.json(newMessage.rows[0]);
  } catch (error) {
    response.json(error);
  }
});
app.post("/messages/:id/like", async function (request, response) {
  const messageId = request.params.id;
  {
    const updatedMessage = await db.query(
      "UPDATE messages SET likes = likes + 1 where id = $1",
      [messageId]
    );
    response.json(updatedMessage.rows[0]);
  }
});
app.post("/messages/:id/dislike", async function (request, response) {
  const messageId = request.params.id;
  {
    const updatedMessage = await db.query(
      "UPDATE messages SET dislikes = dislikes + 1 where id = $1",
      [messageId]
    );
    response.json(updatedMessage.rows[0]);
  }
});

app.delete("/messages/:id", async function (request, response) {
  const messageId = request.params.id;
  console.log("Deleting message with ID:", messageId);

  const deleteResult = await db.query("DELETE FROM messages WHERE id = $1", [
    messageId,
  ]);

  console.log("Delete result:", deleteResult);

  if (deleteResult.rowCount === 0) {
    return response.status(404).json({ error: "message not found" });
  }
  response.json({ success: true, message: "Message deleted" });
});
app.get("/band_info", async function (request, response) {
  const band_info = await db.query("SELECT * FROM band_info");
  response.json(band_info.rows);
});

app.listen(8080, function () {
  console.log("App running on port 8080");
});
