
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
    response.json("");
  });

  app.get("", async function (request, response) {
    const  = await db.query("SELECT * FROM ");
    response.json(.rows);
  });

  app.post("", function (request, response) {
    response.json(request.body);
  });


  app.listen(8080, function () {
    console.log("App running on port 8080");
  })