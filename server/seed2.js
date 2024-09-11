import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const client = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seed() {
  await client.query(
    "ALTER TABLE band_info ADD COLUMN website_url VARCHAR(255);"
  );

  const updateQueries = [
    {
      id: 2,
      url: "https://www.ticketmaster.co.uk/janet-jackson-tickets/artist/972908",
    },
    {
      id: 3,
      url: "https://www.ticketmaster.co.uk/janet-jackson-tickets/artist/972908",
    },
    {
      id: 4,
      url: "https://www.ticketmaster.co.uk/janet-jackson-tickets/artist/972908",
    },
    {
      id: 5,
      url: "https://www.ticketmaster.co.uk/janet-jackson-tickets/artist/972908",
    },
    {
      id: 6,
      url: "https://www.ticketmaster.co.uk/janet-jackson-tickets/artist/972908",
    },
    {
      id: 7,
      url: "https://www.ticketmaster.co.uk/janet-jackson-tickets/artist/972908",
    },
    {
      id: 8,
      url: "https://www.ticketmaster.co.uk/linkin-park-tickets/artist/703831",
    },
    {
      id: 9,
      url: "https://www.ticketmaster.co.uk/dua-lipa-tickets/artist/2179476",
    },
    {
      id: 10,
      url: "https://www.ticketmaster.co.uk/dua-lipa-tickets/artist/2179476",
    },
    {
      id: 11,
      url: "https://www.ticketmaster.co.uk/dua-lipa-tickets/artist/2179476",
    },
  ];

  for (const { id, url } of updateQueries) {
    await client.query("UPDATE band_info SET website_url = $1 WHERE id = $2", [
      url,
      id,
    ]);
  }
}
seed();
