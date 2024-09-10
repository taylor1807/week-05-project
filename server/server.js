
import express from "express"
import cors from "cors"
import pg from "pg"
import dotenv from "dotenv"

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
    const messages = await db.query("SELECT * FROM ");
    response.json(messages.rows);
  });

  app.post("", function (request, response) {
    response.json(request.body);
  });


  app.listen(8080, function () {
    console.log("App running on port 8080");
  })